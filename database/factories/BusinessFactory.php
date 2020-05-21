<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Business;
use Faker\Generator as Faker;

$factory->define(Business::class, function (Faker $faker) {
    return [
        'name'=>$faker->company,
        'description'=>$faker->catchPhrase,
        'image'=>$faker->imageUrl($width = 640, $height = 480),
    ];
});
