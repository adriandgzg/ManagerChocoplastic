<?php

namespace App\Http\Controllers;

use DB;
use Throwable; 
use Validator;
use App\System;
use App\ProductTransfer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\api\ApiResponseController;

class ProductTransferController extends ApiResponseController 
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        try {
            //Sucursal al que pertenece el Usuario App
            //$vStore_PK = Auth::user()->store_id;


            $vPT = DB::table('product_transfers AS PT')
                ->leftjoin('stores AS SO', 'SO.stor_pk', '=', 'PT.stor_fk_output')
                ->leftjoin('stores AS SI', 'SI.stor_pk', '=', 'PT.stor_fk_input')
                ->select(
                    'PT.prtr_pk',
                    'PT.prtr_identifier',
                    'PT.prtr_observation',
                    'PT.created_at',
                    'PT.prtr_status',
                    DB::raw('
                    (CASE 
                        WHEN PT.prtr_status = 0 THEN "Cancelada" 
                        WHEN PT.prtr_status = 1 THEN "Pendiente" 
                        WHEN PT.prtr_status = 2 THEN "Finalizado" 
                        ELSE "" END
                    ) AS prtr_status_description'),

                    'PT.stor_fk_output',
                    'SO.stor_name AS stor_name_output',

                    'PT.stor_fk_input',
                    'SI.stor_name AS stor_name_input'
                )
                //->where('PT.prtr_status', '=', 1)
                ->orderByDesc('PT.prtr_pk')
                ->get();
            
            return $this->dbResponse($vPT, 200, null, 'Lista de Traspasos');
          
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
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
    public function store(Request $r)
    {
           
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProductTransfer  $productTransfer
     * @return \Illuminate\Http\Response
     */
    public function show($prtr_pk)
    {
        try {

            $vPT = DB::table('product_transfers AS PT')
                ->leftjoin('stores AS SO', 'SO.stor_pk', '=', 'PT.stor_fk_output')
                ->leftjoin('stores AS SI', 'SI.stor_pk', '=', 'PT.stor_fk_input')
                ->select(
                    'PT.prtr_pk',
                    'PT.prtr_identifier',
                    'PT.prtr_observation',
                    'PT.created_at',
                    'PT.prtr_status',
                    DB::raw('
                    (CASE 
                        WHEN PT.prtr_status = 0 THEN "Cancelada" 
                        WHEN PT.prtr_status = 1 THEN "Pendiente" 
                        WHEN PT.prtr_status = 2 THEN "Finalizado" 
                        ELSE "" END
                    ) AS prtr_status_description'),

                    'PT.stor_fk_output',
                    'SO.stor_name AS stor_name_output',

                    'PT.stor_fk_input',
                    'SI.stor_name AS stor_name_input'
                )
                ->where('PT.prtr_pk', '=', $prtr_pk)
                ->first();


            if($vPT)
            { 
                $vPTD = DB::table('product_transfer_details AS PTD')
                ->join('products AS P', 'P.prod_pk', '=', 'PTD.prod_fk')
                ->select(
                    'PTD.prtd_pk',
                    'PTD.prtr_fk',
                    'PTD.prtd_quantity',
                    'PTD.created_at',

                    'P.prod_pk',
                    'P.prod_identifier',
                    'P.prod_name',
                    'P.prod_description',
                    'P.prod_image',
                    'P.prod_bulk',
                )
                ->where('PTD.prtd_status', '=', 1)
                ->where('PTD.prtr_fk', '=', $prtr_pk)
                ->get();

                $vData = 
                [
                    'ProductTransfers' => $vPT, 
                    'ProductTransferDetails' => $vPTD
                ];

                return $this->dbResponse($vData, 200, null, 'Traspaso Detalle');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Traspaso NO Encontrada');
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
     * @param  \App\ProductTransfer  $productTransfer
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductTransfer $productTransfer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProductTransfer  $productTransfer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $r)
    {
        try 
        {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prtr_pk' => 'required|int', //PK Traspaso 
                'stor_fk_input' => 'required|int', //PK Sucursal Entrada
                'prtr_observation' => 'required', //Observacion
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprtr_pk = $vInput['prtr_pk'];
            $vstor_fk_input = $vInput['stor_fk_input'];
            $vprtr_observation = $vInput['prtr_observation'];

            //PK Sucursal Salida
            $vstor_fk_output = Auth::user()->store_id;

            //Buscar el folio consecutivo
            $vSystem = System::select('syst_transfer')->first();
            $vsyst_transfer = $vSystem->syst_transfer;
            $vprtr_identifier =  "Tras_" . $vsyst_transfer;

            //Validar Si Existe el Traspaso
            $vPT = ProductTransfer::where('prtr_pk', '=', $vprtr_pk)->first();
            if ($vPT) 
            {
                //Modificar Traspaso
                $vPTU = ProductTransfer::find($vprtr_pk);
                $vPTU->stor_fk_output = $vstor_fk_output;
                $vPTU->stor_fk_input = $vstor_fk_input;
                $vPTU->prtr_identifier = $vprtr_identifier;
                $vPTU->prtr_observation = $vprtr_observation;
                $vPTU->prtr_status = 2;
                $vPTU->save();

                //Modificar Folio del Traspaso
                DB::table('systems')
                ->update(['syst_transfer' =>  $vsyst_transfer + 1]);


                /*/////////////////////////////////Anexo de Inventario
                $vPPD = ProviderPurchaseDetail::where('prpu_fk', '=', $vprpu_pk)
                        ->where('prpd_status', '=', 1)
                        ->get();
                
                foreach($vPPD as $vP)
                {
                    $vProduct = $vP->prod_fk;
                    $vprpd_quantity = $vP->prpd_quantity;

                    //Buscar Producto en el Inventario 
                    $vPI = ProductInventory::where('prod_fk', '=', $vProduct)
                            ->where('prin_status', '=', 1)
                            ->where('stor_fk', '=', $vPP->stor_fk)
                            ->first();

                    if ($vPI) 
                    {
                        $vprin_pk = $vPI->prin_pk; //Llave primaria del Inventario
                        $vprin_stock = $vPI->prin_stock; //Stock actual

                        //Modificar Producto Inventario
                        $vPIU = ProductInventory::find($vprin_pk);
                        $vPIU->prin_stock = $vprin_stock + $vprpd_quantity;
                        $vPIU->save();
                        
                    } 
                    else 
                    {
                        //Insertar Producto Inventario
                        $vPI = new ProductInventory();        
                        $vPI->prod_fk = $vProduct;
                        $vPI->stor_fk = $vPP->stor_fk;
                        $vPI->prin_stock = $vprpd_quantity;
                        $vPI->save();
                    }
                }
                */
                return $this->dbResponse($vprtr_pk, 200, null, 'Traspaso Guardado Correctamente');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Traspaso NO Encontrada');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProductTransfer  $productTransfer
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductTransfer $productTransfer)
    {
        //
    }
}
