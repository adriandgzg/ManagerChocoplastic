<?php

namespace App\Http\Controllers;

use App\ClientOrder;
use App\ClientOrderDetail;
use App\ClientSale;
use App\ClientSaleDetail;
use ClientSaleDetailSeeder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Validator;

class ClientSaleController extends Controller
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
    public function create(Request $r)
    {
        
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

            $vClientOrder = ClientOrder::where('clor_pk', '=', $vclor_pk)->where('clor_status', '=', 1)->first();

            if($vClientOrder)
            { 
                //Insertar Encabezado de Pedido
                $SelectCO = ClientOrder::where('clor_pk', '=', $vclor_pk)
                    ->select(
                        array(
                            'clor_pk AS clor_fk',
                            'clie_fk', 
                            DB::raw("0 AS clsa_status"),
                            DB::raw("NOW() AS created_at"),
                            DB::raw("NOW() AS updated_at")
                        )
                    );

                DB::table('client_sales')
                    ->insertUsing(
                        [
                            'clie_fk',
                            'clor_fk', 
                            'clsa_status', 
                            'created_at', 
                            'updated_at'
                        ]
                    , $SelectCO);

                $vClientSale = ClientSale::orderBy('created_at', 'DESC')->first();

                //Insertar Detallado de pedido

                $SelectCOD = ClientOrderDetail::where('clor_fk', '=', $vclor_pk)->where('clod_status', '=', 1)
                    ->select(
                          array(
                            DB::raw("$vClientSale->clsa_pk AS clsa_fk"),
                            'prod_fk AS prod_fk',
                            'meas_fk AS meas_fk',
                            'clod_quantity AS clsd_quantity',
                            'clod_price AS clsd_price',
                            'clod_discountrate AS clsd_discountrate',
                            'clod_ieps AS clsd_ieps',
                            'clod_iva AS clsd_iva',
                            DB::raw("1 AS clsd_status"),
                            DB::raw("NOW() AS created_at"),
                            DB::raw("NOW() AS updated_at")
                            )
                    );

                DB::table('client_sale_details')
                    ->insertUsing(
                        [
                            'clsa_fk',
                            'prod_fk', 
                            'meas_fk',
                            'clsd_quantity', 
                            'clsd_price', 
                            'clsd_discountrate', 
                            'clsd_ieps', 
                            'clsd_iva', 
                            'clsd_status', 
                            'created_at', 
                            'updated_at'
                        ]
                    , $SelectCOD);

                $vClientSaleDetail = DB::table('client_sale_details AS CSD')
                                        ->join('products AS P', 'P.prod_pk', '=', 'CSD.prod_fk')
                                        ->join('measurements AS M', 'M.meas_pk', '=', 'CSD.meas_fk')
                                        ->select(
                                            'CSD.clsd_pk',
                                            'CSD.clsa_fk',
                                            'P.prod_pk',
                                            'P.prod_identifier',
                                            'P.prod_name',
                                            'M.meas_pk',
                                            'M.meas_name',
                                            'M.meas_abbreviation',
                                            'CSD.clsd_quantity',
                                            'CSD.clsd_price',
                                            'CSD.clsd_discountrate',
                                            'CSD.clsd_ieps',
                                            'CSD.clsd_iva',
                                            'CSD.clsd_status'
                                        )
                                        ->where('clsa_fk', '=', $vClientSale->clsa_pk)
                                        ->get();

                
                //Modificar Pedido a Procesado
                DB::table('client_orders')
                ->where('clor_pk', '=', $vclor_pk)
                ->update(['clor_status' =>  2]);

                return response()->json([
                    'code' => 200,
                    'success' => true,
                    'message' => 'Pedido Convertido a Venta',
                    'data' => 
                            [
                                'sale' => $vClientSale, 
                                'sale_details' => $vClientSaleDetail
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
     * Display the specified resource.
     *
     * @param  \App\ClientSale  $clientSale
     * @return \Illuminate\Http\Response
     */
    public function show(ClientSale $clientSale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ClientSale  $clientSale
     * @return \Illuminate\Http\Response
     */
    public function edit(ClientSale $clientSale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ClientSale  $clientSale
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClientSale $clientSale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ClientSale  $clientSale
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClientSale $clientSale)
    {
        //
    }
}
