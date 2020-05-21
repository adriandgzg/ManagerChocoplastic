<?php

namespace App\Http\Controllers;


use App\Business;
use App\Product;
use App\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use function foo\func;
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Product $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Product $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Product $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Product $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }

    /**
     * Toggle favorite the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleFavorite(Request $request, int $store, int $business)
    {
        $favorite=$request->user()->favorites()
            ->where('product_id', $request->product)
            ->where('store_id', $store)
            ->where('business_id', $business)->first();
        if (!$favorite){
            $favorites = $request->user()->favorites()->attach($request->product,[
                'business_id'=>$business,
                'store_id'=>$store,
                ]
            );
        }else{
            $favorites = $request->user()->favorites()->detach($request->product);
        }
        return response()->json([
            'success' => true,
            'message' => 'Favoritos actualizados',
            'data' => $favorites,
        ], 200);
    }

    /**
     * Toggle favorite the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function favorites( int $store_id)
    {
        $favorites = Auth::user()->favorites()->where('store_id',$store_id)->get();
        $products = collect($favorites)->map(function ($product, $key) use ( $store_id) {
            $business=Business::find($product->favorites->business_id);
            $newProduct = $business->products()
                ->where('id', $product->id)
                ->where('store_id', $store_id)
                ->wherePivot('active', true)
                ->wherePivot('stock', '>=', 0)
                ->withRelations($store_id,$business->id, Auth::id())
                ->first();
           return $newProduct;
        });
        return response()->json([
            'success' => true,
            'message' => 'Favoritos cargados',
            'data' => $products,
        ], 200);
    }

    /**
     * Toggle favorite the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Store $store, string $text)
    {
        $cat = [];
        $store_id = $store->id;
        $businesses = $store->businesses()->get();
        $cat = collect($businesses)->map(function ($business, $key) use ($text, $store) {
            $bus = $business;
            $catalog = $business->products()
                ->where('name', 'like', "%$text%")
                ->where('store_id', $store->id)
                ->wherePivot('active', true)
                ->wherePivot('stock', '>=', 0)
                ->withRelations($store->id,$business->id, Auth::id())
                ->get();

            $bus->products = $catalog;
            return $business;
        });

        return response()->json([
            'success' => true,
            'message' => 'Productos encontrados',
            'data' => $cat,
        ], 200);
    }

    public function listproduct()
    {
      
        $products=Product::leftjoin('category_product','products.id','=','category_product.product_id')
        ->leftjoin('categories','categories.id','=','category_product.category_id')
        ->select('products.*', 'category_product.*', 'categories.category_id as select')
        ->get();


        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$products,
        ], 200);
    }
    public function addProduct(Request $request)
    {               
        $imageName = '';
        echo $request;
        $product = new Product();        
        $product->name = $request->name;
        $product->description = $request->description;  
        $product->long_key = $request->long_key;  
        $product->price = $request->pricebusiness;  
        $product->content = $request->input('content');
        $product->unit = $request->unit;  
        $product->brand = $request->brand;  
        $product->sales_unit = 1;  
        $product->bulk = 0;  

        $ruta =   public_path('/images/products/');

        if(!file_exists($ruta)){
            mkdir($ruta, 0777,  true);
        }
       
        if($request->imageUrl != null){
            $image = $request->imageUrl;
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = Str::random(32) .'.'.'jpg';
            \File::put($ruta . $imageName, base64_decode($image));
            $product->image = '/images/products/' . $imageName; 
            }
            else{
                $product->image = '';
            }
            $product->type_id = 0;
            $product->featured = 0;
            
        $product->save();
        $id = DB::getPdo()->lastInsertId();

        //Asociar producto / categoria

        $dataCategoria=array('product_id'=>$id, 'category_id'=>$request->category_id);                
        DB::table('category_product')->insert($dataCategoria);

        //INserta producto bussines
        $data=array('product_id'=>$id,
                    'store_id'=>$request->store_id,
                    'business_id'=>$request->business_id,
                    'stock'=>$request->stock,
                    'price'=>$request->pricebusiness,
                    'max_quantity'=>$request->max_quantity,
                    'active'=>$request->is_active,
                    'featured'=>1
                    );
                DB::table('business_product')->insert($data);

    }

    public function updateProduct(Request $request)
    {               
        $imageName = '';
     
        
        $product = Product::findOrFail($request->id);       
        $product->name = $request->name;
        $product->description = $request->description;  
        $product->long_key = $request->long_key;  
        $product->price = $request->price;  
        $product->content = $request->input('content');
        $product->unit = $request->unit;  
        $product->brand = $request->brand;  
        $product->sales_unit = 1;  
        $product->bulk = 0;  

        $ruta =   public_path('/images/products/');

        if(!file_exists($ruta)){
            mkdir($ruta, 0777,  true);
        }

        if($request->imageUrl != null && $request->is_mod == true){
            $image = $request->imageUrl;
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = Str::random(32) .'.'.'jpg';
            //\File::put(public_path (). '/images/products/' . $imageName, base64_decode($image));
            \File::put($ruta . $imageName, base64_decode($image));
            $product->image = '/images/products/' . $imageName; 
            }
            
            
            $product->type_id = 0;
            $product->featured = 0;
            
        $product->save();
       
        $cat = DB::table('business_product')
                ->where('product_id', '=', $request->id)
                ->where('store_id', '=', $request->store_id)
                ->where('business_id', '=', $request->business_id)
                ->first();
            
            if($cat!=null){
        DB::table('business_product')
                ->where('product_id', '=', $request->id)
                ->where('store_id', '=', $request->store_id)
                ->where('business_id', '=', $request->business_id)
                ->update(array(
                        'stock' => $request->stock,
                        'price' => $request->pricebusiness,
                        'max_quantity' => $request->max_quantity,
                        'active' => $request->is_active)
                        );
                    }
                    else{
                        $data=array('product_id'=>$request->id,
                        'store_id'=>$request->store_id,
                        'business_id'=>$request->business_id,
                        'stock'=>$request->stock,
                        'price'=>$request->pricebusiness,
                        'max_quantity'=>$request->max_quantity,
                        'active'=>$request->is_active,
                        'featured'=>1
                        );
                    DB::table('business_product')->insert($data);
                    }
    }

    public function deleteProduct(Request $request)
    {                   
        DB::table('business_product')->where('product_id', $request->id)->delete();
        DB::table('category_product')->where('product_id', $request->id)->delete();
        DB::table('products')->where('id', $request->id)->delete();
    }

    public function ProductsBusiness($idSubcategorie,$idStore,$idBusiness)
    {     
        /*
        $products=DB::table('products')
        ->leftjoin('category_product','products.id','=','category_product.product_id')
        ->leftJoin('promotions', function($join) 
        {
            $join->on('promotions.product_id','=','products.id')
            
            ;
        })
        ->leftJoin('business_product', function($join) use ($idSubcategorie,$idStore,$idBusiness)
        {
            $join->on('business_product.product_id','=','products.id')
            ->where('business_product.store_id', '=', $idStore)
            ->where('business_product.business_id', '=', $idBusiness)
            ;
        })
        ->where('category_product.category_id',$idSubcategorie)
        ->select(
            DB::raw(' promotions.start_date <= DATE_FORMAT(NOW(),"%Y-%m-%d") and promotions.end_date >= DATE_FORMAT(NOW(),"%Y-%m-%d")  as existPromo'),'promotions.id as idPromo', 'promotions.price as precioPromo' , 'promotions.start_date', 'promotions.end_date', 'products.*', 'category_product.category_id as select', 'business_product.stock',
        'category_product.category_id', 'business_product.price as pricebusiness', 
        'business_product.max_quantity', 'products.image as imageUrl',
        DB::raw('IFNULL( business_product.active, 0) as is_active'),
        DB::raw('IFNULL( business_product.active, 2) as exist'),
        )

        ->get();*/

        $products = \DB::select("call sp_ProductsBusiness(". $idSubcategorie. ",". $idStore. ",". $idBusiness. ")"); 

        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$products,
        ], 200);
    }

    public function updateBusinessProduct(Request $request)
    { 
        DB::table('business_product')
                ->where('product_id', '=', $request->product_id)
                ->where('store_id', '=', $request->store_id)
                ->where('business_id', '=', $request->business_id)
                ->update(array(
                        'stock' => $request->stock,
                        'price' => $request->price,
                        'max_quantity' => $request->max_quantity,
                        'active' => $request->is_active)
                        );
    }

    public function insertBusinessProduct(Request $request)
    { 
        $data=array('product_id'=>$request->id,
                    'store_id'=>$request->store_id,
                    'business_id'=>$request->business_id,
                    'stock'=>$request->stock,
                    'price'=>$request->price,
                    'max_quantity'=>$request->max_quantity,
                    'active'=>$request->is_active,
                    'featured'=>1
                    );
                DB::table('business_product')->insert($data);
              
    }

    public function updatePromoProduct(Request $request)
    { 
        DB::table('promotions')
                ->where('id', '=', $request->idPromo)
                ->where('product_id', '=', $request->id)
                ->update(array(
                        'price' => $request->precioPromocion,
                        'start_date' => $request->start_date,
                        'end_date' => $request->end_date,
                        'min_amount' => $request->montoMinimo)
                        );
    }

    public function insertPromoProduct(Request $request)
    { 
        DB::table('promotions')
        ->where('product_id', '=', $request->id)
        ->update(array(
            'deleted_at' => now())
            );


        $data=array('product_id'=>$request->id,
                    'price' => $request->precioPromocion,
                    'start_date' => $request->start_date,
                    'end_date' => $request->end_date,
                    'min_amount' => $request->montoMinimo
                    );
                DB::table('promotions')->insert($data);
              
    }


}
