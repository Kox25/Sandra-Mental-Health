<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\SignupRequestDoctor;
use App\Models\Doctor;
use App\Models\Admin;
use App\Models\Patient;
use App\Models\Secertarie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use League\CommonMark\Extension\SmartPunct\EllipsesParser;

class AuthController extends Controller
{

    // signup funciton for patients 
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();


        $user = Patient::create([
            'user_name' => $data['user_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        $token = $user->createToken('token')->plainTextToken;


        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function signupDoctor(SignupRequestDoctor $request)
    {
        $data = $request->validated();


        $user = Doctor::create([
            'user_name' => $data['user_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('token')->plainTextToken;



        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }
    public function signupAdmin()
    {


        $user = Admin::create([
            'user_name' => "Sireen_takriti",
            'email' => "sireen.takriti@gmail.com",
            'password' => bcrypt("123456789"),
        ]);

        $token = $user->createToken('token')->plainTextToken;



        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }
     // login function

     public function login(LoginRequest $request)
     {
         $user = null;
 
 
 
         if (Patient::where('email', $request->email)->first()) {
             $user = Patient::where('email', $request->email)->first();
             $passwordHash = $user->password;
             if (Hash::check($request->password, $passwordHash)) {
                 $user_id = $user->id;
                 $token = $user->createToken('token')->plainTextToken;
 
                 return response()->json([
                     'user' => $user,
                     'user_id' => $user_id,
                     "token" => $token,
                     'user_type' => 'patient',
                     'user_name'=>$user->user_name
 
                 ]);
             } else {
                 return response()->json([
                     'error' => 'The Email or password Not Correct',
                 ]);
             }
 
         } else if (Doctor::where('email', $request->email)->first()) {
             $user = Doctor::where('email', $request->email)->first();
             $passwordHash = $user->password;
             if (Hash::check($request->password, $passwordHash)) {
                 $user_id = $user->id;
                 $token = $user->createToken('token')->plainTextToken;
                 return response()->json([
                    'user' => $user,
                    'user_id' => $user_id,
                    'token' => $token,
                    'user_type' => 'doctor',
                    'user_name'=>$user->user_name


                ]);
            } else {
                return response()->json([
                    'message' => 'Password or Email Not Correct',
                ]);
            }

        } else if (Admin::where('email', $request->email)->first()) {
            $user = Admin::where('email', $request->email)->first();
            $passwordHash = $user->password;
            if (Hash::check($request->password, $passwordHash)) {
                $user = Admin::where('email', $request->email)->first();
                $user_id = $user->id;
                $token = $user->createToken('token')->plainTextToken;
              
                return response()->json([
                    'user' => $user,
                    'user_id' => $user_id,
                    'token' => $token,
                    'user_type' => 'admin',
                    'user_name'=>$user->user_name

                ]);
            } else {
                return response()->json([
                    'error' => 'The Password or Email Not Correct ',
                ]);
            }
        } else if (Secertarie::where('email', $request->email)->first()) {
            $user = Secertarie::where('email', $request->email)->first();
            $passwordHash = $request->password;
            if (Hash::check($request->password, $passwordHash)) {
                $user_id = $user->id;
                $token = $user->createToken('token')->plainTextToken;
              
                return response()->json([
                    'user' => $user,
                    'user_id' => $user_id,
                    'token' => $token,
                    'user_type' => 'admin',
                    'user_name'=>$user->user_name

                ]);
            } else {
                return response()->json([
                    'error' => 'The Email or Password Not Correct',
                ]);
            }

        } else {
            return response()->json([
                'error' => 'Invalid User',
            ]);
        }
    }


} 