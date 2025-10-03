<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CategoriesLog;

class ControllerCategorieLog extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(CategoriesLog::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
        ]);
        $categorieLog = CategoriesLog::create($request->all());
        return response()->json($categorieLog, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(CategoriesLog::findOrFail($id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nom' => 'sometimes|required|string|max:255',
        ]);
        $categorieLog = CategoriesLog::findOrFail($id);
        $categorieLog->update($request->all());
        return response()->json($categorieLog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categorieLog = CategoriesLog::findOrFail($id);
        $categorieLog->delete();
        return response()->json(null, 204);
    }
}
