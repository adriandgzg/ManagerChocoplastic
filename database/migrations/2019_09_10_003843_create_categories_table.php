<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('description');
            $table->string('image');
            $table->string('category_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('business_category', function (Blueprint $table) {
            $table->unsignedBigInteger('business_id');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('store_id');
            $table->unique(['business_id','category_id','store_id']);
            $table->foreign('business_id')->references('id')->on('businesses');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('store_id')->references('id')->on('stores');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('business_category');
        Schema::dropIfExists('categories');
    }
}
