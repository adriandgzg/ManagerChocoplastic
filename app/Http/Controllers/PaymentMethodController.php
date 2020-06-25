<?php

namespace App\Http\Controllers;

use App\PaymentMethod;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
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

    public function PaymentMethodsList(){
        $payment = PaymentMethod::all();
        
        
        return response()->json([
            'success' => true,
            'message' => 'entities loaded',
            'data' => $payment,
        ], 200);
    }

    public function add(Request $request)
    {        
       
        $payment = new PaymentMethod();        
        $payment->pame_name = $request->pame_name;
        $payment->pame_status = $request->pame_status;

        $payment->save();
    }

    public function update(Request $request)
    {        
        
        \DB::update("update payment_methods set"
        . "   pame_name = '" . $request->pame_name 
        . "', pame_status = " .  $request->pame_status
        . " where pame_pk = ". $request->pame_pk);

    }

    public function delete(Request $request)
    { 
        \DB::update("update payment_methods set pame_status = '0' where pame_pk = ". $request->pame_pk );
    }
}
