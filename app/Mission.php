<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    public function products(){
        return $this->belongsToMany(Product::class);
    }

    public function missions(){
        return $this->belongsTo(Business::class);
    }
    public function store(){
        return $this->belongsToMany(Store::class);
    }
}
