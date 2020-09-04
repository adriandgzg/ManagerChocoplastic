<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use App\System;
use Throwable; 
use App\ProductTransfer;
use App\ProductInventory;
use Illuminate\Http\Request;
use App\ProductTransferDetail;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\api\ApiResponseController;
use App\Product;

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
                    ->join('measurements AS M', 'P.meas_fk_output', '=', 'M.meas_pk')
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

                    'M.meas_pk',
                    'M.meas_name'
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


            //Buscar el folio consecutivo
            $vSystem = System::select('syst_transfer')->first();
            $vsyst_transfer = $vSystem->syst_transfer;
            $vTrans = $vsyst_transfer + 1;

            $vprtr_identifier =  "Tras_" . $vTrans;

            //Validar Si Existe el Traspaso
            $vPTSel = ProductTransfer::where('prtr_pk', '=', $vprtr_pk)->where('prtr_status', '=', 1)->first();
            if ($vPTSel) 
            {
                $vstor_fk_output = $vPTSel->stor_fk_output;
                //Validar Inventario

                //Consultar Traspaso Detallado
                $vPTDSel = ProductTransferDetail::where('prtr_fk', '=', $vprtr_pk)
                    ->where('prtd_status', '=', 1)
                    ->get();

                //Recorrer Traspaso Detallado
                foreach($vPTDSel as $vP)
                {
                    //Datos del Producto a Transpasar
                    $vprod_fk = $vP->prod_fk; //PK Producto
                    $vprtd_quantity = $vP->prtd_quantity; // Cantidad a Transpasar
                    $vVal_Dev = false;
                    $vMsj = '';


                    //Consutar Producto en el Inventario de la Sucursal de Salida
                    $vPISel = ProductInventory::where('prod_fk', '=', $vprod_fk)
                        ->join('products AS P', 'P.prod_pk', '=', 'product_inventories.prod_fk')
                        ->where('prin_status', '=', 1)
                        ->where('stor_fk', '=', $vstor_fk_output)
                        ->first();

                    if ($vPISel) 
                    {
                        //Datos del producto en el Inventario
                        $vprin_stock = $vPISel->prin_stock; //Stock actual
                        $vprod_name = $vPISel->prod_name; //Descripcion Producto
                        
                        //Validar la cantidad del producto
                        if($vprin_stock > $vprtd_quantity)
                        {
                            //Si aplicar Transpaso
                            $vVal_Dev = true;
                        }
                        else
                        {
                            //Producto Insuficiente para Transpaso
                            $vVal_Dev = false;
                            $vMsj = $vprod_name . '. Insuficiente para Traspaso. Inventario actual: ' . $vprin_stock;
                            break;
                        }
                    } 
                    else 
                    {
                        //Producto NO Encontrado, NO se puede Transpasar
                        $vVal_Dev = false;
                        $vMsj = 'Producto NO Encontrado. Revisar inventario actual';
                        break;
                    }
                }

                //Validar si es posible hacer toda el Transpaso
                if ($vVal_Dev) 
                {
                    //Modificar Traspaso
                    $vPTU = ProductTransfer::find($vprtr_pk);
                    //$vPTU->stor_fk_output = $vstor_fk_output;
                    $vPTU->stor_fk_input = $vstor_fk_input;
                    $vPTU->prtr_identifier = $vprtr_identifier;
                    $vPTU->prtr_observation = $vprtr_observation;
                    $vPTU->prtr_status = 2;
                    $vPTU->save();

                    //////////////////  Insertar Log  //////////////////
                    $this->getstorelog('product_transfers', $vprtr_pk, 2);

                    //Modificar Folio del Traspaso
                    DB::table('systems')
                    ->update(['syst_transfer' =>  $vsyst_transfer + 1]);


                    //Aplicar Modificaciones de Inventario 
                    //Recorrer Traspaso Detallado
                    foreach($vPTDSel as $vP)
                    {
                        //Datos del Producto a Transpasar
                        $vprod_fk = $vP->prod_fk; //PK Producto
                        $vprtd_quantity = $vP->prtd_quantity; // Cantidad a Transpasar

                        //Buscar unidad de medida salida
                        $vProduct = Product::where('prod_pk', '=', $vprod_fk)->first();

                        ////////////////Modificar Inventario en Sucursal Salida
                        //Consutar Producto en el Inventario de la Sucursal de Salida
                        $vPIOutputSel = ProductInventory::where('prod_fk', '=', $vprod_fk)
                            ->where('prin_status', '=', 1)
                            ->where('stor_fk', '=', $vstor_fk_output)
                            ->first();

                        $vprin_pk = $vPIOutputSel->prin_pk; //Llave primaria del Inventario
                        $vprin_stock = $vPIOutputSel->prin_stock; //Stock actual

                        //Modificar Producto Inventario Sucursal Salida
                        $vPIUOutput = ProductInventory::find($vprin_pk);
                        $vPIUOutput->prin_stock = $vprin_stock - $vprtd_quantity;
                        $vPIUOutput->save();

                        //////////////////  Insertar Log  //////////////////
                        $this->getstorelog('product_inventories', $vprin_pk, 2);

                         ////////////////Modificar Inventario en Sucursal Entrada
                        //Consutar Producto en el Inventario de la Sucursal de Entrada
                        $vPIInputSel = ProductInventory::where('prod_fk', '=', $vprod_fk)
                            ->where('prin_status', '=', 1)
                            ->where('stor_fk', '=', $vstor_fk_input)
                            ->first();

                        if ($vPIInputSel) 
                        {
                            $vprin_pkInput = $vPIInputSel->prin_pk; //Llave primaria del Inventario Sucursal Entrada
                            $vprin_stockInput = $vPIInputSel->prin_stock; //Stock actual Sucursal Entrada

                            //Modificar Producto Inventario Sucursal Entrada
                            $vPIU = ProductInventory::find($vprin_pkInput);
                            $vPIU->prin_stock = $vprin_stockInput + $vprtd_quantity;
                            $vPIU->save();

                            //////////////////  Insertar Log  //////////////////
                            $this->getstorelog('product_inventories', $vprin_pkInput, 2);
                        } 
                        else 
                        {
                            //Insertar Producto Inventario Sucursal Entrada
                            $vPII = new ProductInventory();        
                            $vPII->prod_fk = $vprod_fk;
                            $vPII->meas_fk_output = $vProduct->meas_fk_output;
                            $vPII->stor_fk = $vstor_fk_input;
                            $vPII->prin_stock = $vprtd_quantity;
                            $vPII->save();

                            //Asignar PK Inventario
                            $vprin_pk = $vPII->prin_pk;

                            //////////////////  Insertar Log  //////////////////
                            $this->getstorelog('product_inventories', $vprin_pk, 1);
                        }
                    }

                    return $this->dbResponse($vprtr_pk, 200, null, 'Traspaso Guardado Correctamente');
                }
                else
                {
                    return $this->dbResponse(null, 404, null, $vMsj);
                }

            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Traspaso NO Encontrada');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $vTh;
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
