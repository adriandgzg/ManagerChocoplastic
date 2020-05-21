<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable=['alias', 'address', 'references', 'latitude', 'longitude', 'user_id'];
}
