<?php

use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\AuthenticationController;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('authenticate',[AuthenticationController::class,'authenticate']);
Route::get('logout',[AuthenticationController::class,'logout']);


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::group(['middleware' => ['auth:sanctum']],function(){
    // Protected Routes
    Route::get('dashboard',[DashboardController::class,'index']);
    Route::get('logout',[AuthenticationController::class,'logout']);

    // Service Routes
    Route::post('services',[ServiceController::class,'store']);
    Route::get('services',[ServiceController::class,'index']);


});



