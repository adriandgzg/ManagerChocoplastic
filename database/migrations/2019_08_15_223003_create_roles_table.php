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

        DB::table('roles')->insert(
            array(
                'name' => 'admin',
                'description' => 'Administración'
            )
        );

        DB::table('roles')->insert(
            array(
                'name' => 'user',
                'description' => 'Usuarios'
            )
        );

        DB::table('roles')->insert(
            array(
                'name' => 'role',
                'description' => 'Roles'
            )
        );

        DB::table('roles')->insert(
            array(
                'name' => 'permission',
                'description' => 'Permisos'
            )
        );

        DB::table('roles')->insert(
            array(
                'name' => 'providers',
                'description' => 'Proveedores'
            )
        );

        DB::table('roles')->insert(
            array(
                'name' => 'clients',
                'description' => 'Clientes'
            )
        );

        DB::table('roles')->insert(
            array(
                'name' => 'box',
                'description' => 'Cajas'
            )
        );

        DB::table('roles')->insert(
            array(
                'name' => 'inventary',
                'description' => 'Inventarios'
            )
        );

        DB::table('roles')->insert(
            array(
                'name' => 'transfer',
                'description' => 'Traspasos'
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
        Schema::dropIfExists('roles');
        Schema::dropIfExists('admin_role');
    }
}
