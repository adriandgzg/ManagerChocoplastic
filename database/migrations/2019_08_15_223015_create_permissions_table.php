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
                ['name' => 'transfer', 'description' => 'Traspasos', 'permission_id' => null],
                ['name' => 'orders', 'description' => 'Pedidos', 'permission_id' => 6],
                ['name' => 'sales', 'description' => 'Ventas', 'permission_id' => 6],
                ['name' => 'clientdebts', 'description' => 'Cuestas por Cobrar', 'permission_id' => 6],
                ['name' => 'clientsreturnlist', 'description' => 'Devoluciones', 'permission_id' => 6],
                ['name' => 'purchaseorderslist', 'description' => 'Órdenes de Compra', 'permission_id' => 5],
                ['name' => 'purchaselist', 'description' => 'Compras', 'permission_id' => 5],
                ['name' => 'providerdebts', 'description' => 'Cuentas por Pagar', 'permission_id' => 5],
                ['name' => 'providersreturnlist', 'description' => 'Devoluciones', 'permission_id' => 5],
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
                ['admin_id' => 1, 'permission_id' => 9],
                ['admin_id' => 1, 'permission_id' => 10],
                ['admin_id' => 1, 'permission_id' => 11],
                ['admin_id' => 1, 'permission_id' => 12],
                ['admin_id' => 1, 'permission_id' => 13],
                ['admin_id' => 1, 'permission_id' => 14],
                ['admin_id' => 1, 'permission_id' => 15],
                ['admin_id' => 1, 'permission_id' => 16],
                ['admin_id' => 1, 'permission_id' => 17]
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
