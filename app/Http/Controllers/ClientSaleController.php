<?php

namespace App\Http\Controllers;

use DB;
use Exception;
use Throwable;
use Validator;
use App\System;
use App\ClientDebt;
use App\ClientSale;
use App\ClientOrder;
use App\ClientPayment;
use App\ClientSaleDetail;
use App\ProductInventory;
use App\ClientOrderDetail;
use Illuminate\Http\Request;
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
        try {
            $vClientSales = DB::table('client_sales AS CS')
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
                )
                ->get();

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
                //Consultar Pedido Cliente
                /*$SelectCO = ClientOrder::where('clor_pk', '=', $vclor_pk)
                    ->select(
                        array(
                            'clie_fk', 
                            'clor_pk AS clor_fk',
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
                    , $SelectCO);*/

                //Insertar Pago del cliente
                $vCSI = new ClientSale();        
                $vCSI->clie_fk = $vClientOrder->clie_fk;
                $vCSI->clor_fk = $vClientOrder->clor_pk;
                $vCSI->clsa_status = 0;
                $vCSI->save();

                //Asignación de PK Venta Cliente
                $vclsa_pk = $vCSI->clsa_pk;

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('client_sales', $vclsa_pk, 1);

                //Consultar Venta Clente
                $vClientSale = ClientSale::where('clsa_pk', '=', $vclsa_pk)->first();

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
                $vClientSale = ClientSale::where('clor_fk', '=', $vclor_pk)->first();

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
            return $this->dbResponse(null, 500, $vTh, "Error || Consultar con el Administrador del Sistema");
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
            'stor_fk' => 'required', //PK Sucursal
            'clde_amount' => 'required', //Monto Total
            'clpa_amount_cash' => 'required', //Monto Efectivo
            'clpa_amount_transfer' => 'required', //Monto Transferencia
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
            $vstor_fk = $vInput['stor_fk'];
            $vclde_amount = $vInput['clde_amount'];
            $vclpa_amount_cash = $vInput['clpa_amount_cash'];
            $vclpa_amount_transfer = $vInput['clpa_amount_transfer'];

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

                //Recorrer Venta Detallado Cliente
                foreach($vCSDSel as $vP)
                {
                    //Datos del Producto a Comprar
                    $vprod_fk = $vP->prod_fk;
                    $vclsd_quantity = $vP->clsd_quantity;

                    //Buscar el Producto en el Inventario de la Sucursal 
                    $vPISel = ProductInventory::where('prod_fk', '=', $vprod_fk)
                        ->where('prin_status', '=', 1)
                        ->where('stor_fk', '=', $vClientSale->stor_fk)
                        ->first();

                    if ($vPISel) 
                    {
                        //Datos del producto en el Inventario
                        $vprin_stock = $vPISel->prin_stock; //Stock actual

                        //Validar la cantidad del producto
                        if($vprin_stock > $vclsd_quantity)
                        {
                            //Si aplicar Venta
                            $vVal_Dev = true;
                        }
                        else
                        {
                            //Producto Insuficiente para Venta
                            $vVal_Dev = false;
                            break;
                        }
                    } 
                    else 
                    {
                        //Producto NO Encontrado, NO se puede Vender
                        $vVal_Dev = false;
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
                    DB::table('client_sales')
                    ->where('clsa_pk', '=', $vclsa_pk)
                    ->update([
                        'clsa_status' =>  $vclsa_status, 
                        'clie_fk' =>  $vclie_fk, 
                        'pame_fk' =>  $vpame_fk, 
                        'stor_fk' => $vstor_fk, 
                        'clsa_identifier' => $vclsa_identifier
                    ]);

                    //////////////////  Inserción de Log  //////////////////
                    $this->getstorelog('client_sales', $vclsa_pk, 2);


                    if ($vpame_fk == 1) 
                    {
                        //De contado
                    } 
                    else 
                    {
                        //Credito

                        //Inserción de Deuda Cliente
                        $vCD = new ClientDebt();        
                        $vCD->clie_fk = $vclie_fk;
                        $vCD->clsa_fk = $vclsa_pk;
                        $vCD->clde_amount = $vclde_amount;
                        $vCD->save();

                        //Asignación PK de Deuda Cliente
                        $vclde_fk = $vCD->clde_pk;

                        //////////////////  Inserción de Log  //////////////////
                        $this->getstorelog('client_debts', $vclde_fk, 1);


                        //Insertar Abonos de Cliente

                        //Efectivo
                        if($vclpa_amount_cash > 0)
                        {
                            $vCPC = new ClientPayment();        
                            $vCPC->clie_fk = $vclie_fk;
                            $vCPC->clde_fk = $vclde_fk;
                            $vCPC->pash_fk = 1;
                            $vCPC->clpa_amount = $vclpa_amount_cash;
                            $vCPC->save();

                            //Asignación PK de Deuda Cliente
                            $vclpa_pk = $vCPC->clpa_pk;

                            //////////////////  Inserción de Log  //////////////////
                            $this->getstorelog('client_payments', $vclpa_pk, 1);
                        }

                        //Transferencia
                        if($vclpa_amount_transfer > 0)
                        {
                            $vCPT = new ClientPayment();        
                            $vCPT->clie_fk = $vclie_fk;
                            $vCPT->clde_fk = $vclde_fk;
                            $vCPT->pash_fk = 2;
                            $vCPT->clpa_amount = $vclpa_amount_transfer;
                            $vCPT->save(); 

                            //Asignación PK de Deuda Cliente
                            $vclpa_pk2 = $vCPT->clpa_pk;

                            //////////////////  Inserción de Log  //////////////////
                            $this->getstorelog('client_payments', $vclpa_pk2, 1);
                        }
                    }

                    //Modificar Folio del Venta
                    DB::table('systems')
                    ->update(['syst_clie_sale' =>  $vsyst_clie_sale + 1]);


                    //Aplicar modificación de Inventario
                    foreach($vCSDSel as $vP)
                    {
                        //Datos del Producto a devolver
                        $vprod_fk = $vP->prod_fk; //PK Producto
                        $vclsd_quantity = $vP->clsd_quantity; //Cantidad Venta

                        //Buscar el Producto en el Inventario de la Sucursal 
                        $vPI = ProductInventory::where('prod_fk', '=', $vprod_fk)
                            ->where('prin_status', '=', 1)
                            ->where('stor_fk', '=', $vClientSale->stor_fk)
                            ->first();

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
                        'data' => $vclsa_identifier 
                    ], 200);

                } 
                else 
                {
                    return response()->json([
                        'code' => 501,
                        'success' => false,
                        'message' => 'Productos insuficientes para Venta. Revisar Inventario Actual'
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
}
