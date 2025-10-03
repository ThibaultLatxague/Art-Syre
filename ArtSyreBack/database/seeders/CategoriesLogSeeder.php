<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CategoriesLog;

class CategoriesLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CategoriesLog::factory()->create(
            ['id' => 1, 'nom' => 'Tableaux'],
            ['id' => 2, 'nom' => 'Utilisateurs'],
            ['id' => 3, 'nom' => 'Sécurité'],
            ['id' => 4, 'nom' => 'Statistiques'],
            ['id' => 5, 'nom' => 'SEO']
        );
    }
}
