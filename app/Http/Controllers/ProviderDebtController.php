<?php

namespace App\Http\Controllers;

use DB;
use Throwable;
use Validator;
use App\ProviderDebt;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;
 
class ProviderDebtController extends ApiResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $vProvDebts = DB::table('provider_debts AS PD')
                ->join('providers AS P', 'P.prov_pk', '=', 'PD.prov_fk')
                ->join('provider_purchases AS PP', 'PP.prpu_pk', '=', 'PD.prpu_fk')
                ->select(
                    'PD.prde_pk',
                    'PD.prde_amount',  //Monto de la deuda
                    DB::raw('(SELECT IFNULL(SUM(prpa_amount), 0) AS prde_amount_paid FROM provider_payments WHERE prde_fk = PD.prde_pk) AS prde_amount_paid'),//Monto Pagado
                    DB::raw('(SELECT PD.prde_amount - IFNULL(SUM(prpa_amount), 0) AS prde_amount_outstanding FROM provider_payments WHERE prde_fk = PD.prde_pk) AS prde_amount_outstanding'), //Monto Pendiente por pagar
                    'PD.created_at',
                    'P.prov_pk',
                    'P.prov_identifier',
                    'P.prov_name',
                    'P.prov_rfc',
                    'PP.prpu_identifier'       
                )
                ->where('PD.prde_status', '=', 1)
                ->get();

                return $this->dbResponse($vProvDebts, 200, null, 'Lista de Deudas del Proveedor');
            
        } catch (Throwable $vTh) {
            return $this->dbResponse(null, 500, $vTh, "Detalle");
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProviderDebt  $providerDebt
     * @return \Illuminate\Http\Response
     */
    public function show(ProviderDebt $providerDebt)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProviderDebt  $providerDebt
     * @return \Illuminate\Http\Response
     */
    public function edit(ProviderDebt $providerDebt)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProviderDebt  $providerDebt
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProviderDebt $providerDebt)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProviderDebt  $providerDebt
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProviderDebt $providerDebt)
    {
        //
    }
}
