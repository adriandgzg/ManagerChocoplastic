<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Business extends Model
{
    //
    use SoftDeletes;
    protected $guarded=[];

    public function stores()
    {
        return $this->belongsToMany(Store::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function missions()
    {
        return $this->belongsToMany(Mission::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class)->as('stock')
            ->withPivot(['stock', 'price', 'active','featured', 'max_quantity']);
    }
}
