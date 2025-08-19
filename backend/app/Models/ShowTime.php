<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShowTime extends Model
{
    use SoftDeletes;

    protected $table = 'show_time';

    protected $fillable = [
        'show_id',
        'time_id',
    ];

    protected $casts = [
        'show_id' => 'integer',
        'time_id' => 'integer',
    ];

    public function show()
    {
        return $this->belongsTo(Show::class, 'show_id');
    }

    public function time()
    {
        return $this->belongsTo(Time::class, 'time_id');
    }
}
