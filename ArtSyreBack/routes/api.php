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

// Element unique
Route::get('/utilisateurs/{id}', [ControllerUtilisateur::class, 'show']);
Route::get('/categories/{id}', [ControllerCategorie::class, 'show']);
Route::get('/images/{id}', [ControllerImage::class, 'show']);
Route::get('/tableaux/{id}', [ControllerTableau::class, 'show']);

// Mise a jour
Route::put('/utilisateurs/{id}', [ControllerUtilisateur::class, 'update']);
Route::put('/categories/{id}', [ControllerCategorie::class, 'update']);
Route::put('/images/{id}', [ControllerImage::class, 'update']);
Route::put('/tableaux/{id}', [ControllerTableau::class, 'update']);

// Création
Route::post('/utilisateurs', [ControllerUtilisateur::class, 'store']);
Route::post('/categories', [ControllerCategorie::class, 'store']);
Route::post('/images', [ControllerImage::class, 'store']);
Route::post('/tableaux', [ControllerTableau::class, 'store']);

// Commandes et souhaits
Route::get('/commandes', [ControllerUtilisateur::class, 'orders']);
Route::get('/commandes/{id}', [ControllerUtilisateur::class, 'ordersId']);
Route::post('/tableaux/{id}/like', [TableauController::class, 'toggleLike']);