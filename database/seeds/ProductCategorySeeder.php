<?php

use App\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        ProductCategory::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        ProductCategory::create([
            'prca_pk' => 1,
            'prca_name' => "AB"
        ]);
        ProductCategory::create([
            'prca_pk' => 2,
            'prca_name' => "AC"
        ]);
        ProductCategory::create([
            'prca_pk' => 3,
            'prca_name' => "ACT"
        ]);
        ProductCategory::create([
            'prca_pk' => 4,
            'prca_name' => "ALM"
        ]);
        ProductCategory::create([
            'prca_pk' => 5,
            'prca_name' => "ARZ"
        ]);
        ProductCategory::create([
            'prca_pk' => 6,
            'prca_name' => "BAL"
        ]);
        ProductCategory::create([
            'prca_pk' => 7,
            'prca_name' => "BOL"
        ]);
        ProductCategory::create([
            'prca_pk' => 8,
            'prca_name' => "BYF"
        ]);
        ProductCategory::create([
            'prca_pk' => 9,
            'prca_name' => "CAF"
        ]);
        ProductCategory::create([
            'prca_pk' => 10,
            'prca_name' => "CHI"
        ]);
        ProductCategory::create([
            'prca_pk' => 11,
            'prca_name' => "DEB"
        ]);
        ProductCategory::create([
            'prca_pk' => 12,
            'prca_name' => "DED"
        ]);
        ProductCategory::create([
            'prca_pk' => 13,
            'prca_name' => "DEI"
        ]);
    }
}
