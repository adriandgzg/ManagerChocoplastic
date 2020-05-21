<?php

namespace App\Http\Controllers;

use App\Sale;
use App\User;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    function show(){
        $user=\Auth::user();
        //TODO: change to relation user type model
        if ($user->user_type_id==2){
            $sales=Sale::where('delivery_type_id',1)->where('delivery_id',$user->id)->with(['address','user'])->get();
            return response()->json([
                'success' => true,
                'message' => 'Compras cargadas',
                'data' =>$sales,
            ], 200);
        }else{
            return  response()->json([
                'success' => false,
                'message' => 'No esta autorizado a realizar esta acción',
                'data' =>null,
            ], 401);
        }

    }
    function status(){
        $user=\Auth::user();
        $sales=Sale::where('user_id', $user->id)->whereHas('statuses')->get();
        $statuses=$sales->pluck('statuses')->collapse();
            return  response()->json([
                'success' => true,
                'message' => 'Ventas cargadas',
                'data' =>$statuses,
            ], 200);


    }
    function delivery(Sale $sale){
        $delivery=$sale->load(['deliveryMan', 'pickUp']);

        return  response()->json([
            'success' => true,
            'message' => 'Información de entrega cargada',
            'data' =>$delivery,
        ], 200);


    }
    function deliveryMen(){
        $delivery=User::where('user_type_id',2)->get();

        return  response()->json([
            'success' => true,
            'message' => 'Información de entrega cargada',
            'data' =>$delivery,
        ], 200);


    }
    function update(Request $request){
        $sale=Sale::find($request->id);
        $sale->delivery_id=$request->delivery_id;
        $sale->save();

        return  response()->json([
            'success' => true,
            'message' => 'Repartidor asignado',
            'data' =>$sale,
        ], 200);
    }
}
