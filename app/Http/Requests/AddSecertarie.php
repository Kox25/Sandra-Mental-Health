<?php

namespace App\Http\Requests;

use App\Models\Doctor;
use App\Models\Secertarie; 
use Illuminate\Foundation\Http\FormRequest;

class AddSecertarie extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    { 
        return [
            'user_name' => 'required|string',
            'email' => 'required|email|string|unique:secertaries,email', 
            'password' => [
                'required',
                'confirmed',
                \Illuminate\Validation\Rules\Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ];
    }
}
