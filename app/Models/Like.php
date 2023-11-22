<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Like extends Model
{
    use HasFactory;
    protected $table='likes';
    protected $fillable=['patientID','articleID'];
    
    public function article()
    {
        return $this->belongsTo(Article::class,'articleID');
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
    
    protected static function boot()
    {
        parent::boot();

        static::created(function ($like) {
            // Increment the likes_count for the associated article
            $like->article->increment('likes');
            // Check if the likes_count is a multiple of 5
            if ($like->article->likes % 5 === 0) {
                // Add one point to the publisher's points in the article table
                $like->article->Doctor->increment('points');

                // Find the reviews associated with this article and doctor with status 'accept'
                $reviews = $like->article->reviews()->where('status', 'accept')->get();

                // Add one point to each doctor's points in the reviews table
                $reviews->each(function ($review) {
                    $review->doctor->increment('points');
                });
            }

        });
        static::deleted(function ($like) {
            // Decrement the likes_count for the associated article
            $like->article->decrement('likes');

            // Check if the likes_count is no longer a multiple of 5
            if ($like->article->likes % 5 === 4) {
                // Subtract one point from the publisher's points in the article table
                $like->article->Doctor->decrement('points');

                // Find the reviews associated with this article and doctor with status 'accept'
                $reviews = $like->article->reviews()->where('status', 'accept')->get();

                // Subtract one point from each doctor's points in the reviews table
                $reviews->each(function ($review) {
                    $review->doctor->decrement('points');
                });
            }
        });
    }
}