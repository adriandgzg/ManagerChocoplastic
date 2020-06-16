<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProviderPurchaseDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Proveedor || Compra Detalle
        Schema::create('provider_purchase_details', function (Blueprint $table) {
            $table->bigIncrements('prpd_pk'); //Llave Primaria

            $table->bigInteger('prpu_fk')->unsigned(); //Llave Foranea Compra 
            $table->foreign('prpu_fk')->references('prpu_pk')->on('provider_purchases')->onUpdate('cascade');

            $table->bigInteger('prod_fk')->unsigned(); //Llave Foranea Catálogo Productos
            $table->foreign('prod_fk')->references('prod_pk')->on('products')->onUpdate('cascade');

            $table->bigInteger('meas_fk')->unsigned(); //Llave Foranea Catálogo Unidad de Medida
            $table->foreign('meas_fk')->references('meas_pk')->on('measurements')->onUpdate('cascade');

            $table->integer('prpd_quantity'); //Cantidad
            $table->decimal('prpd_price', 12, 2); //Precio
            $table->decimal('prpd_discountrate', 12, 2); //Porcentaje Descuento
            $table->decimal('prpd_ieps', 12, 2); //IEPS
            $table->decimal('prpd_iva', 12, 2); //IVA
            $table->smallInteger('prpd_status')->default(1); //Estatus
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
        Schema::dropIfExists('provider_purchase_details');
    }
}
