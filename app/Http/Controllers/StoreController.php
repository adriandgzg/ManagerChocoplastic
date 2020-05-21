<?php

namespace App\Http\Controllers;

use App\Business;
use App\Coverage;
use App\Store;
use App\PickupTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StoreController extends Controller
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
     * @param \App\Store $store
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Store $store)
    {
        $catalog = $store->businesses()->with(['categories' => function ($q) use ($store) {
            $q->where('store_id', $store->id)->with(['subcategories']);
        }])->get();
        return response()->json([
            'success' => true,
            'message' => 'Tienda cargada',
            'data' => $catalog,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Store $store
     * @return \Illuminate\Http\JsonResponse
     */
    public function showByLocation(string $location)
    {
        $haveCoverage = Coverage::findByLocation($location);
        if ($haveCoverage) {
            $store = Store::where('id', $haveCoverage->store_id)->first();
            $catalog = $store->businesses()->with(['categories' => function ($q) use ($store) {
                $q->where('store_id', $store->id)->with(['subcategories']);
            }])->get();
            $message = "Store loaded";
        } else {
            $message = "Servicio no disponible";
            $catalog = null;
        }
        return response()->json([
            'success' => !is_bool($haveCoverage),
            'message' => $message,
            'data' => $catalog,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Store $store
     * @return \Illuminate\Http\Response
     */
    public function edit(Store $store)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Store $store
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Store $store)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Store $store
     * @return \Illuminate\Http\Response
     */
    public function destroy(Store $store)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Store $store
     * @return \Illuminate\Http\JsonResponse
     */
    public function missions(Store $store)
    {

        $missions = $store->businesses()->with(['missions' => function ($q) use ($store) {
            $q->where('start_date', '<=', date('Y-m-d'))
                ->where('end_date', '>=', date('Y-m-d'))
                ->where('business_mission.store_id', $store->id);
        }])->get();


        return response()->json([
            'success' => true,
            'message' => 'Misiones cargadas',
            'data' => $missions,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Store $store
     * @return \Illuminate\Http\JsonResponse
     */
    public function promotions(Store $store)
    {
        $products_id = $store->promotions()->pluck('product_id');
        $promotions = $store->products()->whereIn('id', $products_id)
            ->wherePivot('active', true)
            ->wherePivot('stock', '>=', 0)
            ->withRelations($store->id, Auth::id())->get();

        return response()->json([
            'success' => true,
            'message' => 'Tienda cargada',
            'data' => $promotions,
        ], 200);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Store  $store
     * @return \Illuminate\Http\JsonResponse
     */
    public function pickupTimes(Store $store)
    {
        $pickupTimes=$store->pickupTimes()->get();

        return response()->json([
            'success' => true,
            'message' => 'Horarios de entrega cargada',
            'data' =>$pickupTimes,
        ], 200);
    }

    public function listPickupTimes($idStore)
    {
        
       $stores = DB::table('pickup_times')
       ->where('store_id','=',$idStore)
       ->whereNull('deleted_at')
       ->get();
            
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$stores,
        ], 200);
    }

    public function listStore($idStore)
    {
        //$stores=Store::all();
        if($idStore > 0)
       $stores = DB::table('stores')
       ->join('business_store', 'stores.id', '=', 'business_store.store_id')
       ->where('business_store.business_id','=',$idStore)->get();
       else
       $stores=Store::all();
       
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$stores,
        ], 200);
    }

    public function listStoreAll(Request $request)
    {
        //$stores=Store::select('id','name')->orderBy('id', 'asc')->get();
        if($request->business_id == 0)
        $stores=Business::join('business_store','businesses.id','=','business_store.business_id')
        ->select('businesses.*', 'businesses.image as imageUrl', 'business_store.store_id')
        ->where('store_id',$request->id)
        ->get(); 
        else
        $stores=Business::join('business_store','businesses.id','=','business_store.business_id')
        ->select('businesses.*', 'businesses.image as imageUrl', 'business_store.store_id')
        ->where('store_id',$request->id)
        ->where('business_store.business_id',$request->business_id)
        ->get(); 
        
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$stores,
        ], 200);
    }

    

    public function addStore(Request $request)
    {        
       

        $categorie = new Store();        
        $categorie->name = $request->name;
        $categorie->address = $request->address;
        $categorie->phone_number = $request->phone_number;
        $categorie->opening_time = $request->opening_time;
        $categorie->closing_time = $request->closing_time;
        $categorie->minimum_purchase = $request->minimum_purchase;
        $categorie->delivery_price = $request->delivery_price;
        $categorie->latitude = $request->latitude;
        $categorie->longitude = $request->longitude;

        $ruta =   public_path('/images/business/');

        if(!file_exists($ruta)){
            mkdir($ruta, 0777,  true);
        }
       /*
        if($request->imageUrl != null){
            $categorie = $request->imageUrl;
            $categorie = str_replace('data:image/jpeg;base64,', '', $image);
            $categorie = str_replace(' ', '+', $image);
            $imageName = Str::random(32) .'.'.'jpg';
            \File::put($ruta . $imageName, base64_decode($image));
            $categorie->image = url('/') . '/images/business/' . $imageName; 
            }
            else{
                $mission->image = '';
            }*/

        $categorie->save();
    }

    public function updateStore(Request $request)
    {
            
        $categorie = Store::findOrFail($request->id);
        $categorie->phone_number = $request->phone_number;
        $categorie->opening_time = $request->opening_time;
        $categorie->closing_time = $request->closing_time;
        $categorie->minimum_purchase = $request->minimum_purchase;
        $categorie->delivery_price = $request->delivery_price;
        $categorie->latitude = $request->latitude;
        $categorie->longitude = $request->longitude;
        echo $request;
        $categorie->save();
    }

    public function deleteStore(Request $request)
    {            
        $categorie = Store::findOrFail($request->id);
        
        $categorie->deleted_at  = now();
        $categorie->save();
    }
}
