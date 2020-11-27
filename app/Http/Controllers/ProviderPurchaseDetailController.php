<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Throwable;
use App\Product;
use App\ProviderPurchase;
use Illuminate\Http\Request;
use App\ProviderPurchaseDetail;
use App\Http\Controllers\api\ApiResponseController;

class ProviderPurchaseDetailController extends ApiResponseController
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
            'prpu_pk' => 'required|int', // PK Compra Proveedor
            'prov_fk' => 'required|int', // PK Proveedor
            'stor_fk' => 'required|int', // PK Sucursal
            'prod_fk' => 'required|int', // PK Producto
            'meas_fk' => 'required|int', // PK Unidad Medida
            'prpd_quantity' => 'required', //Cantidad
            'prpd_price' => 'required', //Precio
            'prpd_discountrate' => 'required', //% Descuento
            //'prpd_ieps' => 'required', //IEPS
            //'prpd_iva' => 'required' //IVA
        ]);

        if ($vVal->fails()) {
            return $this->dbResponse(null, 500, $vVal->errors(), $vVal->errors());
        }

        try {
            //Asignacion de variables
            $vprpu_pk = $vInput['prpu_pk'];
            $vprov_fk = $vInput['prov_fk'];
            $vstor_fk = $vInput['stor_fk'];
            $vprod_fk = $vInput['prod_fk'];
            $vmeas_fk = $vInput['meas_fk'];
            $vprpd_quantity = $vInput['prpd_quantity'];
            $vprpd_price = $vInput['prpd_price'];
            $vprpd_discountrate = $vInput['prpd_discountrate'];
            //$vprpd_ieps = $vInput['prpd_ieps'];
            //$vprpd_iva = $vInput['prpd_iva'];

            if ($vprpu_pk == 0) {
                //Inserción de la tabla principal (Compra del Proveedor)
                $vPP = new ProviderPurchase();
                $vPP->prov_fk = $vprov_fk;
                $vPP->stor_fk = $vstor_fk;
                $vPP->prpu_status = 1;
                $vPP->prpu_type = 2;
                $vPP->save();

                //Asignación de PK de la Compra del Proveedor
                $vprpu_pk = $vPP->prpu_pk; 

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('provider_purchases', $vprpu_pk, 1);
            } 

            //$vProd = Product::where('prod_pk', '=', $vprod_fk)->first();

            //Inserción Productos de la Orden de Compra del Proveedor
            $vPPD = new ProviderPurchaseDetail();
            $vPPD->prpu_fk = $vprpu_pk;
            $vPPD->prod_fk = $vprod_fk;
            $vPPD->meas_fk = $vmeas_fk;
            $vPPD->prpd_quantity = $vprpd_quantity;
            $vPPD->prpd_price = $vprpd_price;
            $vPPD->prpd_discountrate = $vprpd_discountrate;
            $vPPD->prpd_ieps = 0;
            $vPPD->prpd_iva = 0;
            $vPPD->save();

            //Asignación de PK de la Compra Detalle del Proveedor
            $vprpd_pk = $vPPD->prpd_pk; 

            //////////////////  Inserción de Log  //////////////////
            $this->getstorelog('provider_purchase_details', $vprpd_pk, 1);
            
            return $this->dbResponse($vprpu_pk, 200, null, 'PC Detalle Guardado Correctamente');

        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh->getMessage(), 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProviderPurchaseDetail  $providerPurchaseDetail
     * @return \Illuminate\Http\Response
     */
    public function show(ProviderPurchaseDetail $providerPurchaseDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProviderPurchaseDetail  $providerPurchaseDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(ProviderPurchaseDetail $providerPurchaseDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProviderPurchaseDetail  $providerPurchaseDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $r)
    {
        try {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prpd_pk' => 'required', //PK Compra Detalle
                'prpd_quantity' => 'required', //Cantidad
                'prpd_price' => 'required', //Precio
                'prpd_discountrate' => 'required' //% Descuento
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprpd_pk = $vInput['prpd_pk'];
            $vprpd_quantity = $vInput['prpd_quantity'];
            $vprpd_price = $vInput['prpd_price'];
            $vprpd_discountrate = $vInput['prpd_discountrate'];

            //Validar Si Existe Compra Detalle
            $vPPOD = ProviderPurchaseDetail::where('prpd_pk', '=', $vprpd_pk)->first();
            if ($vPPOD) 
            {
                //Modificar Compra Detalle
                $vPPDU = ProviderPurchaseDetail::find($vprpd_pk);
                $vPPDU->prpd_quantity = $vprpd_quantity;
                $vPPDU->prpd_price = $vprpd_price;
                $vPPDU->prpd_discountrate = $vprpd_discountrate;
                $vPPDU->save();

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('provider_purchase_details', $vprpd_pk, 2);
                
                return $this->dbResponse(null, 200, null, 'Compra Detalle Modificado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Compra Detalle NO Encontrado');
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
     * @param  \App\ProviderPurchaseDetail  $providerPurchaseDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r)
    {
        try {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prpd_pk' => 'required|int', //PK Compra Detalle
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprpd_pk = $vInput['prpd_pk'];

            //Validar Si Existe Compra Detalle
            $vPPOD = ProviderPurchaseDetail::where('prpd_pk', '=', $vprpd_pk)->first();
            if ($vPPOD) 
            {
                //Eliminar Compra Detalle
                $vPPDU = ProviderPurchaseDetail::find($vprpd_pk);
                $vPPDU->prpd_status = 0;
                $vPPDU->save();

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('provider_purchase_details', $vprpd_pk, 3);
                
                return $this->dbResponse(null, 200, null, 'Compra Detalle Eliminado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Compra Detalle NO Encontrado');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }
}
