<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProviderReturnsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Proveedor || Devolución
        Schema::create('provider_returns', function (Blueprint $table) {
            $table->bigIncrements('prre_pk'); //Llave Primaria

            $table->bigInteger('prov_fk')->unsigned(); //Llave Foranea Catálogo de Proveedores
            $table->foreign('prov_fk')->references('prov_pk')->on('providers')->onUpdate('cascade');

            $table->bigInteger('prpu_fk')->unsigned(); //Llave Foranea Compra 
            $table->foreign('prpu_fk')->references('prpu_pk')->on('provider_purchases')->onUpdate('cascade');

            $table->bigInteger('stor_fk')->unsigned(); //Llave Foranea Catálogo Tienda
            $table->foreign('stor_fk')->references('stor_pk')->on('stores')->onUpdate('cascade');

            $table->bigInteger('remo_fk')->unsigned(); //Llave Foranea Motivo de Devolución
            $table->foreign('remo_fk')->references('remo_pk')->on('return_motives')->onUpdate('cascade');

            $table->text('prre_observation'); //Observación
            $table->smallInteger('prre_status')->default(1); //Estatus
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
        Schema::dropIfExists('provider_returns');
    }
}
