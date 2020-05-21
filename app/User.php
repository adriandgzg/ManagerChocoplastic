<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    /**
     * Find the user instance for the given username.
     *
     * @param  string  $username
     * @return \App\Models\User
     */
    public function findForPassport($username)
    {
        return $this->where('phone_number', $username)->first();
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','phone_number', 'verification_code','verified','user_type_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','verification_code',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function car()
    {
        return $this->belongsToMany(Product::class, 'cars')
            ->as('car')->withPivot('quantity', 'comments', 'business_id', 'store_id');
    }
    public function favorites()
    {
        return $this->belongsToMany(Product::class, 'favorites')->as('favorites')
            ->withPivot('business_id', 'store_id');
    }
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

}
