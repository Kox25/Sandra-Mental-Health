<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Patient;
use App\Models\Like;
use App\Models\Report;
use App\Models\Review;
use App\Models\Doctor;
use Carbon\Carbon;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
     
    //show all articles
    public function index(Request $request)
    {
        $userID=$request->userID;
        $userType=$request->userType;
        if($userType==='patient')
        {
            $patient=Patient::find($userID);
            if(!$patient)
            {
                return response()->json(['status'=>404,'message'=> 'user not found']);
            }
            try{
                $articles = Article::whereDoesntHave('reports', function ($query) use ($patient) {
                    $query->where('patientID', $patient->id);
                })->with('Category','Doctor')->get();
               
            }catch (\Exception $e) {
                return response()->json(['status'=>500,'message'=> $e]);
            }
            $articles->each(function ($article) use ($patient) { 
                $isLiked = $patient->likedArticles->contains($article->id);
                $article->isLiked = $isLiked;
                $textPath = $article->content;
                try {
                    $textContent = Storage::get($textPath);   
                } catch (\Exception $e) {
                    return response()->json(['status'=>500,'message'=> 'Error retrieving text content']);
                }
                $article->content=$textContent;
            });  
            return response()->json(['status'=>200,'Articles'=>$articles]);
        }
        else
        {

            $articles = Article::where('status', 'published')->with('Category','Doctor')->get();
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
    }


     //add new article
    public function store(Request $request)
    {
        $validator = $request->validate([
            'name' => 'required|string',
            'specialityID' => 'required|integer|exists:speciality,id', 
            'content' => 'required|mimetypes:text/plain|max:10000', 
            'image' => 'nullable|image|max:2048', 
            'doctorID' => 'required|integer|exists:doctors,id',
            'userType'=>'required|string'
        ]);
        
        $userID=intval( $request->input('doctorID'));
        $userType=$request->input('userType');
        if($userType==='doctor'){
            $todayDate = Carbon::now()->toDateString();

            $reviewsCount = Review::whereDate('created_at', $todayDate)
            ->where('doctorID', $userID)->count();
            if($reviewsCount<3){
                $pendingArticles=Article::where('status','pending')->whereDoesntHave('reviews', function ($query) use ($userID) {
                    $query->where('doctorID', $userID);
                })->where('doctorID','!=',$userID)->count();
                if($pendingArticles>0){
                    return response()->json(['status'=>404,'massage'=>'you must review 3 pending articles at least if exist']);
                }
            }
            $Article = new Article();
            $count= Article::count();
            $contentfile=$request->file('content');
            $contentextension = Str::uuid()->toString() . '.' . $contentfile->getClientOriginalExtension();
            $contentname=$count.'.'.$contentextension;
            $contentPath = $contentfile->storeAs('ArticlesContent',$contentname);
            if($request->hasFile('image')){         
                $imagefile=$request->file('image');
                $imageextension =  Str::uuid()->toString() . '.' . $imagefile->getClientOriginalExtension();
                $imagename=$count.'.'.$imageextension;
                $imagePath = $imagefile->Move('ArticlesImages/',$imagename);
                $Article->image=$imagePath;
            }
            else{
                $Article->image='ArticlesImages/default.png';
            }
           
            $Article->name= $request->input('name');
            $Article->content=$contentPath;
            $Article->doctorID=$request->input('doctorID');
            $Article->specialityID=$request->input('specialityID');
            $Article->date=Carbon::now();
            $Article->likes=0;
            $Article->reports=0;
            if(Doctor::count()<=1){
                $Article->status="adminChoice";

            }
            else{
                $Article->status="pending";
            }
            $Article->save();     
            return response()->json(['status'=>200,'massage'=>"Your article now added to pending list."]);
        }
        else{
            return response()->json(['status'=>404,'massage'=>"you can't add any article, you need to be a doctor."]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


     //show specific article by id
    public function show($ArticleID,Request $request)
    {
        $userID=$request->userID;
        $userType=$request->userType;
        if($userType==='patient')
        {
            $patient=Patient::find($userID);
            if(!$patient)
            {
                return response()->json(['status'=>404,'message'=> 'user not found']);
            }
            try{
                $Article = Article::where('status', 'published')->whereDoesntHave('reports', function ($query) use ($patient) {
                    $query->where('patientID', $patient->id);
                })->with('Category','Doctor')->find($ArticleID);
            }catch (\Exception $e) {
                return response()->json(['status'=>500,'message'=> 'articles in error']);
            } 
            $isLiked = $patient->likedArticles->contains($Article->id);
            $Article->isLiked = $isLiked;
            $textPath = $Article->content;
            try {
                $textContent = Storage::get($textPath);   
            } catch (\Exception $e) {
                return response()->json(['status'=>500,'message'=> 'Error retrieving text content']);
            }
            $Article->content=$textContent;
            return response()->json(['status'=>200,'Article'=>$Article,'path'=>$textPath]); 
        }
        else{
            $Article= Article::where('status', 'published')->with('Category','Doctor')->find($ArticleID);
            if(!$Article){
                return response()->json(['status'=>402,'message'=> 'Article not found']);
            }
            else{       
                $textPath = $Article->content;
                try {
                    $textContent = Storage::get($textPath);       
                } catch (\Exception $e) {
                    return response()->json(['status'=>500,'message'=> 'Error retrieving text content']);
                }
                $Article->content=$textContent;
                $Article->isLiked = false;
            }
            return response()->json(['status'=>200,'Article'=>$Article,'path'=>$textPath]);
        }
    }



    //show articles with specific category
    public function showCategory($catID,Request $request)
    {
        $userID=$request->userID;
        $userType=$request->userType;
        if($userType==='patient')
        {
            $patient=Patient::find($userID);
            if(!$patient)
            {
                return response()->json(['status'=>404,'message'=> 'user not found']);
            }
            try{
                $articles = Article::where('status', 'published')->whereDoesntHave('reports', function ($query) use ($patient) {
                    $query->where('patientID', $patient->id);
                })->where('specialityID','=',$catID)->with('Category','Doctor')->orderBy('likes', 'desc')->get();
            }catch (\Exception $e) {
                return response()->json(['status'=>500,'message'=> 'articles in error']);
            }
            $articles->each(function ($article) use ($patient) {    
                $isLiked = $patient->likedArticles->contains($article->id);
                $article->isLiked = $isLiked;
                $textPath = $article->content;
                try {
                    $textContent = Storage::get($textPath);   
                } catch (\Exception $e) {
                    return response()->json(['status'=>500,'message'=> 'Error retrieving text content']);
                }
                $article->content=$textContent;
            });  
            return response()->json(['status'=>200,'Articles'=>$articles]);
        }
        else
        {
            $articles = Article::where('status', 'published')->where('specialityID','=',$catID)->with('Category','Doctor')->orderBy('likes', 'desc')->get();
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
        return response()->json(['status'=>200,'Articles'=>$Articles]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


     //update article content
    public function updateContent(Request $request,$ArticleID){
            
            $validator = $request->validate([
                'content'=>'required|string',
                'doctorID'=>'required|integer|exists:doctors,id',
                'userType'=>'required|string'
            ]);
      
        
        $userID=intval( $request->input('doctorID'));
        $userType=$request->input('userType');
        if($userType==='doctor'){
            $Article = Article::where('status', 'published')->findOrFail($ArticleID);
            if(!$Article){
                return response()->json(['status'=>404,'massage'=>"Article not found."]);
            }
            if($Article->doctorID===$userID){
                $filePath =$Article->content;
                Storage::put( $filePath,$validator['content']);
                return response()->json(['status'=>200,'massage'=>"Content updated successfully."]);
            }else{
                return response()->json(['status'=>404,'massage'=>"you can't edit this article."]);
            }              
        }else{
            return response()->json(['status'=>404,'massage'=>"you can't edit articles."]);

        }  
    }
   


    //update article info
    public function update(Request $request, $ArticleID)
    { 
        $validator = $request->validate([
            'name' => 'required|string',
            'specialityID' => 'required|integer|exists:speciality,id', 
            'image' => 'nullable|image|max:2048', 
            'doctorID' => 'required|integer|exists:doctors,id',
            'userType'=>'required|string',
            'imageChange'=>'required'
        ]);
       
        $userID=intval( $request->input('doctorID'));
        $userType=$request->input('userType');
        if($userType==='doctor'){
            $Article = Article::where('status', 'published')->findOrFail($ArticleID);
            if(!$Article){
                return response()->json(['status'=>404,'massage'=>"Article not found."]);
            }
            if($Article->doctorID===$userID){
                $bool=$request->input('imageChange');
                $boolValue=filter_var($bool,FILTER_VALIDATE_BOOLEAN);
                $count= Article::count();
                if($boolValue){
                    if($request->hasFile('image')){
                        $imagefile=$request->file('image');
                        $imageextension =  Str::uuid()->toString() . '.' . $imagefile->getClientOriginalExtension();
                        $imagename=$count.'.'.$imageextension;
                        $imagePath = $imagefile->Move('ArticlesImages/',$imagename);
                        $validator['image']=$imagePath;
                    }
                    else{
                        $validator['image']='ArticlesImages/default.png';
                    }
                    $Article->image=$validator['image'];
                }
                $Article->name=$validator['name'];
                $Article->specialityID=$validator['specialityID'];        
                $Article->save();        
                return response()->json(['status'=>200,'massage'=>"Article updated successfully."]);
            }
            else{
                return response()->json(['status'=>404,'massage'=>"you can't edit this article."]);
            }
        }    
        else{
            return response()->json(['status'=>404,'massage'=>"you can't edit articles."]);
        }  
    }    




    //like article
    public function like($ArticleID,Request $request)
    {
        $userID=$request->userID;
        $userType=$request->userType;
        if($userType==='patient'){
            $Article = Article::where('status', 'published')->find($ArticleID);
            if(!$Article){
                return response()->json(['status'=>404,'massage'=>"the article does not exist."]);
            }
            $patient=Patient::find($userID);
            if(!$patient){
                return response()->json(['status'=>404,'massage'=>"the user does not exist."]);
            }
            try{
                if (!$patient->likedArticles->contains($Article->id)) {
                    $like=new Like();
                    $like->patientID=$patient->id;
                    $like->articleID=$Article->id;
                    $like->save();
                    $Article->refresh(); // Refresh patient instance to get the latest data

                }
            } catch (\Exception $e) {
                return response()->json(['status'=>404,'message' => 'Something went wrong']);
            }
            return response()->json(['status'=>200,'message' => 'Article liked','likes'=>$Article->likes]);
        }
        else{
            return response()->json(['status'=>404,'massage'=>"you can't like articles"]);
        }  
    }




    //dislike article
    public function dislike($ArticleID,Request $request)
    {
        $userID=$request->userID;
        $userType=$request->userType;
        if($userType==='patient'){
            $Article = Article::where('status', 'published')->find($ArticleID);
            if(!$Article){
                return response()->json(['status'=>404,'massage'=>"the article does not exist."]);
            }
            $patient=Patient::find($userID);
            if(!$patient){
                return response()->json(['status'=>404,'massage'=>"the user does not exist."]);
            }
            try{
                if ($patient->likedArticles->contains($Article->id)) {
                    $like = Like::where('patientID', $patient->id)->where('articleID', $Article->id)->first();
                    if ($like) {
                        // Actually delete the like record
                        $like->delete();
                    }
                }
            } catch (\Exception $e) {
                return response()->json(['status'=>404,'message' =>$e]);
            }
            $Article->refresh();
            return response()->json(['status'=>200,'message' => 'Article disliked','likes'=>$Article->likes]);
        }
        else{
            return response()->json(['status'=>404,'massage'=>"you can't dislike articles"]);
        }
    }




    //report article
    public function report($ArticleID, Request $request)
    {
        $userID=$request->userID;
        $articleID=$ArticleID;
        $patient=Patient::find($userID);
        if(!$patient){
            return response()->json(['status'=>404,'massage'=>"the user does not exist."]);
        }
        $article=Article::where('status', 'published')->find($articleID);
        if(!$article){
            return response()->json(['status'=>404,'massage'=>"the article does not exist."]);
        }
        if (!$patient->reportedArticles->contains($article->id)) {
            $report=new Report();
            $report->patientID=$patient->id;
            $report->articleID=$article->id;
            $report->save();
            $article->refresh();
        }           
        return response()->json(['status'=>200,'message' => 'Article reported']);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


     //delete article
    public function destroy($ArticleID,Request $request)
    {
        $userID=$request->userID;
        $userType=$request->userType;
        if($userType=='doctor'){
            $Article= Article::where('status', 'published')>find($ArticleID);
            if(!$Article){
                return response()->json(['status'=>404,'massage'=>"the article does not exist."]);
            }
            if($userID==$Article->doctorID){
                try{
                    $Article->delete();
                    return response()->json(['status'=>200,'massage'=>"Article deleted successfully."]);
                } catch (\Exception $e) {
                    return response()->json(['status'=>500,'massage'=>"something went wrong"]);
                }
            }
            else{
                return response()->json(['status'=>404,'massage'=>"you can't delete articles."]);
            }
        }
        else if($userType==='admin'){
            $Article= Article::where('status', 'published')->find($ArticleID);
            if(!$Article){
                return response()->json(['status'=>404,'massage'=>"the article does not exist."]);
            }
            try{
                $Article->delete();
                return response()->json(['status'=>200,'massage'=>"Article deleted successfully."]);
            } catch (\Exception $e) {
                return response()->json(['status'=>500,'massage'=>"something went wrong."]);
            }
        }
        else{
            return response()->json(['status'=>404,'massage'=>"you can't delete articles."]);
        }
    }
    
  
}
    

   