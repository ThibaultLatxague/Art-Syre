<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tableau extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'taille', 'prix', 'dateCreation', 'estDansUnPanier', 'categorieId'];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function commandes()
    {
        return $this->belongsToMany(Utilisateur::class, 'tableau_utilisateur_commande');
    }

    public function souhaites()
    {
        return $this->belongsToMany(Utilisateur::class, 'tableau_utilisateur_souhaite');
    }
}
