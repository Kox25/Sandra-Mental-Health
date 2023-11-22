<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\DB;
use App\Models\Article;

class Kernel extends ConsoleKernel
{
  
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Schedule the command to run daily
        $schedule->call(function () {
            $articles = Article::where(function ($query) {
                $query->where('status', 'pending')
                    ->orWhere('status', 'adminChoice');
            })
                ->where('date', '<', Carbon::now()->subWeek())
                ->get();
    
            foreach ($articles as $article) {
                $article->update(['date' => Carbon::now()]);
            }        })->dailyAt('00:00');
    
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}