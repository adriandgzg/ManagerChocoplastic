<?php

namespace App\Http\Controllers;

use App\Measurement;
use Illuminate\Http\Request;
use DB;

class MeasurementController extends Controller
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

    public function MeasurementsList(){
        $stores = DB::table('measurements AS P')
        ->get();
        
        
        return response()->json([
            'success' => true,
            'message' => 'Stores loaded',
            'data' => $stores,
        ], 200);
    }

    public function Measurements(){
        $stores = DB::table('measurements AS P')
        ->where('meas_status','=','1')
        ->get();
        
        
        return response()->json([
            'success' => true,
            'message' => 'Stores loaded',
            'data' => $stores,
        ], 200);
    }

    public function add(Request $request)
    {               
        $stores = new Measurement();        
        $stores->meas_name = $request->meas_name;
        $stores->meas_abbreviation = $request->meas_abbreviation;
        $stores->meas_status = $request->meas_status;

        $stores->save();
    }

    public function update(Request $request)
    {        
        
        \DB::update("update measurements set"
        . "   meas_name = '" . $request->meas_name 
        . "',  meas_abbreviation = '" . $request->meas_abbreviation
        . "', meas_status = " .  $request->meas_status
        . " where meas_pk = ". $request->meas_pk);

    }

    public function delete(Request $request)
    { 
        \DB::update("update measurements set meas_status = '0' where meas_pk = ". $request->meas_pk );
    }
}
