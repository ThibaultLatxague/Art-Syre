<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Http\Controllers\ControllerUtilisateur;
use App\Http\Controllers\ControllerCategorie;
use App\Http\Controllers\ControllerImage;
use App\Http\Controllers\ControllerTableau;

// Dans routes/web.php
Route::group(['middleware' => ['web']], function () {
    Route::get('/csrf-token', function (Request $request) {
        return response()->json(['csrf_token' => csrf_token()]);
    });
    
    Route::post('/login', [ControllerUtilisateur::class, 'login']);
    Route::post('/register', [ControllerUtilisateur::class, 'register']);
    Route::post('/logout', [ControllerUtilisateur::class, 'logout'])->middleware('auth:sanctum');

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });
});