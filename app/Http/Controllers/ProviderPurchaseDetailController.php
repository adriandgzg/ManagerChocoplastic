<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use App\ProviderPurchaseDetail;
use Illuminate\Http\Request;
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
    public function store(Request $request)
    {
        //
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
