<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;


use Illuminate\Support\Facades\Schema;
use App\Models\Article;
use Carbon\Carbon;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->updateArticles();
    }
    
    private function updateArticles()
    {
        $articles = Article::where(function ($query) {
            $query->where('status', 'pending')
                ->orWhere('status', 'adminChoice');
        })
            ->where('date', '<', Carbon::now()->subWeek())
            ->get();

        foreach ($articles as $article) {
            $article->update(['date' => Carbon::now()]);
        }
    }
}