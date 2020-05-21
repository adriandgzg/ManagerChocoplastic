<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coverage extends Model
{
    //
    protected $fillable=[
        'name',
        'polygon',
        'encode',
        'store_id',
    ];

    function store()
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * @param float $longitude
     * @param float $latitude
     * @return Coverage|bool|mixed
     */
    public static function findByLocation(string $location)
    {
        $pointLocation = new PointLocation();
        $polygons = Coverage::all();
        foreach ($polygons as $key => $polygon) {
            $polygon->polygon = str_replace('),(', '|', $polygon->polygon);
            $polygon->polygon = str_replace('(', '', $polygon->polygon);
            $polygon->polygon = str_replace(')', '', $polygon->polygon);
            $polygon->polygon = explode('|', $polygon->polygon);
            $fullPol = $polygon->polygon;
            $fullPol[] = $polygon->polygon[0];
            $success = $pointLocation->pointInPolygon($location, $fullPol);
            if ($success) {
                return $polygon;
            }

        }
        return false;
    }
}
