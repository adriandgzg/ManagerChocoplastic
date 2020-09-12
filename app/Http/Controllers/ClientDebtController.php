<?php

namespace App\Http\Controllers;

use Exception;
use DB;
use App\ClientDebt;
use Illuminate\Http\Request;

class ClientDebtController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try 
        {
            $vClientSales = DB::table('client_debts AS CD')
                ->join('clients AS C', 'C.clie_pk', '=', 'CD.clie_fk')
                ->join('client_sales AS CS', 'CS.clsa_pk', '=', 'CD.clsa_fk')
                ->select(
                    'CD.clde_pk',
                    'CD.clde_amount',  //Monto de la deuda
                    DB::raw('(SELECT IFNULL(SUM(clpa_amount), 0) AS clde_amount_paid FROM client_payments WHERE clde_fk = CD.clde_pk) AS clde_amount_paid'), //Monto Pagado
                    DB::raw('(SELECT CD.clde_amount - IFNULL(SUM(clpa_amount), 0) AS clde_amount_outstanding FROM client_payments WHERE clde_fk = CD.clde_pk) AS clde_amount_outstanding'), //Monto Pendiente por pagar
                    'CD.created_at',
                    'CD.clde_status',
                    DB::raw('(CASE 
                        WHEN CD.clde_status = 1 THEN "Activo" 
                        WHEN CD.clde_status = 2 THEN "Pagado" 
                        ELSE "" END) AS clde_status_description'), 
                    'C.clie_pk',
                    'C.clie_identifier',
                    'C.clie_name',
                    'C.clie_rfc',
                    'CS.clsa_identifier',
                    
                )
                ->where('CD.clde_status', '<>', 0)
                ->orderByDesc('CD.created_at')
                ->get();

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Ventas por Cobrar de los clientes',
                'data' =>  $vClientSales
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
     * @param  \App\ClientDebt  $clientDebt
     * @return \Illuminate\Http\Response
     */
    public function show(ClientDebt $clientDebt)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ClientDebt  $clientDebt
     * @return \Illuminate\Http\Response
     */
    public function edit(ClientDebt $clientDebt)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ClientDebt  $clientDebt
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClientDebt $clientDebt)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ClientDebt  $clientDebt
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClientDebt $clientDebt)
    {
        //
    }
}
