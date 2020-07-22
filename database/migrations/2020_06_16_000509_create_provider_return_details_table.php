<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProviderReturnDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Proveedor || Devolución Detalle
        Schema::create('provider_return_details', function (Blueprint $table) {
            $table->bigIncrements('prrd_pk'); //Llave Primaria

            $table->bigInteger('prre_fk')->unsigned(); //Llave Foranea Proveedor Devolución 
            $table->foreign('prre_fk')->references('prre_pk')->on('provider_returns')->onUpdate('cascade');

            $table->bigInteger('prod_fk')->unsigned(); //Llave Foranea Catálogo Productos
            $table->foreign('prod_fk')->references('prod_pk')->on('products')->onUpdate('cascade');

            $table->bigInteger('meas_fk')->unsigned(); //Llave Foranea Catálogo Unidad de Medida
            $table->foreign('meas_fk')->references('meas_pk')->on('measurements')->onUpdate('cascade');

            $table->integer('prrd_quantity'); //Cantidad
            $table->integer('prrd_quantity_purchase'); //Cantidad Compra (Validar cantidad maxima)
            $table->decimal('prrd_price', 12, 2); //Precio Compra
            $table->smallInteger('prrd_status')->default(1); //Estatus
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
        Schema::dropIfExists('provider_return_details');
    }
}
