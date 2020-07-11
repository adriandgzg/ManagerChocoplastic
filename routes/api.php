<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
 










 







Route::post('/start', 'Auth\Api\LoginController@start');
Route::post('/verify', 'Auth\Api\LoginController@verify');
Route::post('/completeRegister', 'Auth\Api\LoginController@complete');
Route::post('/login', 'Auth\Api\LoginController@login'); 
Route::post('/login/refresh', 'Auth\Api\LoginController@refresh');
Route::post('/password/email', 'Auth\Api\ForgotPasswordController@sendResetLinkEmail');

Route::post('/startFacebook', 'Auth\Api\LoginFacebookController@start');
Route::post('/completeRegisterFacebook', 'Auth\Api\LoginFacebookController@complete');
Route::post('/loginFacebook', 'Auth\Api\LoginFacebookController@login');
Route::post('/login/refreshFacebook', 'Auth\Api\LoginFacebookController@refresh');
Route::get('/paymentMethods', 'PaymentMethodController@index');
Route::get('/termsAndConditions', function(){return view('termsConditions')->render();});
Route::get('/faqs', 'FaqController@index');

Route::middleware('auth:api')->group( function(){
    Route::get('/user',  function (Request $request) { return $request->user(); });

    Route::get('/product/categories', 'ProductCategoryController@index'); //Lista de Categorias 
    Route::get('/products/{prca_fk}', 'ProductController@index'); //Lista de Producto filtados por sucursal y categoria
    Route::get('/product/frequents', 'ProductFrequentController@index'); //Lista de Producto Frecuentes
    Route::get('/products/search/{isSKU}/{text}', 'ProductController@search'); //Busqueda de Productos
    
    Route::post('/client/orders', 'ClientOrderController@store'); //Guardar Pedido 
    Route::get('/client/orders', 'ClientOrderController@clientorders'); //Lista de Pedidos
    Route::get('/client/order/show', 'ClientOrderController@show'); // Detalle de un pedido

});


Route::fallback(function(){
    return response()->json(['success' => false, 'message' => 'Route not found', 'data' =>null], 404);
});
