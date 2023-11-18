<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddSecertarie;
use App\Models\Doctor;
use App\Models\Like;
use App\Models\Secertarie;
use Illuminate\Http\Request;

class DoctorController extends Controller
{


    //function for add a secertarie 
    public function addSecertarie(AddSecertarie $request)
    {


        $data = $request->validated();
        // Find the doctor based on the doctor email provided in the request
        $doctor = Doctor::where('email', $data['email_doctor'])->first();
        $doctor_id = $doctor->id;

        /** @var \App\Models\Secertarie */
        $user = Secertarie::create([
            'user_name' => $data['user_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'doctor_id' => $doctor_id,
            // Assign the doctor ID to the secretary
        ]);

        $token = $user->createToken('token')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }


    //this fucntion for get all doctors 
    public function getAllDoctor()
    {
        $doctor = Doctor::orderBy('created_at', 'desc')->get();
        return response([
            'doctors' => $doctor
            ,
            'message' => 'Fetch all doctor successfully '
        ]);

    }

    //this function for get all secretaries 
    public function getAllSecertarie()
    {
        $secertarie = Secertarie::orderBy('created_at', 'desc')->get();
        return response([
            'secertarie' => $secertarie
            ,
            'message' => 'fetch all secertarie successfully'
        ]);
    }


}
