<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class Admin extends Authenticatable
{
    use Notifiable;

    protected $guard = 'web';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'verified'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    /**
     * Gets all permissions assign to user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function permissions() {

        return $this->belongsToMany(Permission::class);
    }
    /**    /**
     * Gets all permissions assign to user
     * @return \Illuminate\Support\Collection
     */
    public function allPermissions() {

        return $this->permissions()->pluck('name');
    }
    /**
     * Gets all permissions assign to user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role() {

        return $this->belongsTo(Role::class);
    }
}
