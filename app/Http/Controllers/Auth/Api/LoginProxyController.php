<?php

namespace App\Http\Controllers\Auth\Api;

use App\User;
use App\System;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\api\ApiResponseController;

class LoginProxyController extends ApiResponseController
{

    const REFRESH_TOKEN = 'refreshToken';

    /**
     * Attempt to create an access token using user credentials
     *
     * @param string $email
     * @param string $password
     */
    public function attemptLogin($phonne_number, $password)
    {
        $user = User::where(['phone_number' => $phonne_number])->first();

        if (!is_null($user)) {
            return $this->proxy(
                'password', [
                'username' => $phonne_number,
                'password' => $password
            ]);
        }

    }

    /**
     * Proxy a request to the OAuth server.
     *
     * @param string $grantType what type of grant type should be proxied
     * @param array $data the data to send to the server
     */
    public function proxy($grantType, array $data = [])
    {
        $data = array_merge($data, [
            'client_id' => 2, //config('PASSWORD_CLIENT_ID'),
            'client_secret' => "4NtvmAO4J5WfGWwe20PirddOk91XGNG57RQsZy7k", //config('PASSWORD_CLIENT_SECRET'),
            'grant_type' => $grantType
        ]);

        $tokenRequest = Request::create('/oauth/token', 'POST', $data); 
        $response = app()->handle($tokenRequest);

        $vSystem = System::select('syst_prod_desc_availability')->first();

        $vResult = json_decode($response->getContent());

        $vResult->syst_prod_desc_availability = $vSystem->syst_prod_desc_availability;

        return $this->dbResponse($vResult, 200, null, isset($vResult->error) ? $vResult->message : 'Login Exitoso');
    }

    /**
     * Attempt to refresh the access token used a refresh token that
     * has been saved in a cookie
     */
    public function attemptRefresh($refreshToken)
    {
        return $this->proxy('refresh_token', [
            'refresh_token' => $refreshToken
        ]);
    }

    /**
     * Logs out the user. We revoke access token and refresh token.
     * Also instruct the client to forget the refresh cookie.
     */
    public function logout()
    {
        $accessToken = Auth::user()->token();

        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();
    }



}
