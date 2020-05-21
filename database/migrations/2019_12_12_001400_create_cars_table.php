<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->bigInteger('product_id');
            $table->bigInteger('user_id');
            $table->bigInteger('business_id');
            $table->bigInteger('store_id');
            $table->float('quantity');
            $table->text('comments')->nullable();
            $table->primary(['product_id', 'user_id', 'business_id','store_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cars');
    }
}
