<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LikeController extends Controller
{




    //this function for give me best three doctor 
    public function BestThreeDoctor(Request $request)
    {
        $doctors = DB::table('likes')
            ->select('doctors.*')
            ->join('doctors', 'likes.doctor_id', '=', 'doctors.id')
            ->orderBy('likes.like', 'desc')
            ->take(3)
            ->get();

        return response()->json(
            [
                'doctors' => $doctors,
            ]
        );
    }

    //this function for adding like to the doctor ... still in work 
    public function AddLike($doctor_id, $patient_id)
    {
        $like = Like::where('doctor_id', $doctor_id)->where('patient_id', $patient_id)->first();
 
        if ($like) {
            // Delete the existing like record
            $like->delete();
            return response()->json(['message' => 'Like removed successfully'], 200);
        } else {
            // If the like record doesn't exist, create a new one
            $newLike = new Like();
            $newLike->doctor_id = $doctor_id;
            $newLike->patient_id = $patient_id;
            $newLike->like = 1;
            $newLike->save();
            return response()->json(['message' => 'Like added successfully'], 200);
        }
    }

    //this function for show likes of the doctor .. still in work 
    public function showLikes($doctor_id)
{
    $like = Like::where('doctor_id', $doctor_id)->count();

    if ($like) {
        return response()->json(['likes' => $like], 200);
    } else {
        return response()->json(['likes' => 0 ]);
    }
}

}
