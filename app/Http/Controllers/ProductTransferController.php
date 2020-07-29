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


            $vProducts = DB::table('product_transfers AS PT')
                ->join('products AS P', 'P.prod_pk', '=', 'PT.prod_fk')
                ->join('stores AS SO', 'SO.stor_pk', '=', 'PT.stor_fk_output')
                ->join('stores AS SI', 'SI.stor_pk', '=', 'PT.stor_fk_input')
                ->select(
                    'PT.prtr_pk',
                    'PT.prtr_quantity',
                    'PT.prtr_observation',
                    'PT.created_at',

                    'P.prod_pk',
                    'P.prod_identifier',
                    'P.prod_name',
                    'P.prod_description',
                    'P.prod_image',
                    'P.prod_bulk',

                    'PT.stor_fk_output',
                    'SO.stor_name AS stor_name_output',

                    'PT.stor_fk_input',
                    'SI.stor_name AS stor_name_input'
                )
                ->where('PT.prtr_status', '=', 1)
                //->where('PF.stor_fk', '=', $vStore_PK)
                ->orderByDesc('PT.prtr_pk')
                ->get();
            
            return $this->dbResponse($vProducts, 200, null, 'Lista de Productos Frecuentes');
          
        } 
        catch (Throwable $vTh) 
        {
            return $vTh;
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
        try {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prod_fk' => 'required|int', //PK Producto
                'stor_fk_input' => 'required|int', //PK Sucursal Entrada
                'prtr_quantity' => 'required', //Cantidad
                'prtr_observation' => 'required' //Observación
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprod_fk = $vInput['prod_fk'];
            $vstor_fk_input = $vInput['stor_fk_input'];
            $vprtr_quantity = $vInput['prtr_quantity'];
            $vprtr_observation = $vInput['prtr_observation'];

            $vstor_fk_output = Auth::user()->store_id;

            //Buscar el folio consecutivo
            $vSystem = System::select('syst_transfer')->first();
            $vsyst_transfer = $vSystem->syst_transfer;
            $vprtr_identifier =  "Tras_" . $vsyst_transfer;


            //Guardar Producto Traspaso
            $vPT = new ProductTransfer();        
            $vPT->prod_fk = $vprod_fk;
            $vPT->stor_fk_output = $vstor_fk_output;
            $vPT->stor_fk_input = $vstor_fk_input;
            $vPT->prtr_identifier = $vprtr_identifier;
            $vPT->prtr_quantity = $vprtr_quantity;
            $vPT->prtr_observation = $vprtr_observation;
            $vPT->save();

            //Modificación de folio consecutivo
            DB::table('systems')->update(['syst_transfer' =>  $vsyst_transfer + 1]);
            
            return $this->dbResponse(null, 200, null, 'Producto Traspaso Guardado Correctamente');
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProductTransfer  $productTransfer
     * @return \Illuminate\Http\Response
     */
    public function show(ProductTransfer $productTransfer)
    {
        //
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
    public function update(Request $request, ProductTransfer $productTransfer)
    {
        //
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
