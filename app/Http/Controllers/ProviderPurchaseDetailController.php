<?php

namespace App\Http\Controllers;

use DB;
use Validator;
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
            'prpd_quantity' => 'required|int', //Cantidad
            'prpd_price' => 'required', //Precio
            'prpd_discountrate' => 'required' //% Descuento
        ]);

        if ($vVal->fails()) {
            return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
        }

        try {
            //Asignacion de variables
            $vprpu_pk = $vInput['prpu_pk'];
            $vprov_fk = $vInput['prov_fk'];
            $vstor_fk = $vInput['stor_fk'];
            $vprod_fk = $vInput['prod_fk'];
            $vprpd_quantity = $vInput['prpd_quantity'];
            $vprpd_price = $vInput['prpd_price'];
            $vprpd_discountrate = $vInput['prpd_discountrate'];

            if ($vprpu_pk == 0) {
                //Insersión de la tabla principal (Compra del Proveedor)
                $vPP = new ProviderPurchase();
                $vPP->prov_fk = $vprov_fk;
                $vPP->stor_fk = $vstor_fk;
                $vPP->prpu_status = 1;
                $vPP->prpu_type = 2;
                $vPP->save();

                //Asignación de PK de la Compra del Proveedor
                $vprpu_pk = $vPP->prpu_pk; 
            } 

            $vProd = Product::where('prod_pk', '=', $vprod_fk)->first();

            //Insersión Artículos de la Orden de Compra del Proveedor
            $vPPD = new ProviderPurchaseDetail();
            $vPPD->prpu_fk = $vprpu_pk;
            $vPPD->prod_fk = $vprod_fk;
            $vPPD->meas_fk = $vProd->meas_fk_input;
            $vPPD->prpd_quantity = $vprpd_quantity;
            $vPPD->prpd_price = $vprpd_price;
            $vPPD->prpd_discountrate = $vprpd_discountrate;
            $vPPD->prpd_ieps = 0;
            $vPPD->prpd_iva = 0;
            $vPPD->save();
            
            return $this->dbResponse($vprpu_pk, 200, null, 'PC Detalle Guardado Correctamente');

        } catch (\Throwable $th) {
            //return $th;
            return $this->dbResponse(null, 500, $th, null);
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
                'prpd_pk' => 'required|int', //PK Compra Detalle
                'prpd_quantity' => 'required|int', //Cantidad
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
                
                return $this->dbResponse(null, 200, null, 'Compra Detalle Modificado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Compra Detalle NO Encontrado');
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
                
                return $this->dbResponse(null, 200, null, 'Compra Detalle Eliminado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Compra Detalle NO Encontrado');
            }
        } 
        catch (\Throwable $th) 
        {
            return $this->dbResponse(null, 500, $th, null);
        }
        
    }
}
