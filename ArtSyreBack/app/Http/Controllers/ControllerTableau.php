<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tableau;

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
        return response()->json($tableau);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tableau = Tableau::findOrFail($id);
        $tableau->delete();
        return response()->json(null, 204);
    }
}
