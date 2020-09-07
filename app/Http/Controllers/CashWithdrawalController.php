<?php

namespace App\Http\Controllers;

use App\BoxCut;
use DB;
use Validator;
use Throwable;
use App\CashWithdrawal;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;

class CashWithdrawalController extends ApiResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function store(Request $r)
    {
        try
        {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'bocu_fk' => 'required|int', // PK Caja
                'cawi_amount' => 'required', //Monto
            ]);


            if($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vbocu_fk = $vInput['bocu_fk'];
            $vcawi_amount = $vInput['cawi_amount'];

            $vBCSel = BoxCut::where('bocu_pk', '=', $vbocu_fk)->first(); //Consultar Caja

            if($vBCSel)
            { 
                
                //Insertar Retiro
                $vCWI = new CashWithdrawal();        
                $vCWI->bocu_fk = $vbocu_fk;
                $vCWI->cawi_amount = $vcawi_amount;
                $vCWI->save();

                //Asignación de PK Pago
                $vcawi_pk = $vCWI->cawi_pk;

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('cash_withdrawals', $vcawi_pk, 1);

                return $this->dbResponse($vcawi_pk, 200, null, 'Retiro Guardado Correctamente.');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Caja NO Encontrada.');
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
     * @param  \App\CashWithdrawal  $cashWithdrawal
     * @return \Illuminate\Http\Response
     */
    public function show(int $cawi_pk)
    {
        if ($cawi_pk == '' || $cawi_pk == 0) {
            return $this->dbResponse(null, 500, null, 'PK Obligatorio');
        }

        try {
            //Asignacion de variables
           $vcawi_pk = $cawi_pk;

            $vCWSel = DB::table('cash_withdrawals AS CW') 
                ->join('box_cuts AS BC', 'CW.bocu_fk', '=', 'BC.bocu_pk')
                ->join('stores AS S', 'BC.stor_fk', '=', 'S.stor_pk')
                ->select(
                    'CW.cawi_pk',
                    'CW.cawi_amount',
                    'CW.created_at',

                    'BC.bocu_pk',

                    'S.stor_pk',
                    'S.stor_name',
                    'S.stor_addres',

                    DB::raw('(SELECT A.name AS user FROM logs AS L INNER JOIN admins AS A ON L.user_fk = A.id WHERE L.table = "cash_withdrawals" AND L.pk_register = CW.cawi_pk AND L.operation = 1 LIMIT 1) AS user') //Vededor
                    )
                ->where('CW.cawi_pk', '=', $vcawi_pk)
                ->first();

            if($vCWSel)
            { 
                return $this->dbResponse($vCWSel, 200, null, 'Retiro');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Retiro No Encontrado');
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
     * @param  \App\CashWithdrawal  $cashWithdrawal
     * @return \Illuminate\Http\Response
     */
    public function edit(CashWithdrawal $cashWithdrawal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CashWithdrawal  $cashWithdrawal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CashWithdrawal $cashWithdrawal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CashWithdrawal  $cashWithdrawal
     * @return \Illuminate\Http\Response
     */
    public function destroy(CashWithdrawal $cashWithdrawal)
    {
        //
    }

    public function printRetiro(int $cawi_pk)
    {
        if ($cawi_pk == '' || $cawi_pk == 0) {
            return $this->dbResponse(null, 500, null, 'PK Obligatorio');
        }


         //Asignacion de variables
         $vcawi_pk = $cawi_pk;
           
        $vCWSel = DB::table('cash_withdrawals AS CW') 
                ->join('box_cuts AS BC', 'CW.bocu_fk', '=', 'BC.bocu_pk')
                ->join('stores AS S', 'BC.stor_fk', '=', 'S.stor_pk')
                ->select(
                    'CW.cawi_pk',
                    'CW.cawi_amount',
                    'CW.created_at',

                    'BC.bocu_pk',

                    'S.stor_pk',
                    'S.stor_name',
                    'S.stor_addres',

                    DB::raw('(SELECT A.name AS user FROM logs AS L INNER JOIN admins AS A ON L.user_fk = A.id WHERE L.table = "cash_withdrawals" AND L.pk_register = CW.cawi_pk AND L.operation = 1 LIMIT 1) AS user') //Vededor
                    )
                ->where('CW.cawi_pk', '=', $vcawi_pk)
                ->first();

            if($vCWSel)
            { 

                $pdf = new \Codedge\Fpdf\Fpdf\Fpdf($orientation = 'P', $unit = 'mm', array(60, 100));
                $pdf->SetMargins(1, 1, 1);
                $pdf->AddPage();
                $pdf->SetFont('Arial', 'B', 8);    //Letra Arial, negrita (Bold), tam. 20
                $pdf->Image(config('app.url') . '/images/logo_chocoplastic.png', 20, 2, 25);
                $pdf->SetY(12);
                $lineHeigth = 2;

                
                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(18,$lineHeigth,'',0,'C');
                $pdf->Cell(6,$lineHeigth,'RFC',0,'R');
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(20, $lineHeigth, 'XAXX010101000', '', '1', 'L');
                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(8,$lineHeigth,'',0,'C');
                $pdf->Cell(15,$lineHeigth,'Domicilio Fiscal: ',0,'R');
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(20, $lineHeigth, 'Ubicación de la tienda', '', '1', 'L');

                $pdf->Cell(60, $lineHeigth+2,'---------------------------------------------------------------------------------------------', '', '1', 'C');                
                $pdf->SetFont('Arial', 'B', 7);
                $pdf->Cell(57, $lineHeigth, $vCWSel->stor_name, '', '1', 'C');
                $pdf->SetFont('Arial', '', 3);
                $pdf->Cell(57,$lineHeigth+2,$vCWSel->stor_addres, '', '1', 'C');
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(60, $lineHeigth,'---------------------------------------------------------------------------------------------', '', '1', 'C');
                                
                $pdf->Ln();
                
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(33, $lineHeigth, 'Retiro de Caja', '', '1', 'L');
               
                $pdf->Cell(50, $lineHeigth, $vCWSel->created_at, '', '1', 'L');
                $pdf->Cell(17, $lineHeigth, 'Nombre de usuario', '', 0, 'L');
                $pdf->Cell(20, $lineHeigth, $vCWSel->user, '', '1', 'L');

                $pdf->Ln(7);
                $pdf->SetFont('Arial', '', 7);
                $pdf->Cell(57, $lineHeigth, 'TOTAL DE EFECTIVO A RETIRAR', '', '1', 'C');

                $pdf->Ln(2);
                $pdf->SetFont('Arial', 'BU', 8);
                $pdf->Cell(57, $lineHeigth, '$' . $vCWSel->cawi_amount, '', '1', 'C');



                
                
                
                // Arial italic 8
                $pdf->SetFont('Arial','I',4);
                // Número de página
                $pdf->Cell(0,10,'',0,0,'C');
                 
                // PIE DE PAGINA
                $pdf->Ln(20);
                $pdf->Cell(60,0,'',0,1,'C');
                $pdf->Ln(3);
                $pdf->Cell(60,0,'__________________________________________________','', '1','C');
                $pdf->Ln(2);
                $pdf->Cell(60,0,$vCWSel->user,'', '1','C');



                ob_get_clean();
                $pdf->output('I', 'ticket', 'true');
                //exit;
        }            
    }
}
