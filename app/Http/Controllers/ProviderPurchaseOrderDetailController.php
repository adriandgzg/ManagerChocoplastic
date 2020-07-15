<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use App\System;
use App\Product;
use Illuminate\Http\Request;
use App\ProviderPurchaseOrder;
use App\ProviderPurchaseOrderDetail;
use App\Http\Controllers\api\ApiResponseController;


class ProviderPurchaseOrderDetailController extends ApiResponseController
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
        try {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prpo_fk' => 'required|int', //PK Orden Compra
                'prod_fk' => 'required|int', //PK Producto
                'ppod_quantity' => 'required|int', //Cantidad
                'ppod_providerprice' => 'required', //Precio
                'ppod_discountrate' => 'required' //% Descuento
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprpo_fk = $vInput['prpo_fk'];
            $vprod_fk = $vInput['prod_fk'];
            $vppod_quantity = $vInput['ppod_quantity'];
            $vppod_providerprice = $vInput['ppod_providerprice'];
            $vppod_discountrate = $vInput['ppod_discountrate'];

            if ($vprpo_fk == 0) {
                //Insersión de la tabla principal (Orden de Compra del Proveedor)
                $vPPO = new ProviderPurchaseOrder();
                $vPPO->prov_fk = null;
                $vPPO->stor_fk = null;
                $vPPO->prpo_identifier = null;
                $vPPO->prpo_status = 1;
                $vPPO->save();

                //Asignación de PK de la Orden de Compra del Proveedor
                $vprpo_fk = $vPPO->prpo_pk;
            } 

            $vProd = Product::where('prod_pk', '=', $vprod_fk)->first();

            //Insersión Artículos de la Orden de Compra del Proveedor
            $vPPOD = new ProviderPurchaseOrderDetail();
            $vPPOD->prpo_fk = $vprpo_fk;
            $vPPOD->prod_fk = $vprod_fk;
            $vPPOD->meas_fk = $vProd->meas_fk_input;
            $vPPOD->ppod_quantity = $vppod_quantity;
            $vPPOD->ppod_actualprice = $vProd->prod_actualprice;
            $vPPOD->ppod_providerprice = $vppod_providerprice;
            $vPPOD->ppod_discountrate = $vppod_discountrate;
            $vPPOD->ppod_ieps = 0;
            $vPPOD->ppod_iva = 0;
            $vPPOD->save();
            
            return $this->dbResponse($vprpo_fk, 200, null, 'POC Detalle Guardado Correctamente');
        } 
        catch (\Throwable $th) 
        {
            return $this->dbResponse(null, 500, $th, null);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProviderPurchaseOrderDetail  $providerPurchaseOrderDetail
     * @return \Illuminate\Http\Response
     */
    public function show(ProviderPurchaseOrderDetail $providerPurchaseOrderDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProviderPurchaseOrderDetail  $providerPurchaseOrderDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(ProviderPurchaseOrderDetail $providerPurchaseOrderDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProviderPurchaseOrderDetail  $providerPurchaseOrderDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $r)
    {
        try {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'ppod_pk' => 'required|int', //PK Orden Compra Detalle
                'prod_fk' => 'required|int', //PK Producto
                'ppod_quantity' => 'required|int', //Cantidad
                'ppod_providerprice' => 'required', //Precio
                'ppod_discountrate' => 'required' //% Descuento
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vppod_pk = $vInput['ppod_pk'];
            $vprod_fk = $vInput['prod_fk'];
            $vppod_quantity = $vInput['ppod_quantity'];
            $vppod_providerprice = $vInput['ppod_providerprice'];
            $vppod_discountrate = $vInput['ppod_discountrate'];

            //Consultar información del Producto
            $vProd = Product::where('prod_pk', '=', $vprod_fk)->first();

            //Validar Si Existe Orden de Compra Detalle
            $vPPOD = ProviderPurchaseOrderDetail::where('ppod_pk', '=', $vppod_pk)->first();
            if ($vPPOD) 
            {
                //Modificar Orden de Compra Detalle
                $vPPODU = ProviderPurchaseOrderDetail::find($vppod_pk);
                $vPPODU->prod_fk = $vprod_fk;
                $vPPODU->meas_fk = $vProd->meas_fk_input;
                $vPPODU->ppod_quantity = $vppod_quantity;
                $vPPODU->ppod_actualprice = $vProd->prod_actualprice;
                $vPPODU->ppod_providerprice = $vppod_providerprice;
                $vPPODU->ppod_discountrate = $vppod_discountrate;
                $vPPODU->save();
                
                return $this->dbResponse(null, 200, null, 'Orden Compra Detalle Modificado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Orden Compra Detalle NO Encontrado');
            }
        } 
        catch (\Throwable $th) 
        {
            return $this->dbResponse(null, 500, $th, null);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProviderPurchaseOrderDetail  $providerPurchaseOrderDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r)
    {
        try {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'ppod_pk' => 'required|int' //PK Orden Compra Detalle
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vppod_pk = $vInput['ppod_pk'];


            //Validar Si Existe Orden de Compra Detalle
            $vPPOD = ProviderPurchaseOrderDetail::where('ppod_pk', '=', $vppod_pk)->first();
            if ($vPPOD) 
            {
                //Eliminar Orden de Compra Detalle
                $vPPODU = ProviderPurchaseOrderDetail::find($vppod_pk);
                $vPPODU->ppod_status = 0;
                $vPPODU->save();
                
                return $this->dbResponse(null, 200, null, 'Orden Compra Detalle Eliminado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Orden Compra Detalle NO Encontrado');
            }
        } 
        catch (\Throwable $th) 
        {
            return $this->dbResponse(null, 500, $th, null);
        }
    }
}
