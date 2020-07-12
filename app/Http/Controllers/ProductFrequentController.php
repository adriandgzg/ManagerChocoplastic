<?php

namespace App\Http\Controllers;

use Exception;
use DB;
use App\ProductFrequent;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;
use Illuminate\Support\Facades\Auth;
use App\Store;


class ProductFrequentController extends ApiResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            //Sucursal al que pertenece el Usuario App
            $vStore_PK = Auth::user()->stor_fk;

            $vProducts = DB::table('product_frequents AS PF')
                ->join('products AS P', 'P.prod_pk', '=', 'PF.prod_fk')
                ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                ->join('stores AS S', 'S.stor_pk', '=', 'PF.stor_fk')
                ->select(
                    'P.prod_pk AS PK_Product',
                    'P.prod_identifier AS ProductIdentifier',
                    'P.prod_name AS ProductName',
                    'P.prod_description AS ProductDescription',
                    'P.prod_image AS ProductImage',
                    'P.prod_saleprice AS SalePrice',
                    'P.prod_listprice AS ListPrice',
                    'P.prod_bulk AS Bulk',
                    DB::raw("10 AS Stock"),
                    'PC.prca_name AS Category',
                    'MO.meas_name AS Measurement',
                    'S.stor_name AS Store'
                )
                ->where('P.prod_status', '=', 1)
                ->where('PF.prfr_status', '=', 1)
                ->where('PF.stor_fk', '=', $vStore_PK)
                ->orderBy('P.prod_pk')
                ->get();
            
            return $this->dbResponse($vProducts, 200, null, 'Lista de Productos Frecuentes');
          
        } catch (\Throwable $e) {
            return $this->dbResponse(null, 500, $e, null);
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
     * @param  \App\ProductFrequent  $productFrequent
     * @return \Illuminate\Http\Response
     */
    public function show(ProductFrequent $productFrequent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProductFrequent  $productFrequent
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductFrequent $productFrequent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProductFrequent  $productFrequent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductFrequent $productFrequent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProductFrequent  $productFrequent
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductFrequent $productFrequent)
    {
        //
    }
}
