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
Route::post('/paymentmethods/add', 'PaymentMethodController@add');
Route::put('/paymentmethods/update', 'PaymentMethodController@update');
Route::put('/paymentmethods/delete', 'PaymentMethodController@delete');

Route::get('/paymentshapesList', 'PaymentShapeController@PaymentShapesList');
Route::post('/paymentshapes/add', 'PaymentShapeController@add'); 
Route::put('/paymentshapes/update', 'PaymentShapeController@update');
Route::put('/paymentshapes/delete', 'PaymentShapeController@delete');

Route::get('/productList', 'ProductController@ProductList');
Route::post('/product/add', 'ProductController@add');
Route::put('/product/update', 'ProductController@update');
Route::put('/product/delete', 'ProductController@delete');




//Route::get('/clientsales', 'ClientSaleController@index'); ////Lista de Ventas (Cliente)
Route::get('/clientsales', 'ClientSaleController@store'); //Convertir Pedido a Venta (Cliente) 
Route::post('/clientsales/update', 'ClientSaleController@update'); //Finalziar Venta (Cliente)

Route::post('/client_sale_details/update', 'ClientSaleDetailController@update'); //Venta Producto Eliminar (Cliente)
Route::post('/client_sale_details/destroy', 'ClientSaleDetailController@destroy'); //Venta Producto Modificar (Cliente)

Route::get('/clientorders', 'ClientOrderController@index'); //Lista de Pedidos (Cliente)















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

    Route::get('/categoriesList', 'CategoryController@listCategories');
    Route::get('/CategoriesCbx', 'CategoryController@CategoriesCbx');
    Route::get('/subcategoriesList', 'CategoryController@listSubcategories');
    Route::get('/subcategories/{id}', 'CategoryController@Subcategories');
    Route::get('/categoriesNode', 'CategoryController@listCategoriesAll');
    Route::post('/categories/addAsociar', 'CategoryController@addCategorieAsociar');
    Route::post('/categories/addSub', 'CategoryController@addSubCategorie');
    Route::put('/categories/updateSub', 'CategoryController@updateSubCategorie');
    Route::put('/categories/deleteSub', 'CategoryController@deleteSubCategorie');
    Route::post('/categories/updateBusinessCategory', 'CategoryController@updateBusinessCategory');

    Route::get('/businessList', 'BusinessController@listBusiness');
    Route::get('/getBusiness/{idStore}', 'BusinessController@getBusiness');
    
    Route::post('/business/add', 'BusinessController@addBusiness');
    Route::put('/business/update', 'BusinessController@updateBusiness');
    Route::put('/business/delete', 'BusinessController@deleteBusiness');
    
    Route::get('/listPickupTimes/{idStore}', 'StoreController@listPickupTimes');
    Route::get('/storeList/{idStore}', 'StoreController@listStore');
    Route::post('/businessNode', 'StoreController@listStoreAll');
    

    Route::post('/store/addTime', 'PickUpTimeController@addTime');
    Route::put('/store/updateTime', 'PickUpTimeController@updateTime');
    Route::put('/store/deleteTime', 'PickUpTimeController@deleteTime');

    
    Route::get('/infoBusiness/{id}/{idStore}', 'MissionController@infoBusiness');
    Route::get('/CategoriesBusiness/{id}/{idStore}', 'CategoryController@CategoriesBusiness');
    Route::get('/AsociarCategoriesBusiness/{id}/{idStore}', 'CategoryController@AsociarCategoriesBusiness');
    

    
    Route::get('/productBusiness/{idSubcategorie}/{idStore}/{idBusiness}', 'ProductController@ProductsBusiness');
    Route::put('/businessproduct/update', 'ProductController@updateBusinessProduct');
    Route::post('/businessproduct/add', 'ProductController@insertBusinessProduct');
    Route::post('/promoproduct/add', 'ProductController@insertPromoProduct');
    Route::put('/promoproduct/update', 'ProductController@updatePromoProduct');

    Route::get('/saleList/{idStore}', 'SaleController@listsale');
    
    Route::get('/statusNode', 'SaleController@liststate');
    Route::put('/sale/updateStatus', 'SaleController@updateStatus');
    Route::put('/sale/updateProductSale', 'SaleController@updateProductSale');    
    Route::put('/sale/updateStatusCancel', 'SaleController@updateStatusCancel');
    Route::get('/sales/{sale}/products', 'SaleController@show');
    Route::get('/sales/{sale}/productsBusiness/{id}', 'SaleController@showBusiness');
    Route::get('/sales/{sale}/print', 'SaleController@printOrder');
    Route::get('/deliveryMen', 'DeliveryController@deliveryMen');
    Route::post('/sale/delivery/update', 'DeliveryController@update');
    Route::get('/motivosCancelacion', 'SaleController@motivosCancelacion');
    

    Route::get('/sales/{sale}/products/{id}/delete', 'SaleController@deleteProduct');

    Route::get('/coverages', 'CoverageController@index');
    Route::post('/coverages', 'CoverageController@store');
    Route::get('/coverages/{store_id}', 'CoverageController@edit');
    Route::post('/coverages/{coverage}', 'CoverageController@update');
    Route::get('/coverages/destroy/{coverage}', 'CoverageController@destroy');
    
    Route::get('/getMissionBusiness/{idStore}/{idBusiness}', 'MissionController@getMissionBusiness');
    Route::put('/businessMissions/update', 'MissionController@updateMission');
    Route::post('/businessMissions/add', 'MissionController@addMission');
    Route::put('/businessMissions/delete', 'MissionController@deleteMission');
    Route::get('/ProductsMissionsBusiness/{mission}/{store}/{business}', 'MissionController@ProductsMissionsBusiness');


    Route::get('missions/{mission}/products/{product}/toggle', 'MissionController@toggleProduct');
});
Route::get('{any}', function () {
    return view('layouts.app');
})->where('any','^(?!api).*$')->middleware('auth');


Route::get('/mapachido', 'CoverageController@pintame');
