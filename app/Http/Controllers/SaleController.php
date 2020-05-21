<?php

namespace App\Http\Controllers;

use App\Address;
use App\Business;
use App\Sale;
use App\Status;
use App\Store;
use App\User;
use App\CancelReason;
use App\Admin;
use App\Role;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


/**
 * Class SaleController
 * @package App\Http\Controllers
 */
class SaleController extends Controller
{
    /**
     * details api
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request, Store $store)
    {
        if ($request->delivery_type_id == 1 && (!$request->delivery_price || !$request->delivery_distance)) {
            return response()->json([
                'success' => false,
                'message' => 'La distancia y el precio de envio es requerido',
                'data' => null,
            ], 200);
        }

        $address = Address::find($request->address);
        $user = Auth::user();
        $sale_products = $request->products;
        //$sale_products=$user->car()->where('store_id', $store->id)->get();
        $products = collect($sale_products)->map(function ($product, $key) use ($store) {
            $business = Business::find($product['business_id']);
            $newProduct = $business->products()
                ->where('id', $product['id'])
                ->where('store_id', $store->id)
                ->wherePivot('active', true)
                ->wherePivot('stock', '>=', 0)
                ->withRelations($store->id, $business->id, Auth::id())
                ->first();
            $newProduct->car = new Collection();
            $newProduct->car->quantity = $product['quantity'];
            $newProduct->car->comments = $product['comments'];
            return $newProduct;
        });
        DB::beginTransaction();
        try {

            $sale = Sale::create([
                'user_id' => $user->id,
                'store_id' => $store->id,
                'address_id' => $address->id,
                'payment_method_id' => $request->payment_method,
                'ticket' => date('YmdHms') . $user->id,
                'delivery_type_id' => $request->delivery_type_id,
                'delivery_price' => $request->delivery_price,
                'delivery_distance' => $request->delivery_distance,
                'pickup_time_id' => $request->pickup_time_id,
                'comments' => isset($request->comments) ? $request->comments : null,
                'cash_amount' => isset($request->cash_amount) ? $request->cash_amount : null,
            ]);
            $total = 0;
            collect($products)->each(function ($product, $key) use ($user, $sale, &$total) {
                $promotion = $product->promotions->first();
                $price = $promotion != null ? $promotion->price : $product->stock->price;
                $total += $price * $product->car->quantity;
                $sale->products()->attach(
                    $product->id, [
                        'quantity' => $product->car->quantity,
                        'sale_price' => $price,
                        'promotion_id' => $promotion ? $promotion->id : null,
                        'business_id' => $product->stock->business_id,
                        'comments' => $product->car->comments,
                    ]
                );
            });

//            if ($sale->delivery_type_id == 1) {
//                $total = $total + ($request->delivery_price * $request->delivery_distance);
//            }
            $sale->total = $total;
            $sale->save();

        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'La venta no pudo ser procesada. Por favor actualiza tu app',
                'data' => null,
            ], 200);
        }
        DB::commit();
        return response()->json([
            'success' => true,
            'message' => 'Tu pedido se encuentra en proceso',
            'data' => $sale,
        ], 200);
    }

    /**
     * details api
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, Store $store)
    {
        if ($request->delivery_type_id == 1 && (!$request->delivery_price || !$request->delivery_distance)) {
            return response()->json([
                'success' => false,
                'message' => 'La distancia y el precio de envio es requerido',
                'data' => null,
            ], 200);
        }

        if (strtotime(date('H:i')) >= strtotime($store->closing_time) && strtotime(date('H:i')) <= strtotime($store->opening_time)) {
            return response()->json([
                'success' => false,
                'message' => 'Nuestro horario de servicio es de ' . $store->opening_time . ' a ' . $store->closing_time,
                'data' => null,
            ], 200);
        }
        $address = Address::find($request->address);
        $user = Auth::user();
        $sale_products = $user->car()->where('store_id', $store->id)->get();
        $products = [];
        collect($sale_products)->map(function ($product) use ($store, &$products) {
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
                $products[] = $newProduct;
            }

        });
        DB::beginTransaction();
        try {

            $sale = Sale::create([
                'user_id' => $user->id,
                'store_id' => $store->id,
                'address_id' => $address->id,
                'payment_method_id' => $request->payment_method,
                'ticket' => date('YmdHms') . $user->id,
                'delivery_type_id' => $request->delivery_type_id,
                'delivery_price' => $request->delivery_price,
                'delivery_distance' => $request->delivery_distance,
                'pickup_time_id' => $request->pickup_time_id,
                'comments' => isset($request->comments) ? $request->comments : null,
                'cash_amount' => isset($request->cash_amount) ? $request->cash_amount : null,
            ]);
            $total = 0;
            collect($products)->each(function ($product, $key) use ($store, $user, $sale, &$total) {
                $promotion = $product->promotions->first();
                $product->business()
                    ->wherePivot('store_id', $store->id)
                    ->updateExistingPivot($product->stock->business_id, ['stock' => ($product->stock->stock - $product->car->quantity )]);
                $price = $promotion != null ? $promotion->price : $product->stock->price;
                $total += $price * $product->car->quantity;
                $user->car()->detach($product->id);
                $sale->products()->attach(
                    $product->id, [
                        'quantity' => $product->car->quantity,
                        'sale_price' => $price,
                        'promotion_id' => $promotion ? $promotion->id : null,
                        'business_id' => $product->stock->business_id,
                        'comments' => $product->car->comments,
                    ]
                );
            });
//            if ($sale->delivery_type_id == 1) {
//                $total = $total + ($request->delivery_price * $request->delivery_distance);
//            }
            $sale->total = $total;
            $sale->save();

        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'La venta no pudo ser procesada. Por favor actualiza tu app',
                'data' => null,
            ], 200);
        }

        DB::commit();
        return response()->json([
            'success' => true,
            'message' => 'Tu pedido se encuentra en proceso',
            'data' => $sale,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Store $store
     * @param Business $business
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $sales = Auth::user()->sales()->orderByDesc('id')->with(['address','store:id,address,name,latitude,longitude'])->get();
        return response()->json([
            'success' => true,
            'message' => 'Ventas cargadas',
            'data' => $sales,
        ], 200);
    }

    /**
     * Update sales status.
     *
     * @param Store $store
     * @param Business $business
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Sale $sale, Status $status)
    {
        //TODO: Agregar validaciones para tipo de usuario
        $user = Auth::user();
        if ($user->id == $sale->user_id || $user->id == $sale->delivery_id) {
            $sale->status_id = $status->id;
            $sale->save();
            $sale->statuses()->attach($status->id, ['user_id' => $user->id]);
            if ($user->id != $sale->user_id) {
                $user = User::find($sale->user_id);
            }
            $response = $this->notify($user->player_id, $status->description);
            Log::debug($response);
        }
        return response()->json([
            'success' => true,
            'message' => 'Venta actualizada ',
            'data' => $sale,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Store $store
     * @param Business $business
     * @param Sale $sale
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Store $store, Sale $sale)
    {
        $sale->load('status');
        $products = $sale->products()->with(['business:id,name'])
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Ventas cargadas',
            'data' => $products,
        ], 200);
    }

    public function showBusiness(Store $store, Sale $sale, $businessId)
    {
        $sale->load('status');
        $products = $sale->products()->with(['business:id,name'])
        ->where('business_id','=',$businessId)
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Ventas cargadas',
            'data' => $products,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Store $store
     * @param Business $business
     * @return \Illuminate\Http\JsonResponse
     */
    public function sales(Store $store, Business $business)
    {
        $products_ids = Auth::user()->sales()->where('store_id', $store->id)
            ->with(['products' => function ($q) use ($business, $store) {
                $q->where('product_sale.business_id', $business->id);
            }])->get()->pluck('products')->collapse()->pluck('id');

        $products = $business->products()
            ->whereIn('id', $products_ids)
            ->where('store_id', $store->id)
            ->wherePivot('active', true)
            ->wherePivot('stock', '>=', 0)
            ->wherePivot('featured', true)
            ->withRelations($store->id, $business->id, Auth::id())
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'Ventas cargadas',
            'data' => $products,
        ], 200);
    }

    public function listsale(int $store)
    {
        
        if($store <= 0){
        $sale = Sale::orderByDesc('id')        
        ->with(['user:id,name',
            'status:id,name',
            'store:id,name',
            'address:id,address,latitude,longitude',
            'paymentMethod:id,name',
            'deliveryTime:id,time'])
            ->select('sales.*',
            DB::raw('(
                select if(count(*)>0,1,0) from product_sale 
                where sale_id = sales.id and business_id = ' . $store .'
            ) as exist')
            )->get();                        
        }
        else
        {      
            $sale = Sale::orderByDesc('id')      
           ->with(['user:id,name',
            'status:id,name',
            'store:id,name',
            'address:id,address,latitude,longitude',
            'paymentMethod:id,name',
            'deliveryTime:id,time'])
            ->select('sales.*',
            DB::raw('(
                select if(count(*)>0,1,0) from product_sale 
                where sale_id = sales.id and business_id = ' . $store .'
            ) as existen')
            )
            ->having('existen', '>', 0)
            ->get();            
        }
        
        //$sale = \DB::select("call sp_SalesBusiness(". $store . ")"); 
        
        return response()->json([
            'success' => true,
            'message' => 'Ventas cargadas',
            'data' => $sale,
        ], 200);
    }

    public function liststate()
    {
        $status = Status::all();

        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' => $status,
        ], 200);
    }

    public function listUser()
    {
        $status =Auth::user();

        $users=Admin::with(['permissions','role'])->get();
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' => $status,
        ], 200);
    }

    public function rolUser($idUser)
    {
        $admin = collect(\DB::select("SELECT permission_id FROM admin_permission p  
        where p.admin_id = " . $idUser . " and p.permission_id = 10 limit 1 "))->first(); 
        
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' => $admin,
        ], 200);

    }

    public function motivosCancelacion()
    {
        $status = CancelReason::all();

        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' => $status,
        ], 200);
    }

    public function updateStatus(Request $request)
    {

        DB::beginTransaction();
        try {

            $sale = Sale::find($request->id);
            $user = User::find($sale->user_id);
            $status = Status::find($request->status_id);

            if ($request->status_id==6){
                $products=$sale->products()->get();
                $products->each(function ($product, $key) use ( $sale) {
                    $productStock=$product->stock()
                        ->wherePivot('store_id', $sale->store_id)->wherePivot('business_id',$product->sale->business_id)->first();

                    $product->business()
                        ->wherePivot('store_id', $sale->store_id)
                        ->updateExistingPivot($product->sale->business_id, ['stock' => ($productStock->stock->stock + $product->sale->quantity )]);
                });
            }

            $sale->status_id = $status->id;
            $sale->save();
            $sale->statuses()->attach($status->id, ['user_id' => Auth::id()]);
            $response=$this->notify($user->player_id, $status->description, $status);
            Log::debug($response);



        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'La venta no pudo ser actualizada. Intente de nuevo',
                'data' => null,
            ], 200);
        }

        DB::commit();
        return response()->json([
            'success' => true,
            'message' => 'Venta actualizada ',
            'data' => $sale,
        ], 200);
    }

    public function updateStatusCancel(Request $request)
    {

        DB::beginTransaction();
        try {

            $sale = Sale::find($request->id);
            $user = User::find($sale->user_id);
            $status = Status::find($request->status_id);

            if ($request->status_id==6){
                $products=$sale->products()->get();
                $products->each(function ($product, $key) use ( $sale) {
                    $productStock=$product->stock()
                        ->wherePivot('store_id', $sale->store_id)->wherePivot('business_id',$product->sale->business_id)->first();

                    $product->business()
                        ->wherePivot('store_id', $sale->store_id)
                        ->updateExistingPivot($product->sale->business_id, ['stock' => ($productStock->stock->stock + $product->sale->quantity )]);
                });
            }

            $sale->status_id = $status->id;
            $sale->cancel_id = $request->cancel_id;
            $sale->save();
            $sale->statuses()->attach($status->id, ['user_id' => Auth::id()]);
            $response=$this->notify($user->player_id, $status->description, $status);
            Log::debug($response);



        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'La venta no pudo ser actualizada. Intente de nuevo',
                'data' => null,
            ], 200);
        }

        DB::commit();
        return response()->json([
            'success' => true,
            'message' => 'Venta actualizada ',
            'data' => $sale,
        ], 200);
    }

    /** @noinspection PhpComposerExtensionStubsInspection */
    public function notify($player = '', $description = '', $notification=null)
    {
        try {
            $content = ["en" => $description];
            $fields = [
                'app_id' => config('auth.one_signal.app_id'),
                'include_player_ids' => [$player],
                'data' => ['action'=>$notification],
                'contents' => $content,
                'small_icon' => 'ic_notification',
                'priority' => '10'
            ];
            $fields = json_encode($fields);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, config('auth.one_signal.url'));
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
                'Authorization: Basic '.config('auth.one_signal.secret')));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $response = curl_exec($ch);
            curl_close($ch);
            return $response;
        }catch (\Exception $ex){
            Log::error($ex);
            return false;
        }

    }


    public function deleteProduct(Sale $sale, $product_id)
    {
        DB::beginTransaction();
        try {
            $product=$sale->products()->where('product_id',$product_id)->first();
            $sale->total=$sale->total - ($product->sale->sale_price*$product->sale->quantity);
            $sale->products()->detach($product_id);
            $sale->save();
            $sale->fresh();
            $productStock=$product->stock()
                ->wherePivot('store_id', $sale->store_id)->wherePivot('business_id',$product->sale->business_id)->first();
            $product->business()
                ->wherePivot('store_id', $sale->store_id)
                ->updateExistingPivot($product->sale->business_id, ['stock' => ($productStock->stock->stock + $product->sale->quantity )]);

        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'La venta no pudo ser actualizada. Intente de nuevo',
                'data' => null,
            ], 200);
        }

        DB::commit();
        return response()->json([
            'success' => true,
            'message' => 'Producto eliminado',
            'data' => $sale,
        ], 200);
    }

    public function printOrder(Sale $sale)
    {
        $sale->load('products');
        $sale->load('store');
        $pdf = new \Codedge\Fpdf\Fpdf\Fpdf($orientation = 'P', $unit = 'mm', array(45, 350));
        $pdf->SetMargins(1, 0, 1);
        $pdf->AddPage();
        $pdf->SetFont('Arial', 'B', 8);    //Letra Arial, negrita (Bold), tam. 20
        $pdf->Image(config('app.url') . '/images/corriendito_logo_black.png', 10, 2, 25);
        $pdf->SetY(25);
        $lineHeigth = 2;
        $pdf->Cell(43, $lineHeigth, config('app.name'), '', '1', 'C');
        $pdf->SetFont('Arial', '', 5);    //Letra Arial, negrita (Bold), tam. 20
        $pdf->Cell(43, $lineHeigth, strtoupper($sale->store->name . ' - ' . $sale->store->address), '', '1');
        $pdf->Cell(43, $lineHeigth, 'Pedido: ' . $sale->id, '', '1');
        $pdf->Cell(8, $lineHeigth, 'ID');
        $pdf->Cell(25, $lineHeigth, 'ARTICULO');
        $pdf->Cell(10, $lineHeigth, 'MONTO', 0, 1, 'R');
        foreach ($sale->products as $product) {
            $pdf->Cell(8, $lineHeigth, $product->id, '', '0');
            $pdf->Cell(25, $lineHeigth, substr(utf8_decode($product->name), 0, 30), '', '0');
            if ($product->sale->quantity > 1) {
                $pdf->Ln();
                $pdf->Cell(33, $lineHeigth, $product->sale->quantity . ' X ' . $product->sale->sale_price, '', '0', 'R');
                $price = $product->sale->quantity * $product->sale->sale_price;
            } else {
                $price = $product->sale->quantity * $product->sale->sale_price;
            }
            $pdf->Cell(10, $lineHeigth, "$" . number_format($price, 2, ".", ","), 0, 1, 'R');

        }
        $pdf->Cell(33, $lineHeigth, "SUBTOTAL: ");
        $pdf->Cell(10, $lineHeigth, "$ " . number_format($sale->total, 2, ".", ","), 0, 1, "R");
        $delivery = $sale->delivery_distance + $sale->delivery_price;
        $pdf->Cell(33, $lineHeigth, "ENVIO: ");
        $pdf->Cell(10, $lineHeigth, "$ " . number_format($delivery, 2, ".", ","), 0, 1, "R");
        $pdf->Cell(33, $lineHeigth, "TOTAL: ");
        $pdf->Cell(10, $lineHeigth, "$ " . number_format($delivery + $sale->total, 2, ".", ","), 0, 1, "R");
        $pdf->Ln(5);
        $pdf->Cell(43, $lineHeigth, "TC# " . $sale->ticket, 0, 0, 'C');
        $pdf->Ln(5);
        $pdf->Cell(43, $lineHeigth, 'GRACIAS POR TU PREFERENCIA ', 0, 1, 'C');
        ob_get_clean();
        $pdf->output('I', 'ticket', 'true');
        //exit;
    }

    public function updateProductSale(Request $request)
    {
        DB::table('product_sale')
                ->where('sale_id', '=', $request->idBusiness)
                ->where('product_id', '=', $request->idProduct)
                ->update(array(
                        'completed' => $request->completed,
                        'updated_at' => now())
                        ); 
    }

}
