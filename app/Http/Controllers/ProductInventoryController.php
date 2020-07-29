<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Throwable;
use App\ProductInventory;
use Illuminate\Http\Request;
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
        try {
            $vPI = DB::table('product_inventories AS PI')
                ->join('products AS P', 'P.prod_pk', '=', 'PI.prod_fk')
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

                    'PC.prca_pk',
                    'PC.prca_name',

                    'S.stor_pk',
                    'S.stor_name'
                )
                ->where('PI.prin_status', '=', 1)
                ->orderByDesc('PI.prin_pk')
                ->get();
            
            return $this->dbResponse($vPI, 200, null, 'Lista de Inventario');
          
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
