<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\ControllerUtilisateur;
use App\Http\Controllers\ControllerCategorie;
use App\Http\Controllers\ControllerImage;
use App\Http\Controllers\ControllerTableau;
use App\Http\Controllers\ControllerCategorieLog;
use App\Http\Controllers\ControllerLog;

// La liste complète des ressources
Route::apiResource('utilisateur', ControllerUtilisateur::class);
Route::apiResource('categories', ControllerCategorie::class);
Route::apiResource('images', ControllerImage::class);
Route::apiResource('tableaux', ControllerTableau::class);

// La suppression des ressources
Route::delete('/tableaux/{id}', [ControllerTableau::class, 'destroy']);
Route::delete('/images/{id}', [ControllerImage::class, 'destroy']);
Route::delete('/utilisateur/{id}', [ControllerUtilisateur::class, 'destroy']);
Route::delete('/categories/{id}', [ControllerCategorie::class, 'destroy']);

// La liste d'image d'un tableau
Route::get('/tableaux/{id}/images', [ControllerTableau::class, 'getImages']);

// Element unique
Route::get('/utilisateur/{id}', [ControllerUtilisateur::class, 'show']);
Route::get('/categories/{id}', [ControllerCategorie::class, 'show']);
Route::get('/images/{id}', [ControllerImage::class, 'show']);
Route::get('/tableaux/{id}', [ControllerTableau::class, 'show']);

// Mise a jour
Route::put('/utilisateur/{id}', [ControllerUtilisateur::class, 'update']);
Route::put('/categories/{id}', [ControllerCategorie::class, 'update']);
Route::put('/images/{id}', [ControllerImage::class, 'update']);
Route::put('/tableaux/{id}', [ControllerTableau::class, 'update']);
Route::post('/utilisateur/login', [ControllerUtilisateur::class, 'login']);

// Création
Route::post('/utilisateur', [ControllerUtilisateur::class, 'store']);
Route::post('/categories', [ControllerCategorie::class, 'store']);
Route::post('/images', [ControllerImage::class, 'store']);
Route::post('/tableaux', [ControllerTableau::class, 'store']);

// Commandes et souhaits
Route::get('/commandes', [ControllerUtilisateur::class, 'orders']);
Route::get('/commandes/{id}', [ControllerUtilisateur::class, 'ordersId']);
Route::post('/tableaux/like/{id}', [ControllerTableau::class, 'toggleLike']);




// Routes login etc
Route::post('/login', [ControllerUtilisateur::class, 'login']);
Route::post('/logout', [ControllerUtilisateur::class, 'logout']);
Route::get('/me', [ControllerUtilisateur::class, 'me']);

// Liste likes
Route::get('/utilisateur/{id}/likes', [ControllerUtilisateur::class, 'getLikes']);
Route::post('/utilisateur/{id}/likes', [ControllerUtilisateur::class, 'addLikes']);
Route::delete('/utilisateur/{id}/likes', [ControllerUtilisateur::class, 'removeLikes']);

// Liste panier
Route::get('/utilisateur/{id}/panier', [ControllerUtilisateur::class, 'getTableauxDansPanier']);
Route::post('/utilisateur/{id}/panier', [ControllerUtilisateur::class, 'addToPanier']);
Route::delete('/utilisateur/{id}/panier', [ControllerUtilisateur::class, 'removeFromPanier']);

// Récupérer la liste des utilisateurs
Route::get('/utilisateur', [ControllerUtilisateur::class, 'index']);

// Logs et catégories de logs
Route::apiResource('categories_logs', ControllerCategorieLog::class);
Route::apiResource('logs', ControllerLog::class);