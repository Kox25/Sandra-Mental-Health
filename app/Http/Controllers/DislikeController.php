<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Dislike; 

class DislikeController extends Controller
{

    //this function for Add Dislike
    public function AddDislike($doctor_id, $patient_id)
    {
        $like = Dislike::where('doctor_id', $doctor_id)->where('patient_id', $patient_id)->first();
 
        if ($like) {
            // Delete the existing like record
            $like->delete();
            return response()->json(['message' => 'dislike removed successfully'], 200);
        } else {
            // If the like record doesn't exist, create a new one
            $newDislike = new Dislike();
            $newDislike->doctor_id = $doctor_id;
            $newDislike->patient_id = $patient_id;
            $newDislike->dislike = 1;
            $newDislike->save();
            return response()->json(['message' => 'dislike added successfully'], 200);
        }
    }

    //this function for Show Dislike 
    public function showDislikes($doctor_id)
    {
        $dislike = Dislike::where('doctor_id', $doctor_id)->count();
    
        if ($dislike) {
            return response()->json(['dislikes' => $dislike], 200);
        } else {
            return response()->json(['dislikes' => 0 ]);
        }
    }


}
