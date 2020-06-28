<?php

namespace App\Exceptions;
use App\Traits\ApiResponse;

use Exception;
use Throwable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response|\Symfony\Component\HttpFoundation\Response
     */
    //public function render($request, Exception $exception)
    public function render($request, Throwable $exception)
    {
        /*
        if($exception instanceof \Illuminate\Routing\Exceptions\UrlGenerationException && $request->wantsJson()){
            return response()->json(['false' => false, 'message' => 'Route not allowed', 'data' =>$exception->getMessage() ], 401);
        }else if($exception instanceof \Illuminate\Auth\AuthenticationException && $exception->guards()[0]=="api"  ){
            return response()->json(['false' => false, 'message' => 'Unauthenticated', 'data' =>null ], 401);
        }else if($exception instanceof \Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException ){
            return response()->json(['false' => false, 'message' => $exception->getMessage(), 'data' =>null ], 405);
        }*/
        if ($exception instanceof NotFoundHttpException) {
            return $this->successResponse(null, false, 404, null);
        }

        if ($exception instanceof ModelNotFoundException) {
            return $this->successResponse(null, false, 404, null);
        }

        return parent::render($request, $exception);
    }
}
