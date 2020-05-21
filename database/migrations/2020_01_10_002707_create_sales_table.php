<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id');
            $table->bigInteger('store_id');
            $table->bigInteger('address_id');
            $table->bigInteger('payment_method_id');
            $table->bigInteger('delivery_type_id')->default(1);
            $table->bigInteger('delivery_id')->nullable();
            $table->bigInteger('pickup_time_id');
            $table->float('total')->nullable();
            $table->string('ticket');
            $table->text('comments')->nullable();
            $table->double('cash_amount')->nullable();
            $table->float('status_id')->default(1);
            $table->double('delivery_distance')->nullable();
            $table->double('delivery_price')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('product_sale', function (Blueprint $table) {
            $table->bigInteger('product_id');
            $table->bigInteger('business_id');
            $table->bigInteger('sale_id');
            $table->float('quantity');
            $table->float('sale_price');
            $table->integer('promotion_id')->nullable();
            $table->text('comments')->nullable();
            $table->primary(['product_id', 'sale_id', 'business_id']);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_sale');
        Schema::dropIfExists('sales');
    }
}
