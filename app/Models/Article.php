<?php

namespace App\Models;
use App\Models\Doctor;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Article extends Model
{
    use HasFactory;
    protected $table='articles';
    protected $fillable=['name','specialityID','content','image','date','doctorID','likes','reports','status','reviews_count'];
    public function Category():BelongsTo
    {
        return $this->belongsTo(Category::class, 'specialityID');
    }
    public function Doctor():BelongsTo
    {
        return $this->belongsTo(Doctor::class, 'doctorID');
    }
    public function likes()
    {
        return $this->hasMany(Like::class,'articleID');
    }
    
    
    public function reports()
    {
        return $this->hasMany(Report::class,'articleID');
    }
    public function reviews() {
        return $this->hasMany(Review::class, 'articleID');
    }
    public function checkAndUpdateStatus()
    {
            $doctorCount=Doctor::count();
            $minreviews= min(3,$doctorCount-1);
            if ($this->reviews_count >= $minreviews && $this->status=='pending' ) {
                $reviews = $this->reviews;
    
                $acceptCount = $reviews->where('status', 'accept')->count();
                $rejectCount = $reviews->where('status', 'reject')->count();
    
                if ($acceptCount == $minreviews) {
                    $this->status = 'published';
                } elseif ($rejectCount == $minreviews) {
                    $this->status = 'rejected';
                } else {
                    $this->status = 'adminChoice';
                }
    
                $this->save();
            }
        
        
    }
}