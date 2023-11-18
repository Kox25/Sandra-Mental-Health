<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\SignupRequestDoctor;
use App\Mail\DoctorVerificationEmail;
use App\Models\Doctor;
use App\Models\Admin;
use App\Models\Patient;
use App\Models\Secertarie;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

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


        echo implode(', ', $data) . " " . $token;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }



    //this function for doctor signup 
    public function signupDoctor(SignupRequestDoctor $request)
    {
        try {
            $data = $request->validated();
            // Generate a verification token
            $verificationToken = Str::random(32);
            $user = Doctor::create([
                'user_name' => $data['user_name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);
            // Assign the verification token to the doctor's record
            $user->verification_token = $verificationToken;
            $user->save();
            Mail::to($user->email)->send(new DoctorVerificationEmail($user));
            $token = $user->createToken('token')->plainTextToken;
            return response([
                'user' => $user,
                'token' => $token,
                'message' => ['Now you have to verify you email and enjoy in our services.', 200]
            ]);
        } catch (er) {
            return response(['error' => ['error' => 'someting went wrong']], 0);
        }
    }

    //this function to verify the doctor email before create the record of the doctor 
    public function verifyEmail($token)
    {
        // Find the doctor with the given verification token
        $doctor = Doctor::where('verification_token', $token)->first();
        // If the doctor is not found, return an error response
        if (!$doctor) {
            return response()->json(['error' => 'Invalid verification token.'], 400);
        }
        $doctor->email_verified_at = Carbon::parse($doctor->email_verified_at);
        $email_verified_at = $doctor->email_verified_at->toDateTimeString();
        $doctor->save();
        // Update the doctor's status as verified and clear the verification token
        $doctor->update([
            'email_verified_at' => $email_verified_at,
        ]);
        // Return a success response
        return response()->json([
            'message' => 'Email verification successful , You can now log in.',
            'email_verified_at' => $email_verified_at
        ], 200);
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

                ]);
            } else {
                return response()->json([
                    'error' => 'The Email or Password Not Correct',
                ]);
            }

        } else if (Doctor::where('email', $request->email)->first()) {
            $user = Doctor::where('email', $request->email)->first();
            $passwordHash = $user->password;
            if ($user->email_verified_at != null) {
                if (Hash::check($request->password, $passwordHash)) {
                    $user_id = $user->id;
                    $token = $user->createToken('token')->plainTextToken;

                    return response()->json([
                        'user' => $user,
                        'user_id' => $user_id,
                        'token' => $token,
                        'user_type' => 'doctor',
                        'message' => 'Email verify successfully',

                    ]);
                } else {
                    return response()->json([
                        'message' => 'Password or Email Not Correct',
                    ]);
                }
            } else {
                return response()->json(["message" => "you have to verify your email"]);
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