<?php

namespace App\Http\Controllers;

use DB;
use Throwable;
use Validator;
use App\ProductInventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\api\ApiResponseController;

class ProductInventoryController extends ApiResponseController
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
            //PK Sucursal 
            $vStore = Auth::user()->store_id;

            $vrole_id = Auth::user()->role_id;

            if($vrole_id == 1)
            {
                $vPI = DB::table('product_inventories AS PI')
                ->join('products AS P', 'P.prod_pk', '=', 'PI.prod_fk')
                ->join('measurements AS M', 'M.meas_pk', '=', 'PI.meas_fk_output')
                ->join('stores AS S', 'S.stor_pk', '=', 'PI.stor_fk')
                ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                ->select(
                    'PI.prin_pk',
                    'PI.prin_stock',
                    'PI.updated_at',

                    'P.prod_pk',
                    'P.prod_identifier',
                    'P.prod_name',
                    'P.prod_description',
                    'P.prod_image',
                    'P.prod_bulk',

                    'M.meas_pk',
                    'M.meas_name',

                    'PC.prca_pk',
                    'PC.prca_name',

                    'S.stor_pk',
                    'S.stor_name',
              
                    DB::raw("
                        (
                            IFNULL((
                                SELECT 
                                    IFNULL(SUM(B.clod_quantity), 0) AS CantProductoPadre
                                FROM 
                                    client_orders AS A 
                                    INNER JOIN client_order_details AS B ON A.clor_pk = B.clor_fk 
                                WHERE 
                                    A.clor_status = 1 
                                    AND B.clod_status = 1 
                                    AND B.prod_fk = P.prod_pk 
                                    AND A.stor_fk = S.stor_pk
                            ), 0)
                                +
                            IFNULL((
                                SELECT 
                                SUM((IFNULL(B.clod_quantity, 0) * IFNULL(C.prod_fact_convert, 0))) AS CantProductoDerivado
                                FROM 
                                    client_orders AS A 
                                    INNER JOIN client_order_details AS B ON A.clor_pk = B.clor_fk 
                                    INNER JOIN products AS C ON C.prod_pk = B.prod_fk
                                WHERE 
                                    A.clor_status = 1 
                                    AND B.clod_status = 1 
                                    AND A.stor_fk = S.stor_pk
                                    AND C.prod_main_pk = P.prod_pk
                            ), 0)
                                +
                            IFNULL((
                                SELECT 
                                    IFNULL(SUM(B.clsd_quantity), 0) AS CantProductoPadre
                                FROM 
                                    client_sales AS A 
                                    INNER JOIN client_sale_details AS B ON A.clsa_pk = B.clsa_fk 
                                WHERE 
                                    A.clsa_status = 0 
                                    AND B.clsd_status = 1 
                                    AND B.prod_fk = P.prod_pk 
                                    AND A.stor_fk = S.stor_pk
                            ), 0)
                                +
                            IFNULL((
                                SELECT  
                                    SUM((IFNULL(B.clsd_quantity, 0) * IFNULL(C.prod_fact_convert, 0))) AS CantProductoDerivado
                                FROM 
                                    client_sales AS A 
                                    INNER JOIN client_sale_details AS B ON A.clsa_pk = B.clsa_fk 
                                    INNER JOIN products AS C ON C.prod_pk = B.prod_fk
                                WHERE 
                                    A.clsa_status = 0 
                                    AND B.clsd_status = 1  
                                    AND A.stor_fk = S.stor_pk
                                    AND C.prod_main_pk = P.prod_pk
                            ), 0)
                        ) AS stock_order
                    ")
                )
                ->where('PI.prin_status', '=', 1) 
                ->whereNull('P.prod_main_pk')
                ->orderByDesc('S.stor_pk')
                ->get();
            }
            else
            {
                $vPI = DB::table('product_inventories AS PI')
                ->join('products AS P', 'P.prod_pk', '=', 'PI.prod_fk')
                ->join('measurements AS M', 'M.meas_pk', '=', 'PI.meas_fk_output')
                ->join('stores AS S', 'S.stor_pk', '=', 'PI.stor_fk')
                ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                ->select(
                    'PI.prin_pk',
                    'PI.prin_stock',
                    'PI.updated_at',

                    'P.prod_pk',
                    'P.prod_identifier',
                    'P.prod_name',
                    'P.prod_description',
                    'P.prod_image',
                    'P.prod_bulk',

                    'M.meas_pk',
                    'M.meas_name',

                    'PC.prca_pk',
                    'PC.prca_name',

                    'S.stor_pk',
                    'S.stor_name',
                    DB::raw("
                        (
                            IFNULL((
                                SELECT 
                                    IFNULL(SUM(B.clod_quantity), 0) AS CantProductoPadre
                                FROM 
                                    client_orders AS A 
                                    INNER JOIN client_order_details AS B ON A.clor_pk = B.clor_fk 
                                WHERE 
                                    A.clor_status = 1 
                                    AND B.clod_status = 1 
                                    AND B.prod_fk = P.prod_pk 
                                    AND A.stor_fk = S.stor_pk
                            ), 0)
                                +
                            IFNULL((
                                SELECT 
                                    SUM((IFNULL(B.clod_quantity, 0) * IFNULL(C.prod_fact_convert, 0))) AS CantProductoDerivado
                                FROM 
                                    client_orders AS A 
                                    INNER JOIN client_order_details AS B ON A.clor_pk = B.clor_fk 
                                    INNER JOIN products AS C ON C.prod_pk = B.prod_fk
                                WHERE 
                                    A.clor_status = 1 
                                    AND B.clod_status = 1 
                                    AND A.stor_fk = S.stor_pk
                                    AND C.prod_main_pk = P.prod_pk
                      
                            ), 0)
                                +
                            IFNULL((
                                SELECT 
                                    IFNULL(SUM(B.clsd_quantity), 0) AS CantProductoPadre
                                FROM 
                                    client_sales AS A 
                                    INNER JOIN client_sale_details AS B ON A.clsa_pk = B.clsa_fk 
                                WHERE 
                                    A.clsa_status = 0 
                                    AND B.clsd_status = 1 
                                    AND B.prod_fk = P.prod_pk 
                                    AND A.stor_fk = S.stor_pk
                            ), 0)
                            
                        ) AS stock_order
                    ")
                )
                ->where('PI.prin_status', '=', 1)
                ->whereNull('P.prod_main_pk')
                ->where('S.stor_pk', '=', $vStore)
                ->orderByDesc('PI.prin_pk')
                ->get();

            }

            
            /*
            SELECT 
                                 - IFNULL(SUM(B.clod_quantity), 0) 
                            FROM 
                                client_orders AS A 
                                INNER JOIN client_order_details AS B ON A.clor_pk = B.clor_fk 
                            WHERE 
                                A.clor_status = 1 
                                AND B.clod_status = 1 
                                AND B.prod_fk = P.prod_pk 
                                AND A.stor_fk = S.stor_pk 
            */
            return $this->dbResponse($vPI, 200, null, 'Lista de Inventario');
          
        }
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh->getMessage(), 'Detalle Interno, informar al Administrador del Sistema.');
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
     * @param  \App\ProductInventory  $productInventory
     * @return \Illuminate\Http\Response
     */
    public function show(ProductInventory $productInventory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProductInventory  $productInventory
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductInventory $productInventory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProductInventory  $productInventory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductInventory $productInventory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProductInventory  $productInventory
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductInventory $productInventory)
    {
        //
    }
}
