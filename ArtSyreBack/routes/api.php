<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\ControllerUtilisateur;
use App\Http\Controllers\ControllerCategorie;
use App\Http\Controllers\ControllerImage;
use App\Http\Controllers\ControllerTableau;

// La liste complète des ressources
Route::apiResource('utilisateurs', ControllerUtilisateur::class);
Route::apiResource('categories', ControllerCategorie::class);
Route::apiResource('images', ControllerImage::class);
Route::apiResource('tableaux', ControllerTableau::class);

// La suppression des ressources
Route::delete('/tableaux/{id}', [ControllerTableau::class, 'destroy']);
Route::delete('/images/{id}', [ControllerImage::class, 'destroy']);
Route::delete('/utilisateurs/{id}', [ControllerUtilisateur::class, 'destroy']);
Route::delete('/categories/{id}', [ControllerCategorie::class, 'destroy']);

// La liste d'image d'un tableau
Route::get('/tableaux/{id}/images', [ControllerTableau::class, 'getImages']);