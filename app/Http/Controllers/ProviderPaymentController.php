<?php

namespace App\Http\Controllers;

use DB;
use Throwable;
use Validator;
use App\ProviderDebt;
use App\ProviderPayment;
use App\Helpers\FpdfJs;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;

class ProviderPaymentController extends ApiResponseController
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

        $vVal = Validator::make($vInput, [
            'prde_fk' => 'required', //PK Proveedor Deuda
            'prov_fk' => 'required', //PK Proveedor
            'pash_fk' => 'required', //PK Forma de Pago
            'prpa_amount' => 'required', //Monto
        ]);

        if ($vVal->fails()) {
            return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
        }

        try {
            //Asignacion de variables
           $vprde_fk = $vInput['prde_fk'];
           $vprov_fk = $vInput['prov_fk'];
           $vpash_fk = $vInput['pash_fk'];
           $vprpa_amount = $vInput['prpa_amount'];
           $vprpa_reference = $vInput['prpa_reference'];

            $vProvDebt = ProviderDebt::where('prde_pk', '=', $vprde_fk)->where('prde_status', '=', 1)->first();

            if($vProvDebt)
            { 
                //Busqueda de montos
                $vprde_amount = $vProvDebt->prde_amount; //Montos total de deuda
                $vpayment_total = ProviderPayment::where('prde_fk', '=', $vprde_fk)->where('prpa_status', '=', 1)->sum('prpa_amount'); //Monto total de pagos

                $vdebt_total =  $vprde_amount - $vpayment_total;

                //Validar que el monto pendiente de la deuda sea mayor o igual que el pago
                if($vprpa_amount <= $vdebt_total)
                {
                    //Insertar Pago del Proveedor
                    $vPP = new ProviderPayment();        
                    $vPP->prov_fk = $vprov_fk;
                    $vPP->prde_fk = $vprde_fk;
                    $vPP->pash_fk = $vpash_fk;
                    $vPP->prpa_amount = $vprpa_amount;
                    $vPP->prpa_reference = $vprpa_reference;
                    $vPP->save();

                    //Asignación de PK de Pago Proveedor
                    $vprpa_pk = $vPP->prpa_pk;

                    //////////////////  Inserción de Log  //////////////////
                    $this->getstorelog('provider_payments', $vprpa_pk, 1);

                    //Validar montos para cambio de estatus
                    $vpayment_total_finaly = $vpayment_total + $vprpa_amount; //Monto total de pagos

                    if($vpayment_total_finaly == $vprde_amount)
                    {
                        //Modificar Estatus Deuda
                        DB::table('provider_debts')
                        ->where('prde_pk', '=', $vprde_fk)
                        ->update(['prde_status' =>  2]);

                        //////////////////  Inserción de Log  //////////////////
                        $this->getstorelog('provider_debts', $vprde_fk, 2);


                        //Modificar Estatus Compra
                        DB::table('provider_purchases')
                        ->where('prpu_pk', '=', $vProvDebt->prpu_fk)
                        ->update(['prpu_status' =>  3]);

                        //////////////////  Inserción de Log  //////////////////
                        $this->getstorelog('provider_purchases', $vProvDebt->prpu_fk, 2);
                    }
                    return $this->dbResponse($vprpa_pk, 200, null, 'Pago Guardado Correctamente');
                }
                else
                {
                    return $this->dbResponse(null, 500, null, 'Monto de Pago es mayor que la deuda');
                }
               
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Deuda NO Encontrada');
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
     * @param  \App\ProviderPayment  $providerPayment
     * @return \Illuminate\Http\Response
     */
    public function show(int $prde_fk)
    {
        try {
            $vCPayments = DB::table('provider_payments AS PP')
                ->join('providers AS P', 'P.prov_pk', '=', 'PP.prov_fk')
                ->join('provider_debts AS PD', 'PD.prde_pk', '=', 'PP.prde_fk')
                ->join('payment_shapes AS PS', 'PS.pash_Pk', '=', 'PP.pash_fk')
                ->select(
                    'PP.prpa_pk',
                    'PP.prpa_amount',
                    'PP.prpa_reference',
                    'PP.created_at',

                    'PS.pash_pk',        
                    'PS.pash_name', 
                    
                    'P.prov_pk',
                    'P.prov_identifier',
                    'P.prov_name',
                    'P.prov_rfc',

                    'PD.prde_pk'
                )
                ->where('PP.prpa_status', '=', 1)
                ->where('PP.prde_fk', '=', $prde_fk)
                ->orderByDesc('PP.prpa_pk')
                ->get();

            return $this->dbResponse($vCPayments, 200, null, 'Pagos de Proveedor filtrado por Deuda');
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProviderPayment  $providerPayment
     * @return \Illuminate\Http\Response
     */
    public function edit(ProviderPayment $providerPayment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProviderPayment  $providerPayment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProviderPayment $providerPayment)
    {
        //
    } 

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProviderPayment  $providerPayment
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProviderPayment $providerPayment)
    {
        //
    }



    public function printreport($prpa_pk)
    {
        try  
        {
            //Asignacion de variables
            $vprpa_pk = $prpa_pk;


            if ($vprpa_pk == '' || $vprpa_pk == 0) {
                return $this->dbResponse(null, 500, null, 'PK Obligatorio');
            }

            $vCPSel = DB::table('provider_payments AS PP')
            ->join('providers AS P', 'P.prov_pk', '=', 'PP.prov_fk')
            ->join('provider_debts AS PD', 'PD.prde_pk', '=', 'PP.prde_fk')
            ->join('payment_shapes AS PS', 'PS.pash_Pk', '=', 'PP.pash_fk')
            ->join('provider_purchases AS PPU', 'PPU.prpu_pk', '=', 'PD.prpu_fk')
            ->join('stores AS S', 'S.stor_pk', '=', 'PPU.stor_fk')
            ->select(
                'PP.prpa_pk',
                'PP.prpa_amount',
                'PP.prpa_reference',
                DB::raw("PP.created_at  AS created_at_pay"),

                'PS.pash_pk',        
                'PS.pash_name', 
                
                'P.prov_pk',
                'P.prov_identifier',
                'P.prov_name',
                'P.prov_rfc',


                'S.stor_pk',
                'S.stor_name',
                'S.stor_rfc',
                'S.stor_addres',
                'S.stor_phone',

                'PPU.prpu_identifier',     

                'PD.prde_pk',
                'PD.prde_amount',  //Monto de la deuda
                DB::raw('(SELECT IFNULL(SUM(prpa_amount), 0) AS prde_amount_paid FROM provider_payments WHERE prde_fk = PD.prde_pk) AS prde_amount_paid'),//Monto Pagado
                DB::raw('(SELECT PD.prde_amount - IFNULL(SUM(prpa_amount), 0) AS prde_amount_outstanding FROM provider_payments WHERE prde_fk = PD.prde_pk) AS prde_amount_outstanding'), //Monto Pendiente por pagar
                DB::raw('(CASE 
                    WHEN PD.prde_status = 1 THEN "Activo" 
                    WHEN PD.prde_status = 2 THEN "Pagado" 
                    ELSE "" END) AS prde_status_description'),
                DB::raw("PD.created_at  AS created_at_debt")

            )
            ->where('PP.prpa_status', '=', 1)
            ->where('PP.prpa_pk', '=', $vprpa_pk)
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
            $pdf->Cell(45, $lineHeigth, 'Tipo de Pago:', '', '0', 'L');
            $pdf->SetFont('Arial', '', 12);                
            $pdf->Cell(5, $lineHeigth,'Abono al Proveedor', '', '0', 'L');
            $pdf->Ln(7);

            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(45, $lineHeigth, 'Fecha de Compra: ', '', '0', 'L');
            $pdf->SetFont('Arial', '', 12);                
            $pdf->Cell(5, $lineHeigth, utf8_decode(date('d/m/Y h:i a', strtotime($vCPSel->created_at_debt))) , '', '0', 'L');
            $pdf->Ln(7);

            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(45, $lineHeigth, utf8_decode('Número de Compra: '), '', '0', 'L');
            $pdf->SetFont('Arial', '', 12);                
            $pdf->Cell(5, $lineHeigth, utf8_decode($vCPSel->prpu_identifier), '', '0', 'L');
            $pdf->Ln(7);

            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(45, $lineHeigth, 'Proveedor:', '', '0', 'L');
            $pdf->SetFont('Arial', '', 12);                
            $pdf->Cell(5, $lineHeigth, utf8_decode($vCPSel->prov_name), '', '0', 'L');
            $pdf->Ln(7);

            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(45, $lineHeigth, 'Fecha de Pago:', '', '0', 'L');
            $pdf->SetFont('Arial', '', 12);                
            $pdf->Cell(5, $lineHeigth,  utf8_decode(date('d/m/Y h:i a', strtotime($vCPSel->created_at_pay))), '', '0', 'L');
            $pdf->Ln(7);

            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(45, $lineHeigth, 'Forma de Pago:', '', '0', 'L');
            $pdf->SetFont('Arial', '', 12);                
            $pdf->Cell(5, $lineHeigth, utf8_decode($vCPSel->pash_name), '', '0', 'L');
            $pdf->Ln(7);

            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(45, $lineHeigth, 'Monto Abonado:', '', '0', 'L');
            $pdf->SetFont('Arial', 'B', 12);                
            $pdf->Cell(5, $lineHeigth, '$' . utf8_decode(number_format($vCPSel->prpa_amount, 2)), '', '0', 'L');
            $pdf->Ln(7);

            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(45, $lineHeigth, 'Monto Total:', '', '0', 'L');
            $pdf->SetFont('Arial', '', 12);                
            $pdf->Cell(5, $lineHeigth, '$' . utf8_decode(number_format($vCPSel->prde_amount, 2)), '', '0', 'L');
            $pdf->Ln(7);

            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(45, $lineHeigth, 'Monto Pagado:', '', '0', 'L');
            $pdf->SetFont('Arial', '', 12);                
            $pdf->Cell(5, $lineHeigth, '$' . utf8_decode(number_format($vCPSel->prde_amount_paid, 2)), '', '0', 'L');
            $pdf->Ln(7);

            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(45, $lineHeigth, 'Monto Pendiente:', '', '0', 'L');
            $pdf->SetFont('Arial', '', 12);                
            $pdf->Cell(5, $lineHeigth, '$' . utf8_decode(number_format($vCPSel->prde_amount_outstanding, 2)), '', '0', 'L');
            $pdf->Ln(6);

            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(45, $lineHeigth, 'Referencia:', '', '0', 'L');
            $pdf->SetFont('Arial', '', 12);                
            $pdf->Cell(5, $lineHeigth, utf8_decode($vCPSel->prpa_reference), '', '0', 'L');
            $pdf->Ln(7);

            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(45, $lineHeigth, 'Estatus Cuenta:', '', '0', 'L');
            $pdf->SetFont('Arial', '', 12);                
            $pdf->Cell(5, $lineHeigth, utf8_decode($vCPSel->prde_status_description), '', '0', 'L');
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
