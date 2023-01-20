<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\NoteController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'Register']);
    Route::post('/login', [AuthController::class, 'Login']);
    Route::middleware(['auth:api'])->get('/logout', [AuthController::class, 'Logout']);
    Route::middleware(['auth:api'])->get('/token', [AuthController::class, 'RefreshToken']);
});

Route::prefix('notes') ->middleware(['auth:api'])->group(function(){
    Route::get('/', [NoteController::class, 'Index']);
    Route::get('/{id}', [NoteController::class, 'Read']);
    Route::post('/', [NoteController::class, 'Create']);
    Route::patch('/{id}', [NoteController::class, 'Update']);
    Route::delete('/{id}', [NoteController::class, 'Delete']);
});