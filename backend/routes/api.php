<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;
use App\Http\Controllers\ShowController;
use App\Http\Controllers\ShowTimeController;

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
  Route::get('/edit', [ShowTimeController::class, 'show']);
  Route::put('/{showId}', [ShowTimeController::class, 'update']);
  Route::get('/{showId}', [ShowTimeController::class, 'registerShow']);
  Route::post('/schedule', [ShowController::class, 'getByIds']);
});

Route::post('/edit', [ShowTimeController::class, 'registeredShow']);
// Route::prefix('shows')->group(function () {
//   Route::post('/by-ids', [ShowController::class, 'getByIds']);
// });
