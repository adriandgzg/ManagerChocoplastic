<?php

namespace App\Http\Controllers;

use DB;
use Throwable;
use Validator;
use App\System;
use App\ProviderDebt;
use App\ProductInventory;
use App\ProviderPurchase;
use Illuminate\Http\Request;
use App\ProviderPurchaseOrder;
use App\ProviderPurchaseOrderDetail;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\api\ApiResponseController;

class ProviderPurchaseController extends ApiResponseController
{
    /**
     * Display a listing of the resource. 
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $vStore = Auth::user()->store_id;
            $vrole_id = Auth::user()->role_id;

            if($vrole_id == 1)
            {

                $vPO = DB::table('provider_purchases AS PP')
                    ->leftjoin('provider_purchase_orders AS PPO', 'PPO.prpo_pk', '=', 'PP.prpo_fk')
                    ->leftjoin('providers AS P', 'P.prov_pk', '=', 'PP.prov_fk')
                    ->leftjoin('stores AS S', 'S.stor_pk', '=', 'PP.stor_fk')
                    ->leftjoin('payment_methods AS PM', 'PM.pame_pk', '=', 'PP.pame_fk')
                    ->select(
                        'PP.prpu_pk',
                        'PP.prpu_identifier',
                        'PP.prpu_observation',
                        'PP.prpu_type',
                        'PP.created_at',
                        DB::raw('
                            (CASE 
                                WHEN PP.prpu_type = 1 THEN "Orden Compra" 
                                WHEN PP.prpu_type = 2 THEN "Compra Directa" 
                                ELSE "" END
                            ) AS prpu_type_description'),
                        'PP.prpu_status',
                        DB::raw('
                            (CASE 
                                WHEN PP.prpu_status = 0 THEN "Cancelada" 
                                WHEN PP.prpu_status = 1 THEN "Pendiente" 
                                WHEN PP.prpu_status = 2 THEN "Proceso Pago" 
                                WHEN PP.prpu_status = 3 THEN "Pagado" 
                                ELSE "" END
                            ) AS prpu_status_description'),

                        'PPO.prpo_pk',
                        'PPO.prpo_identifier',

                        'P.prov_identifier',
                        'P.prov_name',
                        'P.prov_rfc',

                        'PM.pame_name',

                        'S.stor_name',
                        DB::raw('(SELECT COUNT(*) AS Cant FROM provider_returns WHERE prre_status = 2 AND prpu_fk = PP.prpu_pk) AS cantreturn') //Cantidad de Devoluciones

                    )
                    ->orderByDesc('PP.prpu_pk')
                    ->get();
            }
            else
            {
                $vPO = DB::table('provider_purchases AS PP')
                    ->leftjoin('provider_purchase_orders AS PPO', 'PPO.prpo_pk', '=', 'PP.prpo_fk')
                    ->leftjoin('providers AS P', 'P.prov_pk', '=', 'PP.prov_fk')
                    ->leftjoin('stores AS S', 'S.stor_pk', '=', 'PP.stor_fk')
                    ->leftjoin('payment_methods AS PM', 'PM.pame_pk', '=', 'PP.pame_fk')
                    ->select(
                        'PP.prpu_pk',
                        'PP.prpu_identifier',
                        'PP.prpu_observation',
                        'PP.prpu_type',
                        'PP.created_at',
                        DB::raw('
                            (CASE 
                                WHEN PP.prpu_type = 1 THEN "Orden Compra" 
                                WHEN PP.prpu_type = 2 THEN "Compra Directa" 
                                ELSE "" END
                            ) AS prpu_type_description'),
                        'PP.prpu_status',
                        DB::raw('
                            (CASE 
                                WHEN PP.prpu_status = 0 THEN "Cancelada" 
                                WHEN PP.prpu_status = 1 THEN "Pendiente" 
                                WHEN PP.prpu_status = 2 THEN "Proceso Pago" 
                                WHEN PP.prpu_status = 3 THEN "Pagado" 
                                ELSE "" END
                            ) AS prpu_status_description'),

                        'PPO.prpo_pk',
                        'PPO.prpo_identifier',

                        'P.prov_identifier',
                        'P.prov_name',
                        'P.prov_rfc',

                        'PM.pame_name',

                        'S.stor_name',
                        DB::raw('(SELECT COUNT(*) AS Cant FROM provider_returns WHERE prre_status = 2 AND prpu_fk = PP.prpu_pk) AS cantreturn') //Cantidad de Devoluciones
                    )
                    ->where('S.stor_pk', '=', $vStore)
                    ->orderByDesc('PP.prpu_pk')
                    ->get();

            }
            
            return $this->dbResponse($vPO, 200, null, 'Lista de Compra de Proveedor');
          
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
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
    public function store(Request $r)
    {
        $vInput = $r->all();

        $vVal = Validator::make($vInput, [
            'prpo_pk' => 'required|int' // PK Orden de Compra Proveedor
        ]);

        if ($vVal->fails()) {
            return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
        }

        try 
        {
            //Asignacion de variables
           $vprpo_pk = $vInput['prpo_pk'];

            $vProvPO = ProviderPurchaseOrder::where('prpo_pk', '=', $vprpo_pk)->where('prpo_status', '=', 2)->first();

            //Consultar Tabla de Configuración
            $vSys = DB::table('systems AS S')->select('S.syst_iva','S.syst_ieps')->first();


            if($vProvPO)
            { 
                //Insertar Encabezado de Compra
                $vPPO = ProviderPurchaseOrder::where('prpo_pk', '=', $vprpo_pk)->first();

                //Inserción Compra
                $vPP = new ProviderPurchase();
                $vPP->prpo_fk = $vPPO->prpo_pk;
                $vPP->prov_fk = $vPPO->prov_fk;
                $vPP->stor_fk = $vPPO->stor_fk;
                $vPP->prpu_type = 1;
                $vPP->prpu_status = 1;
                $vPP->save();

                //Asignación de PK de Compra Proveedor
                $vprpu_pk = $vPP->prpu_pk;

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('provider_purchases', $vprpu_pk, 1);

                $vProviderPurchase = DB::table('provider_purchases AS PP')
                    ->leftjoin('provider_purchase_orders AS PPO', 'PPO.prpo_pk', '=', 'PP.prpo_fk')
                    ->leftjoin('providers AS P', 'P.prov_pk', '=', 'PP.prov_fk')
                    ->leftjoin('stores AS S', 'S.stor_pk', '=', 'PP.stor_fk')
                    ->leftjoin('payment_methods AS PM', 'PM.pame_pk', '=', 'PP.pame_fk')
                    ->select(
                        'PP.prpu_pk',
                        'PP.prpu_identifier',
                        DB::raw('
                            (CASE 
                                WHEN PP.prpu_type = 1 THEN "Por orden de compra" 
                                WHEN PP.prpu_type = 2 THEN "Compra directa" 
                                ELSE "" END
                            ) AS prpu_type'),
                        'PP.prpu_status',
                        DB::raw('
                            (CASE 
                                WHEN PP.prpu_status = 0 THEN "Cancelada" 
                                WHEN PP.prpu_status = 1 THEN "Pendiente" 
                                WHEN PP.prpu_status = 2 THEN "En Proceso de Pago" 
                                WHEN PP.prpu_status = 3 THEN "Pagado" 
                                ELSE "" END
                            ) AS prpu_status_description'),

                        'PPO.prpo_pk',
                        'PPO.prpo_identifier',

                        'PP.prov_fk',
                        'P.prov_identifier',
                        'P.prov_name',
                        'P.prov_rfc',

                        'PP.pame_fk',
                        'PM.pame_name',

                        'PP.stor_fk',
                        'S.stor_name'
                    )
                    ->where('prpo_fk', '=', $vprpo_pk)
                    ->first();


                //Insertar Detallado de Compra
                $SelectPPOD = 
                    ProviderPurchaseOrderDetail::where('prpo_fk', '=', $vprpo_pk)->where('ppod_status', '=', 1)
                    ->select(
                    array
                    (
                        DB::raw("$vprpu_pk AS prpu_fk"),
                        'prod_fk AS prod_fk',
                        'meas_fk AS meas_fk',
                        'ppod_quantity AS prpd_quantity',
                        'ppod_providerprice AS prpd_price',
                        'ppod_discountrate AS prpd_discountrate',
                        'ppod_ieps AS prpd_ieps',
                        'ppod_iva AS prpd_iva',
                        DB::raw("1 AS prpd_status"),
                        DB::raw("NOW() AS created_at"),
                        DB::raw("NOW() AS updated_at")
                    )
                );

                DB::table('provider_purchase_details')
                    ->insertUsing(
                        [
                            'prpu_fk',
                            'prod_fk', 
                            'meas_fk',
                            'prpd_quantity', 
                            'prpd_price', 
                            'prpd_discountrate', 
                            'prpd_ieps', 
                            'prpd_iva', 
                            'prpd_status', 
                            'created_at', 
                            'updated_at'
                        ]
                    , $SelectPPOD);

                            
                //Modificar Orden de Compra a Procesado
                DB::table('provider_purchase_orders')
                ->where('prpo_pk', '=', $vprpo_pk)
                ->update(['prpo_status' =>  3]);

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('provider_purchase_orders', $vprpo_pk, 2);


                $vProviderPurchaseDetail = DB::table('provider_purchase_details AS PPD')
                    ->join('products AS P', 'P.prod_pk', '=', 'PPD.prod_fk')
                    ->join('measurements AS M', 'M.meas_pk', '=', 'PPD.meas_fk')
                    ->select(
                        'PPD.prpd_pk',
                        'PPD.prpu_fk',

                        'P.prod_pk',
                        'P.prod_identifier',
                        'P.prod_name',
                        'P.prod_iva',
                        'P.prod_ieps',

                        'M.meas_pk',
                        'M.meas_name',
                        'M.meas_abbreviation',

                        'PPD.prpd_quantity',
                        'PPD.prpd_price',
                        'PPD.prpd_discountrate',
                        'PPD.prpd_ieps',
                        'PPD.prpd_iva',
                        'PPD.prpd_status',

                        DB::raw("$vSys->syst_iva AS syst_iva"),
                        DB::raw("$vSys->syst_ieps AS syst_ieps")
                    )
                    ->where('PPD.prpu_fk', '=', $vProviderPurchase->prpu_pk)
                    ->where('PPD.prpd_status', '=', 1)
                    ->get();

                return response()->json([
                    'code' => 200,
                    'success' => true,
                    'message' => 'Orden de Compra Convertida a Compra',
                    'data' => 
                            [
                                'ProviderPurchase' => $vProviderPurchase, 
                                'ProviderPurchaseDetail' => $vProviderPurchaseDetail
                            ]
                ], 200);

            }
            else
            {
                $vProviderPurchase = DB::table('provider_purchases AS PP')
                ->leftjoin('provider_purchase_orders AS PPO', 'PPO.prpo_pk', '=', 'PP.prpo_fk')
                ->leftjoin('providers AS P', 'P.prov_pk', '=', 'PP.prov_fk')
                ->leftjoin('stores AS S', 'S.stor_pk', '=', 'PP.stor_fk')
                ->leftjoin('payment_methods AS PM', 'PM.pame_pk', '=', 'PP.pame_fk')
                ->select(
                    'PP.prpu_pk',
                    'PP.prpu_identifier',
                    DB::raw('
                        (CASE 
                            WHEN PP.prpu_type = 1 THEN "Por orden de compra" 
                            WHEN PP.prpu_type = 2 THEN "Compra directa" 
                            ELSE "" END
                        ) AS prpu_type'),
                    'PP.prpu_status',
                    DB::raw('
                        (CASE 
                            WHEN PP.prpu_status = 0 THEN "Cancelada" 
                            WHEN PP.prpu_status = 1 THEN "Pendiente" 
                            WHEN PP.prpu_status = 2 THEN "En Proceso de Pago" 
                            WHEN PP.prpu_status = 3 THEN "Pagado" 
                            ELSE "" END
                        ) AS prpu_status_description'),

                    'PPO.prpo_pk',
                    'PPO.prpo_identifier',

                    'PP.prov_fk',
                    'P.prov_identifier',
                    'P.prov_name',
                    'P.prov_rfc',

                    'PP.pame_fk',
                    'PM.pame_name',

                    'PP.stor_fk',
                    'S.stor_name'
                )
                ->where('prpo_fk', '=', $vprpo_pk)
                ->first();

                if($vProviderPurchase)
                { 
                    $vProviderPurchaseDetail = DB::table('provider_purchase_details AS PPD')
                        ->join('products AS P', 'P.prod_pk', '=', 'PPD.prod_fk')
                        ->join('measurements AS M', 'M.meas_pk', '=', 'PPD.meas_fk')
                        ->select(
                            'PPD.prpd_pk',
                            'PPD.prpu_fk',

                            'P.prod_pk',
                            'P.prod_identifier',
                            'P.prod_name',
                            'P.prod_iva',
                            'P.prod_ieps',

                            'M.meas_pk',
                            'M.meas_name',
                            'M.meas_abbreviation',

                            'PPD.prpd_quantity',
                            'PPD.prpd_price',
                            'PPD.prpd_discountrate',
                            'PPD.prpd_ieps',
                            'PPD.prpd_iva',
                            'PPD.prpd_status',

                            DB::raw("$vSys->syst_iva AS syst_iva"),
                            DB::raw("$vSys->syst_ieps AS syst_ieps")
                        )
                        ->where('PPD.prpu_fk', '=', $vProviderPurchase->prpu_pk)
                        ->where('PPD.prpd_status', '=', 1)
                        ->get();
                }
                else
                {
                    $vProviderPurchaseDetail = null;
                }

                return response()->json([
                    'code' => 404,
                    'success' => false,
                    'message' => 'Orden de Compra No Encontrado',
                    'data' => 
                            [
                                'ProviderPurchase' => $vProviderPurchase, 
                                'ProviderPurchaseDetail' => $vProviderPurchaseDetail
                            ]
                ], 200);
            }

        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProviderPurchase  $providerPurchase
     * @return \Illuminate\Http\Response
     */
    public function show($prpu_pk)
    {

        try 
        {
            //Consultar Tabla de Configuración
            $vSys = DB::table('systems AS S')->select('S.syst_iva','S.syst_ieps')->first();

            $vPP = DB::table('provider_purchases AS PP')
            ->leftjoin('provider_purchase_orders AS PPO', 'PPO.prpo_pk', '=', 'PP.prpo_fk')
            ->leftjoin('providers AS P', 'P.prov_pk', '=', 'PP.prov_fk')
            ->leftjoin('stores AS S', 'S.stor_pk', '=', 'PP.stor_fk')
            ->leftjoin('payment_methods AS PM', 'PM.pame_pk', '=', 'PP.pame_fk')
            ->select(
                'PP.prpu_pk',
                'PP.prpu_identifier',
                'PP.prpu_observation',
                'PP.created_at',
                DB::raw('
                    (CASE 
                        WHEN PP.prpu_type = 1 THEN "Por orden de compra" 
                        WHEN PP.prpu_type = 2 THEN "Compra directa" 
                        ELSE "" END
                    ) AS prpu_type'),
                'PP.prpu_status',
                DB::raw('
                    (CASE 
                        WHEN PP.prpu_status = 0 THEN "Cancelada" 
                        WHEN PP.prpu_status = 1 THEN "Pendiente" 
                        WHEN PP.prpu_status = 2 THEN "En Proceso de Pago" 
                        WHEN PP.prpu_status = 3 THEN "Pagado" 
                        ELSE "" END
                    ) AS prpu_status_description'),

                'PPO.prpo_pk',
                'PPO.prpo_identifier',

                'PP.prov_fk',
                'P.prov_identifier',
                'P.prov_name',
                'P.prov_rfc',

                'PP.pame_fk',
                'PM.pame_name',

                'PP.stor_fk',
                'S.stor_name'
            )
            ->where('prpu_pk', '=', $prpu_pk)
            ->first();

            if($vPP)
            { 

                $vProviderPurchaseDetail = DB::table('provider_purchase_details AS PPD')
                    ->join('products AS P', 'P.prod_pk', '=', 'PPD.prod_fk')
                    ->leftjoin('measurements AS M', 'M.meas_pk', '=', 'PPD.meas_fk')
                    ->select(
                        'PPD.prpd_pk',
                        'PPD.prpu_fk',

                        'P.prod_pk',
                        'P.prod_identifier',
                        'P.prod_name',
                        'P.prod_iva',
                        'P.prod_ieps',

                        'M.meas_pk',
                        'M.meas_name',
                        'M.meas_abbreviation',

                        'PPD.prpd_quantity',
                        'PPD.prpd_price',
                        'PPD.prpd_discountrate',
                        'PPD.prpd_ieps',
                        'PPD.prpd_iva',
                        'PPD.prpd_status',

                        DB::raw("$vSys->syst_iva AS syst_iva"),
                        DB::raw("$vSys->syst_ieps AS syst_ieps")

                    )
                    ->where('PPD.prpu_fk', '=', $prpu_pk)
                    ->where('PPD.prpd_status', '=', 1)
                    ->get();

                return response()->json([
                    'code' => 200,
                    'success' => true,
                    'message' => 'Compra Detalle',
                    'data' => 
                            [
                                'ProviderPurchase' => $vPP, 
                                'ProviderPurchaseDetail' => $vProviderPurchaseDetail
                            ]
                ], 200);

            }
            else
            {
                return response()->json([
                    'code' => 404,
                    'success' => false,
                    'message' => 'Compra No Encontrado'
                ], 200);
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
     * @param  \App\ProviderPurchase  $providerPurchase
     * @return \Illuminate\Http\Response
     */
    public function edit(ProviderPurchase $providerPurchase)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProviderPurchase  $providerPurchase
     * @return \Illuminate\Http\Response
     */
    public function update(Request $r)
    {
        try 
        {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prpu_pk' => 'required|int', //PK Compra 
                'pame_fk' => 'required|int', //PK Metodo de Pago
                'prov_fk' => 'required|int', //PK Proveedor
                'prpu_amount' => 'required' //Monto Total
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprpu_pk = $vInput['prpu_pk'];
            $vpame_fk = $vInput['pame_fk'];
            $vprov_fk = $vInput['prov_fk'];
            $vprpu_amount = $vInput['prpu_amount'];
            $vprpu_observation = $vInput['prpu_observation'];
            
            //Buscar el folio consecutivo
            $vSystem = System::select('syst_prov_purchase')->first();
            $vsyst_prov_purchase = $vSystem->syst_prov_purchase;
            $vprpu_identifier =  "PPU_" . $vsyst_prov_purchase;

            //Validar Si Existe la Compra
            $vPP = ProviderPurchase::where('prpu_pk', '=', $vprpu_pk)->first();
            if ($vPP) 
            {
                if ($vpame_fk == 1) {
                    $vprpu_status = 3;
                } 
                else 
                {
                    $vprpu_status = 2;
                }

                //Modificar Compra
                $vPPU = ProviderPurchase::find($vprpu_pk);
                $vPPU->pame_fk = $vpame_fk;
                $vPPU->prov_fk = $vprov_fk;
                $vPPU->prpu_identifier = $vprpu_identifier;
                $vPPU->prpu_observation = $vprpu_observation;
                $vPPU->prpu_status = $vprpu_status;
                $vPPU->save();

                $vprpu_fk = $vPPU->prpu_pk;

                //Modificar Folio de la Orden de Compra del Proveedor
                DB::table('systems')
                ->update(['syst_prov_purchase' =>  $vsyst_prov_purchase + 1]);


                if ($vpame_fk == 2) {
                    //Credito
                    //Inserción de deuda al Proveedor
                    $vPD = new ProviderDebt();        
                    $vPD->prov_fk = $vprov_fk;
                    $vPD->prpu_fk = $vprpu_fk;
                    $vPD->prde_amount = $vprpu_amount;
                    $vPD->save();
                }


                /////////////////////////////////Anexo de Inventario
                $vPPD = DB::table('provider_purchase_details AS PPD')
                    ->join('products AS P', 'P.prod_pk', '=', 'PPD.prod_fk')
                    ->select('P.prod_pk','P.meas_fk_output','P.prod_packingquantity', 'PPD.prpd_quantity', 'PPD.meas_fk AS meas_fk_ppd')
                    ->where('PPD.prpu_fk', '=', $vprpu_pk)
                    ->where('PPD.prpd_status', '=', 1)
                    ->get();
                
                foreach($vPPD as $vP)
                {
                    $vprod_pk = $vP->prod_pk; //Llave primaria de producto
                    $vmeas_fk_output = $vP->meas_fk_output; //Llave foranea de la unidad de medida de salida
                    $vmeas_fk_ppd = $vP->meas_fk_ppd; //Llave foranea de la unidad de la compra
                    $vprod_packingquantity = $vP->prod_packingquantity; //Cantidad Empaque
                    $vprpd_quantity = $vP->prpd_quantity; //Cantidad de la compra

                    //Validar en que unidad de medida se hizo la compra
                    if($vmeas_fk_ppd == $vmeas_fk_output)
                    {
                        $vCantOutput = $vprpd_quantity; //No se multiplica por la cantidad de empaque
                    }
                    else
                    {
                        $vCantOutput = $vprpd_quantity * $vprod_packingquantity; //Cantidad a antexar al inventario
                    }


                    //Buscar Producto en el Inventario 
                    $vPI = ProductInventory::where('prod_fk', '=', $vprod_pk)
                        ->where('prin_status', '=', 1)
                        ->where('stor_fk', '=', 1)
                        ->first();

                    if ($vPI) 
                    {
                        $vprin_pk = $vPI->prin_pk; //Llave primaria del Inventario
                        $vprin_stock = $vPI->prin_stock; //Stock actual

                        //Modificar Producto Inventario
                        $vPIU = ProductInventory::find($vprin_pk);
                        $vPIU->prin_stock = $vprin_stock + $vCantOutput;
                        $vPIU->save();                        
                    } 
                    else 
                    {
                        //Insertar Producto Inventario
                        $vPI = new ProductInventory();        
                        $vPI->prod_fk = $vprod_pk;
                        $vPI->meas_fk_output = $vmeas_fk_output;
                        $vPI->prin_stock = $vCantOutput;
                        $vPI->stor_fk = config('app.parent_store'); //Toda alta de inventario por compra es a matriz
                        $vPI->save();
                    }
                }
                return $this->dbResponse($vprpu_pk, 200, null, 'Compra Guardada Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Compra NO Encontrada');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProviderPurchase  $providerPurchase
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r)
    {
        try 
        {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prpu_pk' => 'required|int' //PK Compra 
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprpu_pk = $vInput['prpu_pk'];

            //Validar Si Existe Orden de Compra
            $vPP = ProviderPurchase::where('prpu_pk', '=', $vprpu_pk)->first();
            if ($vPP) 
            {
                //Eliminar Compra
                $vPPU = ProviderPurchase::find($vprpu_pk);
                $vPPU->prpu_status = 0;
                $vPPU->save();
                    
                return $this->dbResponse($vprpu_pk, 200, null, 'Compra Eliminado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Compra NO Encontrado');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    
}
