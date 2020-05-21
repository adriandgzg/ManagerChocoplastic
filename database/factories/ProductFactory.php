<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'id'=>$faker->randomNumber($nbDigits = 4, $strict = false),
        'long_key'=>$faker->ean13,
        'name'=>$faker->sentence($nbWords = 3, $variableNbWords = true)  ,
        'description'=>$faker->sentence($nbWords = 6, $variableNbWords = true),
        'price'=>$faker->randomFloat($nbMaxDecimals = 2, $min = 1, $max = 999.99),
        'content'=>$faker->randomFloat($nbMaxDecimals = 1, $min = 5, $max = 2000.00) ,
        'unit'=>$faker->randomElement(['ml','L','g','KG']),
        'sales_unit'=>$faker->randomElement(['PZA','BOX']),
        'brand'=>$faker->company,
        'image'=>$faker->imageUrl($width = 480, $height = 640),
        'type_id'=>$faker->randomElement(['01','02']),
    ];
});
