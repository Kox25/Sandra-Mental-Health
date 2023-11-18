<?php

namespace App\Http\Controllers;

 
use App\Models\Chat;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{


    //when the patient open chat with doctor i will called this function 
    //here i just using the chats table in this function   
    public function openChat($patient_id, $doctor_id)
    {
        $patient = Patient::find($patient_id);
        $doctor = Doctor::find($doctor_id);

        // Check if both the patient and doctor exist
        if (!$patient || !$doctor) {
            return response()->json(['message' => 'Cannot start this chat.'], 404);
        }

        // Check if a chat already exists between the patient and doctor
        $chat = Chat::where('patient_id', $patient->id)
            ->where('doctor_id', $doctor->id)
            ->first();

        if ($chat) {
            // If a chat already exists, return the chat information along with patient and doctor details
            return response()->json([
                'message' => 'chat already exist .',
                'chat' => $chat,
                'patient_id' => $patient->id,
                'doctor_id' => $doctor->id,
                'patient_name' => $patient->user_name,
                'doctor_name' => $doctor->user_name,
            ]);
        }

        // If a chat does not exist, create a new chat
        $chat = Chat::create([
            'patient_id' => $patient->id,
            'doctor_id' => $doctor->id,
        ]);

        return response()->json([
            'message' => 'chat created successfully',
            'chat' => $chat,
            'patient_id' => $patient->id,
            'doctor_id' => $doctor->id,
            'patient_name' => $patient->user_name,
            'doctor_name' => $doctor->user_name,
        ]);
    }





    //here the for show the user what he has of chats 
    public function showChat($id)
    {
        $patientChats = Chat::where('patient_id', $id)->get();
        $doctorChats = Chat::where('doctor_id', $id)->get();

        if ($patientChats->count() > 0) {
            $doctorIds = $patientChats->pluck('doctor_id')->toArray();
            $doctors = Doctor::whereIn('id', $doctorIds)->get();

            $patientChatsWithId = $patientChats->map(function ($chat) {
                $chat['chat_id'] = $chat->id;
                return $chat;
            });

            return response()->json([
                'chats' => $patientChatsWithId,
                'users' => $doctors,
            ]);
        } elseif ($doctorChats->count() > 0) {
            $patientIds = $doctorChats->pluck('patient_id')->toArray();
            $patients = Patient::whereIn('id', $patientIds)->get();

            $doctorChatsWithId = $doctorChats->map(function ($chat) {
                $chat['chat_id'] = $chat->id;
                return $chat;
            });

            return response()->json([
                'chats' => $doctorChatsWithId,
                'users' => $patients,
            ]);
        } else {
            return response()->json(['message' => 'No Chats Available'], 200);
        }
    }





    //when doctor or patient send message i will call this function  
    public function sendMessage($sender_id, $recever_id, Request $request)
    {
        //to sure from data that send in the class Request 
        $message = $request->validate([
            "message" => 'string',
        ]);

        // Check if the sender is a patient or doctor
        $sender = Patient::where('id', $sender_id)->first();
        if (!$sender) {
            $sender = Doctor::where('id', $sender_id)->first();
            if (!$sender) {
                return response()->json(['message' => 'Invalid sender ID.'], 404);
            }
        }
        $recever = Patient::where('id', $recever_id)->first();
        if (!$recever) {
            $recever = Doctor::where('id', $recever_id)->first();
            if (!$recever) {
                return response()->json(['message' => 'Invalid recever ID.'], 404);
            }
        }

        //check if the chat exist between the patient and doctor and take the id of this chat to add for messages table 
        $chat = null;
        if ($chat = Chat::where('patient_id', $sender->id)->where('doctor_id', $recever->id)->first()) {
            //create record in messages table 
            $Message = Message::create([
                'message' => $message['message'],
                'sender_id' => $sender->id,
                'recever_id' => $recever->id,
                'chat_id' => $chat->id,
            ]);
            return response()->json([
                'message' => $Message,
                'sender_id' => $sender->id,
                'recever_id' => $recever->id,
                'sender_name' => $sender->user_name,
                'recever_name' => $recever->user_name,
                'chat_id' => $chat->id,
            ]);
        } else if ($chat = Chat::where('patient_id', $recever->id)->where('doctor_id', $sender->id)->first()) {
            //create record in messages table 
            $Message = Message::create([
                'message' => $message['message'],
                'sender_id' => $sender->id,
                'recever_id' => $recever->id,
                'chat_id' => $chat->id,
            ]);
            return response()->json([
                'message' => $Message,
                'sender_id' => $sender->id,
                'recever_id' => $recever->id,
                'sender_name' => $sender->user_name,
                'recever_name' => $recever->user_name,
                'chat_id' => $chat->id,
            ]);

        } else if (!$chat) {
            // If the chat doesn't exist, you may need to handle this case appropriately
            return response()->json(['message' => 'Chat does not exist.'], 404);
        }

    }






    //when doctor or patient open the chat i will call this function to show the message if exist 
    public function showMessages(Request $request, $id)
    {
        $chat = Chat::where('id', $id)->first();
        
        if (!$chat) {
            return response()->json(['error' => 'Chat not found'], 404);
        }

        // Fetch all the messages of this chat
        $messages = Message::where('chat_id', $chat->id)->get();
        
        return response()->json([
            'messages' => $messages,
            'chat' => $chat , 
        ]);
    }












    public function GetChatByID($id)
    {
        $chat_id = Chat::where('id', $id)->first();
        if ($chat_id) {
            return $chat_id;
        } else {
            return response()->json(
                [
                    'message' => 'This chat does not exist ',
                ]
            );
        }
    }




    //this function for delete chat 
    public function deleteChat($id, $user_id)
    {
        $chat = Chat::find($id);
    
        if ($chat) {
            // to delete the messages associated by it 
            $chat->messages()->delete();
    
            // to delet the chat 
            $chat->delete();
    
            // to show the list of the user
            return $this->showChat($user_id);
        }
    
        return response()->json(['message' => 'الدردشة غير موجودة.'], 404);
    }



    //this funcion for detect if the user active or not 
    public function isActive($id)
    {

    }


}