<?php

use App\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Product::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        Product::create(['prod_pk' => 1, 'prca_fk' => 1, 'meas_fk_input' => 1, 'meas_fk_output' => 3, 'prod_identifier' => "1001", 'prod_name' => "ADOBO ANITA 1 KG (CJ.12PZ)", 'prod_description' => "ADOBO ANITA 1 KG (CJ.12PZ)", 'prod_image' => "producto.png", 'prod_actualprice' => 0, 'prod_eventualprice' => 0, 'prod_preferentialprice' => 0, 'prod_saleprice' => 1, 'prod_listprice' => 2, 'prod_packingquantity' => 12, 'prod_bulk' => 1]);
        Product::create(['prod_pk' => 2, 'prca_fk' => 1, 'meas_fk_input' => 1, 'meas_fk_output' => 3, 'prod_identifier' => "1001", 'prod_name' => "ADOBO ANITA 1 KG (CJ.12PZ)", 'prod_description' => "ADOBO ANITA 1 KG (CJ.12PZ)", 'prod_image' => "producto.png", 'prod_actualprice' => 0, 'prod_eventualprice' => 0, 'prod_preferentialprice' => 0, 'prod_saleprice' => 1, 'prod_listprice' => 2, 'prod_packingquantity' => 12, 'prod_bulk' => 1]);
    }
}
