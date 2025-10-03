<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Log;

class CategoriesLog extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'nom'];

    public function log()
    {
        return $this->hasMany(Log::class);
    }
}
