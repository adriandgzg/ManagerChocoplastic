<?php

namespace App\Http\Controllers;

use App\Coverage;
use App\PointLocation;
use App\Store;
use Illuminate\Http\Request;

/**
 * Class CoverageController
 * @package App\Http\Controllers
 */
class CoverageController extends Controller
{

    public function pintame()
    {
        
        return view('mapa');
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $stores = Store::all();
        return  response()->json([ 'success' => true,
            'message' => 'Información de entrega cargada',
            'data' =>$stores, ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $coverage=Coverage::create($request->all());
        return response()->json(
            [
                'success' => true,
                'message' => 'Cobertura guardada',
                'data' => $coverage,
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Coverage $coverage
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {

        $coverages = Coverage::select('store_id', 'name', 'polygon', 'encode')->get();
        foreach ($coverages as $key => $coverage) {
            $polys = explode('),(', trim($coverage->polygon, '()'));
            $polygons = array_map(function ($poly) {
                $point = explode(', ', $poly);
                return ['latitude' => (double)$point[0], 'longitude' => (double)$point[1]];
            }, $polys);
            $coverages[$key]->polygon = $polygons;
        }
        return response()->json(
            [
                'success' => true,
                'message' => 'Coberturas cargadas',
                'data' => $coverages,
            ], 200);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Coverage $coverage
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(int $store_id)
    {
        $polyg = Coverage::where('store_id', $store_id)->first();
        $polygs = Coverage::where('store_id', '!=', $store_id)->get();
        $polygs->prepend($polyg);
        return response()->json(
            [
                'success' => true,
                'message' => 'Coberturas cargada',
                'data' => $polygs,
            ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Cobertura $cobertura
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Coverage $coverage)
    {
//        if (!Gate::allows('editar cobertura')) {
//            return abort(401);
//        }
        $coverage->encode = $request->encode;
        $coverage->polygon = $request->polygon;
        $coverage->save();
        return response()->json(
            [
                'success' => true,
                'message' => 'Cobertura actualizada',
                'data' => $coverage,
            ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Coverage $coverage
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Coverage $coverage)
    {

//        if (!Gate::allows('editar cobertura')) {
//            return abort(401);
//        }
        $coverage->delete();
        return response()->json(
            [
                'success' => true,
                'message' => 'Coberturas eliminada',
                'data' => null,
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\zonas $zonas
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByLocation(string $location )
    {
        $coverage = false;
        $pointLocation = new PointLocation();
        $polygons = Coverage::all();
        // The last point's coordinates must be the same as the first one's, to "close the loop"
        foreach ($polygons as $key => $polygon) {
            $polygon->polygon = str_replace('),(', '|', $polygon->polygon);
            $polygon->polygon = str_replace('(', '', $polygon->polygon);
            $polygon->polygon = str_replace(')', '', $polygon->polygon);
            $polygon->polygon = explode('|', $polygon->polygon);
            $fullPol = $polygon->polygon;
            $fullPol[] = $polygon->polygon[0];
            if ($pointLocation->pointInPolygon($location, $fullPol)) {
                $coverage = $polygon->store_id;
                break;
            }
        }

        if ($coverage) {
            $store=Store::find($coverage);
            return response()->json([
                'success' => true,
                'message' => 'Cobertura disponible',
                'data' => $store,
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Cobertura no disponible, seleccione otra dirección',
                'data' => null,
            ], 200);
        }
    }


}
