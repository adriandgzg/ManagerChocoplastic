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
                        WHEN PT.prtr_status = 2 THEN "Solicitado" 
                        WHEN PT.prtr_status = 3 THEN "Finalizado" 
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
                        WHEN PT.prtr_status = 2 THEN "Solicitado"  
                        WHEN PT.prtr_status = 3 THEN "Finalizado"  
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
                //Modificar Traspaso
                $vPTU = ProductTransfer::find($vprtr_pk);
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProductTransfer  $productTransfer
     * @return \Illuminate\Http\Response
     */
    public function updatefinalize(Request $r)
    {
        try 
        {
            $vInput = $r->all();

            $vVal = Validator::make($vInput, [
                'prtr_pk' => 'required|int' //PK Traspaso 
            ]);

            if ($vVal->fails()) {
                return $this->dbResponse(null, 500, $vVal->errors(), 'Detalle de Validación');
            }

            //Asignacion de variables
            $vprtr_pk = $vInput['prtr_pk'];


            //Validar Si Existe el Traspaso
            $vPTSel = ProductTransfer::where('prtr_pk', '=', $vprtr_pk)->where('prtr_status', '=', 2)->first();
            if ($vPTSel) 
            {
                $vstor_fk_output = $vPTSel->stor_fk_output;
                $vstor_fk_input = $vPTSel->stor_fk_input;

                ///////////////Validar Inventario

                //Consultar Traspaso Detallado
                $vPTDSel = ProductTransferDetail::where('prtr_fk', '=', $vprtr_pk)->where('prtd_status', '=', 1)->get();

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
                        $vprod_identifier = $vPISel->prod_identifier; //Identificador Producto
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
                            $vMsj = $vprod_identifier . ' ' . $vprod_name . ' insuficiente para Traspaso. Inventario actual: ' . $vprin_stock;
                            break;
                        }
                    } 
                    else 
                    {
                        //Producto NO Encontrado, NO se puede Transpasar
                        $vVal_Dev = false;

                        $vProdSel = Product::where('prod_fk', '=', $vprod_fk)->first();

                        $vprod_identifier = $vProdSel->prod_identifier; //Identificador Producto
                        $vprod_name = $vProdSel->prod_name; //Descripcion Producto

                        $vMsj = $vprod_identifier . ' ' . $vprod_name . ' NO Encontrado. Revisar inventario actual';
                        break;
                    }
                }

                //Validar si es posible hacer toda el Transpaso
                if ($vVal_Dev) 
                {
                    //Modificar Traspaso
                    $vPTU = ProductTransfer::find($vprtr_pk);
                    $vPTU->prtr_status = 3;
                    $vPTU->save();

                    //////////////////  Insertar Log  //////////////////
                    $this->getstorelog('product_transfers', $vprtr_pk, 4);

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

    public function printTraspaso($clsa_pk)
    {
        $total = 0;
        
        //Asignacion de variables
        $vclsa_pk = $clsa_pk;


        if ($vclsa_pk == '' || $vclsa_pk == 0) {
            return $this->dbResponse(null, 500, null, 'PK Obligatorio');
        }

        $vCS = DB::table('client_sales AS CS')
            ->join('clients AS C', 'C.clie_pk', '=', 'CS.clie_fk')
            ->leftjoin('payment_methods AS PM', 'PM.pame_pk', '=', 'CS.pame_fk')
            ->leftjoin('stores AS S', 'S.stor_pk', '=', 'CS.stor_fk')
            ->select(
                'CS.clsa_pk',
                'CS.clsa_identifier',
                'CS.clor_fk AS clor_pk',
                DB::raw('(CASE 
                    WHEN CS.clsa_status = 0 THEN "Pendiente" 
                    WHEN CS.clsa_status = 2 THEN "En Proceso de Pago" 
                    WHEN CS.clsa_status = 3 THEN "Pagado" 
                    ELSE "" END) AS clsa_status'),
                'CS.created_at',

                'C.clie_pk',
                'C.clie_identifier',
                'C.clie_name',
                'C.clie_rfc',

                'PM.pame_pk',
                'PM.pame_name',

                'S.stor_pk',
                'S.stor_name',
            )
            ->where('CS.clsa_pk', '=', $vclsa_pk)
            ->first();

        if($vCS)
        {
            $vCSD = DB::table('client_sale_details AS CSD')
                ->join('products AS P', 'P.prod_pk', '=', 'CSD.prod_fk')
                ->join('measurements AS M', 'M.meas_pk', '=', 'CSD.meas_fk')
                ->select(
                    'CSD.clsd_pk',

                    //'CSD.clsa_fk',

                    'P.prod_pk',
                    'P.prod_identifier',
                    'P.prod_name',

                    'M.meas_pk',
                    'M.meas_name',
                    'M.meas_abbreviation',

                    'CSD.clsd_quantity',
                    'CSD.clsd_price',
                    'CSD.clsd_discountrate'
                    //'CSD.clsd_ieps',
                    //'CSD.clsd_iva'
                )
                ->where('CSD.clsa_fk', '=', $vclsa_pk)
                ->where('clsd_status', '=', 1)
                ->get();

                $status =Auth::user();

    
        $admin = collect(\DB::select("SELECT a.*, CONCAT(s.stor_identifier, ' - ', s.stor_name) as stor_name, s.stor_addres FROM admins a left join stores s 
        on a.store_id = s.stor_pk where a.store_id = " . $status->id . "
        "))->first();

                
               

                $pdf = new \Codedge\Fpdf\Fpdf\Fpdf($orientation = 'P', $unit = 'mm', 'Letter');
               //$pdf->SetMargins(10, 2, 2,0);
                $pdf->SetMargins(10, 20);
                $pdf->AddPage();
                $pdf->SetFont('Arial', 'B', 8);    //Letra Arial, negrita (Bold), tam. 20
                $pdf->Image(config('app.url') . '/images/bg.png', 3, 2, 210);
                $pdf->Image(config('app.url') . '/images/logo_chocoplastic.png', 15, 10, 60);
                
                //$pdf->setY(35);
                
                $lineHeigth = 2;                
                $pdf->Ln(20);
                // Número de página
                
                $pdf->SetFont('Arial', 'B', 10);
                $pdf->Cell(15, $lineHeigth, 'RFC:', '', '1', 'L');
                $pdf->SetFont('Arial', '', 10);                
                $pdf->Cell(100, $lineHeigth-4, $vCS->clie_rfc, '', '1', 'L');
                
                $pdf->Ln(3);
                
                $pdf->SetFont('Arial', 'B', 10);
                $pdf->Cell(30, $lineHeigth, 'Domicilio Fiscal:', '', '0', 'L');
                
                $pdf->SetFont('Arial', '', 10);
                $pdf->Cell(50, $lineHeigth, utf8_decode('Dirección'), '', '0', 'L');
                
                $pdf->Ln(6);
                
                $pdf->SetFont('Arial', 'B', 12);
                $pdf->Cell(210, $lineHeigth, utf8_decode($admin->stor_name), '', '1', 'C');
                $pdf->Ln(6);
                $pdf->Cell(210, $lineHeigth, 'TRASPASO', '', '1', 'C');

                $pdf->Ln(6);

                $pdf->SetFont('Arial', '', 10);
                $pdf->Cell(43, $lineHeigth, 'No. Traspaso: ' . $vCS->clor_pk, '', '1');
                $pdf->Ln(3);
                $pdf->Cell(43, $lineHeigth, 'Fecha Solicitud' . $vCS->created_at, '', '1');
                $pdf->Ln(3);
                $pdf->Cell(43, $lineHeigth, 'Fecha Entrega' . $vCS->created_at, '', '1');
                
                $pdf->Ln(6);

                
                $pdf->SetFont('Arial', '', 10);
                 $header = array('CLAVE', 'UNIDAD', 'CANT.');
                 foreach($header as $col)
                 {
                        $pdf->Cell(65,7,$col, '','0','C');
                    
                 }


                $pdf->Ln(10);
                $disprice = 0;
                $total = 0;
                foreach ($vCSD as $product) {
                    $pdf->SetFont('Arial', 'B', 10);
                    $pdf->Cell(25, $lineHeigth, substr(utf8_decode($product->prod_name), 0, 30), '', '0');
                        $pdf->Ln(5);
                    $price = $product->clsd_quantity * $product->clsd_price;  
                    $disprice = $disprice + $product->clsd_discountrate;
                    $pdf->SetFont('Arial', '', 10);
                        $total = $total + $price;
                        
                        $pdf->Cell(65, $lineHeigth, $product->prod_identifier, '', '0','C');
                        $pdf->Cell(65, $lineHeigth, $product->meas_abbreviation, '', '0','C');
                        $pdf->Cell(65, $lineHeigth, $product->clsd_quantity, '', '0','C');                        
                        $pdf->Ln(3);
                }
                
                $pdf->SetY(-80);
                $pdf->Ln(20);                
                $pdf->Cell(100, $lineHeigth, utf8_decode(('Entrega de Bodega' )), '0', '0', 'C');       
                $pdf->Cell(100, $lineHeigth, utf8_decode(('Recibe en Sucursal' )), '0', '0', 'C');                
                $pdf->Ln(10);
                $pdf->Cell(100, $lineHeigth, utf8_decode(('_____________________________________________' )), '0', '0', 'C');  
                $pdf->Cell(100, $lineHeigth, utf8_decode(('_____________________________________________' )), '0', '0', 'C');  
                $pdf->Ln(5);
                $pdf->Cell(100, $lineHeigth, utf8_decode(('Nombre y Firma' )), '0', '0', 'C');                
                $pdf->Cell(100, $lineHeigth, utf8_decode(('Nombre y Firma' )), '0', '0', 'C');                
      
                $pdf->SetAutoPageBreak(false);
                $pdf->SetY(-20);
                $pdf->SetX(7);
                $pdf->SetDrawColor(0,80,180);   
                $pdf->SetFillColor(250,70,51);
                $pdf->Cell(200,1,utf8_decode(' '),0,1,'C', true);
                $pdf->SetX(7);
                $pdf->SetFillColor(255,219,216);
                $pdf->Cell(200,8,utf8_decode('Dirección de' . $admin->stor_name),0,1,'C', true);
                ob_get_clean();
        $pdf->output('I', 'ticket', 'true');
        
        

            }
            
    }
}
