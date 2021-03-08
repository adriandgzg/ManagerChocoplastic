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
        $client = DB::table('clients AS C')
        ->join('federal_entities AS FE', 'C.feen_fk', '=', 'FE.feen_pk')
        ->select(
            'C.clie_pk',
            'C.feen_fk',
            'C.clie_identifier',
            'C.clie_name',
            DB::raw("CONCAT(C.clie_identifier, ' ' ,C.clie_name) AS clie_name_identifier"),
            'C.clie_rfc',
            'C.clie_phone',
            'C.clie_email',
            'C.clie_addres',
            'C.clie_cp',
            'C.clie_city',
            'C.clie_status',
            'FE.feen_pk',
            'FE.feen_name',
            DB::raw('
                (
                    (SELECT IFNULL(SUM(CD.clde_amount), 0) FROM client_debts AS CD WHERE CD.clde_status <> 0 AND CD.clie_fk = C.clie_pk)
                    -
                    (SELECT IFNULL(SUM(CP.clpa_amount), 0) FROM client_payments AS CP WHERE CP.clpa_status <> 0 AND CP.clie_fk = C.clie_pk)
                ) AS clde_amount_outstanding
            ') //Monto Pendiente por pagar

        )
        ->orderBy('C.created_at')
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
        \DB::update("UPDATE clients SET"
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
        . " WHERE clie_pk = ". $request->clie_pk);

    }

    public function delete(Request $request)
    { 
        \DB::update("UPDATE clients SET clie_status = 0 WHERE clie_pk = ". $request->clie_pk );
    }
}
