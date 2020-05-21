<?php

namespace App\Http\Controllers;

use App\Business;
use App\Category;
use App\Product;
use App\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class BusinessController extends Controller
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
     * @param  \App\Business  $business
     * @return \Illuminate\Http\Response
     */
    public function show(Business $business)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Business  $business
     * @return \Illuminate\Http\Response
     */
    public function edit(Business $business)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Business  $business
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Business $business)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Business  $business
     * @return \Illuminate\Http\Response
     */
    public function destroy(Business $business)
    {
        //
    }
    /**
     * Toggle favorite the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Store $store, Business $business, string $text)
    {
        $categories_id = $business->categories()->pluck('id');
        $subcategories_id = Category::whereIn('category_id', $categories_id )->pluck('id');
        $products=$store->products()->where('name','like',"%$text%")->
        whereHas('subcategories', function($q) use ($subcategories_id){
            $q->whereIn('category_product.category_id',$subcategories_id);
        })
            ->wherePivot('active', true)
            ->wherePivot('stock', '>=', 0)
            ->withRelations($store->id, $business->id, Auth::id())->get();

        return response()->json([
            'success' => true,
            'message' => 'Productos cargados',
            'data' =>$products,
        ], 200);
    }
    /**
     * Toggle favorite the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function missions(Store $store, Business $business)
    {
        $missions=$business->missions()
            ->where('start_date','<=',date('Y-m-d'))
                ->where('end_date','>=',date('Y-m-d'))
                ->where('store_id',$store->id)
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Productos cargados',
            'data' =>$missions,
        ], 200);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Store  $store
     * @return \Illuminate\Http\JsonResponse
     */
    public function featured(Store $store, Business $business)
    {
        $products=$business->products()
            ->where('store_id',$store->id)
            ->wherePivot('active', true)
            ->wherePivot('stock', '>=', 0)
            ->wherePivot('featured',true)
            ->withRelations($store->id, $business->id, Auth::id())
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'Misiones cargadas',
            'data' =>$products,
        ], 200);
    }

    public function listBusiness()
    {
        $business=Business::all();

        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$business,
        ], 200);
    }

    public function getBusiness($idStore)
    {
        $stores=Business::join('business_store','businesses.id','=','business_store.business_id')
        ->join('stores','stores.id','=','business_store.store_id')
        ->select('businesses.id','businesses.name as businessName', 'stores.name as storeName', 'businesses.image' )        
        ->where('store_id',$idStore)->get();

        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$stores,
        ], 200);
    }

    public function listBusinessAll()
    {
        $business=Category::where('category_id','=',null)->select('id','name')->get();
        
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$business,
        ], 200);
    }

    public function addBusiness(Request $request)
    {       
        $imageName = ''; 
       

        $business = new Business();        
        $business->name = $request->name;
        $business->description = $request->description;
        $business->proportion = $request->proportion;  
        $business->row = $request->row;  

        $ruta =   public_path('/images/business/');

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
            $business->image = url('/') . '/images/business/' . $imageName; 
            }
            else{
               
                $business->image = '';
            }

        $business->save();

        \DB::table('business_store')->insert([
            'business_id'      => $business->id,
            'store_id'             => $request->store_id
        ]);
        
    }

    public function updateBusiness(Request $request)
    {

        $imageName = ''; 
       
            
        $business = Business::findOrFail($request->id);
        $business->name = $request->name;
        $business->description = $request->description;
        $business->proportion = $request->proportion;  
        $business->row = $request->row;  
       
        $ruta =   public_path('/images/business/');
 
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
            $business->image = url('/') . '/images/business/' . $imageName; 
            }
            else{
               
                $business->image = '';
            }
        $business->save();
    }

    public function deleteBusiness(Request $request)
    {           
        echo $request; 
        $categorie = Business::findOrFail($request->id);
        $categorie->name = $request->name;
        $categorie->description = $request->description;
        $categorie->image = '';
        $categorie->deleted_at  = now();
        $categorie->save();
    }

    

}
