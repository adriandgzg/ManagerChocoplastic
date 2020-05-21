<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  \App\Address  $address
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        $profile =Auth::user();
        return response()->json([
            'success' => true,
            'message' => 'Perfil cargado',
            'data' => $profile,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Address  $address
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $validator=$this->validator($request->all());
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
                'data' => null,
            ], 200);
        }
        $user=Auth::user();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->birthday =  $request->birthday;
        $user->gender =  $request->gender;
        $user->profile_picture =  $request->profile_picture;
        $user->save();
        return response()->json([
            'success' => true,
            'message' => 'Perfil actualizado',
            'data' => $user,
        ], 200);
    }


    /**
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'birthday' => ['date','nullable'],
            'gender' => ['string','nullable'],
           // 'photo' => ['image'],
        ]);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function playerId(Request $request)
    {
        $user=$request->user();
        $user->player_id=$request->player_id;
        $user->save();
        if ($user) {
            return response()->json([
                'success' => true,
                'message' => 'Player ID actualizado',
                'data' => $user,
            ], 200);
        }
        return response()->json(
        [
            'estado' => false,
            'mensaje' => 'Datos no actualizados',
            'data' =>null,
        ], 200);
    }
}
