<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;
use Illuminate\Support\Facades\Log as LogFacade;

class ControllerLog extends Controller
{
    public int $numberOfLogs;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Si une categorie est présente dans la requête, on la récupère
        $categoryId = $request->query('categories_log_id');

        // Dans ce cas, on filtre les logs par cette catégorie
        if ($categoryId) {
            return Log::where('categories_log_id', $categoryId)->get();
        }

        // Sinon, on retourne tous les logs
        $logs = Log::all();
        $this->numberOfLogs = count($logs);
        return $logs;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    public function count()
    {
        return response()->json($this->numberOfLogs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'categories_log_id' => 'required|exists:categories_logs,id',
            'description' => 'required|string',
        ]);
        $log = Log::create($request->all());
        $this->numberOfLogs++;
        return response()->json($log, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Log::findOrFail($id));
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
            'categories_log_id' => 'sometimes|required|exists:categories_logs,id',
            'description' => 'sometimes|required|string',
        ]);
        $log = Log::findOrFail($id);
        $log->update($request->all());
        return response()->json($log);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $log = Log::findOrFail($id);
        $log->delete();
        $this->numberOfLogs--;
        return response()->json(null, 204);
    }
}
