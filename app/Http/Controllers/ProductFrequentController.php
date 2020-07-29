<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Throwable;
use App\ProductFrequent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\api\ApiResponseController;


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
          
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }


    public function list() 
    {
        try {

            $vProducts = DB::table('product_frequents AS PF')
                ->join('products AS P', 'P.prod_pk', '=', 'PF.prod_fk')
                ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                ->join('stores AS S', 'S.stor_pk', '=', 'PF.stor_fk')
                ->select(
                    'PF.prfr_pk',
                    'PF.created_at',
                    'P.prod_pk',
                    'P.prod_identifier',
                    'P.prod_name',
                    'P.prod_description',
                    'P.prod_image',
                    'P.prod_saleprice',
                    'P.prod_bulk',
                    'PC.prca_name',
                    'S.stor_name'
                )
                ->where('P.prod_status', '=', 1)
                ->where('PF.prfr_status', '=', 1)
                ->orderByDesc('PF.prfr_pk')
                ->get();
            
            return $this->dbResponse($vProducts, 200, null, 'Lista de Productos Frecuentes');
          
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
        try {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prod_fk' => 'required|int', //PK Producto
                'stor_fk' => 'required|int' //PK Sucursal
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprod_fk = $vInput['prod_fk'];
            $vstor_fk = $vInput['stor_fk'];

            //Guardar Producto Frecuente
            $vPF = new ProductFrequent();        
            $vPF->prod_fk = $vprod_fk;
            $vPF->stor_fk = $vstor_fk;
            $vPF->save();

            
            return $this->dbResponse(null, 200, null, 'Producto Frecuente Guardado Correctamente');
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProductFrequent  $productFrequent
     * @return \Illuminate\Http\Response
     */
    public function show(Request $r)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProductFrequent  $productFrequent
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $r)
    {
       
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProductFrequent  $productFrequent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $r)
    {
        try {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prfr_pk' => 'required|int', //PK Producto Frecuente
                'prod_fk' => 'required|int', //PK Producto
                'stor_fk' => 'required|int' //PK Sucursal
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprfr_pk = $vInput['prfr_pk'];
            $vprod_fk = $vInput['prod_fk'];
            $vstor_fk = $vInput['stor_fk'];

            //Validar Si Existe Producuto Frecuente
            $vPF = ProductFrequent::where('prfr_pk', '=', $vprfr_pk)->first();
            if ($vPF) 
            {
                //Modificar Producto Frecuente
                $vPFU = ProductFrequent::find($vprfr_pk);
                $vPFU->prod_fk = $vprod_fk;
                $vPFU->stor_fk = $vstor_fk;
                $vPFU->save();
                
                return $this->dbResponse(null, 200, null, 'Producto Frecuente Modificado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Producto Frecuente NO Encontrado');
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
     * @param  \App\ProductFrequent  $productFrequent
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r)
    {
        try {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prfr_pk' => 'required|int', //PK Producto Frecuente
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprfr_pk = $vInput['prfr_pk'];

            //Validar Si Existe Producuto Frecuente
            $vPF = ProductFrequent::where('prfr_pk', '=', $vprfr_pk)->first();
            if ($vPF) 
            {
                //Eliminar Producto Frecuente
                $vPFU = ProductFrequent::find($vprfr_pk);
                $vPFU->prfr_status = 0;
                $vPFU->save();
                
                return $this->dbResponse(null, 200, null, 'Producto Frecuente Eliminado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Producto Frecuente NO Encontrado');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }
}
