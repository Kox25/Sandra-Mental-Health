<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $table='reviews';
    protected $fillable=['notes','status','doctorID','articleID'];
    
    public function article() {
        return $this->belongsTo(Article::class, 'articleID');
    }
    

    public function doctor()
    {
        return $this->belongsTo(Doctor::class,'doctorID');
    }

    protected static function boot() {
        parent::boot();

        static::created(function ($review) {
            // Increment the reviews_count for the associated article
            $review->article->increment('reviews_count');
            $review->article->checkAndUpdateStatus();
        });
    }
        
    
}