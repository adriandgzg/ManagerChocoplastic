<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTransfersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_transfers', function (Blueprint $table) {
            $table->bigIncrements('prtr_pk'); //Llave Primaria

            $table->bigInteger('prod_fk')->unsigned(); //Llave Foranea Catálogo de Productos
            $table->foreign('prod_fk')->references('prod_pk')->on('products')->onUpdate('cascade');

            $table->bigInteger('stor_fk_output')->unsigned(); //Llave Foranea Catálogo Sucursal Salida
            $table->foreign('stor_fk_output')->references('stor_pk')->on('stores')->onUpdate('cascade');

            $table->bigInteger('stor_fk_input')->unsigned(); //Llave Foranea Catálogo Sucursal Entrada
            $table->foreign('stor_fk_input')->references('stor_pk')->on('stores')->onUpdate('cascade');

            $table->string('prtr_identifier', 20)->unique(); //Identificador

            $table->smallInteger('prtr_status')->default(1); //Estatus

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
        Schema::dropIfExists('product_transfers');
    }
}
