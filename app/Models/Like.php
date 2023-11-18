<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;
    protected $fillable = [
        'like' , 
        'dislike',
        'doctor_id',
        'patient_id',] ; 

        protected $table = "likes" ; 

        
}
