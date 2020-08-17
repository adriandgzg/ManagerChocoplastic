<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('verified')->default(false);
            $table->bigInteger('role_id')->nullable();
            $table->bigInteger('store_id')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });


        DB::table('admins')->insert(
            array(
                'name' => 'SuperAdmin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin'),
                'store_id' => 1
            )
        );

        DB::table('admins')->insert(
            array(
                'name' => 'Francisco Gabriel Alvarez Alcaraz',
                'email' => 'fgaa@chocoplastic.com',
                'password' => Hash::make('choco'),
                'store_id' => 2
            )
        );

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admin_role');
        Schema::dropIfExists('admins');
    }
}
