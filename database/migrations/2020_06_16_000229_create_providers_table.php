<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Catálogo Proveedores
        Schema::create('providers', function (Blueprint $table) {
            $table->bigIncrements('prov_pk'); //Llave Primaria

            $table->bigInteger('feen_fk')->unsigned(); //Llave Foranea Catálogo Entidades Federativas
            $table->foreign('feen_fk')->references('feen_pk')->on('federal_entities')->onUpdate('cascade');

            $table->string('prov_identifier', 20)->unique(); //Identificador Personalizado
            $table->string('prov_name', 300); //Nombre
            $table->string('prov_rfc', 15); //RFC
            $table->string('prov_phone', 10); //Teléfono
            $table->string('prov_email', 50); //Correo Electronico
            $table->string('prov_addres', 1000); //Direccion
            $table->string('prov_cp', 5); //Codigo Postal
            $table->string('prov_city', 300); //Ciudad
            $table->smallInteger('prov_status')->default(1); //Estatus
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
        Schema::dropIfExists('providers');
    }
}
