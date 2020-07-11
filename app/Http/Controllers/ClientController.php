<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;
use DB;

class ClientController extends Controller
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

    public function ClientsList(){
        $client = DB::table('clients AS P')
        ->join('federal_entities AS FE', 'P.feen_fk', '=', 'FE.feen_pk')
        ->orderBy('FE.created_at', 'DESC')
        ->get();
        
        
        return response()->json([
            'success' => true,
            'message' => 'Clients loaded',
            'data' => $client,
        ], 200);
    }

    public function Clients(){
        $client = DB::table('clients AS P')
        ->where('P.clie_status','=','1')
        ->get();
        
        
        return response()->json([
            'success' => true,
            'message' => 'Clients loaded',
            'data' => $client,
        ], 200);
    }

    public function Genders(){
        //$gender[];

        $gender[0] = [
            'id' => 1,
            'name' => 'Masculino'
        ];

        $gender[1] = [
            'id' => 2,
            'name' => 'Femenino'
        ];

        return response()->json([
            'success' => true,
            'message' => 'Genders loaded',
            'data' => $gender,
        ], 200);
    }

    public function add(Request $request)
    {        
       
        $client = new Client();        
        $client->clie_name = $request->clie_name;
        $client->feen_fk = $request->feen_fk;
        $client->clie_identifier = $request->clie_identifier;
        $client->clie_name = $request->clie_name;
        $client->clie_rfc = $request->clie_rfc;
        $client->clie_phone = $request->clie_phone;
        $client->clie_email = $request->clie_email;
        $client->clie_addres = $request->clie_addres;
        $client->clie_cp = $request->clie_cp;
        $client->clie_city = $request->clie_city;
        $client->clie_status = $request->clie_status;

        $client->save();
    }

    public function update(Request $request)
    {        
        \DB::update("update clients set"
        . "   clie_name = '" . $request->clie_name 
        . "', feen_fk = " . $request->feen_fk
        . ",  clie_identifier  = '" .  $request->clie_identifier
        . "', clie_name = '" .  $request->clie_name
        . "', clie_rfc = '" .  $request->clie_rfc
        . "', clie_phone = '" .  $request->clie_phone
        . "', clie_email = '" .  $request->clie_email
        . "', clie_addres = '" .  $request->clie_addres
        . "', clie_cp = '" .  $request->clie_cp
        . "', clie_city = '" .  $request->clie_city
        . "', clie_status = " .  $request->clie_status
        . " where clie_pk = ". $request->clie_pk);

    }

    public function delete(Request $request)
    { 
        \DB::update("update clients set clie_status = '0' where clie_pk = ". $request->clie_pk );
    }
}
