<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class ControllerUtilisateur extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Utilisateur::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request['password'] = Hash::make($request['password']);
        Log::info('Parametre requete', $request->all());
        $user = User::create($request->all());
        Log::info('Utilisateur créé', $user->toArray());
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(User::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }

    public function ordersId(string $id){
        $user = User::findOrFail($id);
        $orders = $user->orders();
        return response()->json($orders);
    }

    public function login(Request $request)
    {
        // Log pour debug
        Log::info('Tentative de connexion reçue', [
            'email' => $request->email
            // Ne pas logger le mot de passe en clair pour des raisons de sécurité
        ]);

        $credentials = $request->only('email', 'password');

        // Option 1: Utiliser Auth::attempt() (recommandé)
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            Log::info('Connexion réussie', ['user_id' => $user->id]);
            return response()->json($user);
        }

        Log::warning('Connexion échouée', ['email' => $request->email]);
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me()
    {
        return response()->json(Auth::user());
    }
}
