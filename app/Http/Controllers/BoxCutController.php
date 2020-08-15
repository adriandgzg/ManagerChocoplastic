<?php

namespace App\Http\Controllers;

use App\BoxCut;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoxCutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vUser = Auth::user()->id;
        $vBoxCut = BoxCut::where('admi_fk', '=', $vUser)->where('bocu_status', '=', 1)->first();;
        
            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Caja cargada',
                'data' => $vBoxCut
                
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
        try{

            $vUser = Auth::user()->id;

            $box = new BoxCut();  
            $box->admi_fk = $vUser;
            $box->bocu_startdate = $request->bocu_startdate;
            $box->bocu_initialamount = $request->bocu_initialamount;

            $box->save();

            $vUser = Auth::user()->id;
            $vBoxCut = BoxCut::where('admi_fk', '=', $vUser)->where('bocu_status', '=', 1)->first();;
        
            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Caja cargada',
                'data' => $vBoxCut
                
            ], 200);

        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, "Error || Consultar con el Administrador del Sistema");
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BoxCut  $boxCut
     * @return \Illuminate\Http\Response
     */
    public function show(BoxCut $boxCut)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BoxCut  $boxCut
     * @return \Illuminate\Http\Response
     */
    public function edit(BoxCut $boxCut)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BoxCut  $boxCut
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try{

            \DB::update("update box_cuts set"
        . "   bocu_enddate = '" . $request->bocu_enddate 
        . "', bocu_status = 2 " 
        . ",  bocu_endamount  = '" .  $request->bocu_endamount
        . "', box_observation = '" .  $request->box_observation
        . "' where bocu_pk = ". $request->bocu_pk);

            
          
            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Caja cargada',
                'data' => null
                
            ], 200);

        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, "Error || Consultar con el Administrador del Sistema");
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BoxCut  $boxCut
     * @return \Illuminate\Http\Response
     */
    public function destroy(BoxCut $boxCut)
    {
        //
    }
}
