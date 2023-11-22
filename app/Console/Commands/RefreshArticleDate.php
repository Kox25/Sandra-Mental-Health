<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use Carbon\Carbon;

class RefreshArticleDate extends Command
{
    protected $signature = 'refresh:article-date';
    protected $description = 'Refresh the date of articles that are a week old and have a specific status.';
    public function handle()
    {
        \Log::info('Scheduled task executed successfully.');
        $articles = Article::where(function ($query) {
            $query->where('status', 'pending')
                ->orWhere('status', 'adminChoice');
        })
            ->where('date', '<', Carbon::now()->subWeek())
            ->get();

        foreach ($articles as $article) {
            $article->update(['date' => Carbon::now()]);
        }

        $this->info('Article dates refreshed successfully.');
    }
}