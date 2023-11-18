<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
 
//this signupRequest just for patient i will create one for the doctors
class SignupRequest extends FormRequest
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
            'email' => 'required|email|string|unique:patients,email',
            'password' => [
                'required',
                'confirmed',
                \Illuminate\Validation\Rules\Password::min(8)
            ]
        ];
    }
}
