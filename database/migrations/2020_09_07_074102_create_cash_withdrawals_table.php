<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCashWithdrawalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cash_withdrawals', function (Blueprint $table) {

            $table->bigIncrements('cawi_pk'); //Llave Primaria

            $table->bigInteger('bocu_fk')->unsigned(); //Llave Foranea Caja
            $table->foreign('bocu_fk')->references('bocu_pk')->on('box_cuts')->onUpdate('cascade');

            $table->decimal('cawi_amount', 12, 2); //Monto
            $table->smallInteger('cawi_status')->default(1); //Estatus
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
        Schema::dropIfExists('cash_withdrawals');
    }
}
