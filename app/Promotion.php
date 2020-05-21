<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    //
    function businesses(){
        return $this->belongsToMany(Business::class);
    }
}
