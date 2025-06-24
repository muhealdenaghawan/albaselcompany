<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;

Route::get('check-on-server', function () {
    return response()->json([
        "message" => "Api On",
    ], Response::HTTP_OK);
});
Route::middleware(['auth:sanctum', 'check-admin'])->group(function () {
    Route::prefix('user')->name('user.')->controller(App\Http\Controllers\Api\UserController::class)->group(function () {
        Route::get('get-all-user', 'index');
        Route::post('create-user', 'store');
        Route::post('update-user/{user}', 'update');
        Route::delete('delete-user/{user}', 'destroy');
    });
    Route::prefix('service')->name('service.')->controller(App\Http\Controllers\Api\ServicesController::class)->group(function () {
        Route::get('get-all-service', 'index');
        Route::post('create-service', 'store');
        Route::post('update-service/{service}', 'update');
        Route::delete('delete-service/{service}', 'destroy');
    });
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('project')->name('project.')->controller(App\Http\Controllers\Api\ProjectsController::class)->group(function () {
        Route::get('get-all-project', 'index');
        Route::post('create-project', 'store');
        Route::post('update-project/{project}', 'update');
        Route::delete('delete-project/{project}', 'destroy');
        Route::put('assign-employee/{project}', 'assign_employee');
        Route::put('update-status-and-price/{project}', 'update_status_and_price');
    });
    Route::prefix('material')->name('material.')->controller(App\Http\Controllers\Api\MaterialsController::class)->group(function () {
        Route::get('get-all-material', 'index');
        Route::post('create-material', 'store');
        Route::post('update-material/{material}', 'update');
        Route::delete('delete-material/{material}', 'destroy');
    });
    Route::prefix('project-service')->name('project-service.')->controller(App\Http\Controllers\Api\ProjectServiceController::class)->group(function () {
        Route::post('create-project-service', 'store');
        Route::get('get-all-project-service', 'indexNested');
        Route::get('calculate-project-cost/{project}', 'calculateProjectCost');
    });
    Route::prefix('user')->name('user.')->controller(App\Http\Controllers\Api\UserController::class)->group(function () {
        Route::post('update-profile', 'updateProfile');
    });
});
Route::prefix('auth')->name('auth.')->controller(App\Http\Controllers\Api\AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::delete('logout', 'logout')->middleware('auth:sanctum');
});
