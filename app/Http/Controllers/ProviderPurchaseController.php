<?php

namespace App\Http\Controllers;

use DB;
use Throwable;
use Validator;
use App\System;
use App\ProviderDebt;
use App\ProviderPurchase;
use Illuminate\Http\Request;
use App\ProviderPurchaseOrder;
use App\ProviderPurchaseOrderDetail;
use App\Http\Controllers\api\ApiResponseController;
use App\ProductInventory;
use App\ProviderPurchaseDetail;

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

            $vPO = DB::table('provider_purchases AS PP')
                ->leftjoin('provider_purchase_orders AS PPO', 'PPO.prpo_pk', '=', 'PP.prpo_fk')
                ->leftjoin('providers AS P', 'P.prov_pk', '=', 'PP.prov_fk')
                ->leftjoin('stores AS S', 'S.stor_pk', '=', 'PP.stor_fk')
                ->leftjoin('payment_methods AS PM', 'PM.pame_pk', '=', 'PP.pame_fk')
                ->select(
                    'PP.prpu_pk',
                    'PP.prpu_identifier',
                    'PP.prpu_type',
                    'PP.created_at',
                    DB::raw('
                        (CASE 
                            WHEN PP.prpu_type = 1 THEN "Por orden de compra" 
                            WHEN PP.prpu_type = 2 THEN "Compra directa" 
                            ELSE "" END
                        ) AS prpu_type_description'),
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

                    'P.prov_identifier',
                    'P.prov_name',
                    'P.prov_rfc',

                    'PM.pame_name',

                    'S.stor_name'
                )
                //->where('PPO.prpo_status', '<>', 0)
                ->orderByDesc('PP.prpu_pk')
                ->get();
            
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

        try {
            //Asignacion de variables
           $vprpo_pk = $vInput['prpo_pk'];

            $vProvPO = ProviderPurchaseOrder::where('prpo_pk', '=', $vprpo_pk)->where('prpo_status', '=', 2)->first();

            if($vProvPO)
            { 
                //Insertar Encabezado de Compra
                $SelectPPO = ProviderPurchaseOrder::where('prpo_pk', '=', $vprpo_pk)
                    ->select(
                        array(
                            'prpo_pk AS prpo_fk',
                            'prov_fk', 
                            'stor_fk', 
                            DB::raw("1 AS prpu_type"),
                            DB::raw("1 AS prpu_status"),
                            DB::raw("NOW() AS created_at"),
                            DB::raw("NOW() AS updated_at")
                        )
                    );
                DB::table('provider_purchases')
                    ->insertUsing(
                        [
                            'prpo_fk', 
                            'prov_fk',
                            'stor_fk', 
                            'prpu_type', 
                            'prpu_status', 
                            'created_at', 
                            'updated_at'
                        ]
                    , $SelectPPO);

                    //$vProviderPurchase = ProviderPurchase::orderBy('created_at', 'DESC')->first();

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

                $SelectPPOD = ProviderPurchaseOrderDetail::where('prpo_fk', '=', $vprpo_pk)->where('ppod_status', '=', 1)
                    ->select(
                          array(
                            DB::raw("$vProviderPurchase->prpu_pk AS prpu_fk"),
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


                $vProviderPurchaseDetail = DB::table('provider_purchase_details AS PPD')
                    ->join('products AS P', 'P.prod_pk', '=', 'PPD.prod_fk')
                    ->join('measurements AS M', 'M.meas_pk', '=', 'PPD.meas_fk')
                    ->select(
                        'PPD.prpd_pk',
                        'PPD.prpu_fk',

                        'P.prod_pk',
                        'P.prod_identifier',
                        'P.prod_name',

                        'M.meas_pk',
                        'M.meas_name',
                        'M.meas_abbreviation',

                        'PPD.prpd_quantity',
                        'PPD.prpd_price',
                        'PPD.prpd_discountrate',
                        'PPD.prpd_ieps',
                        'PPD.prpd_iva',
                        'PPD.prpd_status'
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
                //$vProviderPurchase = ProviderPurchase::where('prpo_fk', '=', $vprpo_pk)->first();

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

                        'M.meas_pk',
                        'M.meas_name',
                        'M.meas_abbreviation',

                        'PPD.prpd_quantity',
                        'PPD.prpd_price',
                        'PPD.prpd_discountrate',
                        'PPD.prpd_ieps',
                        'PPD.prpd_iva',
                        'PPD.prpd_status'
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

        try {

            $vPP = DB::table('provider_purchases AS PP')
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
            ->where('prpu_pk', '=', $prpu_pk)
            ->first();

            if($vPP)
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

                        'M.meas_pk',
                        'M.meas_name',
                        'M.meas_abbreviation',

                        'PPD.prpd_quantity',
                        'PPD.prpd_price',
                        'PPD.prpd_discountrate',
                        'PPD.prpd_ieps',
                        'PPD.prpd_iva',
                        'PPD.prpd_status'
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
                $vPPD = ProviderPurchaseDetail::where('prpu_fk', '=', $vprpu_pk)
                        ->where('prpd_status', '=', 1)
                        ->get();
                
                foreach($vPPD as $vP)
                {
                    $vProduct = $vP->prod_fk;
                    $vprpd_quantity = $vP->prpd_quantity;

                    //Buscar Producto en el Inventario 
                    $vPI = ProductInventory::where('prod_fk', '=', $vProduct)
                            ->where('prin_status', '=', 1)
                            ->where('stor_fk', '=', $vPP->stor_fk)
                            ->first();

                    if ($vPI) 
                    {
                        $vprin_pk = $vPI->prin_pk; //Llave primaria del Inventario
                        $vprin_stock = $vPI->prin_stock; //Stock actual

                        //Modificar Producto Inventario
                        $vPIU = ProductInventory::find($vprin_pk);
                        $vPIU->prin_stock = $vprin_stock + $vprpd_quantity;
                        $vPIU->save();
                        
                    } 
                    else 
                    {
                        //Insertar Producto Inventario
                        $vPI = new ProductInventory();        
                        $vPI->prod_fk = $vProduct;
                        $vPI->stor_fk = $vPP->stor_fk;
                        $vPI->prin_stock = $vprpd_quantity;
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
