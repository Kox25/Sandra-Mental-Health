<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
class CategoriesController extends Controller
{
    public function getAll(){
        $Category= Category::all();
        return response()->json(['status'=>200,'Category'=>$Category]);
    }
    
    public function insert(){
        $cats=[  
            [
                'name'=>"Disorders",
                'description'=>"Information on common disorders like depression, anxiety, and treatment options",
                'image'=>"../images/category/Stress-Management.png"
            ],
            [
                'name'=>"Stress Management",
                'description'=>"Tips for coping with stress and daily pressures",
                'image'=>"../images/category/Stress-Management.png"
            ],  
            [
                'name'=>"Youth Mental Health",
                'description'=>"Guidance on issues affecting young people",
                'image'=>"../images/category/Stress-Management.png"
            ],  
            [
                'name'=>"Relationships",
                'description'=>"Improving personal connections and communication",
                'image'=>"../images/category/Stress-Management.png"
            ],  
            [
                'name'=>"Self-Improvement",
                'description'=>"Tips for personal growth and well-being",
                'image'=>"../images/category/Stress-Management.png"
            ],
            [
                'name'=>"Elderly Mental Health",
                'description'=>"Addressing psychological challenges in seniors",
                'image'=>"../images/category/Stress-Management.png"
            ],
            [
                'name'=>"Therapy",
                'description'=>"Seeking and benefiting from psychological help",
                'image'=>"../images/category/Stress-Management.png"
            ],  
            [
                'name'=>"Psychology Basics",
                'description'=>"Basics of psychology and understanding mental factors",
                'image'=>"../images/category/Stress-Management.png"
            ],  
            [
                'name'=>"Culture & Mental Health",
                'description'=>"How culture impacts mental health",
                'image'=>"../images/category/Stress-Management.png"
            ],
            [
                'name'=>"Prevention & Wellness",
                'description'=>"Tips for staying mentally healthy and preventing disorders",
                'image'=>"../images/category/Stress-Management.png"
            ],
        ];
        Category::insert($cats);
        return "hello";
    }
}