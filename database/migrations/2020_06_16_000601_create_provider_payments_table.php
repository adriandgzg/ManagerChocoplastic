<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProviderPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Proveedor || Pagos
        Schema::create('provider_payments', function (Blueprint $table) {
            $table->bigIncrements('prpa_pk'); //Llave Primaria

            $table->bigInteger('prov_fk')->unsigned(); //Llave Foranea Catálogo de Proveedores
            $table->foreign('prov_fk')->references('prov_pk')->on('providers')->onUpdate('cascade');

            $table->bigInteger('prde_fk')->unsigned(); //Llave Foranea Proveedor Deuda 
            $table->foreign('prde_fk')->references('prde_pk')->on('provider_debts')->onUpdate('cascade');

            $table->bigInteger('pash_fk')->unsigned(); //Llave Foranea Catalgo Forma de Pago 
            $table->foreign('pash_fk')->references('pash_pk')->on('payment_shapes')->onUpdate('cascade');
            
            $table->decimal('prpa_amount', 12, 2); //Monto
            $table->smallInteger('prpa_status')->default(1); //Estatus
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
        Schema::dropIfExists('provider_payments');
    }
}
