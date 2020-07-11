<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductFrequentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_frequents', function (Blueprint $table) {
            $table->bigIncrements('prfr_pk'); //Llave Primaria

            $table->bigInteger('prod_fk')->unsigned(); //Llave Foranea Catálogo de Productos
            $table->foreign('prod_fk')->references('prod_pk')->on('products')->onUpdate('cascade');

            $table->smallInteger('prfr_status')->default(1); //Estatus
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
        Schema::dropIfExists('product_frequents');
    }
}
