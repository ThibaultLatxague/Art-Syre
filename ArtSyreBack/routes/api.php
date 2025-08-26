<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Http\Controllers\ControllerUtilisateur;
use App\Http\Controllers\ControllerCategorie;
use App\Http\Controllers\ControllerImage;
use App\Http\Controllers\ControllerTableau;

// Route de test par défaut
Route::get('/', function () {
    return view('welcome');
});

// La liste complète des ressources
Route::apiResource('utilisateur', ControllerUtilisateur::class);
Route::apiResource('categories', ControllerCategorie::class);
Route::apiResource('images', ControllerImage::class);
Route::apiResource('tableaux', ControllerTableau::class);

// // Sanctum
// Route::post('/login', function (Request $request) {
//     $credentials = $request->only('email', 'password');

//     if (!Auth::attempt($credentials)) {
//         return response()->json(['message' => 'Invalid login'], 401);
//     }

//     $request->session()->regenerate();

//     return response()->json(Auth::user());
// });

// Route::post('/logout', function (Request $request) {
//     Auth::guard('web')->logout();
//     $request->session()->invalidate();
//     $request->session()->regenerateToken();

//     return response()->json(['message' => 'Logged out']);
// });



// ✅ Routes protégées par Sanctum (user doit être connecté)
// Route::middleware('auth:sanctum')->group(function () {
//     // Liste likes
//     Route::get('/utilisateur/{id}/likes', [ControllerUtilisateur::class, 'getLikes']);
//     Route::post('/utilisateur/{id}/likes', [ControllerUtilisateur::class, 'addLikes']);
//     Route::delete('/utilisateur/{id}/likes', [ControllerUtilisateur::class, 'removeLikes']);

//     // Liste panier
//     Route::get('/utilisateur/{id}/panier', [ControllerUtilisateur::class, 'getTableauxDansPanier']);
//     Route::post('/utilisateur/{id}/panier', [ControllerUtilisateur::class, 'addToPanier']);
//     Route::delete('/utilisateur/{id}/panier', [ControllerUtilisateur::class, 'removeFromPanier']);
// });

// Récupérer la liste des utilisateurs (si tu veux la laisser publique)
Route::get('/utilisateur', [ControllerUtilisateur::class, 'index']);

// Route pour obtenir le token CSRF
Route::get('/csrf-token', function (Request $request) {
    return response()->json(['csrf_token' => csrf_token()]);
});

// Route protégée pour tester
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('/login', [ControllerUtilisateur::class, 'login']);
// Route::post('/register', [ControllerUtilisateur::class, 'register']);
// Route::post('/logout', [ControllerUtilisateur::class, 'logout'])->middleware('auth:sanctum');

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