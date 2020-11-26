<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProviderPurchaseOrderDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Proveedor || Orden de Compra Detalle
        Schema::create('provider_purchase_order_details', function (Blueprint $table) {
            $table->bigIncrements('ppod_pk'); //Llave Primaria

            $table->bigInteger('prpo_fk')->unsigned(); //Llave Foranea Orden Compra 
            $table->foreign('prpo_fk')->references('prpo_pk')->on('provider_purchase_orders')->onUpdate('cascade');

            $table->bigInteger('prod_fk')->unsigned(); //Llave Foranea Catálogo Productos
            $table->foreign('prod_fk')->references('prod_pk')->on('products')->onUpdate('cascade');

            $table->bigInteger('meas_fk')->unsigned(); //Llave Foranea Catálogo Unidad de Medida
            $table->foreign('meas_fk')->references('meas_pk')->on('measurements')->onUpdate('cascade');

            $table->decimal('ppod_quantity', 12, 2); //Cantidad
            $table->decimal('ppod_actualprice', 12, 2); //Precio Actual
            $table->decimal('ppod_providerprice', 12, 2); //Precio Proveedor
            $table->decimal('ppod_discountrate', 12, 2); //Porcentaje Descuento
            $table->decimal('ppod_ieps', 12, 2); //IEPS
            $table->decimal('ppod_iva', 12, 2); //IVA
            $table->smallInteger('ppod_status')->default(1); //Estatus 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('provider_purchase_order_details');
    }
}
