<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFederalEntitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Catálogo Entidades Federativas
        Schema::create('federal_entities', function (Blueprint $table) {
            $table->bigIncrements('feen_pk'); //Llave Primaria
            $table->string('feen_name', 300); //Nombre
            $table->smallInteger('feen_status')->default(1); //Estatus
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
        Schema::dropIfExists('federal_entities');
    }
}
