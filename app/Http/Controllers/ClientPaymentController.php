<?php

namespace App\Http\Controllers;

use App\ClientDebt;
use Exception;
use Validator;
use DB;
use App\ClientPayment;
use Illuminate\Http\Request;

class ClientPaymentController extends Controller
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
        $vInput = $r->all();

        $validator = Validator::make($vInput, [
            'clde_fk' => 'required', //PK Cliente Deuda
            'clie_fk' => 'required', //PK Cliente
            'pash_fk' => 'required', //PK Forma de Pago
            'clpa_amount' => 'required', //Monto
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
           $vclde_fk = $vInput['clde_fk'];
           $vclie_fk = $vInput['clie_fk'];
           $vpash_fk = $vInput['pash_fk'];
           $vclpa_amount = $vInput['clpa_amount'];
           $vclpa_reference = $vInput['clpa_reference'];

            $vClientDebt = ClientDebt::where('clde_pk', '=', $vclde_fk)->where('clde_status', '=', 1)->first();

            if($vClientDebt)
            { 
                //Busqueda de montos
                $vclde_amount = $vClientDebt->clde_amount; //Montos total de deuda
                $vpayment_total = ClientPayment::where('clde_fk', '=', $vclde_fk)->where('clpa_status', '=', 1)->sum('clpa_amount'); //Monto total de pagos

                $vdebt_total =  $vclde_amount - $vpayment_total;

                //Validar que el monto pendiente de la deuda sea mayor o igual que el pago
                if($vclpa_amount <= $vdebt_total)
                {
                    //Insertar Pago del cliente
                    $vCPC = new ClientPayment();        
                    $vCPC->clie_fk = $vclie_fk;
                    $vCPC->clde_fk = $vclde_fk;
                    $vCPC->pash_fk = $vpash_fk;
                    $vCPC->clpa_amount = $vclpa_amount;
                    $vCPC->clpa_reference = $vclpa_reference;
                    $vCPC->save();

                    //Asignación de PK Pago Cliente
                    $vclpa_pk = $vCPC->clpa_pk;

                    //////////////////  Inserción de Log  //////////////////
                    $this->getstorelog('client_payments', $vclpa_pk, 1);


                    //Validar montos para cambio de estatus
                    $vpayment_total_finaly = $vpayment_total + $vclpa_amount; //Monto total de pagos

                    if($vpayment_total_finaly == $vclde_amount)
                    {
                        //Modificar Estatus Deuda
                        DB::table('client_debts')
                        ->where('clde_pk', '=', $vclde_fk)
                        ->update(['clde_status' =>  2]);

                        //////////////////  Inserción de Log  //////////////////
                        $this->getstorelog('client_debts', $vclde_fk, 2);

                        //Modificar Estatus Venta
                        DB::table('client_sales')
                        ->where('clsa_pk', '=', $vClientDebt->clsa_fk)
                        ->update(['clsa_status' =>  3]);

                        //////////////////  Inserción de Log  //////////////////
                        $this->getstorelog('client_sales', $vClientDebt->clsa_fk, 2);
                    }

                    return response()->json([
                        'code' => 200,
                        'success' => true,
                        'message' => 'Pago Guardado Correctamente'
                    ], 200);

                }
                else
                {
                    return response()->json([
                        'code' => 500,
                        'success' => false,
                        'message' => 'Monto de Pago es mayor que la deuda'
                    ], 200);

                }
            }
            else
            {
                return response()->json([
                    'code' => 404,
                    'success' => false,
                    'message' => 'Deuda No Encontrada'
         
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
     * @param  \App\ClientPayment  $clientPayment
     * @return \Illuminate\Http\Response
     */
    public function show(int $clde_fk)
    {
        try {
            $vClientSales = DB::table('client_payments AS CP')
                ->join('clients AS C', 'C.clie_pk', '=', 'CP.clie_fk')
                ->join('client_debts AS CD', 'CD.clde_pk', '=', 'CP.clde_fk')
                ->join('payment_shapes AS PS', 'PS.pash_Pk', '=', 'CP.pash_fk')
                ->select(
                    'CP.clpa_pk',
                    'CP.clpa_amount',
                    'CP.clpa_reference',
                    'CP.created_at',

                    'PS.pash_pk',        
                    'PS.pash_name', 
                    
                    'C.clie_pk',
                    'C.clie_identifier',
                    'C.clie_name',
                    'C.clie_rfc',

                    'CD.clde_pk'
                )
                ->where('CP.clpa_status', '=', 1)
                ->where('CP.clde_fk', '=', $clde_fk)
                ->get();

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Pagos de cliente filtrado por Deuda',
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
     * Show the form for editing the specified resource.
     *
     * @param  \App\ClientPayment  $clientPayment
     * @return \Illuminate\Http\Response
     */
    public function edit(ClientPayment $clientPayment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ClientPayment  $clientPayment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClientPayment $clientPayment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ClientPayment  $clientPayment
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClientPayment $clientPayment)
    {
        //
    }
}
