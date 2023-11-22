<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne; 
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\Authenticatable;




class Doctor extends Model implements Authenticatable
{
    use HasFactory , HasApiTokens ,Notifiable;

    
    protected $fillable = [
        'user_name',
        'email',
        'password',
        'points'
    ];

     protected $guard = "doctors" ; 

  
    public function Secertarie():HasOne
    {
        return $this->hasOne(Secertarie::class , 'doctor_id'); 
    }

    public function getAuthIdentifierName()
    {
        return 'id'; // Replace with the name of the primary key column in the patients table
    }

    public function getAuthIdentifier()
    {
        return $this->getKey();
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getRememberToken()
    {
        return $this->remember_token;
    }

    public function setRememberToken($value)
    {
        $this->remember_token = $value;
    }

    public function getRememberTokenName()
    {
        return 'remember_token';
    }
    
    public function Articles():HasMany{
        return $this->hasMany(Article::class,'doctorID');

    }
    
    public function reviewedArticles()
    {
        return $this->belongsToMany(Review::class, 'reviews','doctorID','articleID');
    }
}