<?php

namespace App\Http\Controllers;

use Exception;
use Throwable;
use Validator;
use DB;
use Carbon\Carbon;
use App\ClientOrder;
use App\ClientOrderDetail;
use App\System;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;
use App\Product;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\Else_;

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
                //->where('clor_status', '=', 1)
                ->orderByDesc('CO.clor_pk')
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
        } 
        catch (Exception $e) 
        {
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

            //Inserción de la tabla principal (Pedido del cliente)
            $vOrder = new ClientOrder();
            $vOrder->clie_fk = 1;
            $vOrder->stor_fk = $vStore_PK;
            $vOrder->clor_identifier = "Ped_" . $vsyst_clie_order;
            $vOrder->save();

            //Asignación de PK del Pedido
            $vclor_pk = $vOrder->clor_pk;

            //////////////////  Inserción de Log  //////////////////
            $this->getstorelog('client_orders', $vclor_pk, 1);


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

                $vprod_saleprice = 0;

                if($cod["Quantity"] >= $vProduct->prod_minimumpurchase)
                {
                    if($vProduct->prod_listprice == 0)
                    {
                        $vprod_saleprice = $vProduct->prod_saleprice;
                    }
                    else
                    {
                        $vprod_saleprice = $vProduct->prod_listprice;
                    }
                }
                else
                {
                    $vprod_saleprice = $vProduct->prod_saleprice;
                }

                //Inserción de la tabla principal (Pedido del cliente)
                $vCORDI = new ClientOrderDetail();
                $vCORDI->clor_fk = $vclor_pk;
                $vCORDI->prod_fk = $vprod_pk;
                $vCORDI->meas_fk = $vProduct->meas_fk_output;
                $vCORDI->clod_quantity = $cod["Quantity"];
                $vCORDI->clod_price = $vprod_saleprice;
                $vCORDI->clod_discountrate = 0;
                $vCORDI->clod_ieps = 0;
                $vCORDI->clod_iva = 0;
                $vCORDI->clod_status = 1;
                $vCORDI->save();
                
                //Asignación de PK Pedido Detalle Cliente
                $vclod_pk = $vCORDI->clod_pk;

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('client_order_details', $vclod_pk, 1);
            }
       
            return $this->dbResponse("Ped_" . $vsyst_clie_order, 200, null, 'Pedido Guardado Correctamente');
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
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
            
        }
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    public function showmanager($clor_pk)
    {
       
        if ($clor_pk == '' || $clor_pk == 0) {
            return $this->dbResponse(null, 500, null, 'PK Obligatorio');
        }

        try {
            //Asignacion de variables
           $vclor_pk = $clor_pk;

            $vClientOrder = DB::table('client_orders AS CO') 
                ->leftjoin('clients AS C', 'C.clie_pk', '=', 'CO.clie_fk')
                ->leftjoin('stores AS S', 'CO.stor_fk', '=', 'S.stor_pk')
                ->select(
                    'CO.clor_pk',
                    'CO.clor_identifier',
                    'CO.created_at',

                    'C.clie_pk',
                    'C.clie_identifier',
                    'C.clie_name',
                    'C.clie_rfc',                           

                    'S.stor_pk',
                    'S.stor_name',

                    DB::raw('(SELECT CONCAT(U.phone_number, "-", U.name) AS user FROM logs AS L INNER JOIN users AS U ON L.user_fk = U.id WHERE L.table = "client_orders" AND L.pk_register = CO.clor_pk AND L.operation = 1 LIMIT 1) AS user') //Vededor
                    )
                ->where('CO.clor_pk', '=', $vclor_pk)
                ->first();

            if($vClientOrder)
            { 

                $vClientOrderDetail = DB::table('client_order_details AS COD') 
                    ->join('products AS P', 'P.prod_pk', '=', 'COD.prod_fk')
                    ->join('measurements AS M', 'M.meas_pk', '=', 'COD.meas_fk')
                    ->join('product_categories AS PC', 'PC.prca_pk', '=', 'P.prca_fk')
                    ->select(
                        'COD.clod_pk',

                        'P.prod_pk',
                        'P.prod_identifier',
                        'P.prod_name',
                        
                        'M.meas_pk',
                        'M.meas_name',
                        'M.meas_abbreviation',
                        'PC.prca_name',
                        
                        'COD.clod_quantity',
                        'COD.clod_price'
                    )
                    ->where('COD.clor_fk', '=', $vclor_pk)
                    ->where('COD.clod_status', '=', 1)
                    ->get();
   

                $vData = 
                [
                    'order' => $vClientOrder, 
                    'order_details' => $vClientOrderDetail
                ];

                return $this->dbResponse($vData, 200, null, 'Pedido Encontrado');

            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Pedido No Encontrado');
            }
            
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
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

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('client_orders', $vclor_pk, 3);

    
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
