<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProviderPurchaseOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Proveedor || Orden de Compra
        Schema::create('provider_purchase_orders', function (Blueprint $table) {
            $table->bigIncrements('prpo_pk'); //Llave Primaria

            $table->bigInteger('prov_fk')->unsigned(); //Llave Foranea Catálogo de Proveedores
            $table->foreign('prov_fk')->references('prov_pk')->on('providers')->onUpdate('cascade');

            $table->string('prpo_identifier', 20)->unique(); //Identificador Personalizado
            $table->smallInteger('prpo_status')->default(1); //Estatus
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
        Schema::dropIfExists('provider_purchase_orders');
    }
}
