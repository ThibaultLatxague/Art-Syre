<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ControllerCategorie extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Categorie::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $categorie = Categorie::create($request->all());
        return response()->json($categorie, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Categorie::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $categorie = Categorie::findOrFail($id);
        $categorie->update($request->all());
        return response()->json($categorie);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categorie = Categorie::findOrFail($id);
        $categorie->delete();
        return response()->json(null, 204);
    }
}
