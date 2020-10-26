<?php

namespace App\Http\Controllers;

//use DB;
use Exception;
use Throwable;
use Validator;
use App\System;
use App\Product;
use App\ClientDebt;
use App\ClientSale;
use App\ClientOrder;
use App\ClientSaleDetail;
use App\ProductInventory;
use App\ClientOrderDetail;
use App\ClientPaymentAmount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\api\ApiResponseController;

class ClientSaleController extends ApiResponseController
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
            $vStore = Auth::user()->store_id;
            $vrole_id = Auth::user()->role_id;

            if($vrole_id == 1)
            {

                $vClientSales = DB::table('client_sales AS CS')
                    ->join('clients AS C', 'C.clie_pk', '=', 'CS.clie_fk')
                    ->join('client_orders AS CO', 'CO.clor_pk', '=', 'CS.clor_fk')
                    ->leftjoin('payment_methods AS PM', 'PM.pame_pk', '=', 'CS.pame_fk')
                    ->leftjoin('stores AS S', 'S.stor_pk', '=', 'CS.stor_fk')
                    ->select(
                        'CS.clsa_pk',
                        'CS.clsa_identifier',
                        'CS.clor_fk AS clor_pk',
                        DB::raw('(CASE 
                            WHEN CS.clsa_status = 0 THEN "Pendiente" 
                            WHEN CS.clsa_status = 2 THEN "En Proceso de Pago" 
                            WHEN CS.clsa_status = 3 THEN "Pagado" 
                            ELSE "" END) AS clsa_status'),
                        'CS.created_at',

                        'CO.clor_identifier',

                        'C.clie_pk',
                        'C.clie_identifier',
                        'C.clie_name',
                        'C.clie_rfc',

                        'PM.pame_pk',
                        'PM.pame_name',

                        'S.stor_pk',
                        'S.stor_name',
                        DB::raw('(SELECT COUNT(*) AS Cant FROM client_returns WHERE clre_status <> 0 AND clsa_fk = CS.clsa_pk) AS cantreturn') //Cantidad de Devoluciones
                    )
                    ->get();
            }
            else
            {
                $vClientSales = DB::table('client_sales AS CS')
                    ->join('clients AS C', 'C.clie_pk', '=', 'CS.clie_fk')
                    ->join('client_orders AS CO', 'CO.clor_pk', '=', 'CS.clor_fk')
                    ->leftjoin('payment_methods AS PM', 'PM.pame_pk', '=', 'CS.pame_fk')
                    ->leftjoin('stores AS S', 'S.stor_pk', '=', 'CS.stor_fk')
                    ->select(
                        'CS.clsa_pk',
                        'CS.clsa_identifier',
                        'CS.clor_fk AS clor_pk',
                        DB::raw('(CASE 
                            WHEN CS.clsa_status = 0 THEN "Pendiente" 
                            WHEN CS.clsa_status = 2 THEN "En Proceso de Pago" 
                            WHEN CS.clsa_status = 3 THEN "Pagado" 
                            ELSE "" END) AS clsa_status'),
                        'CS.created_at',

                        'CO.clor_identifier',

                        'C.clie_pk',
                        'C.clie_identifier',
                        'C.clie_name',
                        'C.clie_rfc',

                        'PM.pame_pk',
                        'PM.pame_name',

                        'S.stor_pk',
                        'S.stor_name',
                        DB::raw('(SELECT COUNT(*) AS Cant FROM client_returns WHERE clre_status <> 0 AND clsa_fk = CS.clsa_pk) AS cantreturn') //Cantidad de Devoluciones
                    )
                    ->where('S.stor_pk', '=', $vStore)
                    ->get();

            }

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Ventas de los clientes',
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


        if ($validator->fails()) 
        {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => $validator->errors()
            ], 200);

        }

        try 
        {
            //Asignacion de variables
            $vclor_pk = $vInput['clor_pk'];

            $vClientOrder = ClientOrder::where('clor_pk', '=', $vclor_pk)->where('clor_status', '=', 1)->first();

            if($vClientOrder)
            { 
                //Insertar Pago del cliente
                $vCSI = new ClientSale();        
                $vCSI->clie_fk = $vClientOrder->clie_fk;
                $vCSI->clor_fk = $vClientOrder->clor_pk;
                $vCSI->stor_fk = $vClientOrder->stor_fk;
                $vCSI->clsa_status = 0;
                $vCSI->save();

                //Asignación de PK Venta Cliente
                $vclsa_pk = $vCSI->clsa_pk;

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('client_sales', $vclsa_pk, 1);

                //Consultar Venta Clente
                $vClientSale = DB::table('client_sales AS CS')
                    ->join('client_orders AS CO', 'CO.clor_pk', '=', 'CS.clor_fk')
                    ->join('stores AS S', 'S.stor_pk', '=', 'CS.stor_fk')
                    ->select(
                        'CS.clsa_pk',
                        'CS.clie_fk',
                        'CS.clor_fk',
                        'CS.pame_fk',
                        'CS.stor_fk',
                        'CS.clsa_identifier',
                        'CS.clsa_status',
                        'CS.created_at',

                        'S.stor_pk',
                        'S.stor_name',

                        DB::raw('(SELECT CONCAT(U.phone_number, "-", U.name) AS user FROM logs AS L INNER JOIN users AS U ON L.user_fk = U.id WHERE L.table = "client_orders" AND L.pk_register = CO.clor_pk AND L.operation = 1 LIMIT 1) AS user') //Vededor
                    )
                    ->where('clsa_pk', '=', $vclsa_pk)
                    ->first();

                //Consultar Pedido Detallado
                $SelectCOD = ClientOrderDetail::where('clor_fk', '=', $vclor_pk)->where('clod_status', '=', 1)
                    ->select
                    (
                        array
                        (
                            DB::raw("$vclsa_pk AS clsa_fk"),
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
                //Insertar Venta Detallado Cliente
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


                //Consultar Venta Detalle
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
                    ->where('clsa_fk', '=', $vclsa_pk)
                    ->where('clsd_status', '=', 1)
                    ->get();

                
                //Modificar Pedido a Procesado
                DB::table('client_orders')
                ->where('clor_pk', '=', $vclor_pk)
                ->update(['clor_status' =>  2]);

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('client_orders', $vclor_pk, 2);

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
                $vClientSale = DB::table('client_sales AS CS')
                    ->join('client_orders AS CO', 'CO.clor_pk', '=', 'CS.clor_fk')
                    ->join('stores AS S', 'S.stor_pk', '=', 'CS.stor_fk')
                    ->select(
                        'CS.clsa_pk',
                        'CS.clie_fk',
                        'CS.clor_fk',
                        'CS.pame_fk',
                        'CS.stor_fk',
                        'CS.clsa_identifier',
                        'CS.clsa_status',
                        'CS.created_at',

                        'S.stor_pk',
                        'S.stor_name',

                        DB::raw('(SELECT CONCAT(U.phone_number, "-", U.name) AS user FROM logs AS L INNER JOIN users AS U ON L.user_fk = U.id WHERE L.table = "client_orders" AND L.pk_register = CO.clor_pk AND L.operation = 1 LIMIT 1) AS user') //Vededor
                    )
                    ->where('clor_fk', '=', $vclor_pk)
                    ->first();

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
                    ->where('clsd_status', '=', 1)
                    ->get();


                return response()->json([
                    'code' => 404,
                    'success' => false,
                    'message' => 'Pedido No Encontrado',
                    'data' => 
                            [
                                'sale' => $vClientSale, 
                                'sale_details' => $vClientSaleDetail
                            ]
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
    public function show($clsa_pk)
    {
        try {

            //Asignacion de variables
            $vclsa_pk = $clsa_pk;


            if ($vclsa_pk == '' || $vclsa_pk == 0) {
                return $this->dbResponse(null, 500, null, 'PK Obligatorio');
            }

            $vCS = DB::table('client_sales AS CS')
                ->join('client_orders AS CO', 'CO.clor_pk', '=', 'CS.clor_fk')
                ->join('clients AS C', 'C.clie_pk', '=', 'CS.clie_fk')
                ->leftjoin('payment_methods AS PM', 'PM.pame_pk', '=', 'CS.pame_fk')
                ->leftjoin('stores AS S', 'S.stor_pk', '=', 'CS.stor_fk')
                ->select(
                    'CS.clsa_pk',
                    'CS.clsa_identifier',
                    'CS.clor_fk AS clor_pk',

                    DB::raw('(CASE 
                        WHEN CS.clsa_status = 0 THEN "Pendiente" 
                        WHEN CS.clsa_status = 2 THEN "En Proceso de Pago" 
                        WHEN CS.clsa_status = 3 THEN "Pagado" 
                        ELSE "" END) AS clsa_status'),
                    'CS.created_at',

                    'CO.clor_identifier',

                    'C.clie_pk',
                    'C.clie_identifier',
                    'C.clie_name',
                    'C.clie_rfc',

                    'PM.pame_pk',
                    'PM.pame_name',

                    'S.stor_pk',
                    'S.stor_name',
                    DB::raw('(SELECT CONCAT(U.phone_number, "-", U.name) AS user FROM logs AS L INNER JOIN users AS U ON L.user_fk = U.id WHERE L.table = "client_orders" AND L.pk_register = CO.clor_pk AND L.operation = 1 LIMIT 1) AS user') //Vededor
                )
                ->where('CS.clsa_pk', '=', $vclsa_pk)
                ->first();

            if($vCS)
            {
                $vCSD = DB::table('client_sale_details AS CSD')
                    ->join('products AS P', 'P.prod_pk', '=', 'CSD.prod_fk')
                    ->join('measurements AS M', 'M.meas_pk', '=', 'CSD.meas_fk')
                    ->select(
                        'CSD.clsd_pk',

                        //'CSD.clsa_fk',

                        'P.prod_pk',
                        'P.prod_identifier',
                        'P.prod_name',

                        'M.meas_pk',
                        'M.meas_name',
                        'M.meas_abbreviation',

                        'CSD.clsd_quantity',
                        'CSD.clsd_price',
                        'CSD.clsd_discountrate'
                        //'CSD.clsd_ieps',
                        //'CSD.clsd_iva'
                    )
                    ->where('CSD.clsa_fk', '=', $vclsa_pk)
                    ->where('clsd_status', '=', 1)
                    ->get();

                $vData = 
                [
                    'client_sales' => $vCS, 
                    'client_sale_details' => $vCSD
                ];

                return $this->dbResponse($vData, 200, null, 'Venta Encontrada');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Venta No Encontrada');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }


    public function showreport($clsa_pk)
    {
        try {

            //Asignacion de variables
            $vclsa_pk = $clsa_pk;


            if ($vclsa_pk == '' || $vclsa_pk == 0) {
                return $this->dbResponse(null, 500, null, 'PK Obligatorio');
            }

            $vCS = DB::table('client_sales AS CS')
                //->join('client_orders AS CO', 'CO.clor_pk', '=', 'CS.clor_fk')
                ->join('clients AS C', 'C.clie_pk', '=', 'CS.clie_fk')
                ->join('stores AS S', 'S.stor_pk', '=', 'CS.stor_fk')
                ->join('payment_methods AS PM', 'PM.pame_pk', '=', 'CS.pame_fk')
                ->leftjoin('client_debts AS CD','CS.clsa_pk', '=', 'CD.clsa_fk')
                ->select(
                    'CS.clsa_pk',
                    'CS.clsa_identifier',
                    //'CS.clor_fk AS clor_pk',

                    DB::raw('(CASE 
                        WHEN CS.clsa_status = 0 THEN "Pendiente" 
                        WHEN CS.clsa_status = 2 THEN "En Proceso de Pago" 
                        WHEN CS.clsa_status = 3 THEN "Pagado" 
                        ELSE "" END) AS clsa_status'),
                    'CS.created_at',

                    //'CO.clor_identifier',

                    'C.clie_pk',
                    'C.clie_identifier',
                    'C.clie_name',
                    'C.clie_rfc',

                    'PM.pame_pk',
                    'PM.pame_name',

                    'S.stor_pk',
                    'S.stor_name',
                    'S.stor_rfc',
                    'S.stor_addres',
                    'S.stor_phone',

                    'CD.clde_amount',  //Monto de la deuda
                    DB::raw('(SELECT IFNULL(SUM(clpa_amount), 0) AS clde_amount_paid FROM client_payments WHERE clde_fk = CD.clde_pk) AS clde_amount_paid'), //Monto Pagado
                    DB::raw('(SELECT CD.clde_amount - IFNULL(SUM(clpa_amount), 0) AS clde_amount_outstanding FROM client_payments WHERE clde_fk = CD.clde_pk) AS clde_amount_outstanding'), //Monto Pendiente por pagar
               

                    //DB::raw('(SELECT CONCAT(U.phone_number, "-", U.name) AS user FROM logs AS L INNER JOIN users AS U ON L.user_fk = U.id WHERE L.table = "client_orders" AND L.pk_register = CO.clor_pk AND L.operation = 1 LIMIT 1) AS user') //Vededor
                )
                ->where('CS.clsa_pk', '=', $vclsa_pk)
                ->where('CS.pame_fk', '=', 2)
                ->first();

            if($vCS)
            {
                $vCSD = DB::table('client_sale_details AS CSD')
                    ->join('products AS P', 'P.prod_pk', '=', 'CSD.prod_fk')
                    ->join('measurements AS M', 'M.meas_pk', '=', 'CSD.meas_fk')
                    ->select(
                        'CSD.clsd_pk',

                        //'CSD.clsa_fk',

                        'P.prod_pk',
                        'P.prod_identifier',
                        'P.prod_name',

                        'M.meas_pk',
                        'M.meas_name',
                        'M.meas_abbreviation',

                        'CSD.clsd_quantity',
                        'CSD.clsd_price',
                        'CSD.clsd_discountrate'
                        //'CSD.clsd_ieps',
                        //'CSD.clsd_iva'
                    )
                    ->where('CSD.clsa_fk', '=', $vclsa_pk)
                    ->where('clsd_status', '=', 1)
                    ->get();

                $vData = 
                [
                    'client_sales' => $vCS, 
                    'client_sale_details' => $vCSD
                ];

                return $this->dbResponse($vData, 200, null, 'Información de Venta a Crédito');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Venta a Crédito No Encontrada');
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
    public function update(Request $r)
    {
        $vInput = $r->all();

        $validator = Validator::make($vInput, [
            'clsa_pk' => 'required', //PK Venta
            'clie_fk' => 'required', //PK Cliente
            'pame_fk' => 'required', //PK Metodo Pago
            'bocu_fk' => 'required', //PK Caja
            'clde_amount' => 'required', //Monto Total
        ]);


        if ($validator->fails()) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => $validator->errors()
            ], 200);
        }


        try 
        {
            //Asignacion de variables
            $vclsa_pk = $vInput['clsa_pk'];
            $vclie_fk = $vInput['clie_fk'];
            $vpame_fk = $vInput['pame_fk'];
            $vbocu_fk = $vInput['bocu_fk'];
            $vclde_amount = $vInput['clde_amount'];
            $vclpa_amount_change = $vInput['clpa_amount_change'];

            //Consultar Venta Cliente
            $vClientSale = ClientSale::where('clsa_pk', '=', $vclsa_pk)->where('clsa_status', '=', 0)->first();

            //Validar si existe la Venta Cliente
            if($vClientSale)
            { 
                //Validar Inventario

                //Consultar Venta Detallado Cliente
                $vCSDSel = ClientSaleDetail::where('clsa_fk', '=', $vclsa_pk)
                    ->where('clsd_status', '=', 1)
                    ->get();

                //Mensaje
                $vMessage = '';

                //Recorrer Venta Detallado Cliente
                foreach($vCSDSel as $vP)
                {
                    //Datos del Producto a Comprar
                    $vprod_fk = $vP->prod_fk;
                    $vclsd_quantity = $vP->clsd_quantity;

                    //Consultar si es articulo principal o es articulo derivado
                    $vProduct = Product::where('prod_pk', '=', $vprod_fk)->first();

                    if($vProduct->prod_main_pk == NULL)
                    {
                        //Buscar el Producto en el Inventario de la Sucursal 
                        $vPISel = ProductInventory::join('products AS P', 'P.prod_pk', '=', 'prod_fk')
                        ->where('prod_fk', '=', $vprod_fk)
                        ->where('prin_status', '=', 1)
                        ->where('stor_fk', '=', $vClientSale->stor_fk)
                        ->first();
                    }
                    else
                    {
                        //Buscar el Producto en el Inventario de la Sucursal || Producto Principal
                        $vPISel = ProductInventory::join('products AS P', 'P.prod_pk', '=', 'prod_fk')
                        ->where('prod_fk', '=', $vProduct->prod_main_pk)
                        ->where('prin_status', '=', 1)
                        ->where('stor_fk', '=', $vClientSale->stor_fk)
                        ->first();

                        $vclsd_quantity = $vP->clsd_quantity * $vProduct->prod_fact_convert;
                    }


                    if ($vPISel) 
                    {
                        //Datos del producto en el Inventario
                        $vprin_stock = $vPISel->prin_stock; //Stock actual

                        //Validar la cantidad del producto
                        if($vprin_stock >= $vclsd_quantity)
                        {
                            //Si aplicar Venta
                            $vVal_Dev = true;
                        }
                        else
                        {
                            //Producto Insuficiente para Venta
                            $vVal_Dev = false;
                            $vMessage =  $vPISel->prod_identifier . ' - ' . $vPISel->prod_name . ' Insuficiente para Venta. Stock Actual: ' . $vprin_stock;
                            break;
                        }
                    } 
                    else 
                    {
                        $vPSel = Product::where('prod_pk', '=', $vprod_fk)->first();

                        //Producto NO Encontrado, NO se puede Vender
                        $vVal_Dev = false;
                        $vMessage = $vPSel->prod_identifier . ' - ' . $vPSel->prod_name . ' Sin Inventario.';
                        break;
                    }
                }

                //Validar si es posible hacer toda la devolucion
                if ($vVal_Dev) 
                {
                    //Revisar metodo de pago para asignar el estatus
                    if ($vpame_fk == 1) 
                    {
                        $vclsa_status = 3;
                    } 
                    else 
                    {    
                        $vclsa_status = 2;
                    }

                    //Buscar el folio consecutivo
                    $vSystem = System::select('syst_clie_sale')->first();
                    $vsyst_clie_sale = $vSystem->syst_clie_sale;
                    $vclsa_identifier =  "Ven_" . $vsyst_clie_sale;

                    //Modificar Venta (Finalizar)
                    $vCSU = ClientSale::find($vclsa_pk);
                    $vCSU->clsa_status = $vclsa_status;
                    $vCSU->clie_fk = $vclie_fk;
                    $vCSU->pame_fk = $vpame_fk;
                    $vCSU->clsa_identifier = $vclsa_identifier;
                    $vCSU->save();

                    //////////////////  Inserción de Log  //////////////////
                    $this->getstorelog('client_sales', $vclsa_pk, 2);

                     //Modificar Folio del Venta
                     DB::table('systems')
                     ->update(['syst_clie_sale' =>  $vsyst_clie_sale + 1]);
 

                    if ($vpame_fk == 1) 
                    {
                        //De contado

                        //Consutar Monto Efectivo
                        $vCPM_Sel = ClientPaymentAmount::select('cpam_amount')->where('clsa_fk','=', $vclsa_pk)->where('pash_fk','=',1)->where('cpam_status','=',1)->first();

                        if($vCPM_Sel)
                        {
                            $vcpam_amount_new = $vCPM_Sel->cpam_amount - $vclpa_amount_change;
                            //Modificar el cambio
                            DB::table('client_payment_amounts')
                            ->where('clsa_fk', '=', $vclsa_pk)
                            ->where('pash_fk', '=', 1)
                            ->update(['cpam_amount' => $vcpam_amount_new]);
                        }
                    } 
                    else 
                    {
                        //Credito

                        //Inserción de Deuda Cliente
                        $vCD = new ClientDebt();        
                        $vCD->clie_fk = $vclie_fk;
                        $vCD->clsa_fk = $vclsa_pk;
                        $vCD->bocu_fk = $vbocu_fk;
                        $vCD->clde_amount = $vclde_amount;
                        $vCD->save();

                        //Asignación PK de Deuda Cliente
                        $vclde_fk = $vCD->clde_pk;

                        //////////////////  Inserción de Log  //////////////////
                        $this->getstorelog('client_debts', $vclde_fk, 1);


                        //Insertar Abonos de Cliente

                        $vCPM_SelAbonos = ClientPaymentAmount::where('clsa_fk','=', $vclsa_pk)->where('cpam_status','=',1)->first();

                        if($vCPM_SelAbonos)
                        {
                            //Consultar Pagos
                            $vCPASel = ClientPaymentAmount::where('clsa_fk', '=', $vclsa_pk)->where('cpam_status', '=', 1)
                            ->select
                            (
                                array
                                (
                                    DB::raw("$vclie_fk AS clie_fk"),
                                    DB::raw("$vclde_fk AS clde_fk"),
                                    'pash_fk',
                                    'bocu_fk',
                                    'cpam_amount AS clpa_amount',
                                    DB::raw("cpam_amount AS clpa_amount"),
                                    'cpam_reference AS clpa_reference',
                                    DB::raw("1 AS clpa_status"),
                                    DB::raw("NOW() AS created_at"),
                                    DB::raw("NOW() AS updated_at")
                                )
                            );
                            //Insertar Venta Detallado Cliente
                            DB::table('client_payments')
                                ->insertUsing(['clie_fk', 'clde_fk', 'pash_fk', 'bocu_fk', 'clpa_amount', 'clpa_reference', 'clpa_status', 'created_at', 'updated_at'], $vCPASel);

                        }
                    }



                    
                    


                    //Aplicar modificación de Inventario
                    foreach($vCSDSel as $vP)
                    {
                        //Datos del Producto a devolver
                        $vprod_fk = $vP->prod_fk; //PK Producto


                        if($vProduct->prod_main_pk == NULL)
                        {
                            //Buscar el Producto en el Inventario de la Sucursal 
                            $vPI = ProductInventory::join('products AS P', 'P.prod_pk', '=', 'prod_fk')
                            ->where('prod_fk', '=', $vprod_fk)
                            ->where('prin_status', '=', 1)
                            ->where('stor_fk', '=', $vClientSale->stor_fk)
                            ->first();
                            $vclsd_quantity = $vP->clsd_quantity; //Cantidad Venta
                        }
                        else
                        {
                            //Buscar el Producto en el Inventario de la Sucursal || Producto Principal
                            $vPI = ProductInventory::join('products AS P', 'P.prod_pk', '=', 'prod_fk')
                            ->where('prod_fk', '=', $vProduct->prod_main_pk)
                            ->where('prin_status', '=', 1)
                            ->where('stor_fk', '=', $vClientSale->stor_fk)
                            ->first();

                            $vclsd_quantity = $vP->clsd_quantity * $vProduct->prod_fact_convert;
                        }


                        /*Buscar el Producto en el Inventario de la Sucursal 
                        $vPI = ProductInventory::where('prod_fk', '=', $vprod_fk)
                            ->where('prin_status', '=', 1)
                            ->where('stor_fk', '=', $vClientSale->stor_fk)
                            ->first();*/

                        $vprin_pk = $vPI->prin_pk; //PK Inventario
                        $vprin_stock = $vPI->prin_stock; //Stock actual

                        //Modificar Inventario
                        $vPIU = ProductInventory::find($vprin_pk);
                        $vPIU->prin_stock = $vprin_stock - $vclsd_quantity;
                        $vPIU->save();

                        //////////////////  Inserción de Log  //////////////////
                        $this->getstorelog('product_inventories', $vprin_pk, 2);
                    }
                    
                    return response()->json([
                        'code' => 200,
                        'success' => true,
                        'message' => 'Venta Finaliza Correctamente',
                        'data' => $vclsa_pk 
                    ], 200);

                } 
                else 
                {
                    return response()->json([
                        'code' => 501,
                        'success' => false,
                        'message' => $vMessage //'Productos insuficientes para Venta. Revisar Inventario Actual'
                    ], 200);
                }
            }
            else
            {
                return response()->json([
                    'code' => 404,
                    'success' => false,
                    'message' => 'Venta No Encontrada'
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
     * @param  \App\ClientSale  $clientSale
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClientSale $clientSale)
    {
        //
    }

    public function printOrder($clsa_pk)
    {
        $total = 0;
        
        //Asignacion de variables
        $vclsa_pk = $clsa_pk;


        if ($vclsa_pk == '' || $vclsa_pk == 0) {
            return $this->dbResponse(null, 500, null, 'PK Obligatorio');
        }

        $vCS = DB::table('client_sales AS CS')
            ->join('clients AS C', 'C.clie_pk', '=', 'CS.clie_fk')
            ->leftjoin('payment_methods AS PM', 'PM.pame_pk', '=', 'CS.pame_fk')
            ->leftjoin('stores AS S', 'S.stor_pk', '=', 'CS.stor_fk')
            ->select(
                'CS.clsa_pk',
                'CS.clsa_identifier',
                'CS.clor_fk AS clor_pk',
                DB::raw('(CASE 
                    WHEN CS.clsa_status = 0 THEN "Pendiente" 
                    WHEN CS.clsa_status = 2 THEN "En Proceso de Pago" 
                    WHEN CS.clsa_status = 3 THEN "Pagado" 
                    ELSE "" END) AS clsa_status'),
                'CS.created_at',

                'C.clie_pk',
                'C.clie_identifier',
                'C.clie_name',
                'C.clie_rfc',

                'PM.pame_pk',
                'PM.pame_name',

                'S.stor_pk',
                'S.stor_name',
                'S.stor_rfc',
                'S.stor_addres',
            )
            ->where('CS.clsa_pk', '=', $vclsa_pk)
            ->first();

        if($vCS)
        {
            $vCSD = DB::table('client_sale_details AS CSD')
                ->join('products AS P', 'P.prod_pk', '=', 'CSD.prod_fk')
                ->join('measurements AS M', 'M.meas_pk', '=', 'CSD.meas_fk')
                ->select(
                    'CSD.clsd_pk',
                    'P.prod_pk',
                    'P.prod_identifier',
                    'P.prod_name',

                    'M.meas_pk',
                    'M.meas_name',
                    'M.meas_abbreviation',

                    'CSD.clsd_quantity',
                    'CSD.clsd_price',
                    'CSD.clsd_discountrate'
                )
                ->where('CSD.clsa_fk', '=', $vclsa_pk)
                ->where('clsd_status', '=', 1)
                ->get();

                $vCount = count($vCSD);

                
                if($vCount <5)
                $vHeight =120;
                else
                $vHeight = $vCount * 30;
                        

                $pdf = new \Codedge\Fpdf\Fpdf\Fpdf($orientation = 'P', $unit = 'mm', array(80, $vHeight));
                $pdf->SetMargins(2, 1, 1,1);
                $pdf->AddPage();
                $pdf->SetFont('Arial', 'B', 8);    //Letra Arial, negrita (Bold), tam. 20
                $pdf->Image(config('app.url') . '/images/logo_chocoplastic.png', 27, 2, 25);
                $pdf->Ln(12);
                //$pdf->SetY(12);
                $lineHeigth = 2;

                
                $pdf->SetFont('Arial','',8);
                // Número de página
                
                $pdf->SetFont('Arial', 'B', 4);
                $pdf->Cell(30, $lineHeigth, 'RFC:', '', '0', 'R');
                
                $pdf->SetFont('Arial', '', 3);
                $pdf->Cell(30, $lineHeigth, $vCS->stor_rfc, '', '0', 'L');
                $pdf->Ln();
               // $pdf->SetY(15);
                $pdf->SetFont('Arial', 'B', 4);
                $pdf->Cell(80, $lineHeigth, 'Domicilio Fiscal:', '', '0', 'C');
                $pdf->Ln();
                $pdf->SetFont('Arial', '', 3);
                $pdf->Cell(80, $lineHeigth, utf8_decode($vCS->stor_addres), '', '1', 'C');
                $pdf->Ln();
                //$pdf->SetY(20);
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(80, $lineHeigth,'------------------------------------------------------------------------------------------------------------------------------', '', '1', 'L');
                $pdf->Ln();
                $pdf->SetFont('Arial', 'B', 7);
                $pdf->Cell(78, $lineHeigth, $vCS->stor_name, '', '1', 'C');
                $pdf->SetFont('Arial', '', 5);
                $pdf->Ln();
                $pdf->Cell(80, $lineHeigth,'------------------------------------------------------------------------------------------------------------------------------', '', '1', 'L');
                $pdf->Ln();
                $pdf->SetFont('Arial', 'B', 6);
                $pdf->Cell(75, $lineHeigth, '' . $vCS->clsa_identifier, '', '1');
                $pdf->SetFont('Arial', '', 5);
                $pdf->Cell(75, $lineHeigth, '' . $vCS->created_at, '', '1');
                $pdf->Cell(75, $lineHeigth, 'Tipo de Pago: ' . utf8_decode($vCS->pame_name), '', '1');
                $pdf->Cell(75, $lineHeigth, 'Cliente: ' . utf8_decode($vCS->clie_name), '', '1');
                

                
                $pdf->SetFont('Arial', 'B', 5);
                $header = array('CLAVE', 'CANT.', 'UNIDAD', 'COSTO','IMPORTE');
                foreach($header as $col)
                {
                $pdf->Cell(16,7,$col,0,'C');
                }
                $pdf->Ln();
                $disprice = 0;
                $total = 0;
                foreach ($vCSD as $product) {
                    $pdf->SetFont('Arial', 'B', 5);
                    $price = $product->clsd_quantity * $product->clsd_price;  
                    $vImporte = ($product->clsd_quantity * $product->clsd_price)  * (1 - ($product->clsd_discountrate / 100));
                    $vDescuento = ($product->clsd_quantity * $product->clsd_price)  * (($product->clsd_discountrate / 100));
                    $disprice = $disprice + $vDescuento;
                    $pdf->SetFont('Arial', 'B', 5);
                    $total = $total + $price;
                    $pdf->Cell(28, $lineHeigth, substr(utf8_decode($product->prod_name), 0, 30), '', '0');
                    $pdf->Ln();
                    $pdf->SetFont('Arial', '', 5);
                    $pdf->Cell(16, $lineHeigth, $product->prod_identifier, '', '0');
                    $pdf->Cell(16, $lineHeigth, $product->clsd_quantity, '', '0');
                    $pdf->Cell(16, $lineHeigth, $product->meas_abbreviation, '', '0');
                    $pdf->Cell(8, $lineHeigth, "$" . number_format($product->clsd_price, 2), '', '0','R');
                    $pdf->Cell(18, $lineHeigth, "$" . number_format($vImporte, 2, ".", ","), 0, 1,'R');
                    $pdf->Ln();
                }
                $total1 = $total - $disprice;

                $pdf->Ln();
                $pdf->Ln();
                $pdf->Ln();
                $pdf->Cell(47, $lineHeigth, '', '', '0','L');
                $pdf->Cell(10, $lineHeigth, 'SUBTOTAL', '', '0','L');
                $pdf->Cell(17, $lineHeigth, "$" . number_format($total, 2), '', '0','R');
                $pdf->Ln(3);

                $pdf->Cell(47, $lineHeigth, '', '', '0','L');
                $pdf->Cell(10, $lineHeigth, 'DESCUENTO', '', '0','L');
                $pdf->Cell(17, $lineHeigth, "$" . number_format($disprice, 2), '', '0','R');
                $pdf->Ln(3);

                $pdf->Cell(47, $lineHeigth, '', '', '0','L');
                $pdf->Cell(10, $lineHeigth, 'IEPS', '', '0','L');
                $pdf->Cell(17, $lineHeigth, "$" . number_format(0, 2), '', '0','R');
                $pdf->Ln(3);

                $pdf->Cell(47, $lineHeigth, '', '', '0','L');
                $pdf->Cell(10, $lineHeigth, 'IVA', '', '0','L');
                $pdf->Cell(17, $lineHeigth, "$" . number_format(0, 2), '', '0','R');
                $pdf->Ln(3);

                $pdf->Cell(47, $lineHeigth, '', '', '0','L');
                $pdf->SetFont('Arial', 'B', 5);
                $pdf->Cell(10, $lineHeigth, 'TOTAL', '', '0','L');
                $pdf->Cell(17, $lineHeigth, "$" . number_format($total1, 2), '', '0','R');
                
                $pdf->SetAutoPageBreak(false);
                // Posición: a 1,5 cm del final
                $pdf->SetY(-20);
                // Arial italic 8
                $pdf->SetFont('Arial','I',4);
                // Número de página
                $pdf->Cell(0,10,'',0,0,'C');
                 
                // PIE DE PAGINA
                //$pdf->Ln(10);
                //$pdf->Cell(60,0,'',0,1,'C');
                $pdf->Ln(15);
                $pdf->Cell(80,0,utf8_decode('Favor de revisar su mercancía. No se aceptan cambios ni devoluciones.'),0,1,'C');

                ob_get_clean();
                $pdf->output('I', 'ticket', 'true');
                //exit;
            }
            
    }

    public function printCredit($clsa_pk)
    {
        $total = 0;
        
        //Asignacion de variables
        $vclsa_pk = $clsa_pk;


        if ($vclsa_pk == '' || $vclsa_pk == 0) {
            return $this->dbResponse(null, 500, null, 'PK Obligatorio');
        }

        $vCS = DB::table('client_sales AS CS')
            ->join('clients AS C', 'C.clie_pk', '=', 'CS.clie_fk')
            ->join('stores AS S', 'S.stor_pk', '=', 'CS.stor_fk')
            ->join('payment_methods AS PM', 'PM.pame_pk', '=', 'CS.pame_fk')
            ->leftjoin('client_debts AS CD','CS.clsa_pk', '=', 'CD.clsa_fk')
            ->select(
                'CS.clsa_pk',
                'CS.clsa_identifier',
                DB::raw('(CASE 
                    WHEN CS.clsa_status = 0 THEN "Pendiente" 
                    WHEN CS.clsa_status = 2 THEN "En Proceso de Pago" 
                    WHEN CS.clsa_status = 3 THEN "Pagado" 
                    ELSE "" END) AS clsa_status'),
                'CS.created_at',
                'C.clie_pk',
                'C.clie_identifier',
                'C.clie_name',
                'C.clie_rfc',

                'PM.pame_pk',
                'PM.pame_name',

                'S.stor_pk',
                'S.stor_name',
                'S.stor_rfc',
                'S.stor_addres',
                'S.stor_phone',
                'CD.clde_amount',  //Monto de la deuda
                DB::raw('(SELECT IFNULL(SUM(clpa_amount), 0) AS clde_amount_paid FROM client_payments WHERE clde_fk = CD.clde_pk) AS clde_amount_paid'), //Monto Pagado
                DB::raw('(SELECT CD.clde_amount - IFNULL(SUM(clpa_amount), 0) AS clde_amount_outstanding FROM client_payments WHERE clde_fk = CD.clde_pk) AS clde_amount_outstanding'), //Monto Pendiente por pagar
            )
            ->where('CS.clsa_pk', '=', $vclsa_pk)
            ->where('CS.pame_fk', '=', 2)
            ->first();
    
                if($vCS)
                {
                    $vCSD = DB::table('client_sale_details AS CSD')
                        ->join('products AS P', 'P.prod_pk', '=', 'CSD.prod_fk')
                        ->join('measurements AS M', 'M.meas_pk', '=', 'CSD.meas_fk')
                        ->select(
                            'CSD.clsd_pk',
                            'P.prod_pk',
                            'P.prod_identifier',
                            'P.prod_name',
                            'M.meas_pk',
                            'M.meas_name',
                            'M.meas_abbreviation',
                            'CSD.clsd_quantity',
                            'CSD.clsd_price',
                            'CSD.clsd_discountrate'
                        )
                        ->where('CSD.clsa_fk', '=', $vclsa_pk)
                        ->where('clsd_status', '=', 1)
                        ->get();
               

                $pdf = new \Codedge\Fpdf\Fpdf\Fpdf($orientation = 'P', $unit = 'mm', 'Letter');
               //$pdf->SetMargins(10, 2, 2,0);
                $pdf->SetMargins(10, 20);
                $pdf->AddPage();
                $pdf->SetFont('Arial', 'B', 8);    //Letra Arial, negrita (Bold), tam. 20
                $pdf->Image(config('app.url') . '/images/bg.png', 3, 2, 210);
                $pdf->Image(config('app.url') . '/images/logo_chocoplastic.png', 15, 10, 60);
                
                //$pdf->setY(35);
                
                $lineHeigth = 2;                
                $pdf->Ln(20);
                // Número de página
                
                $pdf->SetFont('Arial', 'B', 10);
                $pdf->Cell(10, $lineHeigth, 'RFC:', '', '0', 'L');
                
                $pdf->SetFont('Arial', '', 10);                
                $pdf->Cell(5, $lineHeigth, utf8_decode($vCS->stor_rfc), '', '0', 'L');
                
                $pdf->Ln(4);
                
                $pdf->SetFont('Arial', 'B', 10);
                $pdf->Cell(30, $lineHeigth, 'Domicilio Fiscal:', '', '0', 'L');
                
                $pdf->SetFont('Arial', '', 8);
                $pdf->Cell(5, $lineHeigth, utf8_decode($vCS->stor_addres), '', '0', 'L');
                
                $pdf->Ln(6);
                
                $pdf->SetFont('Arial', 'B', 12);
                $pdf->Cell(210, $lineHeigth, utf8_decode($vCS->stor_name), '', '1', 'C');
                
                $pdf->Ln(6);

                $pdf->SetFont('Arial', '', 10);
                $pdf->Cell(43, $lineHeigth, '' . $vCS->clsa_identifier, '', '1');
                $pdf->Ln(3);
                $pdf->Cell(43, $lineHeigth, '' . $vCS->created_at, '', '1');
                $pdf->Ln(3);
                $pdf->Cell(43, $lineHeigth, 'Tipo de Pago: ' . utf8_decode($vCS->pame_name), '', '1');
                $pdf->Ln(3);
                $pdf->Cell(43, $lineHeigth, 'Cliente: ' . utf8_decode($vCS->clie_identifier . ' ' .$vCS->clie_name), '', '1');
                $pdf->Ln(6);

                
                $pdf->SetFont('Arial', '', 10);
                 $header = array('CLAVE', 'CANT.', 'UNIDAD', 'COSTO','IMPORTE');
                 foreach($header as $col)
                 {
                        $pdf->Cell(40,7,$col, '','0','C');
                    
                 }


                $pdf->Ln(10);
                $disprice = 0;
                $total = 0;
                foreach ($vCSD as $product) {
                    $pdf->SetFont('Arial', 'B', 10);
                    $pdf->Cell(25, $lineHeigth, substr(utf8_decode($product->prod_name), 0, 30), '', '0');
                        $pdf->Ln(5);
                    $price = $product->clsd_quantity * $product->clsd_price;  
                    $pdf->SetFont('Arial', '', 10);
                        $total = $total + $price;
                        $vImporte = ($product->clsd_quantity * $product->clsd_price)  * (1 - ($product->clsd_discountrate / 100));
                        $vDescuento = ($product->clsd_quantity * $product->clsd_price)  * (($product->clsd_discountrate / 100));
                        $disprice = $disprice + $vDescuento;
                        $pdf->Cell(40, $lineHeigth, $product->prod_identifier, '', '0','C');
                        $pdf->Cell(40, $lineHeigth, $product->clsd_quantity, '', '0','C');
                        $pdf->Cell(40, $lineHeigth, $product->meas_abbreviation, '', '0','C');
                        $pdf->Cell(40, $lineHeigth, "$" . number_format($product->clsd_price, 2), '', '0','C');
                        $pdf->Cell(40, $lineHeigth, "$" . number_format($vImporte, 2, ".", ","), 0, 1,'C');
                        $pdf->Ln(3);
                }
                $total1 = $total - $disprice;
                $total1 = $total1 - $vCS->clde_amount_paid;
                
                //$pdf->SetY(-90);

                $pdf->Ln(20);
                $pdf->Cell(120, $lineHeigth, '', '', '0','L');
                $pdf->Cell(30, $lineHeigth, 'SUBTOTAL', '', '0','L');
                $pdf->Cell(30, $lineHeigth, "$" . number_format($total, 2), '', '0','R');
                $pdf->Ln(5);

                $pdf->Cell(120, $lineHeigth, '', '', '0','L');
                $pdf->Cell(30, $lineHeigth, 'DESCUENTO', '', '0','L');
                $pdf->Cell(30, $lineHeigth, "$" . number_format($disprice, 2), '', '0','R');
                $pdf->Ln(5);

                $pdf->Cell(120, $lineHeigth, '', '', '0','L');
                $pdf->Cell(30, $lineHeigth, 'IEPS', '', '0','L');
                $pdf->Cell(30, $lineHeigth, "$" . number_format(0, 2), '', '0','R');
                $pdf->Ln(5);

                $pdf->Cell(120, $lineHeigth, '', '', '0','L');
                $pdf->Cell(30, $lineHeigth, 'IVA', '', '0','L');
                $pdf->Cell(30, $lineHeigth, "$" . number_format(0, 2), '', '0','R');
                $pdf->Ln(5);

                $pdf->Cell(120, $lineHeigth, '', '', '0','L');
                $pdf->Cell(30, $lineHeigth, 'PAGADO', '', '0','L');
                $pdf->Cell(30, $lineHeigth, "$" . number_format($vCS->clde_amount_paid, 2), '', '0','R');
                $pdf->Ln(5);

                $pdf->Cell(120, $lineHeigth, '', '', '0','L');
                $pdf->Cell(30, $lineHeigth, 'TOTAL', '', '0','L');
                $pdf->SetFont('Arial', 'B', 10);
                $pdf->Cell(30, $lineHeigth, "$" . number_format($total1, 2), '', '0','R');

                $pdf->Ln(15);
                $pdf->SetFont('Arial','B',10);
                
                $pdf->Cell(180, $lineHeigth, utf8_decode(('PAGARÉ')), '', '1', 'C');

                $pdf->Ln(10);
                $pdf->SetDrawColor(0,80,180);
                $pdf->SetFont('Arial', '', 10);
                $pdf->Cell(25, $lineHeigth, utf8_decode((' ')), '', '0', 'L');
                $pdf->Cell(41, $lineHeigth, utf8_decode(('Mediante este Pagaré, yo ' )), '', '0', 'L');                
                $pdf->SetFont('Arial', 'BU', 10);
                $pdf->Cell(75, $lineHeigth, utf8_decode(($vCS->clie_name)), '', '0', 'L');                
                $pdf->SetFont('Arial', '', 10);
                $pdf->Cell(25, $lineHeigth, utf8_decode((' ')), '', '0', 'L');
                $pdf->Ln(5);
                $pdf->SetFont('Arial', '', 10);
                $pdf->Cell(25, $lineHeigth, utf8_decode((' ')), '0', '0', 'L');
                $pdf->Cell(105, $lineHeigth, utf8_decode((' prometo incondicionalmente pagar a Chocoplastic la cantidad de  ' )), '', '0', 'L');                
                $pdf->SetFont('Arial', 'BU', 10);
                $pdf->Cell(90, $lineHeigth, '$'. number_format($total1, 2), '', '0', 'L');                
                $pdf->SetFont('Arial', '', 10);
                $pdf->Cell(25, $lineHeigth, utf8_decode(('' )), '', '0', 'L');                
                $pdf->Cell(25, $lineHeigth, utf8_decode((' ')), '', '0', 'L');  
                $pdf->Ln(5);
                
                $pdf->Cell(25, $lineHeigth, utf8_decode((' ')), '0', '0', 'L');
                $pdf->Cell(90, $lineHeigth, utf8_decode((' por concepto de compra de productos a través de Crédito.' )), '0', '0', 'L');                

                $pdf->Ln(20);                
                $pdf->Cell(180, $lineHeigth, utf8_decode(('_____________________________________________' )), '0', '0', 'C');  
                $pdf->Ln(5);
                $pdf->Cell(180, $lineHeigth, utf8_decode(('Nombre y firma del cliente' )), '0', '0', 'C');                
      
                $pdf->SetAutoPageBreak(false);
                $pdf->SetY(-15);
                $pdf->SetX(7);
                $pdf->SetDrawColor(0,80,180);   
                $pdf->SetFillColor(250,70,51);
                $pdf->Cell(200,1,utf8_decode(' '),0,1,'C', true);
                $pdf->SetX(7);
                $pdf->SetFillColor(255,219,216);
                $pdf->Cell(200,8,utf8_decode($vCS->stor_name . ' TEL.' . $vCS->stor_phone),0,1,'C', true);
                ob_get_clean();
                $pdf->output('I', 'ticket', 'true');
            }
            
    }

    
}
