<?php

namespace App\Http\Controllers;

use App\PaymentShape;
use Illuminate\Http\Request;

class PaymentShapeController extends Controller
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

    public function PaymentShapesList(){
        $payment = PaymentShape::all();
        
        
        return response()->json([
            'success' => true,
            'message' => 'entities loaded',
            'data' => $payment,
        ], 200);
    }

    public function add(Request $request)
    {        
       
        $payment = new PaymentShape();        
        $payment->pash_name = $request->pash_name;
        $payment->pash_status = $request->pash_status;

        $payment->save();
    }

    public function update(Request $request)
    {        
        
        \DB::update("update payment_shapes set"
        . "   pash_name = '" . $request->pash_name 
        . "', pash_status = " .  $request->pash_status
        . " where pash_pk = ". $request->pash_pk);

    }

    public function delete(Request $request)
    { 
        \DB::update("update payment_shapes set pash_status = '0' where pash_pk = ". $request->pash_pk );
    }
}
