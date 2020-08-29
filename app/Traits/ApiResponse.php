<?php

namespace App\Traits;

use App\Log;
use App\DevCode;
use Illuminate\Support\Facades\Auth;

trait ApiResponse
{

    public function dbResponse($pdata, $pdeco_code, $ptechnicaldetail, $msj)
    {
        //$vDV = DevCode::where('deco_codxe', '=', $pdeco_code)->select('deco_pk', 'deco_status', 'deco_description', 'deco_message')->first();
        $vtechnicaldetail = $ptechnicaldetail;
        //$vstatus = $vDV[0]->deco_status;
        $vdeco_description = $msj; //$vDV[0]->deco_description;
        $vdeco_message = $msj; //$vDV[0]->deco_message;
        /*
        if($vstatus == 1)
        {
            $pdeco_code = 200;
        }

        if ($vstatus == 1) {
            $vStatusBool = true;
        }
        else
        {
            $vStatusBool = false;
        }*/

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
        $vuser_fk = Auth::user()->id;

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
