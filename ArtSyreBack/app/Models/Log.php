<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;
    protected $fillable = ['categories_log_id', 'description'];

    public function categorieLog()
    {
        return $this->belongsTo(CategoriesLog::class);
    }
}
