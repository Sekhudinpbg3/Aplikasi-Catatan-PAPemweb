<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 'auth:api'
Route::middleware(['auth:api'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Home');
    });
});

Route::get('/login', function (Request $request) {
    if ($request->get('token') === 'none') {
        return Inertia::render('Login', ["message" => ["title" => "autentikasi", "msg" => "anda belum login"]]);
    }
    return Inertia::render('Login');
})->name('login');
Route::get('/register', function () {
    return Inertia::render('Register');
});
Route::get('/component', function () {
    return Inertia::render('Components');
});
