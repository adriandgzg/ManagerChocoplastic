<?php

namespace App\Http\Controllers;

use DB;
use Exception;
use Throwable;
use App\BoxCut;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\api\ApiResponseController;

class BoxCutController extends ApiResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vUser = Auth::user()->id;
        $vBoxCut = BoxCut::where('admi_fk', '=', $vUser)->where('bocu_status', '=', 1)->first();
        
            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Caja cargada',
                'data' => $vBoxCut
                
            ], 200);
        
    }
    
    public function ListBoxCuts()
    {
        try {
            $vClientSales = DB::table('box_cuts AS BC')
                ->select(
                    'BC.bocu_pk',
                    
                    DB::raw('(CASE 
                        WHEN BC.bocu_status = 1 THEN "Abierta" 
                        WHEN BC.bocu_status = 2 THEN "Cerrada"                          
                        ELSE "" END) AS bocu_status'),
                        'BC.bocu_startdate',
                        'BC.bocu_initialamount',
                        'BC.bocu_enddate',
                        'BC.bocu_endamount',
                        'BC.bocu_observation',
                        'BC.created_at',
                )
                ->get();

            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Ventas de los clientes',
                'data' =>  $vClientSales
            ], 200);
            
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'success' => false,
                'message' => $e
            ], 200);
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
        try{

            $vUser = Auth::user()->id;
            $vstor_fk = Auth::user()->store_id;

            $vBCSel = BoxCut::where('admi_fk', '=', $vUser)->where('bocu_status', '=', 1)->first();

            if($vBCSel)
            {
                return response()->json([
                    'code' => 404,
                    'success' => false,
                    'message' => 'Usuario con Caja Abierta Anteriromente',
                    'data' => null
                ], 200);
            }
            else
            {
                $vBCI = new BoxCut();  
                $vBCI->admi_fk = $vUser;
                $vBCI->stor_fk = $vstor_fk;
                $vBCI->bocu_startdate = $request->bocu_startdate;
                $vBCI->bocu_initialamount = $request->bocu_initialamount;
                $vBCI->save();

                //Asignación de PK Venta Cliente
                $vbocu_pk = $vBCI->bocu_pk;

                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('box_cuts', $vbocu_pk, 1);

                $vBoxCut = BoxCut::where('bocu_pk', '=', $vbocu_pk)->first();

                return response()->json([
                    'code' => 200,
                    'success' => true,
                    'message' => 'Caja cargada',
                    'data' => $vBoxCut
                ], 200);
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BoxCut  $boxCut
     * @return \Illuminate\Http\Response
     */
    public function show(int $bocu_pk)
    {
        

        try {
            //Asignacion de variables
            $vbocu_pk = $bocu_pk;

            if ($vbocu_pk == '' || $vbocu_pk == 0) {
                return $this->dbResponse(null, 500, null, 'PK Obligatorio');
            }

            $vBCSel = DB::table('box_cuts AS BC') 
                ->join('stores AS S', 'BC.stor_fk', '=', 'S.stor_pk')
                ->join('admins AS A', 'BC.admi_fk', '=', 'A.id')
                ->select(
                    'bocu_pk',
                    'bocu_startdate',
                    'bocu_enddate',

                    'bocu_initialamount', //Saldo Inicial
                    DB::raw("
                        500 AS totalcharge
                    "), //Total Cobros
                    DB::raw("
                        200 AS totalwithdrawals
                    "), //Total Retiros
                    'bocu_endamount', //Saldo Final
                    DB::raw("
                        100 AS totalcredit
                    "), //Total Credito
                   

                    'bocu_observation',
                    'bocu_status',

                    'S.stor_pk',
                    'S.stor_name',
                    'S.stor_addres',

                    'A.name AS user'
                    

                    )
                ->where('BC.bocu_pk', '=', $vbocu_pk)
                ->first();

            if($vBCSel)
            { 
                return $this->dbResponse($vBCSel, 200, null, 'Información de Corte de Caja');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Corte de Caja No Encontrado');
            }

        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
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
            . "', bocu_observation = '" .  $request->bocu_observation
            . "' where bocu_pk = ". $request->bocu_pk);

            //////////////////  Inserción de Log  //////////////////
            $this->getstorelog('box_cuts', $request->bocu_pk, 2);
          
            return response()->json([
                'code' => 200,
                'success' => true,
                'message' => 'Caja cargada',
                'data' => null
                
            ], 200);

        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
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
