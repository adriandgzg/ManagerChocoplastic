<?php

namespace App\Http\Controllers;

use App\BoxCut;
use DB;
use Validator;
use Throwable;
use App\ClientPaymentAmount;
use App\ClientSale;
use Illuminate\Http\Request;
use App\Http\Controllers\api\ApiResponseController;

class ClientPaymentAmountController extends ApiResponseController
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
        try
        {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'clsa_fk' => 'required|int', // PK Compra
                'pash_fk' => 'required', //PK Forma de Pago
                'cpam_amount' => 'required', //Monto
            ]);

            if($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vclsa_fk = $vInput['clsa_fk'];
            $vpash_fk = $vInput['pash_fk'];
            $vcpam_amount = $vInput['cpam_amount'];
            $vcpam_reference = $vInput['cpam_reference'];
            $vbocu_fk = $vInput['bocu_fk'];

            $vCSSel = ClientSale::where('clsa_pk', '=', $vclsa_fk)->first(); //Consultar Venta

            if($vCSSel)
            { 

                $vBoxCut = BoxCut::where('bocu_pk', '=', $vbocu_fk)->where('bocu_status', '=', 1)->first(); //Consultar Caja Abierta

                if($vBoxCut)
                { 
                    //Consultar Pago
                    $vCPASel = ClientPaymentAmount::where('clsa_fk', '=', $vclsa_fk)->where('pash_fk', '=', $vpash_fk)->where('cpam_status', '=', 1)->first(); //Consultar Pago

                    if($vCPASel)
                    {
                        return $this->dbResponse(null, 404, null, 'Forma de pago Registrado Anteriormente.');
                    }
                    else
                    {
                        //Insertar Pago del cliente monto
                        $vCPA = new ClientPaymentAmount();        
                        $vCPA->clie_fk = $vCSSel->clie_fk;
                        $vCPA->clsa_fk = $vclsa_fk;
                        $vCPA->pash_fk = $vpash_fk;
                        $vCPA->cpam_amount = $vcpam_amount;
                        $vCPA->cpam_reference = $vcpam_reference;
                        $vCPA->bocu_fk = $vbocu_fk;
                        $vCPA->save();

                        //Asignación de PK Pago Cliente
                        $vcpam_pk = $vCPA->cpam_pk;

                        //////////////////  Inserción de Log  //////////////////
                        $this->getstorelog('client_payment_amounts', $vcpam_pk, 1);

                        return $this->dbResponse($vcpam_pk, 200, null, 'Pago Guardado Correctamente.');
                    }
                }
                else
                {
                   return $this->dbResponse(null, 404, null, 'Caja NO Disponible');
                }
                
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Venta NO Encontrado.');
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
     * @param  \App\ClientPaymentAmount  $clientPaymentAmount
     * @return \Illuminate\Http\Response
     */
    public function show(int $clsa_fk)
    {
        try
        {
            $vCPASel = DB::table('client_payment_amounts AS CPA')
                ->join('clients AS C', 'C.clie_pk', '=', 'CPA.clie_fk')
                ->join('client_sales AS CS', 'CS.clsa_pk', '=', 'CPA.clsa_fk')
                ->join('payment_shapes AS PS', 'PS.pash_Pk', '=', 'CPA.pash_fk')
                ->select(
                    'CPA.cpam_pk',
                    'CPA.cpam_amount',
                    'CPA.cpam_reference',
                    'CPA.created_at',

                    'PS.pash_pk',        
                    'PS.pash_name', 
                    
                    'C.clie_pk',
                    'C.clie_identifier',
                    'C.clie_name',
                    'C.clie_rfc',

                    'CS.clsa_pk',
                    'CS.clsa_identifier'
                )
                ->where('CPA.cpam_status', '=', 1)
                ->where('CPA.clsa_fk', '=', $clsa_fk)
                ->get();
            
            return $this->dbResponse($vCPASel, 200, null, 'Pagos de Venta');
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ClientPaymentAmount  $clientPaymentAmount
     * @return \Illuminate\Http\Response
     */
    public function edit(ClientPaymentAmount $clientPaymentAmount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ClientPaymentAmount  $clientPaymentAmount
     * @return \Illuminate\Http\Response
     */
    public function update(Request $r)
    {
        try
        {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'cpam_pk' => 'required|int', // PK Pago Monto
                //'pash_fk' => 'required', //PK Forma de Pago
                'cpam_amount' => 'required', //Monto
            ]);

            if($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vcpam_pk = $vInput['cpam_pk'];
            //$vpash_fk = $vInput['pash_fk'];
            $vcpam_amount = $vInput['cpam_amount'];
            $vcpam_reference = $vInput['cpam_reference'];

            $vCPA = ClientPaymentAmount::where('cpam_pk', '=', $vcpam_pk)->first(); //Consultar Cliente Pago Monto

            if($vCPA)
            { 
                //Modificar Pago del cliente monto
                $vCPAU = ClientPaymentAmount::find($vcpam_pk);
                //$vCPAU->pash_fk = $vpash_fk;
                $vCPAU->cpam_amount = $vcpam_amount;
                $vCPAU->cpam_reference = $vcpam_reference;
                $vCPAU->save();
            
                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('client_payment_amounts', $vcpam_pk, 2);

                return $this->dbResponse(null, 200, null, 'Pago Modificado Correctamente.');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Pago NO Encontrado.');
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
     * @param  \App\ClientPaymentAmount  $clientPaymentAmount
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r)
    {
        try
        {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'cpam_pk' => 'required|int', // PK Pago Monto
            ]);

            if($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vcpam_pk = $vInput['cpam_pk'];

            $vCPA = ClientPaymentAmount::where('cpam_pk', '=', $vcpam_pk)->first(); //Consultar Cliente Pago Monto

            if($vCPA)
            { 
                //Eliminar Pago del cliente monto
                $vCPAD = ClientPaymentAmount::find($vcpam_pk);
                $vCPAD->cpam_status = 0;
                $vCPAD->save();
            
                //////////////////  Inserción de Log  //////////////////
                $this->getstorelog('client_payment_amounts', $vcpam_pk, 3);

                return $this->dbResponse(null, 200, null, 'Pago Eliminado Correctamente.');
            }
            else
            {
                return $this->dbResponse(null, 404, null, 'Pago NO Encontrado.');
            }
        } 
        catch (Throwable $vTh) 
        {
            return $this->dbResponse(null, 500, $vTh, 'Detalle Interno, informar al Administrador del Sistema.');
        }
    }
}
