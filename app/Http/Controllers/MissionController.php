<?php

namespace App\Http\Controllers;

use App\Business;
use App\Mission;
use App\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use function foo\func;
use Illuminate\Support\Str;

class MissionController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Store  $store
     * @return \Illuminate\Http\JsonResponse
     */
    public function products(Store $store, Business $business, Mission $mission)
    {
        $products_ids=$mission->products->pluck('id');
        $products=$business->products()
            ->whereIn('id',$products_ids)
            ->where('store_id',$store->id)
            ->wherePivot('active', true)
            ->wherePivot('stock', '>=', 0)
            ->withRelations($store->id,$business->id, Auth::id())
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'Mision cargada',
            'data' =>$products,
        ], 200);
    }

    public function infoBusiness($id,$idStore)
    {
        $stores=Business::join('business_store','businesses.id','=','business_store.business_id')
        ->join('stores','stores.id','=','business_store.store_id')
        ->select('businesses.name as businessName', 'stores.name as storeName', 'businesses.image' )
        ->where('business_id',$id)
        ->where('store_id',$idStore)->first();

        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$stores,
        ], 200);
    }

    public function getMissionBusiness($idStore,$idBusiness)
    {     

        $missions=DB::table('missions')
        ->join('business_mission','missions.id','=','business_mission.mission_id')        
        ->select('missions.*', 'missions.image as imageUrl')
        ->where('business_mission.store_id', '=', $idStore)
        ->where('business_mission.business_id', '=', $idBusiness)
        ->where('missions.deleted_at', '=', null)
        ->get();
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$missions,
        ], 200);
    }

    public function addMission(Request $request)
    {               
        $imageName = '';
        $mission = new Mission();        
        $mission->name = $request->name;
        $mission->description = $request->description;  
        $mission->start_date = $request->start_date;  
        $mission->end_date = $request->end_date;   
        
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
            $mission->image = url('/') . '/images/missions/' . $imageName; 
            }
            else{
                $mission->image = '';
            }
            $mission->business_id = $request->business_id;
            $mission->featured = 1;
            
        $mission->save();
        $id = DB::getPdo()->lastInsertId();

       

        //INserta producto bussines
        $data=array('mission_id'=>$id,
                    'store_id'=>$request->store_id,
                    'business_id'=>$request->business_id
                    );
                DB::table('business_mission')->insert($data);

    }

    public function updateMission(Request $request)
    {               
        $imageName = '';
     
        
        $mission = Mission::findOrFail($request->id);       
        $mission->name = $request->name;
        $mission->description = $request->description;  
        $mission->start_date = $request->start_date;  
        $mission->end_date = $request->end_date;    

        $ruta =   public_path('/images/missions/');

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
            $mission->image = url('/') . '/images/missions/' . $imageName; 
            }          
            
            
        $mission->save();
       
        
    }

    public function deleteMission(Request $request)
    {  
        $mission = Mission::findOrFail($request->id);          
        $mission->deleted_at  = now();
        $mission->save();        
    }


    public function deleteProduct(Request $request)
    {                   
        DB::table('business_product')->where('product_id', $request->id)->delete();
        DB::table('category_product')->where('product_id', $request->id)->delete();
        DB::table('products')->where('id', $request->id)->delete();
    }

    public function ProductsMissionsBusiness(int $mission, int $store, Business $business)
    {
        $products= $business->products()->with(['missions'=>function($q) use ($mission){
            $q->where('mission_id',$mission);
        }])->where('store_id', $store)->where('active',1)->get();

        return response()->json([
            'success' => true,
            'message' => 'Productos cargados',
            'data' =>$products,
        ], 200);
    }

    public function toggleProduct( Mission $mission, int $product){

        $mission->products()->toggle($product);
        return response()->json([
            'success' => true,
            'message' => 'Producto agregado',
            'data' =>true,
        ], 200);

    }
    
}

