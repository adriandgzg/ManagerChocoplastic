<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\api\ApiResponseController;
use PhpParser\Node\Stmt\TryCatch;

/**
 * Class LoginController
 * @package App\Http\Controllers\Auth\Api
 */
class LoginController extends ApiResponseController
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
        $this->loginProxy=$loginProxy;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function start(Request $request)
    {
        $validator = Validator::make(['phone_number' =>$request->phone_number], ['phone_number' => 'required|min:10']);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Por favor ingresa un número valido', 'data' => null], 200);
        }
        $user = User::where('phone_number', $request->phone_number)->first();
        $message = 'Por favor verifica tu número';
        if (!$user) {
            $user = $this->register($request);
        } elseif (!$user->verified) {
            $resultSMS=$this->sendVerification($user);
            if(!$resultSMS){
                return response()->json(['success' => false, 'message'=>'Fallo al enviar código' , 'data' => null], 200);
            }
        } else {
            $message = 'Ingresa tu contraseña para continuar';
        }
        return response()->json(['success' => true, 'message' => $message, 'data' => $user], 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make(['phone_number' =>$request->phone_number], ['phone_number' => 'required|min:10']);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Por favor ingresa un número valido', 'data' => null], 200);
        }
        $user = User::where('phone_number', $request->phone_number)->first();
        if (!$user) {
            $user = User::create([
                'phone_number' => $request->phone_number,
            ]);
            $resultSMS=$this->sendVerification($user);
            if(!$resultSMS){
                return response()->json(['success' => false, 'message'=>'Fallo al enviar código' , 'data' => null], 200);
            }
        }
        return $user;
    }

    /**
     * @param User $user
     * @return bool
     */
    public function sendVerification(User $user)
    {
        $smsVerification= new SmsVerificationController();
        $code = rand(100000, 999999);
        $user->update([
            'verification_code' => $code,
        ]);

        return $smsVerification->sendCode($user->phone_number, $code);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify(Request $request)
    {
        $validator = Validator::make(['phone_number' =>$request->phone_number, 'verification_code'=>$request->verification_code], [
            'phone_number' => 'required|min:10', 'verification_code' => 'required|min:6|integer'
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Datos invalidos', 'data' => $validator->errors()], 200);
        }
        $user = User::where([
            'phone_number' => $request->phone_number, 'verification_code' => $request->verification_code
        ])->first();
        if ($user) {
            return response()->json(['success' => true, 'message' => 'Verificación completada', 'data' => $user], 200);
        }
        return response()->json(['success' => false, 'message' => 'Datos invalidos', 'data' => null], 200);
        return $user;
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
            'verification_code' => $request->verification_code,
        ], [
            'phone_number' => 'required|min:12',
            'name' => 'required|min:3',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'verification_code' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors(), 'data' => null], 200);
        }
        $user = User::where([
            'phone_number' => $request->phone_number,
            'verification_code' => $request->verification_code,
        ])->first();
        if (!$user || $user->verfied) {
            return response()->json([
                'success' => false,
                'message' => $user? 'Usuario ya registrado, por favor inicia sesión': 'Datos de usuario no coinciden',
                'data' => null,
            ], 200);
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
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
        $user = User::where(['phone_number' => $request->employee])->first();
        
        if (!$user) {
            return $this->dbResponse(null, 501, null, 'Usuario no encontrado');
        }

        if (!$user->verified) {
            return $this->dbResponse(null, 501, null, 'Usuario no verficado');
        }

        if ($user->password == '' || $request->password == null) {
            return $this->dbResponse(null, 501, null, 'La contraseña es necesaria');
        }

        if (!Hash::check($request->password, $user->password)){
            return $this->dbResponse(null, 501, null, 'Contraseña incorrecta, verifica e intenta de nuevo');
        }
        $phone_number = $request->employee;
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

    public function signup(Request $request)
    {
        
        $request->validate([
            'name'     => 'required|string',
            'email'    => 'required|string|email|unique:users',
            'password' => 'required|string',
        ]);
        $user = new User([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
            'phone_number'=>$request->phone_number,
            'gender'=>$request->gender,
            'stor_fk'=>$request->stor_fk,
            'verified'=>1,
            
        ]);

        
        $user->save();
        
        return $this->dbResponse("Agregado", 200, null, 'Guardado Correctamente');
    }

    public function update(Request $r)
    { 
        $r->validate([
            'id'     => 'required|int',
            'name'     => 'required|string',
            'email'    => 'required|string|email',
            'stor_fk'    => 'required|int',
        ]);

        try {
            $vUser = User::findOrFail($r->id);   
        
            $vUser->name     = $r->name;
            $vUser->email    = $r->email;
            $vUser->gender   = $r->gender;
            $vUser->stor_fk  = $r->stor_fk;  
            $vUser->verified = 1;
            $vUser->save();
            
            return $this->dbResponse(null, 200, null, 'Usuario Modificado Correctamente');
        } catch (\Throwable $th) {
            return $this->dbResponse(null, 500, $th, $th);
        }    
    }



    public function passwordchange(Request $r)
    { 
        $r->validate([
            'id'     => 'required|int',
            'password' => 'required|string'
        ]);

        try {
            $vUser = User::findOrFail($r->id);   
            $vUser->password = bcrypt($r->password); 
            $vUser->save();
            
            return $this->dbResponse(null, 200, null, 'Contraseña de Usuario Modificada Correctamente');
        } catch (\Throwable $th) {
            return $this->dbResponse(null, 500, $th, $th);
        }    
    }

}
