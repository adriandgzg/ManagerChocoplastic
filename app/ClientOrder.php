<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientOrder extends Model
{
    //
    protected $primaryKey = 'clor_pk';
    Protected $appends = ['clor_status_description'];

    function client(){
        return $this->belongsTo(Client::class, 'clie_fk', 'clie_pk');
    }

    function store(){
        return $this->belongsTo(Store::class, 'stor_fk', 'stor_pk');
    }

    public function getClorStatusDescriptionAttribute($value)
    {
        switch ($this->clor_status){
            case 0: return "Cancelado";
            case 1: return "Pendiente" ;
            case 2: return "Procesado" ;
            default: return "";
        }
    }
}
