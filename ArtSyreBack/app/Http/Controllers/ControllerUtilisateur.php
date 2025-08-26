<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class ControllerUtilisateur extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request['password'] = Hash::make($request['password']);
        $request['tableauxLikes'] = json_encode($request['tableauxLikes']);
        $request['tableauxDansPanier'] = json_encode($request['tableauxDansPanier']);
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

    /**
     * Authentifier un utilisateur.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();
            
            return response()->json([
                'message' => 'Authenticated successfully',
                'user' => Auth::user()
            ]);
        }

        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = new Utilisateur;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->store($user);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ]);
    }

    /**
     * Déconnexion d'un utilisateur.
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully']);
    }

    /**
     * Obtenir les informations de l'utilisateur authentifié.
     */
    public function me()
    {
        return response()->json(Auth::user());
    }

    /**
     * Obtenir les tableaux dans le panier de l'utilisateur authentifié.
     */
    public function getTableauxDansPanier()
    {
        $user = Auth::user();
        return response()->json($user->tableauxDansPanier);
    }

    /**
     * Obtenir les tableaux aimés par l'utilisateur authentifié.
     */
    public function getLikes()
    {
        $user = Auth::user();
        return response()->json($user->tableauxLikes);
    }

    /**
     * Ajouter un tableau au panier de l'utilisateur authentifié.
     */
    public function addToPanier(Request $request)
    {
        $user = Auth::user();
        $tableauId = $request->input('tableauId');

        // Vérifier si le tableau existe et l'ajouter au panier
        if ($tableauId) {
            $tableauxDansPanier = json_decode($user->tableauxDansPanier, true);
            $tableauxDansPanier[] = $tableauId;
            $user->tableauxDansPanier = json_encode($tableauxDansPanier);
            $user->save();

            return response()->json(['message' => 'Tableau avec id ' . $tableauId . ' ajouté au panier'], 200);
        }

        return response()->json(['error' => 'Tableau non spécifié'], 400);
    }

    /**
     * Ajouter un tableau aux likes de l'utilisateur authentifié.
     */
    public function addLikes(Request $request)
    {
        $user = Auth::user();
        Log::info('utilisateur de Auth', $user);
        $user = Session::get('user');
        Log::info('utilisateur de Session', $user);
        $tableauId = $request->only('tableauId');
        Log::info('Composant de la requete', ['requete' => $request]);
        Log::info('Ajout de like pour le tableau', ['tableauId' => $tableauId]);

        // Vérifier si le tableau existe et l'ajouter aux likes
        if ($tableauId) {
            $tableauxLikes = json_decode($user->tableauxLikes, true);
            $tableauxLikes[] = $tableauId;
            $user->tableauxLikes = json_encode($tableauxLikes);
            $user->save();

            return response()->json(['message' => 'Tableau avec id ' . $tableauId . ' ajouté aux likes'], 200);
        }

        return response()->json(['error' => 'Tableau non spécifié'], 400);
    }

    /**
     * Retirer un tableau du panier de l'utilisateur authentifié.
     */
    public function removeFromPanier(Request $request)
    {
        $user = Auth::user();
        $tableauId = $request->only('tableauId');

        // Vérifier si le tableau existe et l'enlever du panier
        if ($tableauId) {
            $tableauxDansPanier = json_decode($user->tableauxDansPanier, true);
            $tableauxDansPanier = array_filter($tableauxDansPanier, fn($id) => $id !== $tableauId);
            $user->tableauxDansPanier = json_encode($tableauxDansPanier);
            $user->save();

            return response()->json(['message' => 'Tableau avec id ' . $tableauId . ' retiré du panier'], 200);
        }

        return response()->json(['error' => 'Tableau non spécifié'], 400);
    }

    /**
     * Retirer un tableau des likes de l'utilisateur authentifié.
     */
    public function removeLikes(Request $request)
    {
        $user = Auth::user();
        $tableauId = $request->input('tableauId');

        // Vérifier si le tableau existe et l'enlever des likes
        if ($tableauId) {
            $tableauxLikes = json_decode($user->tableauxLikes, true);
            $tableauxLikes = array_filter($tableauxLikes, fn($id) => $id !== $tableauId);
            $user->tableauxLikes = json_encode($tableauxLikes);
            $user->save();

            return response()->json(['message' => 'Tableau avec id ' . $tableauId . ' retiré des likes'], 200);
        }

        return response()->json(['error' => 'Tableau non spécifié'], 400);
    }
}
