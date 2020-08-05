<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
 
/****** CHOCOPLASTIC ROUTES *************/

Route::post('signup', 'Auth\Api\LoginController@signup');
Route::post('/user/update', 'Auth\Api\LoginController@update');
Route::post('/user/password/change', 'Auth\Api\LoginController@passwordchange');
Route::get('/entitieslist', 'FederalEntityController@EntitiesList');
Route::get('/listUser', 'AdminController@listUser');
Route::get('/rolUser/{idUser}', 'AdminController@rolUser');

Route::get('/providerlist', 'ProviderController@ProvidersList');
Route::post('/providers/add', 'ProviderController@add');
Route::put('/providers/update', 'ProviderController@update');
Route::put('/providers/delete', 'ProviderController@delete');

Route::get('/clientlist', 'ClientController@ClientsList');
Route::get('/clientsget', 'ClientController@Clients');
Route::post('/clients/add', 'ClientController@add');
Route::put('/clients/update', 'ClientController@update');
Route::put('/clients/delete', 'ClientController@delete');
Route::get('/clients/genders', 'ClientController@Genders');

Route::get('/storelist', 'StoreController@StoresList');
Route::get('/storeget', 'StoreController@Stores');
Route::post('/store/add', 'StoreController@add');
Route::put('/store/update', 'StoreController@update');
Route::put('/store/delete', 'StoreController@delete');

Route::get('/categorieslist', 'ProductCategoryController@CategoriesList');
Route::get('/categories', 'ProductCategoryController@Categories');
Route::post('/categories/add', 'ProductCategoryController@add');
Route::put('/categories/update', 'ProductCategoryController@update');
Route::put('/categories/delete', 'ProductCategoryController@delete');


Route::get('/measurementsList', 'MeasurementController@MeasurementsList');
Route::get('/measurements', 'MeasurementController@Measurements');
Route::post('/measurements/add', 'MeasurementController@add');
Route::put('/measurements/update', 'MeasurementController@update');
Route::put('/measurements/delete', 'MeasurementController@delete');

Route::get('/entitiesList', 'FederalEntityController@EntitiesList');
Route::post('/entities/add', 'FederalEntityController@add');
Route::put('/entities/update', 'FederalEntityController@update');
Route::put('/entities/delete', 'FederalEntityController@delete');

Route::get('/paymentmethodsList', 'PaymentMethodController@PaymentMethodsList');
Route::get('/paymentmethodsget', 'PaymentMethodController@PaymentMethods');
Route::get('/paymentmethodsshow/{id}', 'PaymentMethodController@PaymentMethodsShow');
Route::post('/paymentmethods/add', 'PaymentMethodController@add');
Route::put('/paymentmethods/update', 'PaymentMethodController@update');
Route::put('/paymentmethods/delete', 'PaymentMethodController@delete');

Route::get('/paymentshapesList', 'PaymentShapeController@PaymentShapesList');
Route::get('/paymentshapesget', 'PaymentShapeController@PaymentShapes');
Route::post('/paymentshapes/add', 'PaymentShapeController@add'); 
Route::put('/paymentshapes/update', 'PaymentShapeController@update');
Route::put('/paymentshapes/delete', 'PaymentShapeController@delete');

Route::get('/returnmotivesList', 'ReturnMotiveController@ReturnMotivesList');
Route::post('/returnmotives/add', 'ReturnMotiveController@add'); 
Route::put('/returnmotives/update', 'ReturnMotiveController@update');
Route::put('/returnmotives/delete', 'ReturnMotiveController@delete');

Route::get('/productList', 'ProductController@ProductList');
Route::get('/product/search', 'ProductController@ProductSearch');
Route::post('/product/add', 'ProductController@add');
Route::put('/product/update', 'ProductController@update');
Route::put('/product/delete', 'ProductController@delete');

