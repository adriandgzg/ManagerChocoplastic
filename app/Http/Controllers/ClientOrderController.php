<?php

namespace App\Http\Controllers;

use Exception;
use App\ClientOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        try {
     
            $vClientOrders = 
                DB::table('client_orders AS CO')
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
     * @param  \App\ClientOrder  $clientOrder
     * @return \Illuminate\Http\Response
     */
    public function show(ClientOrder $clientOrder)
    {
        //
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
    public function destroy(ClientOrder $clientOrder)
    {
        //
    }
}
