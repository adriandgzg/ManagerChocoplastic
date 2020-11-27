<?php

namespace App\Http\Controllers;

use Throwable;
use Validator;
use App\Product;
use Illuminate\Http\Request;
use App\ProviderPurchaseOrder;
use App\ProviderPurchaseOrderDetail;
use Illuminate\Support\Facades\Auth;
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
                'meas_fk' => 'required|int', //PK Unidad Medida
                'ppod_quantity' => 'required', //Cantidad
                'ppod_providerprice' => 'required', //Precio
                'ppod_discountrate' => 'required', //% Descuento
                //'ppod_ieps' => 'required', //% Descuento
                //'ppod_iva' => 'required' //% Descuento
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprpo_fk = $vInput['prpo_fk'];
            $vprod_fk = $vInput['prod_fk'];
            $vmeas_fk = $vInput['meas_fk'];
            $vppod_quantity = $vInput['ppod_quantity'];
            $vppod_providerprice = $vInput['ppod_providerprice'];
            $vppod_discountrate = $vInput['ppod_discountrate'];
            //$vppod_ieps = $vInput['ppod_ieps'];
            //$vppod_iva = $vInput['ppod_iva'];

            if ($vprpo_fk == 0) {
                //Inserción de la tabla principal (Orden de Compra del Proveedor)
                $vPPO = new ProviderPurchaseOrder();
                $vPPO->prov_fk = null;
                $vPPO->stor_fk = null;
                $vPPO->prpo_identifier = null;
                $vPPO->prpo_status = 1;
                $vPPO->save();

                //Asignación de PK de la Orden de Compra del Proveedor
                $vprpo_fk = $vPPO->prpo_pk;

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('provider_purchase_orders', $vprpo_fk, 1);
            } 

            $vProd = Product::where('prod_pk', '=', $vprod_fk)->first();

            //Inserción Productos de la Orden de Compra del Proveedor
            $vPPOD = new ProviderPurchaseOrderDetail();
            $vPPOD->prpo_fk = $vprpo_fk;
            $vPPOD->prod_fk = $vprod_fk;
            $vPPOD->meas_fk = $vmeas_fk;
            $vPPOD->ppod_quantity = $vppod_quantity;
            $vPPOD->ppod_actualprice = $vProd->prod_actualprice;
            $vPPOD->ppod_providerprice = $vppod_providerprice;
            $vPPOD->ppod_discountrate = $vppod_discountrate;
            $vPPOD->ppod_ieps = 0;//$vppod_ieps;
            $vPPOD->ppod_iva = 0;//$vppod_iva;
            $vPPOD->save();

            //Asignación de PK de la Orden de Compra Detalle
            $vppod_pk = $vPPOD->ppod_pk;

            //////////////////  Inserción de Log  //////////////////
            $this->getstorelog('provider_purchase_order_details', $vppod_pk, 1);
            
            return $this->dbResponse($vprpo_fk, 200, null, 'POC Detalle Guardado Correctamente');
        
        } 
        catch (Throwable $vTh) {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
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
                'ppod_quantity' => 'required', //Cantidad
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

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('provider_purchase_order_details', $vppod_pk, 2);
                
                return $this->dbResponse(null, 200, null, 'Orden Compra Detalle Modificado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Orden Compra Detalle NO Encontrado');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
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
        try 
        {
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

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('provider_purchase_order_details', $vppod_pk, 3);
                
                return $this->dbResponse(null, 200, null, 'Orden Compra Detalle Eliminado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Orden Compra Detalle NO Encontrado');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

}
