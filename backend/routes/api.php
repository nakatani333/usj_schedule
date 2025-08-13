<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;
use App\Http\Controllers\ShowController;

Route::get('/test', function () {
  return response()->json(
    ['message' => 'API動作確認OK'],
    Response::HTTP_OK,
    [],
    JSON_UNESCAPED_UNICODE
  );
});

Route::prefix('shows')->group(function () {
  Route::get('/', [ShowController::class, 'index']);
  Route::post('/schedule', [ShowController::class, 'getByIds']);
});

// Route::prefix('shows')->group(function () {
//   Route::post('/by-ids', [ShowController::class, 'getByIds']);
// });
