<?php

namespace App\Http\Controllers;

use DB;
use Exception;
use Throwable;
use Validator;
use App\Store;
use App\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Query\Builder;

class ProductController extends ApiResponseController 
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(int $prca_fk)
    {
        try 
        {
            //Sucursal al que pertenece el Usuario App
            $vStore_PK = Auth::user()->stor_fk;

            //Consulta de productos principales
            $vProducts = 
                DB::table('product_inventories AS PI')
                ->join('stores AS S', 'S.stor_pk', '=', 'PI.stor_fk')
                ->join('products AS P', 'P.prod_pk', '=', 'PI.prod_fk')
                ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                ->select
                (
                    'P.prod_pk AS PK_Product',
                    'P.prod_identifier AS ProductIdentifier',
                    'P.prod_name AS ProductName',
                    'P.prod_description AS ProductDescription',
                    'P.prod_image AS ProductImage',
                    'P.prod_saleprice AS RetailPrice',
                    'P.prod_listprice AS WholesalePrice',
                    'P.prod_minimumpurchase AS MinimumPurchase',
                    'P.prod_bulk AS Bulk',
                    'PI.prin_stock AS Stock',
                    'PC.prca_name AS Category',
                    'MO.meas_name AS Measurement',
                    'S.stor_name AS Store'
                )
                ->where('PI.prin_status', '=', 1)
                ->where('P.prod_status', '=', 1)
                ->where('PI.stor_fk', '=', $vStore_PK)
                ->where('P.prca_fk', '=', $prca_fk)
                ->whereNull('P.prod_main_pk')
                ->orderBy('P.prod_pk')
                ->get();

            $vProdJson = array();

            //Recorrido de productos principales
            foreach($vProducts AS $vP)
            {
                //Busqueda de productos variantes
                $vProdVariats = 
                    DB::table('products AS P')
                        ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                        ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                        ->select(
                            'P.prod_pk AS PK_Product',
                            'P.prod_saleprice AS RetailPrice',
                            'P.prod_bulk AS Bulk',
                            DB::raw("$vP->Stock / P.prod_fact_convert  AS Stock"),
                            'MO.meas_name AS Measurement'
                        )
                        ->where('prod_status', '=', 1) 
                        ->where('P.prod_main_pk', '=', $vP->PK_Product)
                        ->orderBy('P.prod_pk');

                    $vProdFirstVariat = 
                        DB::table('products AS P')
                            ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                            ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                            ->select(
                                'P.prod_pk AS PK_Product',
                                'P.prod_saleprice AS RetailPrice',
                                'P.prod_bulk AS Bulk',
                                DB::raw("$vP->Stock AS Stock"),
                                'MO.meas_name AS Measurement'
                            )
                            ->where('prod_status', '=', 1) 
                            ->where('P.prod_pk', '=', $vP->PK_Product)
                            ->orderBy('P.prod_pk')
                            ->union($vProdVariats)
                            ->get();


                //Consultar Suma de Cantidad Preventa (Pedidos Pendientes)
                $vSumclod_quantity  =  DB::table('client_orders AS CO')
                    ->join('client_order_details AS COD', 'CO.clor_pk', '=', 'COD.clor_fk')
                    ->join('products AS P', 'COD.prod_fk', '=', 'P.prod_pk')
                    ->where('CO.stor_fk', '=', $vStore_PK)
                    ->where('CO.clor_status', '=', 1)
                    ->where('COD.clod_status', '=', 1)
                    ->where('clod_status', '=', 1)
                    ->where('COD.prod_fk', '=', $vP->PK_Product)
                    ->whereNull('P.prod_main_pk')
                    ->sum('COD.clod_quantity');

                    
                //Lista final de productos con los variantes 
                $vPP = array(
                    "PK_Product" => $vP->PK_Product,
                    "ProductIdentifier" => $vP->ProductIdentifier,
                    "ProductName" => $vP->ProductName,
                    "ProductDescription" => $vP->ProductDescription,
                    "ProductImage" => $vP->ProductImage,
                    "RetailPrice" => $vP->RetailPrice,
                    "WholesalePrice" => $vP->WholesalePrice,
                    "MinimumPurchase" => $vP->MinimumPurchase,
                    "Stock" => $vP->Stock - $vSumclod_quantity,
                    "Category" => $vP->Category,
                    "Measurement" => $vP->Measurement,
                    "Store" => $vP->Store,
                    "VariatsInfo" => $vProdFirstVariat
                );
                //Anexo de producto a la lista principal
                array_push($vProdJson, $vPP);
            } 
            
            return $this->dbResponse($vProdJson, 200, null, 'Lista de Productos, filtrada por Sucursal y Categoría');
          
        } 
        catch (Exception $e) 
        {
            return $this->dbResponse(null, 500, $e, null);
        }
    }




    public function ProductList(){ 

        $vProducts = DB::table('products AS P')
                    ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                    ->join('measurements AS MI', 'P.meas_fk_input', '=', 'MI.meas_pk')
                    ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                    ->select(
                        'P.prod_pk', 
                        'P.prca_fk', 
                        'P.meas_fk_input', 
                        'P.meas_fk_output', 
                        'P.prod_identifier', 
                        'P.prod_name', 
                        'P.prod_description', 
                        'P.prod_image', 
                        'P.prod_actualprice', 
                        'P.prod_eventualprice', 
                        'P.prod_preferentialprice', 
                        'P.prod_saleprice', 
                        'P.prod_listprice', 
                        'P.prod_packingquantity', 
                        'P.prod_status', 
                        'P.prod_bulk',
                        'PC.prca_name', 
                        'MI.meas_name AS meas_fk_input_name',  
                        'MO.meas_name AS meas_fk_output_name'
                    )
                    //->where('P.prod_status', '=', 1)
                    ->whereNull('P.prod_main_pk')
                    ->orderBy('P.prod_pk')
                    ->get();

        
        return response()->json([
            'success' => true,
            'message' => 'Listado de Productos',
            'data' => $vProducts,
        ], 200);
    }




    public function ProductSearch()
    {
        /*
        $vProducts = \DB::select("select m.meas_name as meas_fk_output_name, principal.* from(
            select p.prod_pk, p.prca_fk, c.prca_name, p.meas_fk_input, 
            m.meas_name as meas_fk_input_name,  p.meas_fk_output, p.prod_identifier, 
            p.prod_name, p.prod_description, p.prod_image, p.prod_actualprice, p.prod_eventualprice, 
            p.prod_preferentialprice, p.prod_saleprice, p.prod_listprice, 
            p.prod_packingquantity, p.prod_status, p.prod_bulk
            from products p LEFT JOIN product_categories c on p.prca_fk = c.prca_pk 
            LEFT JOIN measurements m on p.meas_fk_input = m.meas_pk )as principal 
            left join measurements m on principal.meas_fk_output = m.meas_pk
            where principal.prod_status = 1 ");*/


        $vProducts = DB::table('products AS P')
                ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                ->join('measurements AS MI', 'P.meas_fk_input', '=', 'MI.meas_pk')
                ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                ->select(
                    'P.prod_pk', 
                    'P.prca_fk', 
                    'P.meas_fk_input', 
                    'P.meas_fk_output', 
                    'P.prod_identifier', 
                    'P.prod_name', 
                    'P.prod_description', 
                    'P.prod_image', 
                    'P.prod_actualprice', 
                    'P.prod_eventualprice', 
                    'P.prod_preferentialprice', 
                    'P.prod_saleprice', 
                    'P.prod_listprice', 
                    'P.prod_packingquantity', 
                    'P.prod_status', 
                    'P.prod_bulk',
                    'PC.prca_name', 
                    'MI.meas_name AS meas_fk_input_name',  
                    'MO.meas_name AS meas_fk_output_name'
                )
                ->where('P.prod_status', '=', 1)
                ->whereNull('P.prod_main_pk')
                ->orderBy('P.prod_pk')
                ->get();


        return response()->json([
            'success' => true,
            'message' => 'Products loaded',
            'data' => $vProducts,
        ], 200);
    }




    public function storederived(Request $r)
    {
        $vInput = $r->all();

        $vVal = Validator::make($vInput, [
            'prod_pk' => 'required|int', //PK Producto
            'meas_fk_output' => 'required|int', //PK Unidad Medida Salida
            'prod_saleprice' => 'required', //Precio Venta
            'prod_listprice' => 'required', //Precio Lista
            'prod_fact_convert' => 'required' //Factor Conversión Unidad Medida
        ]);

        if ($vVal->fails()) {
            return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
        }

        try {
            //Asignacion de variables
           $vprod_pk = $vInput['prod_pk'];
           $vmeas_fk_output = $vInput['meas_fk_output'];
           $vprod_saleprice = $vInput['prod_saleprice'];
           $vprod_listprice = $vInput['prod_listprice'];
           $vprod_fact_convert = $vInput['prod_fact_convert'];

            $vProduct = Product::where('prod_pk', '=', $vprod_pk)->first();

            if($vProduct)
            { 
                //Insertar Producto
                $vSelProduct = Product::where('prod_pk', '=', $vprod_pk)
                    ->select(
                        array(
                            'prca_fk', 
                            'meas_fk_input',
                            DB::raw("$vmeas_fk_output AS meas_fk_output"),
                            'prod_identifier', 
                            'prod_name', 
                            'prod_description', 
                            'prod_image', 
                            'prod_actualprice', 
                            'prod_eventualprice', 
                            'prod_preferentialprice', 
                            DB::raw("$vprod_saleprice AS prod_saleprice"),
                            DB::raw("$vprod_listprice AS prod_listprice"),
                            'prod_packingquantity', 
                            'prod_bulk', 
                            DB::raw("$vprod_pk AS prod_main_pk"),
                            DB::raw("$vprod_fact_convert AS prod_fact_convert"),
                            DB::raw("NOW() AS created_at"),
                            DB::raw("NOW() AS updated_at")
                        )
                    );

                DB::table('products')
                    ->insertUsing(
                        [
                            'prca_fk',
                            'meas_fk_input', 
                            'meas_fk_output', 
                            'prod_identifier', 
                            'prod_name', 
                            'prod_description', 
                            'prod_image', 
                            'prod_actualprice', 
                            'prod_eventualprice', 
                            'prod_preferentialprice', 
                            'prod_saleprice', 
                            'prod_listprice', 
                            'prod_packingquantity', 
                            'prod_bulk', 
                            'prod_main_pk', 
                            'prod_fact_convert', 
                            'created_at', 
                            'updated_at'
                        ]
                    , $vSelProduct);


                return $this->dbResponse(null, 200, null, 'Producto Derivado Guardado Correctamente');
                         
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }



    public function updatederived(Request $r)
    {
        $vInput = $r->all();

        $vVal = Validator::make($vInput, [
            'prod_pk' => 'required|int', //PK Producto
            'meas_fk_output' => 'required|int', //PK Unidad Medida Salida
            'prod_saleprice' => 'required', //Precio Venta
            'prod_listprice' => 'required', //Precio Lista
            'prod_fact_convert' => 'required' //Factor Conversión Unidad Medida

        ]);

        if ($vVal->fails()) {
            return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
        }

        try {
            //Asignacion de variables
           $vprod_pk = $vInput['prod_pk'];
           $vmeas_fk_output = $vInput['meas_fk_output'];
           $vprod_saleprice = $vInput['prod_saleprice'];
           $vprod_listprice = $vInput['prod_listprice'];
           $vprod_fact_convert = $vInput['prod_fact_convert'];

            $vProduct = Product::where('prod_pk', '=', $vprod_pk)->first();

            if($vProduct)
            { 
                //Modificar Producto Derivado
                DB::table('products')
                ->where('prod_pk', '=', $vprod_pk)
                ->update([
                    'meas_fk_output' => $vmeas_fk_output, 
                    'prod_saleprice' => $vprod_saleprice, 
                    'prod_listprice' => $vprod_listprice,
                    'prod_fact_convert' => $vprod_fact_convert
                    ]);

                return $this->dbResponse(null, 200, null, 'Producto Derivado Modificado Correctamente');
                         
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }


    public function destroyderived(Request $r)
    {
        $vInput = $r->all();

        $vVal = Validator::make($vInput, [
            'prod_pk' => 'required|int', //PK Producto
        ]);

        if ($vVal->fails()) {
            return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
        }

        try {
            //Asignacion de variables
           $vprod_pk = $vInput['prod_pk'];

            $vProduct = Product::where('prod_pk', '=', $vprod_pk)->first();

            if($vProduct)
            { 
                //Modificar Producto Derivado
                DB::table('products')
                ->where('prod_pk', '=', $vprod_pk)
                ->update(['prod_status' => 0]);

                return $this->dbResponse(null, 200, null, 'Producto Derivado Eliminado Correctamente');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }




    public function derived(int $prod_main_pk)
    {
        try 
        {
            $vProducts = DB::table('products AS P')
                ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                ->join('measurements AS MI', 'P.meas_fk_input', '=', 'MI.meas_pk')
                ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                ->select(
                    'P.prod_pk', 
                    //'P.prca_fk', 
                    //'P.meas_fk_input', 
                    'P.meas_fk_output', 
                    'P.prod_identifier', 
                    'P.prod_name', 
                    'P.prod_description', 
                    //'P.prod_image', 
                    //'P.prod_actualprice', 
                    //'P.prod_eventualprice', 
                    //'P.prod_preferentialprice', 
                    'P.prod_saleprice', 
                    'P.prod_listprice', 
                    'P.prod_fact_convert', 
                    //'P.prod_packingquantity', 
                    //'P.prod_status', 
                    'P.prod_bulk',
                    'PC.prca_name', 
                    //'MI.meas_name AS meas_fk_input_name',  
                    'MO.meas_name AS meas_fk_output_name'
                )
                ->where('P.prod_main_pk', '=', $prod_main_pk)
                ->where('P.prod_status', '=', 1)
                ->orderBy('P.prod_pk')
                ->get();

            return $this->dbResponse($vProducts, 200, null, 'Listado de productos derivados');
        }
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, "Error || Consultar con el Administrador del Sistema");
        }
    }






    public function search(int $isSKU, string $vText)
    {
        try 
        {
            //Sucursal al que pertenece el Usuario App
            $vStore_PK = Auth::user()->stor_fk;

            if($isSKU == 1)
            {  
                $vProducts = DB::table('product_inventories AS PI')
                    ->join('stores AS S', 'S.stor_pk', '=', 'PI.stor_fk')
                    ->join('products AS P', 'P.prod_pk', '=', 'PI.prod_fk')
                    ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                    ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                    ->select
                    (
                        'P.prod_pk AS PK_Product',
                        'P.prod_identifier AS ProductIdentifier',
                        'P.prod_name AS ProductName',
                        'P.prod_description AS ProductDescription',
                        'P.prod_image AS ProductImage',
                        'P.prod_saleprice AS RetailPrice',
                        'P.prod_listprice AS WholesalePrice',
                        'P.prod_minimumpurchase AS MinimumPurchase',
                        'P.prod_bulk AS Bulk',
                        'PI.prin_stock AS Stock',
                        'PC.prca_name AS Category',
                        'MO.meas_name AS Measurement',
                        'S.stor_name AS Store'
                    )
                    ->where('PI.prin_status', '=', 1)
                    ->where('PI.stor_fk', '=', $vStore_PK)
                    ->where('P.prod_status', '=', 1)
                    ->whereNull('P.prod_main_pk')
                    ->where('P.prod_identifier', '=', $vText)
                    ->get();

                    $vProdJson = array();

                //Recorrido de productos principales
                foreach($vProducts AS $vP)
                {
                    //Busqueda de productos variantes
                    $vProdVariats = 
                        DB::table('products AS P')
                            ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                            ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                            ->select(
                                'P.prod_pk AS PK_Product',
                                'P.prod_saleprice AS RetailPrice',
                                'P.prod_bulk AS Bulk',
                                DB::raw("$vP->Stock / P.prod_fact_convert  AS Stock"),
                                'MO.meas_name AS Measurement'
                            )
                        ->where('prod_status', '=', 1)
                        ->where('P.prod_main_pk', '=', $vP->PK_Product)
                        ->orderBy('P.prod_pk');
                    
                    $vProdFirstVariat = 
                        DB::table('products AS P')
                            ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                            ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                            ->select(
                                'P.prod_pk AS PK_Product',
                                'P.prod_saleprice AS RetailPrice',
                                'P.prod_bulk AS Bulk',
                                DB::raw("$vP->Stock AS Stock"),
                                'MO.meas_name AS Measurement'
                            )
                            ->where('prod_status', '=', 1) 
                            ->where('P.prod_pk', '=', $vP->PK_Product)
                            ->orderBy('P.prod_pk')
                            ->union($vProdVariats)
                            ->get();

                    //Consultar Suma de Cantidad Preventa (Pedidos Pendientes)
                    $vSumclod_quantity  =  DB::table('client_orders AS CO')
                    ->join('client_order_details AS COD', 'CO.clor_pk', '=', 'COD.clor_fk')
                    ->join('products AS P', 'COD.prod_fk', '=', 'P.prod_pk')
                    ->where('CO.stor_fk', '=', $vStore_PK)
                    ->where('CO.clor_status', '=', 1)
                    ->where('COD.clod_status', '=', 1)
                    ->where('clod_status', '=', 1)
                    ->where('COD.prod_fk', '=', $vP->PK_Product)
                    ->whereNull('P.prod_main_pk')
                    ->sum('COD.clod_quantity');
                        
                    //Lista final de productos con los variantes 
                    $vPP = array(
                        "PK_Product" => $vP->PK_Product,
                        "ProductIdentifier" => $vP->ProductIdentifier,
                        "ProductName" => $vP->ProductName,
                        "ProductDescription" => $vP->ProductDescription,
                        "ProductImage" => $vP->ProductImage,
                        "RetailPrice" => $vP->RetailPrice,
                        "WholesalePrice" => $vP->WholesalePrice,
                        "MinimumPurchase" => $vP->MinimumPurchase,
                        "Stock" => $vP->Stock - $vSumclod_quantity,
                        "Category" => $vP->Category,
                        "Measurement" => $vP->Measurement,
                        "Store" => $vP->Store,
                        "VariatsInfo" => $vProdFirstVariat
                    );
                    //Anexo de producto a la lista principal
                    array_push($vProdJson, $vPP);
                }

            }
            else
            {
                //Consulta de productos principales
                $vProducts = DB::table('product_inventories AS PI')
                    ->join('stores AS S', 'S.stor_pk', '=', 'PI.stor_fk')
                    ->join('products AS P', 'P.prod_pk', '=', 'PI.prod_fk')
                    ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                    ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                    ->select
                    (
                        'P.prod_pk AS PK_Product',
                        'P.prod_identifier AS ProductIdentifier',
                        'P.prod_name AS ProductName',
                        'P.prod_description AS ProductDescription',
                        'P.prod_image AS ProductImage',
                        'P.prod_saleprice AS RetailPrice',
                        'P.prod_listprice AS WholesalePrice',
                        'P.prod_minimumpurchase AS MinimumPurchase',
                        'P.prod_bulk AS Bulk',
                        'PI.prin_stock AS Stock',
                        'PC.prca_name AS Category',
                        'MO.meas_name AS Measurement',
                        'S.stor_name AS Store'
                    )
                    ->whereNull('P.prod_main_pk')
                    ->where('PI.prin_status', '=', 1)
                    ->where('P.prod_status', '=', 1)
                    ->where(function($vSubQuery) use($vText) {
                        return  $vSubQuery->Where('P.prod_identifier', 'LIKE', '%' . $vText . '%')
                            ->orWhere('P.prod_name', 'LIKE', '%' . $vText . '%')
                        ->orWhere('P.prod_description', 'LIKE', '%' . $vText . '%');
                    })
                    ->orderBy('P.prod_pk')
                    ->get();


                $vProdJson = array();

                //Recorrido de productos principales
                foreach($vProducts AS $vP)
                {
                    //Busqueda de productos variantes
                    $vProdVariats = 
                        DB::table('products AS P')
                            ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                            ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                            ->select(
                                'P.prod_pk AS PK_Product',
                                'P.prod_saleprice AS RetailPrice',
                                'P.prod_bulk AS Bulk',
                                DB::raw("$vP->Stock / P.prod_fact_convert  AS Stock"),
                                'MO.meas_name AS Measurement'
                            )
                        ->where('prod_status', '=', 1)
                        ->where('P.prod_main_pk', '=', $vP->PK_Product)
                        ->orderBy('P.prod_pk');

                    $vProdFirstVariat = 
                        DB::table('products AS P')
                            ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                            ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                            ->select(
                                'P.prod_pk AS PK_Product',
                                'P.prod_saleprice AS RetailPrice',
                                'P.prod_bulk AS Bulk',
                                DB::raw("$vP->Stock AS Stock"),
                                'MO.meas_name AS Measurement'
                            )
                            ->where('prod_status', '=', 1) 
                            ->where('P.prod_pk', '=', $vP->PK_Product)
                            ->orderBy('P.prod_pk')
                            ->union($vProdVariats)
                            ->get();
                        
                    //Lista final de productos con los variantes 
                    $vPP = array(
                        "PK_Product" => $vP->PK_Product,
                        "ProductIdentifier" => $vP->ProductIdentifier,
                        "ProductName" => $vP->ProductName,
                        "ProductDescription" => $vP->ProductDescription,
                        "ProductImage" => $vP->ProductImage,
                        "RetailPrice" => $vP->RetailPrice,
                        "WholesalePrice" => $vP->WholesalePrice,
                        "MinimumPurchase" => $vP->MinimumPurchase,
                        "Stock" => $vP->Stock,
                        "Category" => $vP->Category,
                        "Measurement" => $vP->Measurement,
                        "Store" => $vP->Store,
                        "VariatsInfo" => $vProdFirstVariat
                    );
                    //Anexo de producto a la lista principal
                    array_push($vProdJson, $vPP);
                }

            }

            return $this->dbResponse($vProdJson, 200, null, 'Resultado de Busqueda por texto');
          
        } 
        catch (Exception $e) 
        {
            return $this->dbResponse(null, 500, $e, null);
        }
    }




    public function add(Request $request)
    {        
        try {

            
            $stores = new Product();      
        $imageName = '';
        $urlImage = '';
        $ruta =   public_path('/images/products/');

        if($request->imageUrl != null && $request->is_mod == true){
            $image = $request->imageUrl;
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = Str::random(32) .'.'.'jpg';            
            \File::put($ruta . $imageName, base64_decode($image));
            $urlImage = '/images/products/' . $imageName; 
            $stores->prod_image =  $urlImage ;
        }
      
          
        $stores->prca_fk =  $request->prca_fk; 
        $stores->meas_fk_input = $request->meas_fk_input; 
        $stores->meas_fk_output = $request->meas_fk_output;
        $stores->prod_identifier = $request->prod_identifier ;
        $stores->prod_name = $request->prod_name; 
        $stores->prod_description = $request->prod_description; 
        
        $stores->prod_actualprice = $request->prod_actualprice;
        $stores->prod_eventualprice = $request->prod_eventualprice;
        $stores->prod_preferentialprice = $request->prod_preferentialprice;
        $stores->prod_saleprice = $request->prod_saleprice;
        $stores->prod_listprice = $request->prod_listprice;
        $stores->prod_packingquantity = $request->prod_packingquantity;
        $stores->prod_status = $request->prod_status;
        $stores->prod_bulk = $request->prod_bulk;

        $stores->save();

        return $this->dbResponse("Agregado", 200, null, 'Guardado Correctamente');
        } catch (Exception $e) {
            return $this->dbResponse(null, 500, $e, null);
        }
    }





    public function update(Request $request)
    {        
        
        $imageName = '';
        $urlImage = '';
        $ruta =   public_path('/images/products/');

        if($request->imageUrl != null && $request->is_mod == true){
            $image = $request->imageUrl;
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = Str::random(32) .'.'.'jpg';            
            \File::put($ruta . $imageName, base64_decode($image));
            $urlImage = '/images/products/' . $imageName; 
        }
        else
            $urlImage = $request->prod_image;

        
        
        
        \DB::update("update products set"
        . "   prca_fk = " .  $request->prca_fk 
        . ", meas_fk_input = " . $request->meas_fk_input 
        . ", meas_fk_output = " . $request->meas_fk_output
        . ", prod_identifier = '" . $request->prod_identifier 
        . "', prod_name = '" . $request->prod_name 
        . "', prod_description = '" . $request->prod_description
        . "', prod_image = '" .  $urlImage . "'"
        . ", prod_actualprice = " . $request->prod_actualprice
        . ", prod_eventualprice = " . $request->prod_eventualprice
        . ", prod_preferentialprice = " . $request->prod_preferentialprice
        . ", prod_packingquantity = " . $request->prod_packingquantity
        . ", prod_status = " . $request->prod_status
        . " where prod_pk = ". $request->prod_pk );

        return response()->json([
            'code' => 200,
            'success' => true,
            'message' => 'Producto Modificado Correctamente',
            'data' => null
        ], 200);

    }




    public function delete(Request $request)
    { 
        \DB::update("update products set prod_status = '0' where prod_pk = ". $request->prod_pk );
    }
    
}
