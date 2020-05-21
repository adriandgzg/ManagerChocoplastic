<?php

namespace App\Http\Controllers;

use App\Business;
use App\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CarController extends Controller
{
    /**
     * details api
     *
     * @param Request $request
     * @param Store $store
     * @param Business $business
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Store $store, Business $business)
    {
        $product=$business->products()
            ->where('id', $request->product )
            ->where('store_id',$store->id)->first();
        $quantity=$request->quantity;
        $comments=$request->comments;
        $result=null;
        if ($product) {
            if ($quantity>0) {
                if ($quantity<=$product->stock->stock) {
                    if ($quantity<=$product->stock->max_quantity) {
                        $result=$request->user()->car()->syncWithoutDetaching([
                            $product->id=>[
                                'quantity'=>$quantity,
                                'comments'=>$comments,
                                'store_id'=>$store->id,
                                'business_id'=>$business->id,
                            ]
                        ], false);
                        $msg='Carrito actualizado';
                    } else {
                        $msg='Cantidad máxima de productos agregada';
                    }
                } else {
                    $msg='Disponibilidad máxima alcanzada';
                }
            } else {
                $result=$request->user()->car()->detach($product->id);
                $msg='Producto eliminado';
            }
        } else {
            $msg="Por el momento este producto esta agotado";
        }
        return response()->json([
            'success' => true,
            'message' => $msg,
            'data' => null,
        ], 200);

    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Car  $car
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Store $store)
    {
        $user=Auth::user();
        $products=$user->car()->where('store_id', $store->id)->get();
        $cat=[];
        collect($products)->map(function ($product) use ($store, &$cat) {
            $business = Business::find($product->car->business_id);
            $newProduct = $business->products()
                ->where('id', $product->id)
                ->where('store_id', $store->id)
                ->wherePivot('active', true)
                ->wherePivot('stock', '>=', 0)
                ->withRelations($store->id, $business->id, Auth::id())
                ->first();
            if ($newProduct) {
                $newProduct->car = $product->car;
                $cat[] = $newProduct;
            }

        });

        return response()->json([
            'success' => true,
            'message' => 'Carrito cargado',
            'data' => $cat,
        ], 200);

    }


}
