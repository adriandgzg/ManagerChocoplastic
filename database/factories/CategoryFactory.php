<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Category;
use Faker\Generator as Faker;

$factory->define(Category::class, function (Faker $faker) {
    return [
        'name'=>$faker->word,
        'description'=>$faker->sentence(8),
        'image'=>$faker->imageUrl(320, 160),
        'category_id'=> Category::all()->count() > 2 ? Category::pluck('id')->random() : 0
    ];
});
