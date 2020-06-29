<?php

namespace App\Http\Controllers;

use DB;
use App\Store;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;


class StoreController extends ApiResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $vStore = Store::where('stor_status', '=', 1)->select('stor_pk','stor_name','stor_phone','stor_addres', 'stor_main')->get();
            return $this->successResponse($vStore, true, 200, "Lista de Sucursales");
        } catch (Exception $e) {
            return $this->errorResponse(null, false, 500, $e);
        }
    }

    public function Stores(){
        $stores = DB::table('stores AS P')
        ->where('stor_status','=',1)
        ->get();
        
        
        return response()->json([
            'success' => true,
            'message' => 'Stores loaded',
            'data' => $stores,
        ], 200);
    }

    public function StoresList(){
        $stores = DB::table('stores AS P')
        ->get();
        
        
        return response()->json([
            'success' => true,
            'message' => 'Stores loaded',
            'data' => $stores,
        ], 200);
    }

    public function add(Request $request)
    {        
       
        $stores = new Store();        
        $stores->stor_name = $request->stor_name;
        $stores->stor_phone = $request->stor_phone;
        $stores->stor_addres = $request->stor_addres;
        $stores->stor_main = $request->stor_main;
        $stores->stor_status = $request->stor_status;

        $stores->save();
    }

    public function update(Request $request)
    {        
        
        \DB::update("update stores set"
        . "   stor_name = '" . $request->stor_name 
        . "', stor_phone = '" .  $request->stor_phone
        . "', stor_addres = '" .  $request->stor_addres
        . "', stor_main = " .  $request->stor_main 
        . ", stor_status = " .  $request->stor_status
        . " where stor_pk = ". $request->stor_pk);

    }

    public function delete(Request $request)
    { 
        \DB::update("update stores set store_status = '0' where stor_pk = ". $request->stor_pk );
    }
}
