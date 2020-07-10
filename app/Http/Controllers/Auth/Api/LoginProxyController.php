<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $user = User::where([
            'phone_number' => $phonne_number
        ])->first();

        if (!is_null($user)) {
            return $this->proxy($phonne_number,
                'password', [
                'username' => $phonne_number,
                'password' => $password
            ])
            ;
        }

    }

    /**
     * Proxy a request to the OAuth server.
     *
     * @param string $grantType what type of grant type should be proxied
     * @param array $data the data to send to the server
     */
    public function proxy($phonne_number, $grantType, array $data = [])
    {
        $data = array_merge($data, [
            'client_id' => config('auth.password_client_id'),
            'client_secret' => config('auth.password_client_secret'),
            'grant_type' => $grantType
        ]);

        $tokenRequest = Request::create('/oauth/token', 'POST', $data);
        $response = app()->handle($tokenRequest);

        $result = json_decode($response->getContent());
        //dd($response->status());

        $vUser = User::where('phone_number', '=', $phonne_number)->select('phone_number','stor_fk')->first();



        return $this->dbResponse($vUser, 200, null, isset($result->error) ? $result->message : 'Login Exitoso');

       /* return response()->json([
            'success' => !isset($result->error),
            'message' => ,
            'data' => $result, 
        ], 200);*/
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
