<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PickupTime;

class PickUpTimeController extends Controller
{
    public function addTime(Request $request)
    {        
        $pickup = new PickupTime();        
        $pickup->time = $request->time;
        $pickup->store_id = $request->idStore;
        $pickup->save();
    }

    public function deleteTime(Request $request)
    {            
        $categorie = PickupTime::findOrFail($request->id);
        
        $categorie->deleted_at  = now();
        $categorie->save();
    }

    public function updateTime(Request $request)
    {
        $categorie = PickupTime::findOrFail($request->id);        
        $categorie->time  = $request->time;
        $categorie->save();
    }
}
