<?php

namespace App\Http\Controllers;

use App\Business;
use App\Category;
use App\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategoryController extends Controller
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

    public function listCategories()
    {
        //$categories=Category::with(['subcategories'])->get();
        $categories=Category::where('category_id','=',null)->get();

        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$categories,
        ], 200);
    }

    public function CategoriesCbx()
    {
        //$categories=Category::with(['subcategories'])->get();
        $categories=Category::where('category_id','=',null)
        ->select('id', 'name')
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$categories,
        ], 200);
    }

    public function listSubcategories(Request $request)
    {
        //$categories=Category::with(['subcategories'])->get();
        $categories=Category::where('category_id','=',$request->id)->get();
        
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$categories,
        ], 200);
    }

    public function Subcategories($id)
    {
        //$categories=Category::with(['subcategories'])->get();
        $categories=Category::where('category_id','=',$id)->get();
        
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$categories,
        ], 200);
    }

    public function listCategoriesAll()
    {
        $categories=Category::where('category_id','=',null)->select('id','name','description')->get();
        
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$categories,
        ], 200);
    }

    public function addCategorie(Request $request)
    {        
       
        $image = $request->imageUrl;
        $image = str_replace('data:image/jpeg;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = Str::random(32) .'.'.'jpg';
        \File::put(public_path (). '/images/categorias/' . $imageName, base64_decode($image));

        $categorie = new Category();        
        $categorie->name = $request->name;
        $categorie->description = $request->description;
        $categorie->image = url('/') . '/images/categorias/' . $imageName; 
        $categorie->category_id = $request->input('select.id');
        //var_dump($request->input('select.id'));
        $categorie->save();
    }

    public function addSubCategorie(Request $request)
    {        
        $imageName = '';

        
        $categorie = new Category();        
        $categorie->name = $request->name;
        $categorie->description = $request->description;        
        $categorie->category_id = $request->category_id;

        if($request->imageUrl != null){
            $image = $request->imageUrl;
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = Str::random(32) .'.'.'jpg';
            \File::put(public_path (). '/images/categorias/' . $imageName, base64_decode($image));
            
            }
            $categorie->image = url('/') . '/images/categorias/' . $imageName; 
        $categorie->save();
    }

    public function updateCategorie(Request $request)
    {
        $categorie = Category::findOrFail($request->id);
        $categorie->name = $request->name;
        $categorie->description = $request->description;
        
       echo $request;
        if($request->imageUrl != null){
            $image = $request->imageUrl;
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = Str::random(32) .'.'.'jpg';
            \File::put(public_path (). '/images/categorias/' . $imageName, base64_decode($image));
            $categorie->image = url('/') . '/images/categorias/' . $imageName;
        } 
        
        $categorie->save();
    }

    public function updateSubCategorie(Request $request)
    {
        $categorie = Category::findOrFail($request->id);
        $categorie->name = $request->name;
        $categorie->description = $request->description;
        $categorie->category_id = $request->category_id;
       
        if($request->imageUrl != null){
            $image = $request->imageUrl;
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = Str::random(32) .'.'.'jpg';
            \File::put(public_path (). '/images/categorias/' . $imageName, base64_decode($image));
            $categorie->image = url('/') . '/images/categorias/' . $imageName;
        } 
        
        $categorie->save();
    }

    public function deleteCategorie(Request $request)
    {            
        $categorie = Category::findOrFail($request->id);
        $categorie->deleted_at  = now();
        $categorie->save();
    }

    public function deleteSubCategorie(Request $request)
    {            
        $categorie = Category::findOrFail($request->id);        
        $categorie->deleted_at  = now();
        $categorie->save();
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
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }

    /**
     * Toggle favorite the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function products(Store $store, Business $business, Category $category)
    {
        $products_ids=$category->products()->pluck('id');
        $products=$business->products()
            ->whereIn('id',$products_ids)
            ->where('store_id',$store->id)
            ->wherePivot('active', true)
            ->wherePivot('stock', '>=', 0)
            ->withRelations($store->id,$business->id, Auth::id())
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Productos encontrados',
            'data' =>$products,
        ], 200);
    }

    public function CategoriesBusiness($id,$idStore)
    {
        $stores=Category::leftjoin('business_category','categories.id','=','business_category.category_id')
        ->select('categories.id','categories.name', 'categories.description', 'categories.image', 'business_category.category_id' )
        
        ->where('business_id',$id)
        ->where('store_id',$idStore)->get();

        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$stores,
        ], 200);
    }

    public function AsociarCategoriesBusiness($id,$idStore)
    {
       
        $stores=Category::whereNotIn('id', 
            Category::leftjoin('business_category','categories.id','=','business_category.category_id')
            ->select('categories.id')            
            ->where('business_id',$id)
            ->where('store_id',$idStore)
        )
        ->select('categories.*', DB::raw('IFNULL( categories.category_id,1) as active'))
        ->where('category_id','=',null)->get();

        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$stores,
        ], 200);
     
    }

    public function updateBusinessCategory(Request $request)
    {

        
        $data=array('business_id'=>$request->business_id, 'store_id'=>$request->store_id, 'category_id'=>$request->category_id);
                
        DB::table('business_category')->insert($data);
    }


    public function addCategorieAsociar(Request $request)
    {        
       
        

        $categorie = new Category();        
        $categorie->name = $request->name;
        $categorie->description = $request->description;
        //$categorie->image = '/images/categorias/' . $imageName; 
        $categorie->category_id = $request->input('select.id');
        $ruta =   public_path('/images/missions/');

        if(!file_exists($ruta)){
            mkdir($ruta, 0777,  true);
        }
       
        if($request->imageUrl != null){
            $image = $request->imageUrl;
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = Str::random(32) .'.'.'jpg';
            \File::put($ruta . $imageName, base64_decode($image));
            $categorie->image = url('/') . '/images/missions/' . $imageName; 
            }
            else{
                $categorie->image = '';
            }
        
        $categorie->save();

        $id = DB::getPdo()->lastInsertId();

        $data=array('business_id'=>$request->business_id, 'store_id'=>$request->store_id, 'category_id'=>$id);
                
        DB::table('business_category')->insert($data);
    }

}

