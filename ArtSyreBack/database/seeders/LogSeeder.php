<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Log;

class LogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Log::factory()->create([
            'categories_log_id' => 1,
            'description' => 'Création d\'un nouveau tableau',
        ]);
        Log::factory()->create([
            'categories_log_id' => 2,
            'description' => 'Suppression d\'un utilisateur',
        ]);
        Log::factory()->create([
            'categories_log_id' => 3,
            'description' => 'Modification des paramètres de sécurité',
        ]);
        Log::factory()->create([
            'categories_log_id' => 4,
            'description' => 'Génération d\'un rapport statistique',
        ]);
        Log::factory()->create([
            'categories_log_id' => 5,
            'description' => 'Mise à jour des balises SEO',
        ]);
        Log::factory()->create([
            'categories_log_id' => 1,
            'description' => 'Mise à jour des informations d\'un tableau',
        ]);
        Log::factory()->create([
            'categories_log_id' => 2,
            'description' => 'Création d\'un nouvel utilisateur',
        ]);
        Log::factory()->create([
            'categories_log_id' => 3,
            'description' => 'Changement de mot de passe',
        ]);
        Log::factory()->create([
            'categories_log_id' => 4,
            'description' => 'Analyse des tendances de vente',
        ]);
        Log::factory()->create([
            'categories_log_id' => 5,
            'description' => 'Optimisation du contenu pour le référencement',
        ]);
    }
}
