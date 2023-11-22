<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\PendingArticlesController;

use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/signup/user' , [AuthController::class , 'signup']); 
Route::get('/signup' , [AuthController::class , 'signupAdmin']); 

Route::post('/signup/doctor',[AuthController::class , 'signupDoctor']);
Route::post('/login',[AuthController::class,'login']);


//done
Route::get('Categories',[CategoriesController::class,'getAll']);
//done
Route::get('Categories/insert',[CategoriesController::class,'insert']);


//done
Route::post('Articles',[ArticlesController::class,'index']);
//done
Route::post('Articles/cat/{catID}',[ArticlesController::class,'showCategory']);
//done
Route::post('Articles/upload',[ArticlesController::class,'store']);
//done
Route::post('Articles/content/{ArticleID}',[ArticlesController::class,'show']);
//done
Route::post('Articles/update/{ArticleID}',[ArticlesController::class,'update']);
//done
Route::post('Articles/update/content/{ArticleID}',[ArticlesController::class,'updateContent']);
//done
Route::post('/Articles/{ArticleID}/like',[ArticlesController::class,'like']);
//done
Route::post('/Articles/{ArticleID}/dislike',[ArticlesController::class,'dislike'] );
//done
Route::post('/Articles/cat/{ArticleID}/report',[ArticlesController::class,'report']);
//done
Route::post('Articles/delete/{ArticleID}',[ArticlesController::class,'destroy']);


//done
Route::post('Settings/delete',[SettingsController::class,'destroy']);
//done
Route::post('Settings/ChangePassword',[SettingsController::class,'ChangePassword']);
//done
Route::post('Settings/info',[SettingsController::class,'show']);
Route::post('Settings/AccountInfo',[SettingsController::class,'updateAccount']);


Route::post('Articles/pending',[PendingArticlesController::class,'showPending']);
Route::post('Articles/pending/{ArticleID}',[PendingArticlesController::class,'pendingContent']);
Route::post('Articles/pending/{ArticleID}/accept',[PendingArticlesController::class,'articleAccept']);
Route::post('Articles/pending/{ArticleID}/reject',[PendingArticlesController::class,'articleReject']);
Route::post('Articles/myPending',[PendingArticlesController::class,'showDoctorArticles']);