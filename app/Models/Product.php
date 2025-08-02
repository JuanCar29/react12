<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
    ];

    protected $casts = [
        'price' => 'float', // Asegura que 'price' siempre sea un float
        'stock' => 'integer', // Opcional, pero buena práctica si no lo tienes ya
        'description' => 'encrypted'
    ];
}
