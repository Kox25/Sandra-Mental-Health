<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;
    
    protected $table='reports';
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
        static::created(function ($report) {
            // Increment the reports_count for the associated article
            $report->article->increment('reports');
            // Check if the reports_count is a multiple of 3
            if ($report->article->reports % 3 === 0) {
                $report->article->Doctor->decrement('points');
                $reviews = $report->article->reviews();
                // Add one point to each doctor's points in the reviews table
                $reviews->each(function ($review) {
                    if($review->status==="reject"){
                        $review->doctor->increment('points');
                    }
                    else{
                        $review->doctor->decrement('points');

                    }
                });
            }
        });
    }
}