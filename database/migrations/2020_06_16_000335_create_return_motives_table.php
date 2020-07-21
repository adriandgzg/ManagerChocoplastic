<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReturnMotivesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Catálogo Motivos Devoluciones
        Schema::create('return_motives', function (Blueprint $table) {
            $table->bigIncrements('remo_pk'); //Llave Primaria
            $table->string('remo_description', 1000); //Descripcion 
            $table->smallInteger('remo_status')->default(1); //Estatus
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
        Schema::dropIfExists('return_motives');
    }
}