Route::get('/products/derived/{prod_main_pk}', 'ProductController@derived'); //Productos Derivado
Route::post('/products/derived', 'ProductController@storederived'); //Guardar Productos Derivado




Route::get('/clientorders', 'ClientOrderController@index'); //Lista de Pedidos (Cliente)
Route::get('/client/orders/{clor_pk}', 'ClientOrderController@showmanager'); //Detalle de Pedidos (Cliente) 
Route::post('/client/orders/destroy', 'ClientOrderController@destroy'); //Cancelar Pedido (Cliente)


Route::get('/clientsales', 'ClientSaleController@index'); ////Lista de Ventas (Cliente)
Route::get('/client/sales/{clsa_pk}', 'ClientSaleController@show'); //Detalle de Venta (Cliente)  
Route::post('/clientsales', 'ClientSaleController@store'); //Convertir Pedido a Venta (Cliente) 
Route::post('/clientsales/update', 'ClientSaleController@update'); //Finalizar Venta (Cliente)

Route::post('/client_sale_details/update', 'ClientSaleDetailController@update'); //Venta Producto Modificar (Cliente)
Route::post('/client_sale_details/destroy', 'ClientSaleDetailController@destroy'); //Venta Producto Eliminar (Cliente)



Route::get('/client/debts', 'ClientDebtController@index'); //Lista de Deudas (Cliente) 
Route::post('/client/payments', 'ClientPaymentController@store'); //Guardar Pagos (Cliente)
Route::get('/client/payments/{clde_fk}', 'ClientPaymentController@show'); //Lista de Pagos, filtrado por deuda (Cliente)


//Cuentas por Pagar a Proveedor
Route::get('/provider/debts', 'ProviderDebtController@index'); //Lista de Deudas (Proveedor) 
Route::post('/provider/payments', 'ProviderPaymentController@store'); //Guardar Pagos (Proveedor) 
Route::get('/provider/payments/{prde_fk}', 'ProviderPaymentController@show'); //Lista de Pagos, filtrado por deuda (Proveedor)




//CRUD Productos Frecuentes
Route::get('/product/frequents', 'ProductFrequentController@list'); 
Route::post('/product/frequents', 'ProductFrequentController@store'); 
Route::post('/product/frequents/update', 'ProductFrequentController@update'); 
Route::post('/product/frequents/destroy', 'ProductFrequentController@destroy'); 



//CRUD Orden de Compra (Proveedor) 
Route::get('provider/purchase/orders', 'ProviderPurchaseOrderController@index');  
Route::get('provider/purchase/orders/{prpo_pk}', 'ProviderPurchaseOrderController@show');  
Route::post('provider/purchase/orders', 'ProviderPurchaseOrderController@store'); 
Route::post('provider/purchase/orders/destroy', 'ProviderPurchaseOrderController@destroy'); 

Route::get('provider/purchase/order/details', 'ProviderPurchaseOrderDetailController@index');  
Route::post('provider/purchase/order/details', 'ProviderPurchaseOrderDetailController@store'); 
Route::post('provider/purchase/order/details/update', 'ProviderPurchaseOrderDetailController@update'); 
Route::post('provider/purchase/order/details/destroy', 'ProviderPurchaseOrderDetailController@destroy'); 



//CRUD Compra
Route::get('provider/purchases', 'ProviderPurchaseController@index');   
Route::get('provider/purchases/{prpu_pk}', 'ProviderPurchaseController@show');  
Route::post('provider/purchases', 'ProviderPurchaseController@store'); //Convertir Orden de Compra a Compra (Proveedor)
Route::post('provider/purchases/update', 'ProviderPurchaseController@update'); //Finalizar Compra
Route::post('provider/purchases/destroy', 'ProviderPurchaseController@destroy'); //Cancelar Compra

Route::post('provider/purchase/details', 'ProviderPurchaseDetailController@store'); 
Route::post('provider/purchase/details/update', 'ProviderPurchaseDetailController@update'); 
Route::post('provider/purchase/details/destroy', 'ProviderPurchaseDetailController@destroy'); 

 


