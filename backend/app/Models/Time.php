<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Time extends Model
{
    use SoftDeletes;

    protected $table = 'times';

    protected $casts = [
        'start_time' => 'string',
        'end_time' => 'string',
    ];

    public function shows()
    {
        return $this->belongsToMany(Show::class, 'show_time');
    }
}
