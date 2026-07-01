<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ContactMail;

class ControllerMail extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function send(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'subject' => 'required|string',
            'description' => 'required|string',
            'timestamp' => 'required|date',
        ]);

        try{
            \Mail::to('test@artsyre.local')->send(new \App\Mail\ContactMail($data));
            return response()->json([
                'success' => true,
                'message' => 'Le mail a été envoyé avec succès.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de l\'envoi du mail',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
