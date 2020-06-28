<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Catálogo Sucursal
        Schema::create('stores', function (Blueprint $table) {
            $table->bigIncrements('stor_pk'); //Llave Primaria
            $table->string('stor_name', 300); //Nombre 
            $table->string('stor_phone', 20); //Teléfono
            $table->string('stor_addres', 1000); //Direccion
            $table->boolean('stor_main'); //Matriz
            $table->smallInteger('stor_status')->default(1); //Estatus
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
        Schema::dropIfExists('stores');
    }
}
