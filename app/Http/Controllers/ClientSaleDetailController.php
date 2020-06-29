<?php

namespace App\Http\Controllers;

use App\ClientSaleDetail;
use Illuminate\Http\Request;
use Exception;
use Validator;
use DB;


class ClientSaleDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
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
     * @param  \App\ClientSaleDetail  $clientSaleDetail
     * @return \Illuminate\Http\Response
     */
    public function show(ClientSaleDetail $clientSaleDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ClientSaleDetail  $clientSaleDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(ClientSaleDetail $clientSaleDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ClientSaleDetail  $clientSaleDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $r)
    {
        $vInput = $r->all();

        $validator = Validator::make($vInput, [
            'clsd_pk' => 'required', //PK Venta Detalle Producto
            'clsd_quantity' => 'required', //Cantidad Venta Detalle Producto
        ]);


        if ($validator->fails()) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => $validator->errors()
            ], 200);

        }

        try {
            //Asignacion de variables
           $vclsd_pk = $vInput['clsd_pk'];
           $vclsd_quantity = $vInput['clsd_quantity'];

            $vClientSaleDetail = ClientSaleDetail::where('clsd_pk', '=', $vclsd_pk)->first();

            if($vClientSaleDetail)
            { 
       
                //Modificar Venta (Finalizar)
                DB::table('client_sale_details')
                ->where('clsd_pk', '=', $vclsd_pk)
                ->update(['clsd_quantity' => $vclsd_quantity]);

                return response()->json([
                    'code' => 200,
                    'success' => true,
                    'message' => 'Venta Detalle Producto Modificado Correctamente',
                    'data' => $vclsd_pk 
                ], 200);
            }
            else
            {
                return response()->json([
                    'code' => 404,
                    'success' => false,
                    'message' => 'Venta Detalle Producto No Encontrado'
         
                ], 200);
            }

        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => $e
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ClientSaleDetail  $clientSaleDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r)
    {
        $vInput = $r->all();

        $validator = Validator::make($vInput, [
            'clsd_pk' => 'required', //PK Venta Detalle
        ]);


        if ($validator->fails()) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => $validator->errors()
            ], 200);

        }

        try {
            //Asignacion de variables
           $vclsd_pk = $vInput['clsd_pk'];

            $vClientSaleDetail = ClientSaleDetail::where('clsd_pk', '=', $vclsd_pk)->first();

            if($vClientSaleDetail)
            { 
       
                //Modificar Venta (Finalizar)
                DB::table('client_sale_details')
                ->where('clsd_pk', '=', $vclsd_pk)
                ->update(['clsd_status' =>  0]);

                return response()->json([
                    'code' => 200,
                    'success' => true,
                    'message' => 'Venta Detalle Producto Eliminado Correctamente',
                    'data' => $vclsd_pk 
                ], 200);
            }
            else
            {
                return response()->json([
                    'code' => 404,
                    'success' => false,
                    'message' => 'Venta Detalle Producto No Encontrado'
         
                ], 200);
            }

        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => $e
            ], 200);
        }
    }
}
