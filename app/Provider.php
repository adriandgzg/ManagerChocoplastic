<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    //

    public function federal()
    {
        return $this->belongsTo(FederalEntity::class, 'feen_pk', 'feen_fk', 'providers');
    }
    
}


