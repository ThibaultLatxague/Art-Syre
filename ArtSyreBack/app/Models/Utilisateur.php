<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'dateCreation',
        'estAdministrateur'
    ];

    public function commandes()
    {
        return $this->belongsToMany(Tableau::class, 'tableau_utilisateur_commande');
    }

    public function souhaits()
    {
        return $this->belongsToMany(Tableau::class, 'tableau_utilisateur_souhaite');
    }
}
