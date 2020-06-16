<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProviderDebtsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Proveedor || Deuda
        Schema::create('provider_debts', function (Blueprint $table) {
            $table->bigIncrements('prde_pk'); //Llave Primaria

            $table->bigInteger('prov_fk')->unsigned(); //Llave Foranea Catálogo de Proveedores
            $table->foreign('prov_fk')->references('prov_pk')->on('providers')->onUpdate('cascade');

            $table->bigInteger('prpu_fk')->unsigned(); //Llave Foranea Compra 
            $table->foreign('prpu_fk')->references('prpu_pk')->on('provider_purchases')->onUpdate('cascade');

            $table->decimal('prde_amount', 12, 2); //Monto
            $table->smallInteger('prde_status')->default(1); //Estatus
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
        Schema::dropIfExists('provider_debts');
    }
}
