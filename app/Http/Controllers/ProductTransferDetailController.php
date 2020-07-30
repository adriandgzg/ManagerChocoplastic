<?php

namespace App\Http\Controllers;

use DB;
use Throwable;
use Validator;
use App\ProductTransfer;
use Illuminate\Http\Request;
use App\ProductTransferDetail;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\api\ApiResponseController;

class ProductTransferDetailController extends ApiResponseController
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
        try 
        {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prtr_fk' => 'required|int', //PK Traspaso
                'prod_fk' => 'required|int', //PK Producto
                'prtd_quantity' => 'required|int', //Cantidad
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprtr_fk = $vInput['prtr_fk'];
            $vprod_fk = $vInput['prod_fk'];
            $vprtd_quantity = $vInput['prtd_quantity']; 

            //PK Sucursal Salida
            $vstor_fk_output = Auth::user()->store_id;

            if ($vprtr_fk == 0) {
                //Insersión de la tabla principal (Traspaso)
                $vPTI = new ProductTransfer();
                $vPTI->stor_fk_output = $vstor_fk_output;
                $vPTI->stor_fk_input = null;
                $vPTI->prtr_identifier = null;
                $vPTI->prtr_observation = null;
                $vPTI->prtr_status = 1;
                $vPTI->save();

                //Asignación de PK del Traspaso
                $vprtr_fk = $vPTI->prtr_pk;
            } 

            //Insersión Artículos del Traspaso
            $vPTDI = new ProductTransferDetail();
            $vPTDI->prtr_fk = $vprtr_fk;
            $vPTDI->prod_fk = $vprod_fk;
            $vPTDI->prtd_quantity = $vprtd_quantity;
            $vPTDI->save();
            
            return $this->dbResponse($vprtr_fk, 200, null, 'Traspaso Detalle Guardado Correctamente');
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProductTransferDetail  $productTransferDetail
     * @return \Illuminate\Http\Response
     */
    public function show(ProductTransferDetail $productTransferDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProductTransferDetail  $productTransferDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductTransferDetail $productTransferDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProductTransferDetail  $productTransferDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $r)
    {
        try {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prtd_pk' => 'required|int', //PK Traspaso Detalle
                'prtd_quantity' => 'required|int' //Cantidad
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprtd_pk = $vInput['prtd_pk'];
            $vprtd_quantity = $vInput['prtd_quantity'];

            //Validar Si Existe Traspaso Detalle
            $vPTD = ProductTransferDetail::where('prtd_pk', '=', $vprtd_pk)->first();
            if ($vPTD) 
            {
                //Modificar Traspaso Detalle
                $vPTDU = ProductTransferDetail::find($vprtd_pk);
                $vPTDU->prtd_quantity = $vprtd_quantity;
                $vPTDU->save();
                
                return $this->dbResponse($vprtd_pk, 200, null, 'Traspaso Detalle Modificado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Traspaso Detalle NO Encontrado');
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
     * @param  \App\ProductTransferDetail  $productTransferDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r)
    {
        try 
        {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prtd_pk' => 'required|int', //PK Traspaso Detalle
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprtd_pk = $vInput['prtd_pk'];

            //Validar Si Existe Traspaso Detalle
            $vPTD = ProductTransferDetail::where('prtd_pk', '=', $vprtd_pk)->first();
            if ($vPTD) 
            {
                //Modificar Traspaso Detalle
                $vPTDU = ProductTransferDetail::find($vprtd_pk);
                $vPTDU->prtd_status = 0;
                $vPTDU->save();
                
                return $this->dbResponse(null, 200, null, 'Traspaso Detalle Eliminado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Traspaso Detalle NO Encontrado');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }
}
