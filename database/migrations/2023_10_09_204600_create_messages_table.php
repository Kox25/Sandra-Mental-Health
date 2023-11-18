<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            //body of message 
            $table->text('message'); 
            //these value i will take it from the message sender 
            $table->unsignedBigInteger('sender_id'); 
            $table->unsignedBigInteger('recever_id'); 
            //this value i will take it from the chats table 
            $table->unsignedBigInteger('chat_id'); 
            $table->foreign('chat_id')
            ->references('id')
            ->on('chats')
            ->onDelete('cascade'); 

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
