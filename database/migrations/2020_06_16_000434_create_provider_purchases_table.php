<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProviderPurchasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Proveedor || Compra 
        Schema::create('provider_purchases', function (Blueprint $table) {
            $table->bigIncrements('prpu_pk'); //Llave Primaria 

            $table->bigInteger('prov_fk')->unsigned()->nullable(); //Llave Foranea Catálogo de Proveedores
            $table->foreign('prov_fk')->references('prov_pk')->on('providers')->onUpdate('cascade');

            $table->bigInteger('prpo_fk')->unsigned()->nullable(); //Llave Foranea Ordenes de Compra
            $table->foreign('prpo_fk')->references('prpo_pk')->on('provider_purchase_orders')->onUpdate('cascade');

            $table->bigInteger('stor_fk')->unsigned()->nullable(); //Llave Foranea Catálogo Tienda
            $table->foreign('stor_fk')->references('stor_pk')->on('stores')->onUpdate('cascade');

            $table->bigInteger('pame_fk')->unsigned()->nullable(); //Llave Foranea Catálogo Metodo de Pago
            $table->foreign('pame_fk')->references('pame_pk')->on('payment_methods')->onUpdate('cascade');

            $table->string('prpu_identifier', 20)->unique()->nullable(); //Identificador Personalizado
            $table->integer('prpu_type'); //Tipo 1) Por orden de compra y 2) Compra directa
            $table->string('prpu_observation', 1000)->nullable(); //Observación
            $table->smallInteger('prpu_status')->default(1); //Estatus
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
        Schema::dropIfExists('provider_purchases');
    }
}
