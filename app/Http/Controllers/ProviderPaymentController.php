<?php

namespace App\Http\Controllers;

use DB;
use Throwable;
use Validator;

use App\ProviderDebt;
use App\ProviderPayment;
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
                    return $this->dbResponse(null, 200, null, 'Pago Guardado Correctamente');
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
}
