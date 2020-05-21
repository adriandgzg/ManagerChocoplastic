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
    Route::post('/profile',  'ProfileController@update');
    Route::get('/profile',  'ProfileController@show');
    Route::post('/address', 'AddressController@store');
    Route::get('/address', 'AddressController@show');
    Route::post('/address/{id}', 'AddressController@update');
    Route::get('/coverages', 'CoverageController@show');
    Route::get('/coverage', 'CoverageController@index');
    Route::get('/store/location/{location}', 'CoverageController@getByLocation');

    Route::get('/store/{store}', 'StoreController@show');
    Route::get('/store/{store}/missions', 'StoreController@missions');
    Route::get('/store/{store}/business/{business}/missions', 'BusinessController@missions');
    Route::get('/store/{store}/business/{business}/category/{category}/products', 'CategoryController@products');
    Route::get('/store/{store}/business/{business}/missions/{mission}/products', 'MissionController@products');
    Route::get('/store/{store}/search/{text}', 'ProductController@search');
    Route::get('/store/{store}/business/{business}/search/{text}', 'BusinessController@search');
    Route::get('/store/{store}/business/{business}/featured', 'BusinessController@featured');
    Route::post('/store/{store}/business/{business}/car/{product}', 'CarController@update');
    Route::get('/store/{store}/car', 'CarController@show');
    Route::post('/store/{store}/car/process', 'SaleController@store');
    Route::post('/store/{store}/car/process/products', 'SaleController@create');
    Route::post('/store/{store}/business/{business}/favorites', 'ProductController@toggleFavorite');
    Route::get('/store/{store}/favorites', 'ProductController@favorites');
    Route::get('/store/{store}/business/{business}/sales/products', 'SaleController@sales');
    Route::get('/store/{store}/sales/{sale}/products', 'SaleController@show');
    Route::get('/store/{store}/pickup/times', 'StoreController@pickupTimes');
    Route::get('/sales', 'SaleController@index');
    Route::get('/sales/{sale}/status/{status}', 'SaleController@update');
    Route::get('/user/notifications', 'DeliveryController@status');
    Route::get('/deliveries/orders', 'DeliveryController@show');
    Route::get('/sales/{sale}/delivery', 'DeliveryController@delivery');
    Route::post('/user/player', 'ProfileController@playerId');

});
Route::fallback(function(){
    return response()->json(['success' => false, 'message' => 'Route not found', 'data' =>null], 404);
});
