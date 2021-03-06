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
        //Catálogo Productos
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('prod_pk'); //Llave Primaria

            $table->bigInteger('prca_fk')->unsigned(); //Llave Foranea Catálogo de Categoría de Productos
            $table->foreign('prca_fk')->references('prca_pk')->on('product_categories')->onUpdate('cascade');

            $table->bigInteger('meas_fk_input')->unsigned(); //Llave Foranea Catálogo Unidad de Medida Entrada
            $table->foreign('meas_fk_input')->references('meas_pk')->on('measurements')->onUpdate('cascade'); 

            $table->bigInteger('meas_fk_output')->unsigned(); //Llave Foranea Catálogo Unidad de Medida Salida
            $table->foreign('meas_fk_output')->references('meas_pk')->on('measurements')->onUpdate('cascade');

            $table->string('prod_identifier', 20);//->unique(); //Identificador Personalizado
            $table->string('prod_name', 300); //Nombre
            $table->text('prod_description'); //Descripcion
            $table->text('prod_image'); //URL Imagen
            $table->decimal('prod_actualprice', 12, 2); //Precio Actual
            $table->decimal('prod_eventualprice', 12, 2); //Precio Eventual
            $table->decimal('prod_preferentialprice', 12, 2); //Precio Preferente
            $table->decimal('prod_saleprice', 12, 2); //Precio Venta
            $table->decimal('prod_listprice', 12, 2); //Precio Lista
            $table->decimal('prod_packingquantity', 12, 2); //Cantidad Empaque
            $table->bigInteger('prod_main_pk')->nullable(); //PK Articulo Padre
            $table->decimal('prod_fact_convert', 12, 4)->nullable(); //Factor Conversion
            $table->integer('prod_minimumpurchase')->nullable(); //Compra Minima
            $table->boolean('prod_bulk')->default(0); //Aplica Granel 1) Si y 0) No
            $table->boolean('prod_iva')->default(0); //Aplica IVA 1) Si y 0) No
            $table->boolean('prod_ieps')->default(0); //Aplica IEPS 1) Si y 0) No
            $table->smallInteger('prod_status')->default(1); //Estatus
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
        Schema::dropIfExists('products');
    }
}
