<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Show extends Model
{
    use SoftDeletes;

    protected $table = 'shows';

    // protected $fillable = [
    //     'title',
    //     'description',
    //     'status',
    // ];

    protected $casts = [
        'show_name' => 'string',
        'area' => 'string',
        'logo_data' => 'string',
        'category_id' => 'integer',
        'is_delete' => 'boolean',
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
        'deleted_at'  => 'datetime',
    ];
}
