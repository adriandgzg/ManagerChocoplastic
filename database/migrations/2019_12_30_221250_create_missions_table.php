<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('missions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('image')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->bigInteger('featured');
            $table->bigInteger('business_id');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('business_mission', function (Blueprint $table) {
            $table->bigInteger('mission_id');
            $table->bigInteger('store_id');
            $table->bigInteger('business_id');
            $table->primary(['mission_id','store_id','business_id']);
        });
        Schema::create('mission_product', function (Blueprint $table) {
            $table->bigInteger('mission_id');
            $table->bigInteger('product_id');
            $table->primary(['mission_id','product_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('missions');
        Schema::dropIfExists('business_mission');
        Schema::dropIfExists('mission_product');
    }
}
