<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Throwable;
use App\ReturnMotive;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;

class ReturnMotiveController extends ApiResponseController
{ 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $vRM = DB::table('return_motives AS RM')
                ->select(
                    'RM.remo_pk',
                    'RM.remo_description',
                    'RM.created_at'
                )
                ->where('remo_status', '=', '1')
                ->get();
            
            return $this->dbResponse($vRM, 200, null, 'Lista de Motivos de Devoluciones');
          
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, "Error || Consultar con el Administrador del Sistema");
        }
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
     * @param  \App\ReturnMotive  $returnMotive
     * @return \Illuminate\Http\Response
     */
    public function show(ReturnMotive $returnMotive)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ReturnMotive  $returnMotive
     * @return \Illuminate\Http\Response
     */
    public function edit(ReturnMotive $returnMotive)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ReturnMotive  $returnMotive
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ReturnMotive $returnMotive)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ReturnMotive  $returnMotive
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReturnMotive $returnMotive)
    {
        //
    }
}
