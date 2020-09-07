<?php

namespace App\Traits;

use App\Log;
use App\DevCode;
use Illuminate\Support\Facades\Auth;

trait ApiResponse
{

    public function dbResponse($pdata, $pdeco_code, $ptechnicaldetail, $msj)
    {
        $vtechnicaldetail = $ptechnicaldetail;
        $vdeco_description = $msj; //$vDV[0]->deco_description;
        $vdeco_message = $msj; //$vDV[0]->deco_message;
      

        if($pdeco_code == 200)
        {
            $vStatusBool= true;
        }
        else
        {
            $vStatusBool= false;
        }

        return response()->json(
            array(
                "status" => array
                (
                    "status" => $vStatusBool, 
                    "code" => $pdeco_code, 
                    "description" => $vdeco_description, 
                    "message" => $vdeco_message, 
                    "technicaldetail" => $vtechnicaldetail
                ), 
                "data" => $pdata
            )
            , 200
        );
    }


    protected function getstorelog(string $ptable, int $ppk_register, int $poperation)
    {
        //ID Usuario
        $vuser_fk = 1;//Auth::user()->id;

        //Inserción de log
        $vL = new Log();
        $vL->user_fk = $vuser_fk;
        $vL->table = $ptable;
        $vL->pk_register = $ppk_register;
        $vL->operation = $poperation;
        $vL->save();
    }






















































    public function successResponse($pdata, $pstatus = true, $pcode = 200, $pmsj = '')
    {
        return response()->json(
            array("status" => $pstatus, "code" => $pcode, "message" => $pmsj, "data" => $pdata), $pcode
        );
    }

    public function errorResponse($pdata, $pstatus = false, $pcode = 500, $pmsj = '')
    {
        return response()->json(
            array("status" => $pstatus, "code" => $pcode, "message" => $pmsj, "data" => $pdata), $pcode
        );
    }

    public function notfoundRsesponse($pdata, $pstatus = true, $pcode = 404, $pmsj = '')
    {
        return response()->json(
            array("status" => $pstatus, "code" => $pcode, "message" => $pmsj, "data" => $pdata), 200
        );
    }

}
