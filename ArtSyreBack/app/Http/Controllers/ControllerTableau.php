<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tableau;
use Illuminate\Support\Facades\Auth;
use App\Models\Log;

class ControllerTableau extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Tableau::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $tableau = Tableau::create($request->all());
        Log::create([
            'categories_log_id' => 1, // ID pour "Création de tableau"
            'description' => 'Tableau créé : ' . $tableau->titre,
        ]);
        return response()->json($tableau, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Tableau::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tableau = Tableau::findOrFail($id);
        $tableau->update($request->all());
        Log::create([
            'categories_log_id' => 2, // ID pour "Mise à jour de tableau"
            'description' => 'Tableau mis à jour : ' . $tableau->titre,
        ]);
        return response()->json($tableau);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tableau = Tableau::findOrFail($id);
        $tableau->delete();
        Log::create([
            'categories_log_id' => 3, // ID pour "Suppression de tableau"
            'description' => 'Tableau supprimé : ' . $tableau->titre,
        ]);
        return response()->json(null, 204);
    }

    public function toggleLike($id)
    {
        $user = Auth::user(); // utilisateur connecté
        $tableau = Tableau::findOrFail($id);

        if ($user->souhaites()->where('tableau_id', $id)->exists()) {
            // déjà en "like" → on supprime
            $user->souhaites()->detach($id);
            return response()->json(['liked' => false]);
        } else {
            // pas encore en "like" → on ajoute
            $user->souhaites()->attach($id);
            return response()->json(['liked' => true]);
        }
    }
}
