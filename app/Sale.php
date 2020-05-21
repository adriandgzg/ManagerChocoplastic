<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $guarded = [];

    public function products()
    {
        return $this->belongsToMany(Product::class)
        ->select('products.id', 'products.name', 'products.long_key', 'products.description', 
        'products.price', 'products.brand', 'products.bulk', 'products.content', 'products.featured', 
        'products.sales_unit', 'products.type_id', 'product_sale.sale_id as pivot_sale_id', 
        'product_sale.product_id as pivot_product_id', 'product_sale.quantity as pivot_quantity', 
        'product_sale.comments as pivot_comments', 'product_sale.sale_price as pivot_sale_price', 
        'product_sale.promotion_id as pivot_promotion_id', 'product_sale.business_id as pivot_business_id',
        'product_sale.completed')
            ->as('sale')->withPivot('quantity', 'comments', 'sale_price', 'promotion_id', 'business_id');
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function statuses(){
        return $this->belongsToMany(Status::class)
            ->as('status');
    }
    public function deliveryMan(){
        return $this->belongsTo(User::class, 'delivery_id', 'id', 'users');
    }
    public function pickUp(){
        return $this->belongsTo(PickupTime::class, 'pickup_time_id', 'id', 'pickup_times');
    }

    public function status(){
        return $this->belongsTo(Status::class);
    }
    public function store(){
        return $this->belongsTo(Store::class);
    }
    public function paymentMethod(){
        return $this->belongsTo(PaymentMethod::class);
    }
    public function deliveryTime(){
        return $this->belongsTo(PickupTime::class, 'pickup_time_id', 'id');
    }
}
