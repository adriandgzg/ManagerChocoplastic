<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Throwable;
use App\ProviderReturnDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;

class ProviderReturnDetailController extends ApiResponseController
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
     * @param  \App\ProviderReturnDetail  $providerReturnDetail
     * @return \Illuminate\Http\Response
     */
    public function show(ProviderReturnDetail $providerReturnDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProviderReturnDetail  $providerReturnDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(ProviderReturnDetail $providerReturnDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProviderReturnDetail  $providerReturnDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $r)
    {
        $vInput = $r->all();

        $vVal = Validator::make($vInput, [
            'prrd_pk' => 'required|int', // PK Devolucion Detalle
            'prrd_quantity' => 'required', // Cantidad
        ]);

        if($vVal->fails()) {
            return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
        }

        try {
            //Asignacion de variables
           $vprrd_pk = $vInput['prrd_pk'];
           $vprrd_quantity = $vInput['prrd_quantity'];

            $vPRD = ProviderReturnDetail::where('prrd_pk', '=', $vprrd_pk)->first();

            if($vPRD)
            { 
                //Modificar Devolución Detalle
                DB::table('provider_return_details')
                ->where('prrd_pk', '=', $vprrd_pk)
                ->update([
                    'prrd_quantity' =>  $vprrd_quantity
                ]);

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('provider_return_details', $vprrd_pk, 2);

                return $this->dbResponse($vprrd_pk, 200, null, 'Devolución Detalle Modificado Correctamente');
            }
            else
            {
                return $this->dbResponse($vprrd_pk, 404, null, 'Devolución Detalle NO Encontrado');
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
     * @param  \App\ProviderReturnDetail  $providerReturnDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r)
    {
        $vInput = $r->all();

        $vVal = Validator::make($vInput, [
            'prrd_pk' => 'required|int' // PK Devolucion Detalle
        ]);

        if($vVal->fails()) {
            return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
        }

        try {
            //Asignacion de variables
           $vprrd_pk = $vInput['prrd_pk'];

            $vPRD = ProviderReturnDetail::where('prrd_pk', '=', $vprrd_pk)->first();

            if($vPRD)
            { 
                //Eliminar Devolución Detalle
                DB::table('provider_return_details')
                ->where('prrd_pk', '=', $vprrd_pk)
                ->update([
                    'prrd_status' => 0
                ]);

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('provider_return_details', $vprrd_pk, 3);


                return $this->dbResponse($vprrd_pk, 200, null, 'Devolución Detalle Eliminado Correctamente');
            }
            else
            {
                return $this->dbResponse($vprrd_pk, 404, null, 'Devolución Detalle NO Encontrado');
            }

        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }
}
