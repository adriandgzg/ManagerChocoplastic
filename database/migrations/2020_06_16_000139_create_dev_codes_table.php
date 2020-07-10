<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDevCodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dev_codes', function (Blueprint $table) {
            $table->bigIncrements('deco_pk');
            $table->smallInteger('deco_code');
            $table->boolean('deco_status');
            $table->string('deco_description',5000);
            $table->string('deco_message', 500);
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
        Schema::dropIfExists('dev_codes');
    }
}
