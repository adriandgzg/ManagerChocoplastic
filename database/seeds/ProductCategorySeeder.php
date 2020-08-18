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
            'prca_name' => "AB",
            'prca_abbreviation' => "ABARROTES"
        ]);
        ProductCategory::create([
            'prca_pk' => 2,
            'prca_name' => "AC",
            'prca_abbreviation' => "AB"
        ]);
        ProductCategory::create([
            'prca_pk' => 3,
            'prca_name' => "ACT",
            'prca_abbreviation' => "AB"
        ]);
        ProductCategory::create([
            'prca_pk' => 4,
            'prca_name' => "ALM",
            'prca_abbreviation' => "AB"
        ]);
        ProductCategory::create([
            'prca_pk' => 5,
            'prca_name' => "ARZ",
            'prca_abbreviation' => "AB"
        ]);
        ProductCategory::create([
            'prca_pk' => 6,
            'prca_name' => "BAL",
            'prca_abbreviation' => "AB"
        ]);
        ProductCategory::create([
            'prca_pk' => 7,
            'prca_name' => "BOL",
            'prca_abbreviation' => "AB"
        ]);
        ProductCategory::create([
            'prca_pk' => 8,
            'prca_name' => "BYF",
            'prca_abbreviation' => "AB"
        ]);
        ProductCategory::create([
            'prca_pk' => 9,
            'prca_name' => "CAF",
            'prca_abbreviation' => "AB"
        ]);
        ProductCategory::create([
            'prca_pk' => 10,
            'prca_name' => "CHI",
            'prca_abbreviation' => "AB"
        ]);
        ProductCategory::create([
            'prca_pk' => 11,
            'prca_name' => "DEB",
            'prca_abbreviation' => "AB"
        ]);
        ProductCategory::create([
            'prca_pk' => 12,
            'prca_name' => "DED",
            'prca_abbreviation' => "AB"
        ]);
        ProductCategory::create([
            'prca_pk' => 13,
            'prca_name' => "DEI",
            'prca_abbreviation' => "AB"
        ]);
    }
}
