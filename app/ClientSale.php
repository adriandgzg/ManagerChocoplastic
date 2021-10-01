<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientSale extends Model
{
    protected $primaryKey = 'clsa_pk';
    Protected $appends = ['clsa_status_description','pame_name'];
    public function getClsaStatusDescriptionAttribute($value)
    {
        switch ($this->clsa_status){
            case 0: return "Pendiente";
            case 2: return "En Proceso de Pago" ;
            case 3: return "Pagado" ;
            default: return "";
        }
    }
    public function getPameNameAttribute($value)
    {
        switch ($this->pame_fk){
            case 1: return "Contado" ;
            case 2: return "Crédito" ;
            case 3: return "Transferencia" ;
            default: return "";
        }
    }
    function client(){
        return $this->belongsTo(Client::class, 'clie_fk', 'clie_pk');
    }
    function store(){
        return $this->belongsTo(Store::class, 'stor_fk', 'stor_pk');
    }
    function clientOrder(){
        return $this->belongsTo(ClientOrder::class, 'clor_fk', 'clor_pk');
    }
}
