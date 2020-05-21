<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('long_key');
            $table->string('description');
            $table->double('price');
            $table->double('content');
            $table->string('unit');
            $table->string('sales_unit');
            $table->boolean('bulk')->default(false);
            $table->string('brand');
            $table->string('image');
            $table->bigInteger('type_id');
            $table->boolean('featured')->default(false);
            $table->timestamps();
            $table->softDeletes();
            $table->unique('id');

        });
        Schema::create('category_product', function (Blueprint $table) {
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('product_id');
            $table->unique(['category_id', 'product_id']);
            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('product_id')->references('id')->on('products');
        });
        Schema::create('business_product', function (Blueprint $table) {
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('store_id');
            $table->unsignedBigInteger('business_id');
            $table->unique(['store_id','product_id','business_id']);
            $table->integer('stock')->default(0);
            $table->float('price');
            $table->boolean('featured')->default(false);
            $table->boolean('max_quantity')->default(5);
            $table->boolean('active')->default(false);
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
        Schema::dropIfExists('business_product');
        Schema::dropIfExists('category_product');
        Schema::dropIfExists('products');
    }
}
