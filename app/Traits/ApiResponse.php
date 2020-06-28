<?php

namespace App\Traits;

use App\DevCode;

trait ApiResponse
{

    public function dbResponse($pdata, $pdeco_code, $ptechnicaldetail)
    {
        $vDV = DevCode::where('deco_code', '=', $pdeco_code)->select('deco_pk', 'deco_status', 'deco_description', 'deco_message')->get();

        $vstatus = $vDV[0]->deco_status;
        $vdeco_description = $vDV[0]->deco_description;
        $vdeco_message = $vDV[0]->deco_message;

        if($vstatus == 'success')
        {
            $pdeco_code = 200;
        }

        return response()->json
        (
            array(
                "status" => array("status" => $vstatus , "code" => $pdeco_code, "description" => $vdeco_description, "message" => $vdeco_message, "technicaldetail" => $ptechnicaldetail), 
                "data" => $pdata
            )
            , 200
        );
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
