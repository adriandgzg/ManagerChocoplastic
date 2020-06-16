<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Catálogo Cliente
        Schema::create('clients', function (Blueprint $table) {
            $table->bigIncrements('clie_pk'); //Llave Primaria

            $table->bigInteger('feen_fk')->unsigned(); //Llave Foranea Catálogo Entidades Federativas
            $table->foreign('feen_fk')->references('feen_pk')->on('federal_entities')->onUpdate('cascade');

            $table->string('clie_identifier', 20)->unique(); //Identificador Personalizado
            $table->string('clie_name', 300); //Nombre
            $table->string('clie_rfc', 15); //RFC
            $table->string('clie_phone', 10); //Teléfono
            $table->string('clie_email', 50); //Correo Electronico
            $table->string('clie_addres', 1000); //Direccion
            $table->string('clie_cp', 5); //Codigo Postal
            $table->string('clie_city', 300); //Ciudad
            $table->smallInteger('clie_status')->default(1); //Estatus
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
        Schema::dropIfExists('clients');
    }
}
