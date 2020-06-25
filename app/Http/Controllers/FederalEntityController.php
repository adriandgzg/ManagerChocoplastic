<?php

namespace App\Http\Controllers;

use App\FederalEntity;
use Illuminate\Http\Request;

class FederalEntityController extends Controller
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

    public function EntitiesList(){
        $entities = FederalEntity::all();
        
        
        return response()->json([
            'success' => true,
            'message' => 'entities loaded',
            'data' => $entities,
        ], 200);
    }

    public function add(Request $request)
    {        
       
        $stores = new FederalEntity();        
        $stores->feen_name = $request->feen_name;
        $stores->feen_status = $request->feen_status;

        $stores->save();
    }

    public function update(Request $request)
    {        
        
        \DB::update("update federal_entities set"
        . "   feen_name = '" . $request->feen_name 
        . "', feen_status = " .  $request->feen_status
        . " where feen_pk = ". $request->feen_pk);

    }

    public function delete(Request $request)
    { 
        \DB::update("update federal_entities set feen_status = '0' where feen_pk = ". $request->feen_pk );
    }

}
