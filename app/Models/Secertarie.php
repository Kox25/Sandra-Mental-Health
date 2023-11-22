<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Sanctum\HasApiTokens;

class Secertarie extends Model
{
    use HasFactory ,HasApiTokens;

    protected $fillable = [
        'user_name',
        'email',
        'password',
        'doctor_id',
    ];

    
    protected $guard = "secertaries"; 
    public function doctorSecertarie(): BelongsTo
    {
    return $this->belongsTo(Doctor::class, 'doctor_id');
    }

}