Route::get('return/motives', 'ReturnMotiveController@index');  //Lista de Motivos de Devoluciones

Route::get('client/returns', 'ClientReturnController@index');  //Listado de Devoluciones (Cliente)
Route::get('client/returns/{clre_pk}', 'ClientReturnController@show');  //Vista detalle de Devoluciones (Cliente)
Route::post('client/returns', 'ClientReturnController@store');  //Convertir una venta a Devolución (Cliente)
Route::post('client/returns/update', 'ClientReturnController@update');  //Finalizar una Devolución (Cliente)
Route::post('client/return/details/update', 'ClientReturnDetailController@update'); 
Route::post('client/return/details/destroy', 'ClientReturnDetailController@destroy'); 


Route::get('provider/returns', 'ProviderReturnController@index');  //Listado de Devoluciones (Proveedor)
Route::get('provider/returns/{prre_pk}', 'ProviderReturnController@show');  //Vista detalle de Devoluciones (Proveedor)
Route::post('provider/returns', 'ProviderReturnController@store');  //Convertir una venta a Devolución (Proveedor)
Route::post('provider/returns/update', 'ProviderReturnController@update');  //Finalizar una Devolución (Proveedor)
Route::post('provider/return/details/update', 'ProviderReturnDetailController@update'); 
Route::post('provider/return/details/destroy', 'ProviderReturnDetailController@destroy'); 










//Inventario de Productos
Route::get('product/inventories', 'ProductInventoryController@index');  //Inventario 


//CRUD Traspaso
Route::get('product/transfers', 'ProductTransferController@index');   
Route::get('product/transfers/{prtr_pk}', 'ProductTransferController@show');  
Route::post('product/transfers', 'ProductTransferController@store'); 
Route::post('product/transfers/update', 'ProductTransferController@update'); 
Route::post('product/transfers/destroy', 'ProductTransferController@destroy'); 

Route::post('product/transfer/details', 'ProductTransferDetailController@store');  
Route::post('product/transfer/details/update', 'ProductTransferDetailController@update'); 
Route::post('product/transfer/details/destroy', 'ProductTransferDetailController@destroy'); 



/****** *************/
Auth::routes(['register' => false, 'reset' => false]);
Route::get('/logout', 'Auth\LoginController@logout');
Route::get('password/reset/{token}', 'Auth\Api\ResetPasswordController@showResetForm')->name('password.reset');
Route::get('password/reset', 'Auth\Api\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\Api\ResetPasswordController@reset')->name('password.reset');;
Route::get('/home', 'HomeController@index');
Route::get('/logout','Auth\LoginController@logout');

Route::get('/', 'Auth\LoginController@login'); 

Route::group(['middleware' => 'auth'], function () {

    Route::get('/auth/user', function() { return Auth::user(); });
    Route::get('/users', 'AdminController@users');
    Route::get('/usuarioBusiness/{id}', 'AdminController@usuarioBusiness');    
    Route::post('/admin/add', 'AdminController@addAdministrator');
    Route::put('/admin/update', 'AdminController@updateAdministrator');
    Route::put('/admin/updateBusiness', 'AdminController@updateBusinessAdministrator');
    Route::get('/listUsers', 'AdminController@listUsers');
    Route::post('/admins/{admin}/permissions', 'AdminController@permissions');
    Route::post('/admins/{admin}/role', 'AdminController@role');
    Route::post('/roles/{role}/permissions', 'RoleController@permissions');
    Route::get('/roles', 'RoleController@index');
    Route::get('/permissions', 'PermissionController@index');
    Route::put('/user/updateStatus', 'AdminController@updateStatus');



    
});
Route::get('{any}', function () {
    return view('layouts.app');
})->where('any','^(?!api).*$')->middleware('auth');


Route::get('/mapachido', 'CoverageController@pintame');
