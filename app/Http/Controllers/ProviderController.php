<?php

namespace App\Http\Controllers;

use App\Provider;
use Illuminate\Http\Request;
use DB;

class ProviderController extends Controller
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

    

    public function ProvidersList(){
        $provider = DB::table('providers AS P')
        ->join('federal_entities AS FE', 'P.feen_fk', '=', 'FE.feen_pk')
        ->orderBy('FE.created_at', 'DESC')
        ->where('prov_status','=',1)
        ->get();
        
        
        return response()->json([
            'success' => true,
            'message' => 'Providers loaded',
            'data' => $provider,
        ], 200);
    }

    public function add(Request $request)
    {        
       
        $provider = new Provider();        
        $provider->prov_name = $request->prov_name;
        $provider->feen_fk = $request->feen_fk;
        $provider->prov_identifier = $request->prov_identifier;
        $provider->prov_name = $request->prov_name;
        $provider->prov_rfc = $request->prov_rfc;
        $provider->prov_phone = $request->prov_phone;
        $provider->prov_email = $request->prov_email;
        $provider->prov_addres = $request->prov_addres;
        $provider->prov_cp = $request->prov_cp;
        $provider->prov_city = $request->prov_city;
        $provider->prov_status = $request->prov_status;

        $provider->save();
    }

    public function update(Request $request)
    {        
        \DB::update("update providers set"
        . "   prov_name = '" . $request->prov_name 
        . "', feen_fk = " . $request->feen_fk
        . ",  prov_identifier  = '" .  $request->prov_identifier
        . "', prov_name = '" .  $request->prov_name
        . "', prov_rfc = '" .  $request->prov_rfc
        . "', prov_phone = '" .  $request->prov_phone
        . "', prov_email = '" .  $request->prov_email
        . "', prov_addres = '" .  $request->prov_addres
        . "', prov_cp = '" .  $request->prov_cp
        . "', prov_city = '" .  $request->prov_city
        . "', prov_status = " .  $request->prov_status
        . " where prov_pk = ". $request->prov_pk);

    }

    public function delete(Request $request)
    { 
        \DB::update("update providers set prov_status = '0' where prov_pk = ". $request->prov_pk );
    }
}
