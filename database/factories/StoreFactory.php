<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Store;
use Faker\Generator as Faker;

$factory->define(Store::class, function (Faker $faker) {
    return [
        'name'=>$faker->bothify('?##'),
        'address'=>$faker->address,
        'phone_number'=>$faker->phoneNumber,
        'opening_time'=>$faker->time(),
        'closing_time'=>$faker->time(),
        'minimum_purchase'=>$faker->randomFloat(2,1,2),
        'latitude'=>$faker->latitude,
        'longitude'=>$faker->longitude,
    ];
});
