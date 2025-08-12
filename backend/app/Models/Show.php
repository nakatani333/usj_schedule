<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Show extends Model
{
    use SoftDeletes;

    protected $table = 'shows';

    protected $fillable = [
        'title',
        'description',
        'status',
    ];

    protected $casts = [
        'show_name' => 'string',
    ];
}
