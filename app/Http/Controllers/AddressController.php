<?php

namespace App\Http\Controllers;

use App\Address;
use App\Coverage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator=$this->validator($request->all());
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
                'data' => null,
            ], 200);
        }
        $haveCoverage = Coverage::findByLocation("$request->latitude,$request->longitude");
        if ($haveCoverage) {
            $address = Address::create(array_merge($request->all(), ['user_id' => Auth::id()]));
            $address = array_merge($address->toArray(), ['store_id' => $haveCoverage->store_id]);
            $message = "Dirección almacenada";
        } else {
            $message = "No se cuenta con cobertura";
            $address = null;
        }
        return response()->json([
            'success' => !is_bool($haveCoverage),
            'message' => $message,
            'data' => $address,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Address  $address
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        $addresses = Address::where('user_id', Auth::user()->id)->get();
        return response()->json([
            'success' => true,
            'message' => 'Dirección cargada',
            'data' => $addresses,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function edit(Address $address)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Address $address)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function destroy(Address $address)
    {
        //
    }


    /**
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'alias' => ['required', 'string'],
            'address' => ['required', 'string'],
            'references' => ['required', 'string'],
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
        ]);
    }
}
