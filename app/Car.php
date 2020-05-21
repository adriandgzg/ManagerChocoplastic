<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    public function products(){
        return $this->belongsToMany(Product::class, 'cars')
            ->as('products')->withPivot('quantity', 'comments', 'business_id', 'store_id');

    }
}
