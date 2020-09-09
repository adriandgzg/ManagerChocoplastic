<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('description');
            $table->unsignedBigInteger('permission_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('admin_permission', function (Blueprint $table) {
            $table->unsignedBigInteger('admin_id');
            $table->unsignedBigInteger('permission_id');
            $table->primary(['admin_id', 'permission_id']);
        });
        Schema::create('permission_role', function (Blueprint $table) {
            $table->unsignedBigInteger('permission_id');
            $table->unsignedBigInteger('role_id');
            $table->primary(['role_id', 'permission_id']);
        });

        DB::table('permissions')->insert([
                ['name' => 'admin', 'description' => 'Administración', 'permission_id' => null],
                ['name' => 'user', 'description' => 'Usuarios', 'permission_id' => 1],
                ['name' => 'role', 'description' => 'Roles', 'permission_id' => 1],
                ['name' => 'permission', 'description' => 'Permisos', 'permission_id' => 1],
                ['name' => 'providers', 'description' => 'Proveedores', 'permission_id' => null],
                ['name' => 'clients', 'description' => 'Clientes', 'permission_id' => null],
                ['name' => 'box', 'description' => 'Cajas', 'permission_id' => null],
                ['name' => 'inventory', 'description' => 'Inventarios', 'permission_id' => null],
                ['name' => 'transfer', 'description' => 'Traspasos', 'permission_id' => null]
            ]
        );


        DB::table('admin_permission')->insert([
                ['admin_id' => 1, 'permission_id' => 1],
                ['admin_id' => 1, 'permission_id' => 2],
                ['admin_id' => 1, 'permission_id' => 3],
                ['admin_id' => 1, 'permission_id' => 4],
                ['admin_id' => 1, 'permission_id' => 5],
                ['admin_id' => 1, 'permission_id' => 6],
                ['admin_id' => 1, 'permission_id' => 7],
                ['admin_id' => 1, 'permission_id' => 8],
                ['admin_id' => 1, 'permission_id' => 9]
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
        Schema::dropIfExists('permission_role');
        Schema::dropIfExists('admin_permission');
        Schema::dropIfExists('permissions');
    }
}
