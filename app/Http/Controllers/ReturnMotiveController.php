<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Throwable;
use App\ReturnMotive;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;

class ReturnMotiveController extends ApiResponseController
{ 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $vRM = DB::table('return_motives AS RM')
                ->select(
                    'RM.remo_pk',
                    'RM.remo_description',
                    'RM.created_at'
                )
                ->where('remo_status', '=', '1')
                ->get();
            
            return $this->dbResponse($vRM, 200, null, 'Lista de Motivos de Devoluciones');
          
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, "Error || Consultar con el Administrador del Sistema");
        }
    }

    public function ReturnMotivesList(){
        $payment = ReturnMotive::all();
        
        
        return response()->json([
            'success' => true,
            'message' => ' loaded',
            'data' => $payment,
        ], 200);
    }

    public function add(Request $request)
    {        
       
        $payment = new ReturnMotive();        
        $payment->remo_description = $request->remo_description;
        $payment->remo_status = $request->remo_status;

        $payment->save();
    }

    public function update(Request $request)
    {        
        
        \DB::update("update return_motives set"
        . "   remo_description = '" . $request->remo_description 
        . "', remo_status = " .  $request->remo_status
        . " where remo_pk = ". $request->remo_pk);

    }

    public function delete(Request $request)
    { 
        \DB::update("update return_motives set remo_status = '0' where remo_pk = ". $request->remo_pk );
    }
}
