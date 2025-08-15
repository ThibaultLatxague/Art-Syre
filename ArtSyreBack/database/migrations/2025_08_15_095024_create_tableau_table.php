<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('tableau', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('taille');
            $table->decimal('prix', 8, 2);
            $table->date('dateCreation');
            $table->boolean('estDansUnPanier')->default(false);
            $table->foreignId('categorie_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tableau');
    }
};
