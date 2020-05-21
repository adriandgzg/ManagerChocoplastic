<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use function foo\func;

class Store extends Model
{
    //
    use SoftDeletes;
    protected $fillable=[
        'name',
        'address',
        'phone_number',
        'opening_time',
        'closing_time',
        'minimum_purchase',
        'latitude',
        'longitude',
    ];


    public function businesses()
    {
        return $this->belongsToMany(Business::class);
    }
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
    public function businessWithCategories()
    {
        return $this->belongsToMany(Business::class)->with(['categories'=>function($q){
            $q->with(['subcategories'=>function($q){
                $q->with('products');
            }]);
        }]);
    }
    public function productsByCategories()
    {
        return $this->categories()->with('products');
    }
    public function promotions()
    {
        return $this->belongsToMany(Promotion::class);
    }
    public function missions()
    {
        return $this->belongsToMany(Mission::class)->as('missions');
    }
    public function products()
    {
        return $this->belongsToMany(Product::class, 'business_product')->as('stock')
            ->withPivot(['stock', 'price', 'active','featured','max_quantity']);
    }
    public function pickupTimes()
    {
        return $this->hasMany(PickupTime::class);
    }
}
