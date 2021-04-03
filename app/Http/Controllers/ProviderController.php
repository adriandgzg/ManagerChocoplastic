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
        $provider = DB::table('providers AS P')
        ->select
        (
            'P.prov_pk',
            'P.prov_identifier',
            DB::raw("CONCAT(P.prov_identifier, ' - ', P.prov_name) AS prov_name") 
        )
        ->where('P.prov_status' , '=', 1)
        ->get();
        
        
        return response()->json([
            'success' => true,
            'message' => 'Listado de Proveedores',
            'data' => $provider,
        ], 200);
    }

     

    public function ProvidersList(){
        $provider = DB::table('providers AS P')
        ->join('federal_entities AS FE', 'P.feen_fk', '=', 'FE.feen_pk')
        ->select(
            'P.prov_pk',
            'P.feen_fk',
            'P.prov_identifier',
            DB::raw("CONCAT(P.prov_identifier, ' - ', P.prov_name) AS prov_name_identifier"),
            'P.prov_name',
            'P.prov_rfc',
            'P.prov_phone',
            'P.prov_email',
            'P.prov_addres',
            'P.prov_cp',
            'P.prov_city',
            'P.prov_status',
            'P.created_at',
            'FE.feen_pk',
            'FE.feen_name',
            DB::raw('
                (
                    (SELECT IFNULL(SUM(PD.prde_amount), 0) FROM provider_debts AS PD WHERE PD.prde_status <> 0 AND PD.prov_fk = P.prov_pk)
                    -
                    (SELECT IFNULL(SUM(PP.prpa_amount), 0) FROM provider_payments AS PP WHERE PP.prpa_status <> 0 AND PP.prov_fk = P.prov_pk)
                ) AS prde_amount_outstanding
            ') //Monto Pendiente por pagar
        )
        ->orderBy('P.created_at')
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
