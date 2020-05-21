<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/**
 * Class LoginController
 * @package App\Http\Controllers\Auth\Api
 */
class LoginFacebookController extends Controller
{
    /**
     * @var LoginProxyController
     */
    protected $loginProxy;

    /**
     * LoginController constructor.
     * @param LoginProxyController $loginProxy
     */
    public function __construct(LoginProxyController $loginProxy)
    {
        $this->loginProxy = $loginProxy;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function start(Request $request)
    {
        $validator = Validator::make([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ], [
            'name' => 'required|min:3',
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Por favor verifica tus datos de acceso', 'data' => $validator->errors()], 200);
        }
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return $this->register($request);
        } elseif ($user->verified) {
            return $this->login($request);
        } else {
            return response()->json(['success' => true, 'message' => 'Por favor ingresa tu número', 'data' => $user], 200);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ], [
            'name' => 'required|min:3',
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Por favor verifica tus datos', 'data' => $validator->errors()], 200);
        }
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $user = User::create([
                'email' => $request->email,
                'name' => $request->name,
                'password' => Hash::make($request->password),
            ]);
            return response()->json(['success' => true, 'message' => "Usuario registrado, por favor ingresa tu número", 'data' => $user], 200);
        } else {
            return response()->json(['success' => false, 'message' => "Usuario ya registrado", 'data' => null], 200);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function complete(Request $request)
    {
        $validator = Validator::make([
            'phone_number' => $request->phone_number,
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ], [
            'phone_number' => 'required|min:12',
            'name' => 'required|min:3',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors(), 'data' => null], 200);
        }
        $user = User::where(['email' => $request->email])->first();
        if (!$user || $user->verfied) {
            return response()->json([
                'success' => false,
                'message' => $user ? 'Usuario ya registrado, por favor inicia sesión' : 'Usuario no encontrado',
                'data' => null,
            ], 200);
        }
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Datos incorrectos',
                'data' => null,
            ], 200);
        }


        $user->update([
            'phone_number' => $request->phone_number,
            'verified' => true,
            'verification_code' => null,
        ]);
        return $this->login($request);
        //return response()->json(['success' => true, 'message' => 'Registro exitoso', 'data' => $token], 200);

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $user = User::where(['email' => $request->email])->first();
        if (!$user || !$user->verified || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no verficado o datos incorrectos',
                'data' => null
            ], 200);
        }
        $phone_number = $user->phone_number;
        $password = $request->password;
        return $this->loginProxy->attemptLogin($phone_number, $password);

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
        return response()->json($this->loginProxy->attemptRefresh($request->refreshToken));
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->loginProxy->logout();

        return response()->json(null, 204);
    }

}
