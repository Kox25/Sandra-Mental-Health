<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chat extends Model
{
    use HasFactory;

    protected $table = "chats" ;

    //this is the fillable i need to take it from the front for the chats table 
    protected $fillable = [
        'patient_id' , 
        'doctor_id'  , 
    ]; 


    //this chat has many messages so : the chat is one , and the message is many => so one to many .
    public function messages ():HasMany
    {
        return $this->hasMany(Message::class , 'chat_id'); 
    }

    //this is relation ship between the patients table and the chats table
    public function patients (): BelongsTo
    {
        return $this->belongsTo(Patient::class , 'patient_id'); 
    }

    //this the relationship between the doctors table and the chats table 
    public function doctors ():BelongsTo
    {
        return $this->belongsTo(Doctor::class , 'doctor_id'); 
    }

     
}
