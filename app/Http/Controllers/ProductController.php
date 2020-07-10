<?php

namespace App\Http\Controllers;

use DB;
use App\Store;
use Exception;
use App\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;

class ProductController extends ApiResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(int $stor_pk, int $prca_fk)
    {
        try {

            $vStore = Store::where('stor_pk', '=', $stor_pk)->first();
           
            $vProducts = DB::table('products AS P')
                ->join('product_categories AS PC', 'P.prca_fk', '=', 'PC.prca_pk')
                ->join('measurements AS MO', 'P.meas_fk_output', '=', 'MO.meas_pk')
                ->select(
                    'P.prod_pk AS PK_Product',
                    //'P.prod_identifier',
                    'P.prod_name AS Product',
                    'P.prod_image AS ProductImage',
                    'P.prod_actualprice AS ActualPrice',
                    'P.prod_eventualprice AS EventualPrice',
                    'P.prod_preferentialprice AS PreferentialPrice',
                    //'P.prod_packingquantity AS PackingQuantity',
                    DB::raw("10 AS Stock"),
                    //'PC.prca_pk', 
                    'PC.prca_name AS Category',
                    //DB::raw("P.meas_fk_output AS meas_pk_output"), 
                    DB::raw("MO.meas_name AS Measurement"),
                    //DB::raw("MO.meas_abbreviation AS meas_abbreviation_output"),
                    //DB::raw("'$vStore->stor_pk' AS stor_pk"), 
                    DB::raw("'$vStore->stor_name' AS Store")
                )
                ->where('prod_status', '=', 1)
                ->where('prca_fk', '=', $prca_fk)
                ->get();
            
        return $this->dbResponse($vProducts, 200, null, 'Lista de Productos, filtrada por Sucursal y Categoría');
          
        } catch (Exception $e) {
            return $this->dbResponse(null, 500, $e, null);
        }


    }

    public function ProductList(){
        //$stores = Product::all();
        $stores = \DB::select("select m.meas_name as meas_fk_output_name, principal.* from(
            select p.prod_pk, p.prca_fk, c.prca_name, p.meas_fk_input, 
            m.meas_name as meas_fk_input_name,  p.meas_fk_output, p.prod_identifier, 
            p.prod_name, p.prod_image, p.prod_actualprice, p.prod_eventualprice, 
            p.prod_preferentialprice, p.prod_saleprice, p.prod_listprice, 
            p.prod_packingquantity, p.prod_status, p.prod_bulk
            from products p LEFT JOIN product_categories c on p.prca_fk = c.prca_pk 
            LEFT JOIN measurements m on p.meas_fk_input = m.meas_pk )as principal 
            left join measurements m on principal.meas_fk_output = m.meas_pk");
        
        return response()->json([
            'success' => true,
            'message' => 'Stores loaded',
            'data' => $stores,
        ], 200);
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
        . "', prod_image = '" .  $urlImage . "'"
        . ", prod_actualprice = " . $request->prod_actualprice
        . ", prod_eventualprice = " . $request->prod_eventualprice
        . ", prod_preferentialprice = " . $request->prod_preferentialprice
        . ", prod_packingquantity = " . $request->prod_packingquantity
        . ", prod_status = " . $request->prod_status
        . " where prod_pk = ". $request->prod_pk );

        

    }

    public function delete(Request $request)
    { 
        \DB::update("update products set prod_status = '0' where prod_pk = ". $request->prod_pk );
    }
    
}
