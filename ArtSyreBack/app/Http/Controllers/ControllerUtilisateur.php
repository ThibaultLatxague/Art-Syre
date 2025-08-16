<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateur;
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
        $utilisateur = Utilisateur::create($request->all());
        return response()->json($utilisateur, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Utilisateur::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        $utilisateur->update($request->all());
        return response()->json($utilisateur);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        $utilisateur->delete();
        return response()->json(null, 204);
    }

    public function ordersId(string $id){
        $utilisateur = Utilisateur::findOrFail($id);
        $commandes = $utilisateur->commandes();
        return response()->json($commandes);
    }

    public function login(Request $request)
    {
        // Log pour debug
        Log::info('Tentative de connexion reçue', [
            'email' => $request->email,
            'password' => $request->password
        ]);

        $credentials = $request->only('email', 'password');

        $hash = Utilisateur::where('email', $request->email)->value('password');
        if (Hash::check($request->password, $hash)) {
            Log::info('Mot de passe correct', ['email' => $request->email]);
        } else {
            Log::warning('Mot de passe incorrect', ['email' => $request->email]);
        }

        if (Auth::attempt($credentials)) {
            $utilisateur = Auth::user();
            Log::info('Connexion réussie', ['user_id' => $utilisateur->id]);
            return response()->json($utilisateur);
        }

        Log::warning('Connexion échouée', ['email' => $request->email]);
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
