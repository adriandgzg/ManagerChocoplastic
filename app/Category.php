<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    //
    use SoftDeletes;
    protected $fillable = [
        'name',
        'description',
        'image',
        'category_id',
    ];

    public function businesses()
    {
        return $this->belongsToMany(Business::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function subcategories()
    {
        return $this->hasMany(Category::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
