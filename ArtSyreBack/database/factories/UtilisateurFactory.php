<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Utilisateur>
 */
class UtilisateurFactory extends Factory
{
    protected $model = \App\Models\Utilisateur::class;

    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => fake()->name(),
            'prenom' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            // 'email_verified_at' => now(),
            'motDePasse' => static::$password ??= Hash::make('password'),
            'dateCreation' => now(),
            'estAdministrateur' => fake()->boolean()
        ];
    }
}
