<?php


use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

Route::group(
    [
        'prefix' => LaravelLocalization::setLocale(),
        'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
    ],
    function () {
        Route::name('frontend.')->group(function () {
            Route::controller(App\Http\Controllers\Frontend\HomeController::class)->group(function () {
                Route::get('/', 'index')->name('home');
            });
        });
    }
);
