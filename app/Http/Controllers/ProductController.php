<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    public function ProductList(){
        //$stores = Product::all();
        $stores = \DB::select("select m.meas_name as meas_fk_output_name, principal.* from(
            select p.prod_pk, p.prca_fk, c.prca_name, p.meas_fk_input, 
            m.meas_name as meas_fk_input_name,  p.meas_fk_output, p.prod_identifier, 
            p.prod_name, p.prod_image, p.prod_actualprice, p.prod_eventualprice, 
            p.prod_preferentialprice, p.prod_packingquantity, p.prod_status 
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
       
        $stores = new Product();        
        $stores->prca_fk =  $request->prca_fk; 
        $stores->meas_fk_input = $request->meas_fk_input; 
        $stores->meas_fk_output = $request->meas_fk_output;
        $stores->prod_identifier = $request->prod_identifier ;
        $stores->prod_name = $request->prod_name; 
        
        $stores->prod_actualprice = $request->prod_actualprice;
        $stores->prod_eventualprice = $request->prod_eventualprice;
        $stores->prod_preferentialprice = $request->prod_preferentialprice;
        $stores->prod_packingquantity = $request->prod_packingquantity;
        $stores->prod_status = $request->prod_status;

        $stores->save();
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
