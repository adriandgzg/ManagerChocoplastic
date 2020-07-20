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

            $vProvDebt = ProviderDebt::where('prde_pk', '=', $vprde_fk)->first();

            if($vProvDebt)
            { 
                //Insertar Pago del Proveedor
                $vPP = new ProviderPayment();        
                $vPP->prov_fk = $vprov_fk;
                $vPP->prde_fk = $vprde_fk;
                $vPP->prde_fk = $vprde_fk;
                $vPP->pash_fk = $vpash_fk;
                $vPP->prpa_amount = $vprpa_amount;
                $vPP->save();
               
                return $this->dbResponse(null, 200, null, 'Pago Guardado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Deuda NO Encontrada');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, "Error || Consultar con el Administrador del Sistema");
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
            return $this->dbResponse(null, 500, $vTh, "Error || Consultar con el Administrador del Sistema");
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
