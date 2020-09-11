<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('description');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('admin_role', function (Blueprint $table) {
            $table->unsignedBigInteger('admin_id');
            $table->unsignedBigInteger('role_id');
            $table->primary(['admin_id', 'role_id']);
        });

        DB::table('roles')->insert([
            ['name' => 'Super Administrador', 'description' => 'Administración'],
            ['name' => 'Administrador de Bodega', 'description' => 'Administrador de Bodega'],
            ['name' => 'Encargado de Sucursal', 'description' => 'Encargado de Sucursal'],
            ['name' => 'Cajero', 'description' => 'Cajero']
        ]
    );


     
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
        Schema::dropIfExists('admin_role');
    }
}
