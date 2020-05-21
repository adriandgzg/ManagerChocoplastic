<?php

namespace App\Http\Controllers;

use App\Faq;
use Illuminate\Http\Request;

/**
 * Class FaqController
 * @package App\Http\Controllers
 */
class FaqController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    function index(){
        $faqs= Faq::all();
        return response()->json(['success' => true, 'message' => 'Faqs cargadas', 'data' => $faqs], 200);
    }
}
