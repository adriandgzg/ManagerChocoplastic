<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Throwable;
use App\System;
use Illuminate\Http\Request;
use App\ProviderPurchaseOrder;
use App\Http\Controllers\api\ApiResponseController;

class ProviderPurchaseOrderController extends ApiResponseController 
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $vPPO = DB::table('provider_purchase_orders AS PPO')
                ->leftjoin('providers AS P', 'P.prov_pk', '=', 'PPO.prov_fk')
                ->leftjoin('stores AS S', 'S.stor_pk', '=', 'PPO.stor_fk')
                ->select(
                    'PPO.prpo_pk',
                    'PPO.prpo_identifier',
                    'PPO.created_at',
                    'PPO.prpo_status',
                    DB::raw('(CASE 
                    WHEN PPO.prpo_status = 0 THEN "Cancelado" 
                    WHEN PPO.prpo_status = 1 THEN "Pendiente" 
                    WHEN PPO.prpo_status = 2 THEN "Finalizado" 
                    WHEN PPO.prpo_status = 3 THEN "Procesado" 
                    ELSE "" END) AS prpo_status_description'),

                    'P.prov_pk',
                    'P.prov_identifier',
                    'P.prov_name',
                    'P.prov_rfc',

                    'S.stor_pk',
                    'S.stor_name'
                )
                ->where('PPO.prpo_status', '<>', 0)
                ->orderByDesc('PPO.prpo_pk')
                ->get();
            
            return $this->dbResponse($vPPO, 200, null, 'Lista de Ordenes de Compra de Proveedor');
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
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
    public function store(Request $r)
    {
        try 
        {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prpo_pk' => 'required|int', //PK Orden Compra 
                'prov_fk' => 'required|int', //PK Proveedor
                'stor_fk' => 'required|int', //PK Sucursal
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprpo_pk = $vInput['prpo_pk'];
            $vprov_fk = $vInput['prov_fk'];
            $vstor_fk = $vInput['stor_fk'];

            //Buscar el folio consecutivo
            $vSystem = System::select('syst_prov_order')->first();
            $vsyst_prov_order = $vSystem->syst_prov_order;
            $vprpo_identifier =  "POC_" . $vsyst_prov_order;

            //Validar Si Existe Orden de Compra
            $vPPO = ProviderPurchaseOrder::where('prpo_pk', '=', $vprpo_pk)->first();
            if ($vPPO) 
            {
                //Modificar Orden de Compra 
                $vPPOU = ProviderPurchaseOrder::find($vprpo_pk);
                $vPPOU->prov_fk = $vprov_fk;
                $vPPOU->stor_fk = $vstor_fk;
                $vPPOU->prpo_identifier = $vprpo_identifier;
                $vPPOU->prpo_status = 2;
                $vPPOU->save();

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('provider_purchase_orders', $vprpo_pk, 2);

                //Modificar Folio de la Orden de Compra del Proveedor
                DB::table('systems')
                ->update(['syst_prov_order' =>  $vsyst_prov_order + 1]);
                    
                return $this->dbResponse($vprpo_pk, 200, null, 'Orden Compra Guardado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Orden Compra NO Encontrado');
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
     * @param  \App\ProviderPurchaseOrder  $providerPurchaseOrder
     * @return \Illuminate\Http\Response
     */
    public function show($prpo_pk)
    {
        try 
        {
            //Consultar Tabla de Configuración
            $vSys = DB::table('systems AS S')->select('S.syst_iva','S.syst_ieps')->first();

            //Consultar Tabla Principal (Orden de Compra)
            $vPPO = DB::table('provider_purchase_orders AS PPO')
                ->leftjoin('providers AS P', 'P.prov_pk', '=', 'PPO.prov_fk')
                ->leftjoin('stores AS S', 'S.stor_pk', '=', 'PPO.stor_fk')
                ->select(
                    'PPO.prpo_pk',
                    'PPO.prpo_identifier',
                    'PPO.prpo_status',
                    'PPO.created_at',

                    'P.prov_identifier',
                    'P.prov_name',
                    'P.prov_rfc',

                    'S.stor_name'
                )
                ->where('PPO.prpo_pk', '=', $prpo_pk)
                ->first();

            //Consultar Tabla Detallada (Orden de Compra || Productos)
            $vPPOD = DB::table('provider_purchase_order_details AS PPOD')
                ->join('products AS P', 'P.prod_pk', '=', 'PPOD.prod_fk')
                ->join('measurements AS M', 'M.meas_pk', '=', 'PPOD.meas_fk')
                ->select(
                    'PPOD.ppod_pk',
                    'PPOD.created_at',
                    'PPOD.ppod_quantity',
                    'PPOD.ppod_providerprice',
                    'PPOD.ppod_discountrate',
                    'PPOD.ppod_ieps',
                    'PPOD.ppod_iva',

                    'P.prod_pk',
                    'P.prod_identifier',
                    'P.prod_name',
                    'P.prod_description',
                    'P.prod_iva',
                    'P.prod_ieps',

                    'M.meas_name',

                    DB::raw("$vSys->syst_iva AS syst_iva"),
                    DB::raw("$vSys->syst_ieps AS syst_ieps")

                )
                ->where('PPOD.prpo_fk', '=', $prpo_pk)
                ->where('PPOD.ppod_status', '=', 1)
                ->get();

            $vData = 
            [
                'provider_purchase_orders' => $vPPO, 
                'provider_purchase_order_details' => $vPPOD
            ];
            
            return $this->dbResponse($vData, 200, null, 'Orden de Compra de Proveedor');
          
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProviderPurchaseOrder  $providerPurchaseOrder
     * @return \Illuminate\Http\Response
     */
    public function edit(ProviderPurchaseOrder $providerPurchaseOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProviderPurchaseOrder  $providerPurchaseOrder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $r)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProviderPurchaseOrder  $providerPurchaseOrder
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r)
    {
        try 
        {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prpo_pk' => 'required|int' //PK Orden Compra 
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprpo_pk = $vInput['prpo_pk'];

            //Validar Si Existe Orden de Compra
            $vPPO = ProviderPurchaseOrder::where('prpo_pk', '=', $vprpo_pk)->first();
            if ($vPPO) 
            {
                //Eliminar Orden de Compra Detalle
                $vPPOU = ProviderPurchaseOrder::find($vprpo_pk);
                $vPPOU->prpo_status = 0;
                $vPPOU->save();

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('provider_purchase_orders', $vprpo_pk, 3);
                    
                return $this->dbResponse($vprpo_pk, 200, null, 'Orden Compra Eliminado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Orden Compra NO Encontrado');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }
}
