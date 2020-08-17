<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Throwable;
use App\ClientReturnDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;

class ClientReturnDetailController extends ApiResponseController
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
     * @param  \App\ClientReturnDetail  $clientReturnDetail
     * @return \Illuminate\Http\Response
     */
    public function show(ClientReturnDetail $clientReturnDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ClientReturnDetail  $clientReturnDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(ClientReturnDetail $clientReturnDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ClientReturnDetail  $clientReturnDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $r)
    {
        $vInput = $r->all();

        $vVal = Validator::make($vInput, [
            'clrd_pk' => 'required|int', // PK Devolucion Detalle
            'clrd_quantity' => 'required', // Cantidad
        ]);

        if($vVal->fails()) {
            return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
        }

        try {
            //Asignacion de variables
           $vclrd_pk = $vInput['clrd_pk'];
           $vclrd_quantity = $vInput['clrd_quantity'];

            $vCRD = ClientReturnDetail::where('clrd_pk', '=', $vclrd_pk)->first();

            if($vCRD)
            { 
              
                //Modificar Devolución Detalle
                DB::table('client_return_details')
                ->where('clrd_pk', '=', $vclrd_pk)
                ->update([
                    'clrd_quantity' =>  $vclrd_quantity
                ]);

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('client_return_details', $vclrd_pk, 2);

                return $this->dbResponse($vclrd_pk, 200, null, 'Devolución Detalle Modificado Correctamente');
            }
            else
            {
                return $this->dbResponse($vclrd_pk, 404, null, 'Devolución Detalle NO Encontrado');
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
     * @param  \App\ClientReturnDetail  $clientReturnDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r)
    {
        $vInput = $r->all();

        $vVal = Validator::make($vInput, [
            'clrd_pk' => 'required|int' // PK Devolucion Detalle
        ]);

        if($vVal->fails()) {
            return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
        }

        try {
            //Asignacion de variables
           $vclrd_pk = $vInput['clrd_pk'];

            $vCRD = ClientReturnDetail::where('clrd_pk', '=', $vclrd_pk)->first();

            if($vCRD)
            { 
              
                //Eliminar Devolución Detalle
                DB::table('client_return_details')
                ->where('clrd_pk', '=', $vclrd_pk)
                ->update([
                    'clrd_status' => 0
                ]);

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('client_return_details', $vclrd_pk, 3);

                return $this->dbResponse($vclrd_pk, 200, null, 'Devolución Detalle Eliminado Correctamente');
            }
            else
            {
                return $this->dbResponse($vclrd_pk, 404, null, 'Devolución Detalle NO Encontrado');
            }

        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }
}
