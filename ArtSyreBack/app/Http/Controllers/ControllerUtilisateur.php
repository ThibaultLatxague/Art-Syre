<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateur;

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
}
