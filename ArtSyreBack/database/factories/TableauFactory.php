<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tableau>
 */
class TableauFactory extends Factory
{
    protected $model = \App\Models\Tableau::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => fake()->word(),
            'prix' => fake()->randomFloat(2, 10, 1000),
            'taille' => fake()->randomFloat(2, 40, 150),
            'dateCreation' => now(),
            'estVendu' => fake()->boolean(),
            'estDansUnPanier' => fake()->boolean(),
        ];
    }
}
