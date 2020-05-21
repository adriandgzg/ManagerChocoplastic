<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Nexmo\Laravel\Facade\Nexmo;

/**
 * Class SmsVerificationController
 * @package App\Http\Controllers\Auth\Api
 */
class SmsVerificationController extends Controller
{
    /**
     * @param $phone_number
     * @param $code
     * @return bool
     */
    public function sendCode($phone_number, $code)
    {
        try
        {
            $result= Nexmo::message()->send([
                'to' => $phone_number,
                'from' => config('app.name', ''),
                'text' => $code . ' es tu clave para verificar tu cuenta de ' . config('app.name'),
            ]);
            return $result;
        }
        catch (Exception $e)
        {
            Log::error($e);
            return  false;
        }
    }


}
