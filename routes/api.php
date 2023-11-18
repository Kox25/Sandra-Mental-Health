<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DislikeController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\LikeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

 
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




//this section for auth
//it's work 
Route::post('/signup/user' , [AuthController::class , 'signup']); 
//it's work 
Route::post('/signup/doctor',[AuthController::class , 'signupDoctor']);
//this api for verify doctor email before login 
Route::get('/verify-email/{token}', 
[AuthController::class, 'verifyEmail'])
->name('verify.email');
//it's work 
Route::post('/login',[AuthController::class , 'login']); 



//this section for the admin 
//Admin api 
//for me 
Route::post('firstAdmin' , [AdminController::class , 'AddFirstAdmin']);
//for sireen  
Route::post('secondAdmin' , [AdminController::class , 'AddSecondAdmin']); 



//this section for the ChatController 
//first function openChat 
//it's work
Route::post('/open-chat/{patient_id}/{doctor_id}' , [ChatController::class , 'openChat']);
//second function sendMessage
//it's work  
Route::post('/send-message/{sender_id}/{receiver_id}', [ChatController::class, 'sendMessage']);
//third function showMessages
//it's work
Route::post('/show-messages/{id}',[ChatController::class , 'showMessages']); 
//forth function showChat 
//it's work 
Route::post('/show-chat/{id}' , [ChatController::class , 'showChat']);  
//fifth function GetChatById
//it's work 
Route::post('/get-chat/{id}' , [ChatController::class , 'GetChatByID']); 
//sixth function deleteChat
//it's work 
Route::post('/delete-chat/{id}/{user_id}' , [ChatController::class , 'deleteChat']); 




//this section for doctor controller
// it's work
Route::post('/add/secertarie',[DoctorController::class , 'addSecertarie']); 
// it's work 
Route::get('/get/doctors' , [DoctorController::class ,'getAllDoctor']);




//this section for the LikeController 
Route::post('/best/doctor' , [LikeController::class ,'BestThreeDoctor']);
// it's work
Route::post('/show/likes/{doctor_id}', [LikeController::class, 'showLikes']);
// it's work 
Route::post('/add/like/{doctor_id}/{patient_id}', [LikeController::class ,'AddLike']);




//this function for the DisLike Controller 
//it's work 
Route::post('/add/dislike/{doctor_id}/{patient_id}' , [DislikeController::class , 'AddDislike']);
//it's work 
Route::post('/show/dislike/{doctor_id}', [DislikeController::class ,'showDislikes']);

