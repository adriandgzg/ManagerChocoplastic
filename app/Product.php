<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Product
 * @package App
 */
class Product extends Model
{
    //
    use SoftDeletes;

    /**
     * @var array
     */
    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function subcategories()
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function store()
    {
        return $this->belongsToMany(Store::class, 'business_product')->as('stock')
            ->withPivot(['stock', 'price', 'active','featured', 'max_quantity']);
    }    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function stock()
    {
        return $this->belongsToMany(Store::class, 'business_product')->as('stock')
            ->withPivot(['stock', 'price', 'active', 'max_quantity']);
    }
    public function promotions()
    {
        return $this->hasMany(Promotion::class)
            ->where('start_date', '<=', date('Y-m-d'))
            ->where('end_date', '>=', date('Y-m-d'));
    }
    public function scopeWithRelations($query, $store_id, $business_id, $user_id)
    {
        return $query->with([
            'promotions'=> function ($q) use ($business_id, $store_id) {
                $q->whereHas('businesses', function ($q) use  ($business_id,$store_id){
                    $q->where('business_id',$business_id)->where('store_id',$store_id);
                })->orderby('promotions.id', 'DESC');
            },
            'favorites'=>function ($q) use ($user_id) {
                $q->where('favorites.user_id', $user_id)->select('id');
            }
        ]);
    }
    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorites')
            ->as('favorite')
            ->withPivot('user_id as user_id');
    }
    public function business()
    {
        return $this->belongsToMany(Business::class);
    }
    public function missions()
    {
        return $this->belongsToMany(Mission::class);
    }
}
