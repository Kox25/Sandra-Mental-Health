<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Article;
use App\Models\Patient;
use App\Models\Review;
use App\Models\Doctor;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class PendingArticlesController extends Controller
{
    
    //show all pending articles for doctors and admin
    public function showPending(Request $request)
    {
        $userID=intval($request->userID);
        $userType=$request->userType;
        if($userType==='patient')
        {
            return response()->json(['status'=>404,'message'=> "you can't review articles"]);  
        }
        else if($userType==="doctor")
        {
            $doctor=Doctor::find($userID);
            $articles = Article::where('status', 'pending')->whereDoesntHave('reviews', function ($query) use ($doctor) {
                $query->where('doctorID', $doctor->id);
            })->where('doctorID', '!=', $doctor->id)->orderBy('date', 'desc')->with('Category')->get();
            foreach ($articles as $article) {
                $textPath = $article->content;
                try {
                    $textContent = Storage::get($textPath);
                } catch (\Exception $e) {
                    return response()->json(['status'=>500,'message'=> 'Something went wrong']);
                }
                $article->content=$textContent;
            }
            return response()->json(['status'=>200,'Articles'=>$articles]);    
        }
        else{
            $articles = Article::where('status', 'adminChoice')->orderBy('date', 'desc')->with('Category','reviews')->get();
            foreach ($articles as $article) {
                $acceptCount=0;
                $rejectCount=0;
                foreach($article->reviews as $review){
                    if($review->status==="accept"){
                        $acceptCount=$acceptCount+1;
                        
                    }
                    else{
                        $rejectCount=$rejectCount+1;
                    }
                }
                $textPath = $article->content;
                try {
                    $textContent = Storage::get($textPath);
                } catch (\Exception $e) {
                    return response()->json(['status'=>500,'message'=> 'Something went wrong']);
                }
                $article->content=$textContent;
                $article->acceptCount=$acceptCount;
                $article->rejectCount=$rejectCount;
            }
            return response()->json(['status'=>200,'Articles'=>$articles]);    
        }
    }
    
    //show doctor's articles with specific status('pending','published','rejected','all')
    public function showDoctorArticles(Request $request)
    {
        $userID=intval($request->userID);
        $userType=$request->userType;
        if($userType==="doctor")
        {
            try {
                if($request->Type===0){        
                    $articles = Article::where('doctorID', $userID)->with('Category','reviews')->get();

                }
                else if($request->Type===1){
                    $articles = Article::where('status', 'pending')->orWhere('status','adminChoice')->where('doctorID', $userID)->with('Category','reviews')->get();

                    
                } else if($request->Type===2){
                    $articles = Article::where('doctorID', $userID)->where('status','published')->with('Category','reviews')->get();

                    
                } else if($request->Type===3){
                    $articles = Article::where('doctorID', $userID)->where('status','rejected')->with('Category','reviews')->get();

                    
                } else {
                    return response()->json(['status'=>404,'message'=> 'The type you chose is not exist']);
                }
                foreach ($articles as $article) {
                    $textPath = $article->content;
                    try {
                        $textContent = Storage::get($textPath);
                    } catch (\Exception $e) {
                        return response()->json(['status'=>500,'message'=> 'Something went wrong']);
                    }
                    $article->content=$textContent;
                }
                return response()->json(['status'=>200,'Articles'=>$articles]);    
            }        
            catch (\Exception $e) {
                return response()->json(['status'=>500,'message'=> 'Something went wrong']);
            }
        }
        else{
            return response()->json(['status'=>404,'message'=> "you can't add articles"]);  

        }
    }
    
     //show content of specific pending article
    public function pendingContent($ArticleID,Request $request)
    {
        $userID=$request->userID;
        $userType=$request->userType;

        if($userType==='patient')
        {
            return response()->json(['status'=>404,'message'=> "you can't review articles"]);
        }
        else{
             
            $Article= Article::with('Category','reviews')->find($ArticleID);
            if(!$Article){
                return response()->json(['status'=>402,'message'=> 'Article not found']);
            }
             
            else{    
                if($userID==="doctor" && $userID==$Article->doctorID){
                    return response()->json(['status'=>500,'message'=>"you can't review your articles"]);
                }   
                $textPath = $Article->content;
                try {
                    $textContent = Storage::get($textPath);       
                } catch (\Exception $e) {
                    return response()->json(['status'=>500,'message'=> 'Error retrieving text content']);
                }
                $Article->content=$textContent;
                if($userType==="admin"){
                    $acceptCount=0;
                    $rejectCount=0;
                    foreach($Article->reviews as $review){
                        if($review->status==="accept"){
                            $acceptCount+=1;
                        }
                        else{
                            $rejectCount+=1;
                        }
                    }
                    $Article->acceptCount=$acceptCount;
                    $Article->rejectCount=$rejectCount;
                }
             }
             
             return response()->json(['status'=>200,'Article'=>$Article,'path'=>$textPath]);
         }
     }

     //accept specific pending article(doctor,admin)
     public function articleAccept($ArticleID,Request $request)
     {
         $userID=$request->doctorID;
         $userType=$request->userType;
         if($userType==='patient')
         {
             return response()->json(['status'=>404,'message'=> "you can't review articles"]);
         }
         else if($userType==='doctor'){
             $Article=Article::find($ArticleID);
             if($userID!==$Article->doctorID){
                 try{
                     
                     $Review=new Review();
                     $Review->status="accept";
                     $Review->doctorID=$userID;
                     $Review->articleID=$ArticleID;
                     $Review->save();
                     return response()->json(['status'=>200,'message'=>'this article accepted successfully']);
                 }
                 catch (\Exception $e){
                     return response()->json(['status'=>500,'message'=>'something went wrong']);
 
                 }
             }
             else{
                 return response()->json(['status'=>500,'message'=>"you can't review your articles"]);
 
             }
         }
         else{
             try{
                 $Article= Article::find($ArticleID);
                 if(!$Article)
                 {
                     return response()->json(['status'=>500,'message'=>'Article not found']);
                 }
                 $Article->status="published";
                 $Article->save();
                 return response()->json(['status'=>200,'message'=>'this article accepted successfully']);
             }
             catch (\Exception $e){
                 return response()->json(['status'=>500,'message'=>'something went wrong']);
 
             }
         }
         
     }
     
     //reject specefic pending article (doctor,admin)
     public function articleReject($ArticleID,Request $request)
     {
         $userID=$request->doctorID;
         $userType=$request->userType;
         if($userType==='patient')
         {
             return response()->json(['status'=>404,'message'=> "you can't review articles"]);
         }
         else if($userType==='doctor'){
             $Article=Article::find($ArticleID);
             if($userID!==$Article->doctorID){
                 try{
                 
                     $Review=new Review();
                     $Review->status="reject";
                     $Review->doctorID=$userID;
                     $Review->articleID=$ArticleID;
                     $Review->notes=$request->notes;
                     $Review->save();
                     return response()->json(['status'=>200,'message'=>'this article rejected successfully']);
                 }
                 catch (\Exception $e){
                     return response()->json(['status'=>500,'message'=>'something went wrong']);
     
                 }
             }
             else{
                 return response()->json(['status'=>500,'message'=>"you can't review your articles"]);
 
             }
            
         }
         else{
             try{
                 $Article= Article::find($ArticleID);
                 if(!$Article)
                 {
                     return response()->json(['status'=>500,'message'=>'Article not found']);
                 }
                 $Article->status="rejected";
                 $Article->save();
                 return response()->json(['status'=>200,'message'=>'this article rejected successfully']);
             }
             catch (\Exception $e){
                 return response()->json(['status'=>500,'message'=>'something went wrong']);
 
             }
         }
         
     }
}