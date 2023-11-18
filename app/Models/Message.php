<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;

    protected $table= "messages"; 
    protected $fillable = [
        'sender_id' , 
        'recever_id' , 
        'chat_id' , 
        'message' , 
    ];

    
    //in every chat there is to many messages so the messages is belongTO chat .
    public function chat():BelongsTo
    {
        return $this->belongsTo(Chat::class , 'chat_id'); 
    }   
      
}
