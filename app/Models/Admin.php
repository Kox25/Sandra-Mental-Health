<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{
    use HasFactory , HasApiTokens;


    protected $table = "admins" ;
    protected $guard = "admins" ;
    protected $fillable = [
        'user_name',
        'email',
        'password',
    ];
}
