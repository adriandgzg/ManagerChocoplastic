<?php

namespace App\Http\Controllers;

use App\Helpers\FpdfJs;
use App\ClientDebt;
use Exception;
use Validator;
use DB;
use App\ClientPayment;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;

class ClientPaymentController extends ApiResponseController
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
        $vInput = $r->all(); 

        $validator = Validator::make($vInput, [ 
            'clde_fk' => 'required', //PK Cliente Deuda
            'clie_fk' => 'required', //PK Cliente
            'pash_fk' => 'required', //PK Forma de Pago
            'bocu_fk' => 'required', //PK Caja
            'clpa_amount' => 'required', //Monto
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 404,
                'success' => false,
                'message' => "Detalle de Validación"
            ], 200);
        }

        try {
            //Asignacion de variables
           $vclde_fk = $vInput['clde_fk'];
           $vclie_fk = $vInput['clie_fk'];
           $vpash_fk = $vInput['pash_fk'];
           $vbocu_fk = $vInput['bocu_fk'];
           $vclpa_amount = $vInput['clpa_amount'];
           $vclpa_reference = $vInput['clpa_reference'];

            $vClientDebt = ClientDebt::where('clde_pk', '=', $vclde_fk)->where('clde_status', '=', 1)->first();

            if($vClientDebt)
            { 
                //Busqueda de montos
                $vclde_amount = $vClientDebt->clde_amount; //Montos total de deuda
                $vpayment_total = ClientPayment::where('clde_fk', '=', $vclde_fk)->where('clpa_status', '=', 1)->sum('clpa_amount'); //Monto total de pagos

                $vdebt_total =  $vclde_amount - $vpayment_total;

                //Validar que el monto pendiente de la deuda sea mayor o igual que el pago
                if($vclpa_amount <= $vdebt_total)
                {
                    //Insertar Pago del cliente
                    $vCPC = new ClientPayment();        
                    $vCPC->clie_fk = $vclie_fk;
                    $vCPC->clde_fk = $vclde_fk;
                    $vCPC->pash_fk = $vpash_fk;
                    $vCPC->bocu_fk = $vbocu_fk;
                    $vCPC->clpa_amount = $vclpa_amount;
                    $vCPC->clpa_reference = $vclpa_reference;
                    $vCPC->save();

                    //Asignación de PK Pago Cliente
                    $vclpa_pk = $vCPC->clpa_pk;

                    //////////////////  Inserción de Log  //////////////////
                    $this->getstorelog('client_payments', $vclpa_pk, 1);


                    //Validar montos para cambio de estatus
                    $vpayment_total_finaly = $vpayment_total + $vclpa_amount; //Monto total de pagos

                    if($vpayment_total_finaly == $vclde_amount)
                    {
                        //Modificar Estatus Deuda
                        DB::table('client_debts')
                        ->where('clde_pk', '=', $vclde_fk)
                        ->update(['clde_status' =>  2]);

                        //////////////////  Inserción de Log  //////////////////
                        $this->getstorelog('client_debts', $vclde_fk, 2);

                        //Modificar Estatus Venta
                        DB::table('client_sales')
                        ->where('clsa_pk', '=', $vClientDebt->clsa_fk)
                        ->update(['clsa_status' =>  3]);

                        //////////////////  Inserción de Log  //////////////////
                        $this->getstorelog('client_sales', $vClientDebt->clsa_fk, 2);
                    }

                    return response()->json([
                        'code' => 200,
                        'success' => true,
                        'message' => 'Pago Guardado Correctamente',
                        'data' =>  $vclpa_pk

                    ], 200);

                }
                else
                {
                    return response()->json([
                        'code' => 500,
                        'success' => false,
                        'message' => 'Monto de Pago es mayor que la deuda'
                    ], 200);

                }
            }
            else
            {
                return response()->json([
                    'code' => 404,
                    'success' => false,
                    'message' => 'Deuda No Encontrada'
         
                ], 200);
            }

        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => "Detalle Interno, informar al Administrador del Sistema.",
                'technicaldetail' => $e->getMessage()

            ], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ClientPayment  $clientPayment
     * @return \Illuminate\Http\Response
     */
    public function show(int $clde_fk)
    {
        try {
            $vCPSel = DB::table('client_payments AS CP')
                ->join('clients AS C', 'C.clie_pk', '=', 'CP.clie_fk')
                ->join('client_debts AS CD', 'CD.clde_pk', '=', 'CP.clde_fk')
                ->join('payment_shapes AS PS', 'PS.pash_Pk', '=', 'CP.pash_fk')
                ->select(
                    'CP.clpa_pk',
                    'CP.clpa_amount',
                    'CP.clpa_reference',
                    'CP.created_at',

                    'PS.pash_pk',        
                    'PS.pash_name', 
                    
                    'C.clie_pk',
                    'C.clie_identifier',
                    'C.clie_name',
                    'C.clie_rfc',

                    'CD.clde_pk'
                )
                ->where('CP.clpa_status', '=', 1)
                ->where('CP.clde_fk', '=', $clde_fk)
                ->get();

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Pagos de cliente filtrado por Deuda',
                'data' =>  $vCPSel
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
     * Show the form for editing the specified resource.
     *
     * @param  \App\ClientPayment  $clientPayment
     * @return \Illuminate\Http\Response
     */
    public function edit(ClientPayment $clientPayment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ClientPayment  $clientPayment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClientPayment $clientPayment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ClientPayment  $clientPayment
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClientPayment $clientPayment)
    {
        //
    }




    public function printreport($clpa_pk)
    {
        try {
            //Asignacion de variables
        $vclpa_pk = $clpa_pk;


        if ($vclpa_pk == '' || $vclpa_pk == 0) {
            return $this->dbResponse(null, 500, null, 'PK Obligatorio');
        }

        $vCPSel = DB::table('client_payments AS CP')
        ->join('clients AS C', 'C.clie_pk', '=', 'CP.clie_fk')
        ->join('client_debts AS CD', 'CD.clde_pk', '=', 'CP.clde_fk')
        ->join('payment_shapes AS PS', 'PS.pash_Pk', '=', 'CP.pash_fk')
        ->join('client_sales AS CS', 'CS.clsa_pk', '=', 'CD.clsa_fk')
        ->join('stores AS S', 'S.stor_pk', '=', 'CS.stor_fk')
        ->select(
            'CP.clpa_pk',
            'CP.clpa_amount',
            'CP.clpa_reference',
            DB::raw("CP.created_at  AS created_at_pay"),

            'PS.pash_pk',        
            'PS.pash_name', 
            
            'C.clie_pk',
            'C.clie_identifier',
            'C.clie_name',
            'C.clie_rfc',

            'CD.clde_pk',
            DB::raw("CD.created_at  AS created_at_debt"),
            'S.stor_pk',
            'S.stor_name',
            'S.stor_rfc',
            'S.stor_addres',
            'S.stor_phone',

            'CS.clsa_identifier',

            'CD.clde_pk',
            'CD.clde_amount',  //Monto de la deuda
            DB::raw('(SELECT IFNULL(SUM(clpa_amount), 0) AS clde_amount_paid FROM client_payments WHERE clde_fk = CD.clde_pk) AS clde_amount_paid'), //Monto Pagado
            DB::raw('(SELECT CD.clde_amount - IFNULL(SUM(clpa_amount), 0) AS clde_amount_outstanding FROM client_payments WHERE clde_fk = CD.clde_pk) AS clde_amount_outstanding'), //Monto Pendiente por pagar
            DB::raw('(CASE 
                WHEN CD.clde_status = 1 THEN "Activo" 
                WHEN CD.clde_status = 2 THEN "Pagado" 
                ELSE "" END) AS clde_status_description'), 

        )
        ->where('CP.clpa_status', '=', 1)
        ->where('CP.clpa_pk', '=', $vclpa_pk)
        ->first();
    
            
                   
               

        $pdf = new FpdfJs($orientation = 'P', $unit = 'mm', 'Letter');
        //$pdf->SetMargins(10, 2, 2,0);
        $pdf->SetMargins(10, 20);
        $pdf->AddPage();
        $pdf->SetFont('Arial', 'B', 8);    //Letra Arial, negrita (Bold), tam. 20
        $pdf->Image(config('app.url') . '/images/bg.png', 3, 2, 210);
        $pdf->Image(config('app.url') . '/images/logo_chocoplastic.png', 15, 10, 60);
        
            
        $lineHeigth = 2;                
        $pdf->Ln(20);
        // Número de página
        
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(10, $lineHeigth, 'RFC:', '', '0', 'L');
        
        $pdf->SetFont('Arial', '', 10);                
        $pdf->Cell(5, $lineHeigth, utf8_decode($vCPSel->stor_rfc), '', '0', 'L');
        
        $pdf->Ln(4);
        
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(30, $lineHeigth, 'Domicilio Fiscal:', '', '0', 'L');
        
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(5, $lineHeigth, utf8_decode($vCPSel->stor_addres), '', '0', 'L');
        
        $pdf->Ln(6);
        
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(210, $lineHeigth, utf8_decode($vCPSel->stor_name), '', '1', 'C');
        
        $pdf->Ln(6);
    

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, $lineHeigth, 'Tipo de Pago:', '', '0', 'L');
        $pdf->SetFont('Arial', '', 12);                
        $pdf->Cell(5, $lineHeigth,'Abono del Cliente', '', '0', 'L');
        $pdf->Ln(7);

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, $lineHeigth, 'Fecha de Venta: ', '', '0', 'L');
        $pdf->SetFont('Arial', '', 12);                
        $pdf->Cell(5, $lineHeigth, utf8_decode(date('d/m/Y h:i a', strtotime($vCPSel->created_at_debt))) , '', '0', 'L');
        $pdf->Ln(7);

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, $lineHeigth, utf8_decode('Número de Venta: '), '', '0', 'L');
        $pdf->SetFont('Arial', '', 12);                
        $pdf->Cell(5, $lineHeigth, utf8_decode($vCPSel->clsa_identifier), '', '0', 'L');
        $pdf->Ln(7);

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, $lineHeigth, 'Cliente:', '', '0', 'L');
        $pdf->SetFont('Arial', '', 12);                
        $pdf->Cell(5, $lineHeigth, utf8_decode($vCPSel->clie_name), '', '0', 'L');
        $pdf->Ln(7);

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, $lineHeigth, 'Fecha de Pago:', '', '0', 'L');
        $pdf->SetFont('Arial', '', 12);                
        $pdf->Cell(5, $lineHeigth,  utf8_decode(date('d/m/Y h:i a', strtotime($vCPSel->created_at_pay))), '', '0', 'L');
        $pdf->Ln(7);

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, $lineHeigth, 'Forma de Pago:', '', '0', 'L');
        $pdf->SetFont('Arial', '', 12);                
        $pdf->Cell(5, $lineHeigth, utf8_decode($vCPSel->pash_name), '', '0', 'L');
        $pdf->Ln(7);

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, $lineHeigth, 'Monto Abonado:', '', '0', 'L');
        $pdf->SetFont('Arial', 'B', 12);                
        $pdf->Cell(5, $lineHeigth, '$' . utf8_decode(number_format($vCPSel->clpa_amount, 2)), '', '0', 'L');
        $pdf->Ln(7);

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, $lineHeigth, 'Monto Total:', '', '0', 'L');
        $pdf->SetFont('Arial', '', 12);                
        $pdf->Cell(5, $lineHeigth, '$' . utf8_decode(number_format($vCPSel->clde_amount, 2)), '', '0', 'L');
        $pdf->Ln(7);

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, $lineHeigth, 'Monto Pagado:', '', '0', 'L');
        $pdf->SetFont('Arial', '', 12);                
        $pdf->Cell(5, $lineHeigth, '$' . utf8_decode(number_format($vCPSel->clde_amount_paid, 2)), '', '0', 'L');
        $pdf->Ln(7);

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, $lineHeigth, 'Monto Pendiente:', '', '0', 'L');
        $pdf->SetFont('Arial', '', 12);                
        $pdf->Cell(5, $lineHeigth, '$' . utf8_decode(number_format($vCPSel->clde_amount_outstanding, 2)), '', '0', 'L');
        $pdf->Ln(6);

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, $lineHeigth, 'Referencia:', '', '0', 'L');
        $pdf->SetFont('Arial', '', 12);                
        $pdf->Cell(5, $lineHeigth, utf8_decode($vCPSel->clpa_reference), '', '0', 'L');
        $pdf->Ln(7);

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(40, $lineHeigth, 'Estatus Cuenta:', '', '0', 'L');
        $pdf->SetFont('Arial', '', 12);                
        $pdf->Cell(5, $lineHeigth, utf8_decode($vCPSel->clde_status_description), '', '0', 'L');
        $pdf->Ln(7);


        $pdf->Ln(20);                
        $pdf->Cell(180, $lineHeigth, utf8_decode(('_____________________________________________' )), '0', '0', 'C');  
        $pdf->Ln(5);
        $pdf->Cell(180, $lineHeigth, utf8_decode(('Nombre y firma' )), '0', '0', 'C');                

        $pdf->SetAutoPageBreak(false);
        $pdf->SetY(-15);
        $pdf->SetX(7);
        $pdf->SetDrawColor(0,80,180);   
        $pdf->SetFillColor(250,70,51);
        $pdf->Cell(200,1,utf8_decode(' '),0,1,'C', true);
        $pdf->SetX(7);
        $pdf->SetFillColor(255,219,216);
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(200,8,utf8_decode($vCPSel->stor_name . ' TEL.' . $vCPSel->stor_phone),0,1,'C', true);
        ob_get_clean();
        $pdf->output('I', 'ticket', 'true');

        } catch (\Throwable $vTh) {
            return  $vTh->getMessage();
        }
        
            
    }

}
