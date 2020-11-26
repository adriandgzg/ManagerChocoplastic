<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTransferDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Traspaso Detalle
        Schema::create('product_transfer_details', function (Blueprint $table) {
            $table->bigIncrements('prtd_pk'); //Llave Primaria

            $table->bigInteger('prtr_fk')->unsigned(); //Llave Foranea Traspaso
            $table->foreign('prtr_fk')->references('prtr_pk')->on('product_transfers')->onUpdate('cascade');
           
            $table->bigInteger('prod_fk')->unsigned(); //Llave Foranea Catálogo de Productos 
            $table->foreign('prod_fk')->references('prod_pk')->on('products')->onUpdate('cascade');

            $table->decimal('prtd_quantity', 12, 2); //Cantidad
            $table->smallInteger('prtd_status')->default(1); //Estatus

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
        Schema::dropIfExists('product_transfer_details');
    }
}
