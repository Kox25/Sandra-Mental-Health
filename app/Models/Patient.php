<?php


namespace App\Models ;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\Authenticatable;

class Patient extends Model implements Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = "patients" ; 
    protected $fillable = [
        'user_name',
        'email',
        'password',
        'doctor_id',
    ];

    public function DoctorPatien(): BelongsTo
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }

    //this the relationship between the patients table and the chats table 
    public function chats ():HasMany
    {
        return $this->hasMany(Chat::class , 'patiet_id'); 
    }

    public function getAuthIdentifierName()
    {
        return 'id'; // with the name of the primary key column in the patients table
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

}






?>