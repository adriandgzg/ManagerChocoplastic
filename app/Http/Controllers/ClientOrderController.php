<?php

namespace App\Http\Controllers;

use Exception;
use Validator;
use DB;
use Carbon\Carbon;
use App\ClientOrder;
use App\System;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;
use App\Product;
use Illuminate\Support\Facades\Auth;

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
                ->join('stores AS S', 'CO.stor_fk', '=', 'S.stor_pk')
                ->select(
                    'CO.clor_pk',
                    'CO.clor_identifier',
                    'CO.created_at',
                    'CO.clor_status',
                    'S.stor_name'
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
                ->join('stores AS S', 'CO.stor_fk', '=', 'S.stor_pk')
                ->select(
                    'CO.clor_pk AS PK_Order',
                    'CO.clor_identifier AS Identifier',
                    'CO.created_at AS DateCreated',
                    'S.stor_name AS Store'
                )
                ->where('clor_status', '=', 1)
                ->orderByDesc('CO.created_at')
                ->get();
            
            return $this->dbResponse($vClientOrders, 200, null, 'Lista de Pedidos');
        } catch (Exception $e) {
            return $this->dbResponse(null, 500, $e, null);
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

            //Sucursal al que pertenece el Usuario App
            $vStore_PK = Auth::user()->stor_fk;

            //Buscar el folio consecutivo
            $vSystem = System::select('syst_clie_order')->first();
            $vsyst_clie_order = $vSystem->syst_clie_order;

            //Insersión de la tabla principal (Pedido del cliente)
            $vOrder = new ClientOrder();
            $vOrder->clie_fk = 1;
            $vOrder->stor_fk = $vStore_PK;
            $vOrder->clor_identifier = "Ped_" . $vsyst_clie_order;
            $vOrder->save();

            //Asignación de PK del Pedido
            $vclor_pk = $vOrder->clor_pk;

            //Modificar Folio del Pedido
            DB::table('systems')
            ->update(['syst_clie_order' =>  $vsyst_clie_order + 1]);


            //Asignacion de variable de los Productos
            $vCODetail = $request->data;
            
            //Guardar el detallado del pedido (Productos)
            foreach ($vCODetail as $detail => $cod)
            {
                $vprod_pk = $cod["PK_Product"];
                $vProduct = Product::where('prod_pk','=',$vprod_pk)->first();

                DB::table('client_order_details')->insert(array(
                    'clor_fk' => $vclor_pk,
                    'prod_fk' => $vprod_pk,
                    'meas_fk' => $vProduct->meas_fk_output,
                    'clod_quantity' => $cod["Quantity"],
                    //'clod_type' => $cod["Type"],
                    'clod_price' => $vProduct->prod_saleprice,
                    'clod_discountrate' => 0,
                    'clod_ieps' => 0,
                    'clod_iva' => 0,
                    'clod_status' => 1,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ));
            }
       
            return $this->dbResponse("Ped_" . $vsyst_clie_order, 200, null, 'Pedido Guardado Correctamente');
        } catch (Exception $e) {
            return $this->dbResponse(null, 500, $e, null);
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

            $vClientOrder = ClientOrder::where('clor_pk', '=', $vclor_pk)
                            ->select(
                                'clor_pk AS PK_Order',
                                'clor_identifier AS Identifier'
                                )
                            ->first();

            if($vClientOrder)
            { 

                $vClientOrderDetail = DB::table('client_order_details AS COD') 
                    ->join('products AS P', 'P.prod_pk', '=', 'COD.prod_fk')
                    ->join('measurements AS M', 'M.meas_pk', '=', 'COD.meas_fk')
                    ->join('product_categories AS PC', 'PC.prca_pk', '=', 'P.prca_fk')
                    ->select(
                        'COD.clod_pk AS PK_OrderProduct',
                        'P.prod_pk AS PK_Product',
                        //'P.prod_identifier',
                        'P.prod_name AS ProductName',
                        //'M.meas_pk',
                        'M.meas_name AS Measurement',
                        //'M.meas_abbreviation',
                        'PC.prca_name AS Category',
                        //'COD.clod_type AS Type',
                        'COD.clod_quantity AS Quantity',
                        'COD.clod_price AS Price'
                        //'COD.clod_discountrate',
                        //'COD.clod_ieps',
                        //'COD.clod_iva',
                        //'COD.clod_status'
                    )
                    ->where('COD.clor_fk', '=', $vclor_pk)
                    ->where('COD.clod_status', '=', 1)
                    ->get();
   

                $data = 
                [
                    'order' => $vClientOrder, 
                    'order_details' => $vClientOrderDetail
                ];


                return $this->dbResponse($data, 200, null, 'Lista de Pedidos');

            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Pedido No Encontrado');
            }
            
        } catch (Exception $e) {
            return $this->dbResponse(null, 500, $e, null);
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
                DB::table('clor_pk')
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
