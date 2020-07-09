<?php

namespace App\Http\Controllers;

use Exception;
use Validator;

use Carbon\Carbon;
use App\ClientOrder;
use App\ClientOrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\api\ApiResponseController;
use App\System;

class ClientOrderController extends ApiResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        try {
            $vClientOrders = DB::table('client_orders AS CO')
                ->join('clients AS C', 'C.clie_pk', '=', 'CO.clie_fk')
                ->select(
                    'CO.clor_pk',
                    'CO.clor_identifier',
                    'CO.clor_status',
                    'CO.created_at',
                    'C.clie_pk',
                    'C.clie_identifier',
                    'C.clie_name',
                    'C.clie_rfc'
                )
                ->where('clor_status', '=', 1)
                ->get();

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Pedidos de los clientes',
                'data' =>  $vClientOrders
            ], 200);
            
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => $e
            ], 200);
        }
    }

    public function clientorders()
    {
        try {
            $vClientOrders = DB::table('client_orders AS CO')
            ->join('clients AS C', 'C.clie_pk', '=', 'CO.clie_fk')
            ->select(
                'CO.clor_pk',
                'CO.clor_identifier',
                'CO.clor_status',
                'CO.created_at',
                'C.clie_pk',
                'C.clie_identifier',
                'C.clie_name',
                'C.clie_rfc'
            )
            ->where('clor_status', '=', 1)
            ->get();
            
            return $this->successResponse($vClientOrders, true, 200, "Lista de Pedidos de los Clientes");
        } catch (Exception $e) {
            return $this->errorResponse(null, false, 500, $e);
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
    public function store(Request $request)
    {
        try {

            //Buscar el folio consecutivo
            $vSystem = System::select('syst_clie_order')->first();
            $vsyst_clie_order = $vSystem->syst_clie_order;

            //Insersión de la tabla principal (Pedido del cliente)
            $vOrder = new ClientOrder();
            $vOrder->clie_fk = 1;
            $vOrder->clor_identifier = "Ped_" . $vsyst_clie_order;
            $vOrder->save();
            $vclor_pk = $vOrder->clor_pk;


            //Asignacion de variable de los Productos
            $vCODetail = $request->data;
            
            //Guardar el detallado del pedido (Productos)
            foreach ($vCODetail as $detail => $cod)
            {
                DB::table('client_order_details')->insert(array(
                    'clor_fk' => $vclor_pk,
                    'prod_fk' => $cod["prod_fk"],
                    'meas_fk' => $cod["meas_fk"],
                    'clod_quantity' => $cod["clod_quantity"],
                    'clod_type' => $cod["clod_type"],
                    'clod_price' => $cod["clod_price"],
                    'clod_discountrate' => $cod["clod_discountrate"],
                    'clod_ieps' => $cod["clod_ieps"],
                    'clod_iva' => $cod["clod_iva"],
                    'clod_status' => 1,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ));
            }

            //Modificar Folio del Pedido
            DB::table('systems')
            ->update(['syst_clie_order' =>  $vsyst_clie_order + 1]);

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Pedido Guardado Correctamente',
                'data' => "Ped_" . $vsyst_clie_order
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => $e
            ], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ClientOrder  $clientOrder
     * @return \Illuminate\Http\Response
     */
    public function show(Request $r)
    {
        $vInput = $r->all();

        $validator = Validator::make($vInput, [
            'clor_pk' => 'required'
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
           $vclor_pk = $vInput['clor_pk'];

            $vClientOrder = ClientOrder::where('clor_pk', '=', $vclor_pk)->select('clor_pk','clor_identifier','created_at')->first();

            if($vClientOrder)
            { 

                $vClientOrderDetail = DB::table('client_order_details AS COD')
                    ->join('products AS P', 'P.prod_pk', '=', 'COD.prod_fk')
                    ->join('measurements AS M', 'M.meas_pk', '=', 'COD.meas_fk')
                    ->select(
                        'COD.clod_pk',
                        'P.prod_pk',
                        'P.prod_identifier',
                        'P.prod_name',
                        'M.meas_pk',
                        'M.meas_name',
                        'M.meas_abbreviation',
                        'COD.clod_quantity',
                        'COD.clod_price',
                        'COD.clod_discountrate',
                        'COD.clod_ieps',
                        'COD.clod_iva',
                        'COD.clod_status'
                    )
                    ->where('COD.clor_fk', '=', $vclor_pk)
                    ->get();
   

                return response()->json([
                    'code' => 200,
                    'success' => true,
                    'message' => 'Información de Pedido',
                    'data' => 
                        [
                            'order' => $vClientOrder, 
                            'order_details' => $vClientOrderDetail
                        ]
                ], 200);

            }
            else
            {
                return response()->json([
                    'code' => 404,
                    'success' => false,
                    'message' => 'Pedido No Encontrado'
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
     * Show the form for editing the specified resource.
     *
     * @param  \App\ClientOrder  $clientOrder
     * @return \Illuminate\Http\Response
     */
    public function edit(ClientOrder $clientOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ClientOrder  $clientOrder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClientOrder $clientOrder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ClientOrder  $clientOrder
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r)
    {
        $vInput = $r->all();

        $validator = Validator::make($vInput, [
            'clor_pk' => 'required'
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
           $vclor_pk = $vInput['clor_pk'];

            $vClientOrder = ClientOrder::where('clor_pk', '=', $vclor_pk)->first();

            if($vClientOrder)
            { 
                //Cancelar Pedido
                DB::table('client_orders')
                ->where('clor_pk', '=', $vclor_pk)
                ->update(['clor_status' =>  0]);
    
                return response()->json([
                    'code' => 200,
                    'success' => true,
                    'message' => 'Pedido Cancelado Correctamente'
                ], 200);

            }
            else
            {
                return response()->json([
                    'code' => 404,
                    'success' => false,
                    'message' => 'Pedido No Encontrado'
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
