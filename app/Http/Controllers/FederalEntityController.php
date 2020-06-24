<?php

namespace App\Http\Controllers;

use App\FederalEntity;
use Illuminate\Http\Request;

class FederalEntityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function EntitiesList(){
        $entities = FederalEntity::all();
        
        
        return response()->json([
            'success' => true,
            'message' => 'entities loaded',
            'data' => $entities,
        ], 200);
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FederalEntity  $federalEntity
     * @return \Illuminate\Http\Response
     */
    public function show(FederalEntity $federalEntity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FederalEntity  $federalEntity
     * @return \Illuminate\Http\Response
     */
    public function edit(FederalEntity $federalEntity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FederalEntity  $federalEntity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FederalEntity $federalEntity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FederalEntity  $federalEntity
     * @return \Illuminate\Http\Response
     */
    public function destroy(FederalEntity $federalEntity)
    {
        //
    }
}
