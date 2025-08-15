<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $fillable = ['lien', 'texteAlternatif', 'tableauId'];

    public function tableau()
    {
        return $this->belongsTo(Tableau::class);
    }
}
