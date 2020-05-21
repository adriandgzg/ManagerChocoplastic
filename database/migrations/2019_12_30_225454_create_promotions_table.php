<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePromotionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promotions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('price');
            $table->date('start_date');
            $table->date('end_date');
            $table->bigInteger('product_id');
            $table->integer('min_amount')->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('business_promotion', function (Blueprint $table) {
            $table->bigInteger('promotion_id');
            $table->bigInteger('business_id');
            $table->bigInteger('store_id');
            $table->primary(['promotion_id','store_id', 'business_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('promotions');
        Schema::dropIfExists('business_promotion');
    }
}
