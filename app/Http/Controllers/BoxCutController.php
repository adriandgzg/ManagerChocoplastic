<?php

namespace App\Http\Controllers;

use DB;
use Exception;
use Throwable;
use App\BoxCut;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\api\ApiResponseController;

class BoxCutController extends ApiResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vUser = Auth::user()->id;
        $vBoxCut = BoxCut::where('admi_fk', '=', $vUser)->where('bocu_status', '=', 1)->first();
        
            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Caja cargada',
                'data' => $vBoxCut
                
            ], 200);
        
    }
    
    public function ListBoxCuts()
    {
        try {
            $vClientSales = DB::table('box_cuts AS BC')
                ->select(
                    'BC.bocu_pk',
                    
                    DB::raw('(CASE 
                        WHEN BC.bocu_status = 1 THEN "Abierta" 
                        WHEN BC.bocu_status = 2 THEN "Cerrada"                          
                        ELSE "" END) AS bocu_status'),
                        'BC.bocu_startdate',
                        'BC.bocu_initialamount',
                        'BC.bocu_enddate',
                        'BC.bocu_endamount',
                        'BC.bocu_observation',
                        'BC.created_at',
                )
                ->get();

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Ventas de los clientes',
                'data' =>  $vClientSales
            ], 200);
            
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => $e
            ], 200);
        }  
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{

            $vUser = Auth::user()->id;
            $vstor_fk = Auth::user()->store_id;

            $vBCSel = BoxCut::where('admi_fk', '=', $vUser)->where('bocu_status', '=', 1)->first();

            if($vBCSel)
            {
                return response()->json([
                    'code' => 404,
                    'success' => false,
                    'message' => 'Usuario con Caja Abierta Anteriromente',
                    'data' => null
                ], 200);
            }
            else
            {
                $vBCI = new BoxCut();  
                $vBCI->admi_fk = $vUser;
                $vBCI->stor_fk = $vstor_fk;
                $vBCI->bocu_startdate = $request->bocu_startdate;
                $vBCI->bocu_initialamount = $request->bocu_initialamount;
                $vBCI->save();

                //Asignación de PK Venta Cliente
                $vbocu_pk = $vBCI->bocu_pk;

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('box_cuts', $vbocu_pk, 1);

                $vBoxCut = BoxCut::where('bocu_pk', '=', $vbocu_pk)->first();

                return response()->json([
                    'code' => 200,
                    'success' => true,
                    'message' => 'Caja cargada',
                    'data' => $vBoxCut
                ], 200);
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BoxCut  $boxCut
     * @return \Illuminate\Http\Response
     */
    public function show(int $bocu_pk)
    {
        

        try {
            //Asignacion de variables
            $vbocu_pk = $bocu_pk;

            if ($vbocu_pk == '' || $vbocu_pk == 0) {
                return $this->dbResponse(null, 500, null, 'PK Obligatorio');
            }

            //Suma de deudas
            $vTotalCredit = DB::table('client_debts AS CD')
                ->where('CD.clde_status','=',1)
                ->where('CD.bocu_fk','=',$vbocu_pk )
                ->sum('CD.clde_amount');

            //Suma de Cobros de las deudas de la caja
            $vCobrosCreditBox = DB::table('client_payments AS CP')
            ->join('client_debts AS CD', 'CD.clde_pk', '=', 'CP.clde_fk')
            ->where('CP.clpa_status','=',1)
            ->where('CD.clde_status','<>',0)
            ->where('CP.bocu_fk','=',$vbocu_pk)
            ->where('CD.bocu_fk','=',$vbocu_pk)
            ->sum('CP.clpa_amount');

            //Suma de Cobros
            $vCobrosCredit = DB::table('client_payments AS CP')
                ->where('CP.clpa_status','=',1)
                ->where('CP.bocu_fk','=',$vbocu_pk)
                ->sum('CP.clpa_amount');

            //Consultar Caja
            $vBCSel = DB::table('box_cuts AS BC') 
                ->join('stores AS S', 'BC.stor_fk', '=', 'S.stor_pk')
                ->join('admins AS A', 'BC.admi_fk', '=', 'A.id')
                ->select(
                    'BC.bocu_pk',
                    'BC.bocu_startdate',
                    'BC.bocu_enddate',

                    'BC.bocu_initialamount', //Saldo Inicial
                    DB::raw("
                        IFNULL(
                            $vCobrosCredit 
                            + 
                            (
                                SELECT SUM(CPA.cpam_amount) AS totalcharge 
                                FROM client_payment_amounts AS CPA 
                                INNER JOIN client_sales AS CS ON CS.clsa_pk = CPA.clsa_fk
                                WHERE CPA.cpam_status = 1 AND CPA.bocu_fk = BC.bocu_pk AND CPA.pash_fk = 1 AND CS.pame_fk = 1
                            )
                        , 0) AS totalcharge
                    "), //Total Cobros
                    DB::raw("
                        (
                            SELECT IFNULL(SUM(CW.cawi_amount), 0) AS totalwithdrawals 
                            FROM cash_withdrawals AS CW 
                            WHERE CW.cawi_status = 1 AND CW.bocu_fk = BC.bocu_pk
                        ) 
                        AS totalwithdrawals
                    "), //Total Retiros
                    'BC.bocu_endamount', //Saldo Final
                    DB::raw("($vTotalCredit - $vCobrosCreditBox) AS totalcredit"), //Total Credito

                    'BC.bocu_observation',
                    'BC.bocu_status',

                    'S.stor_pk',
                    'S.stor_name',
                    'S.stor_addres',

                    'A.name AS user'
                    )
                ->where('BC.bocu_pk', '=', $vbocu_pk)
                ->first();;

            if($vBCSel)
            { 
                return $this->dbResponse($vBCSel, 200, null, 'Información de Corte de Caja');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Corte de Caja No Encontrado');
            }

        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BoxCut  $boxCut
     * @return \Illuminate\Http\Response
     */
    public function edit(BoxCut $boxCut)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BoxCut  $boxCut
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try{

            \DB::update("update box_cuts set"
            . "   bocu_enddate = '" . $request->bocu_enddate 
            . "', bocu_status = 2 " 
            . ",  bocu_endamount  = '" .  $request->bocu_endamount
            . "', bocu_observation = '" .  $request->bocu_observation
            . "' where bocu_pk = ". $request->bocu_pk);

            //////////////////  Inserción de Log  //////////////////
            $this->getstorelog('box_cuts', $request->bocu_pk, 2);
          
            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Caja cargada',
                'data' => null
                
            ], 200);

        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BoxCut  $boxCut
     * @return \Illuminate\Http\Response
     */
    public function destroy(BoxCut $boxCut)
    {
        //
    }

    public function printCorte(int $bocu_pk)
    {    
        try{
        
            //Asignacion de variables
            $vbocu_pk = $bocu_pk;

            if ($vbocu_pk == '' || $vbocu_pk == 0) {
                return $this->dbResponse(null, 500, null, 'PK Obligatorio');
            }

            //Suma de deudas
            $vTotalCredit = DB::table('client_debts AS CD')
                ->where('CD.clde_status','=',1)
                ->where('CD.bocu_fk','=',$vbocu_pk )
                ->sum('CD.clde_amount');

            //Suma de Cobros de las deudas de la caja
            $vCobrosCreditBox = DB::table('client_payments AS CP')
            ->join('client_debts AS CD', 'CD.clde_pk', '=', 'CP.clde_fk')
            ->where('CP.clpa_status','=',1)
            ->where('CD.clde_status','<>',0)
            ->where('CP.bocu_fk','=',$vbocu_pk)
            ->where('CD.bocu_fk','=',$vbocu_pk)
            ->sum('CP.clpa_amount');

            //Suma de Cobros
            $vCobrosCredit = DB::table('client_payments AS CP')
                ->where('CP.clpa_status','=',1)
                ->where('CP.bocu_fk','=',$vbocu_pk)
                ->sum('CP.clpa_amount');

            //Consultar Caja
            $vBCSel = DB::table('box_cuts AS BC') 
                ->join('stores AS S', 'BC.stor_fk', '=', 'S.stor_pk')
                ->join('admins AS A', 'BC.admi_fk', '=', 'A.id')
                ->select(
                    'BC.bocu_pk',
                    'BC.bocu_startdate',
                    'BC.bocu_enddate',

                    'BC.bocu_initialamount', //Saldo Inicial
                    DB::raw("
                        $vCobrosCredit + 
                            (
                                SELECT SUM(CPA.cpam_amount) AS totalcharge 
                                FROM client_payment_amounts AS CPA 
                                INNER JOIN client_sales AS CS ON CS.clsa_pk = CPA.clsa_fk
                                WHERE CPA.cpam_status = 1 AND CPA.bocu_fk = BC.bocu_pk AND CPA.pash_fk = 1 AND CS.pame_fk = 1
                            ) AS totalcharge
                    "), //Total Cobros
                    DB::raw("
                        (
                            SELECT SUM(CW.cawi_amount) AS totalwithdrawals 
                            FROM cash_withdrawals AS CW 
                            WHERE CW.cawi_status = 1 AND CW.bocu_fk = BC.bocu_pk
                        ) AS totalwithdrawals
                    "), //Total Retiros
                    'BC.bocu_endamount', //Saldo Final
                    DB::raw("($vTotalCredit - $vCobrosCreditBox) AS totalcredit"), //Total Credito

                    DB::raw("
                            (
                                SELECT SUM(CPA.cpam_amount) AS totaltransfer 
                                FROM client_payment_amounts AS CPA 
                                INNER JOIN client_sales AS CS ON CS.clsa_pk = CPA.clsa_fk
                                WHERE CPA.cpam_status = 1 AND CPA.bocu_fk = BC.bocu_pk AND CPA.pash_fk = 2 AND CS.pame_fk = 1
                            ) AS totaltransfer
                    "), //Total Transferencia

                    DB::raw("
                            (
                                SELECT SUM(CPA.cpam_amount) AS totalnotecredit 
                                FROM client_payment_amounts AS CPA 
                                INNER JOIN client_sales AS CS ON CS.clsa_pk = CPA.clsa_fk
                                WHERE CPA.cpam_status = 1 AND CPA.bocu_fk = BC.bocu_pk AND CPA.pash_fk = 3 AND CS.pame_fk = 1
                            ) AS totalnotecredit
                    "), //Total Notra de Credito

                    DB::raw("
                            (
                                SELECT SUM(CPA.cpam_amount) AS totalcard 
                                FROM client_payment_amounts AS CPA 
                                INNER JOIN client_sales AS CS ON CS.clsa_pk = CPA.clsa_fk
                                WHERE CPA.cpam_status = 1 AND CPA.bocu_fk = BC.bocu_pk AND CPA.pash_fk = 4 AND CS.pame_fk = 1
                            ) AS totalcard
                    "), //Total Notra de Credito
                    

                    'BC.bocu_observation',
                    'BC.bocu_status',

                    'S.stor_pk',
                    'S.stor_rfc',
                    'S.stor_name',
                    'S.stor_addres',

                    'A.name AS user'
                    )
                ->where('BC.bocu_pk', '=', $vbocu_pk)
                ->first();

            if($vBCSel)
            {    

                $vTotal = ($vBCSel->bocu_initialamount + $vBCSel->totalcharge) - $vBCSel->totalwithdrawals;

                $pdf = new \Codedge\Fpdf\Fpdf\Fpdf($orientation = 'P', $unit = 'mm', array(60, 150));
                $pdf->SetMargins(1, 1, 1);
                $pdf->AddPage();
                $pdf->SetFont('Arial', 'B', 8);    //Letra Arial, negrita (Bold), tam. 20
                $pdf->Image(config('app.url') . '/images/logo_chocoplastic.png', 20, 2, 25);
                $pdf->SetY(12);
                $lineHeigth = 2;

        
                /*$pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(18,$lineHeigth,'',0,'C');
                $pdf->Cell(6,$lineHeigth,'RFC',0,'R');
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(20, $lineHeigth, 'XAXX010101000', '', '1', 'L');
                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(8,$lineHeigth,'',0,'C');
                $pdf->Cell(15,$lineHeigth,'Domicilio Fiscal: ',0,'R');
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(20, $lineHeigth, utf8_decode('Ubicación de la tienda'), '', '1', 'L');*/

                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(5, $lineHeigth, 'RFC:', '', '0', 'L');
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(5, $lineHeigth, $vBCSel->stor_rfc, '', '0', 'L');
                
                $pdf->SetY(15);
                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(8, $lineHeigth, 'Domicilio Fiscal:', '', '0', 'L');
                $pdf->Ln();
                $pdf->SetFont('Arial', '', 3);
                $pdf->Cell(50, $lineHeigth, utf8_decode($vBCSel->stor_addres), '', '1', 'L');


                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(60, $lineHeigth+2,'---------------------------------------------------------------------------------------------', '', '1', 'C');                
                $pdf->SetFont('Arial', 'B', 7);
                $pdf->Cell(57, $lineHeigth, utf8_decode($vBCSel->stor_name), '', '1', 'C');
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(60, $lineHeigth,'---------------------------------------------------------------------------------------------', '', '1', 'C');
                                
                $pdf->Ln();
                
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(33, $lineHeigth, 'Corte de Caja', '', '1', 'L');        
                $pdf->Cell(17, $lineHeigth, 'ID', '', 0, 'L');
                $pdf->Cell(20, $lineHeigth, $vBCSel->bocu_pk, '', '1', 'L');
                $pdf->Cell(17, $lineHeigth, 'Nombre de usuario', '', 0, 'L');
                $pdf->Cell(20, $lineHeigth, utf8_decode($vBCSel->user), '', '1', 'L');
                $pdf->Cell(17, $lineHeigth, 'Apertura', '', 0, 'L');
                $pdf->Cell(20, $lineHeigth, $vBCSel->bocu_startdate, '', '1', 'L');
                $pdf->Cell(17, $lineHeigth, 'Cierre', '', 0, 'L');
                $pdf->Cell(20, $lineHeigth, $vBCSel->bocu_enddate, '', '1', 'L');


                $pdf->Ln(4);
                $pdf->SetFont('Arial', '', 6);
                $pdf->Cell(57, $lineHeigth, 'EFECTIVO', '', '1', 'C');
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(25,4,'SALDO INICIAL',1);
                $pdf->Cell(15,4, '$' . number_format($vBCSel->bocu_initialamount, 2) ,1,0,'R');
                $pdf->Cell(10,4,'',0);
                $pdf->Ln();
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(25,4,'+ COBROS',1);
                $pdf->Cell(15,4, '$' . number_format($vBCSel->totalcharge, 2) ,1,0,'R');
                $pdf->Cell(10,4,'',0);
                $pdf->Ln();
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(25,4,'- RETIROS',1);
                $pdf->Cell(15,4, '$' . number_format($vBCSel->totalwithdrawals, 2) ,1,0,'R');
                $pdf->Cell(10,4,'',0);
                $pdf->Ln();
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(40,4,'-----------------------------------------------------------------',1);        
                $pdf->Cell(10,4,'',0);
                $pdf->Ln();
                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(25,4,'TOTAL',1);
                $pdf->Cell(15,4, '$' . number_format($vTotal, 2) ,1,0,'R');
                $pdf->Cell(10,4,'',0);
                $pdf->Ln();
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(40,4,'-----------------------------------------------------------------',1);        
                $pdf->Cell(10,4,'',0);
                $pdf->Ln();
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(25,4,'SALDO FINAL',1);
                $pdf->Cell(15,4, '$' . number_format($vBCSel->bocu_endamount , 2) ,1,0,'R');
                $pdf->Cell(10,4,'',0);
                $pdf->Ln();
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(40,4,'-----------------------------------------------------------------',1);        
                $pdf->Cell(10,4,'',0);
                $pdf->Ln();
                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(25,4,'FALTANTE',1);
                $pdf->Cell(15,4, '$' . number_format($vTotal - $vBCSel->bocu_endamount, 2) ,1,0,'R');
                $pdf->Cell(10,4,'',0);

                $pdf->Ln(6);
                $pdf->SetFont('Arial', '', 6);
                $pdf->Cell(57, $lineHeigth, utf8_decode('TRANSFERENCIA'), '', '1', 'C');

                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(25,4,'TOTAL',1);
                $pdf->Cell(15,4, '$' . number_format($vBCSel->totaltransfer, 2) ,1,0,'R');
                $pdf->Cell(10,4,'',0);

                $pdf->Ln(6);
                $pdf->SetFont('Arial', '', 6);
                $pdf->Cell(57, $lineHeigth, utf8_decode('NOTA DE CRÉDITO'), '', '1', 'C');

                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(25,4,'TOTAL',1);
                $pdf->Cell(15,4, '$' . number_format($vBCSel->totalnotecredit, 2) ,1,0,'R');
                $pdf->Cell(10,4,'',0);

                $pdf->Ln(6);
                $pdf->SetFont('Arial', '', 6);
                $pdf->Cell(57, $lineHeigth, utf8_decode('TARJETA BANCARIA'), '', '1', 'C');

                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(25,4,'TOTAL',1);
                $pdf->Cell(15,4, '$' . number_format($vBCSel->totalcard, 2) ,1,0,'R');
                $pdf->Cell(10,4,'',0);

                $pdf->Ln(6);
                $pdf->SetFont('Arial', '', 6);
                $pdf->Cell(57, $lineHeigth, utf8_decode('CRÉDITO'), '', '1', 'C');

                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(25,4,'TOTAL',1);
                $pdf->Cell(15,4, '$' . number_format($vBCSel->totalcredit, 2) ,1,0,'R');
                $pdf->Cell(10,4,'',0);

                
                $pdf->Ln(6);
                $pdf->SetFont('Arial', '', 6);
                $pdf->Cell(57, $lineHeigth, utf8_decode('TOTALES'), '', '1', 'C');

                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(10,4,'',0);
                $pdf->Cell(25,4,'GRAN TOTAL',1);
                $pdf->Cell(15,4, '$' . number_format($vTotal + $vBCSel->totaltransfer + $vBCSel->totalnotecredit + $vBCSel->totalcard + $vBCSel->totalcredit, 2) ,1,0,'R');
                $pdf->Cell(10,4,'',0);
                

                
                // Arial italic 8
                $pdf->SetFont('Arial','I',4);
                // Número de página
                $pdf->Cell(0,10,'',0,0,'C');
                    
                // PIE DE PAGINA
                $pdf->Ln(5);
                $pdf->Cell(60,0,'',0,1,'C');
                $pdf->Ln(3);
                $pdf->Cell(60,0,'__________________________________________________','', '1','C');
                $pdf->Ln(2);
                $pdf->Cell(60,0,utf8_decode($vBCSel->user),'', '1','C');

                ob_get_clean();
                $pdf->output('I', 'ticket', 'true');
       
            }   
        } 
        catch (Throwable $vTh) 
        {
            return $vTh;
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }

    }
}
