<?php

return [

    'defaults' => [
            'guard' => 'web',
            'passwords' => 'patients',
    ],
    
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'patients',
        ],
        'patients' =>[
            'driver'=>'session',
            'provider'=> 'patients',
        ],
        'secertaries' =>[
            'driver' => 'session',
            'provider' => 'secertaries',
        ],
        'doctors' =>[
            'driver' => 'session',
            'provider' => 'doctors',
        ],
        'admins'=>[
            'driver' =>'session',
            'provider' => 'admins',
        ],
    ],
    'providers' => [
      
        'patients' => [
            'driver' => 'eloquent',
            'model' => App\Models\Patient::class,
        ],
        'doctors' => [
            'driver' => 'eloquent',
            'model' => App\Models\Doctor::class,
        ],
        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class,
        ],
        'secretaries' => [
            'driver' => 'eloquent',
            'model' => App\Models\Secertarie::class,
        ],
    ],

    'passwords' => [
       
        'patients' => [
            'provider' => 'patients',
            'table' => 'patient_password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
        'doctors' => [
            'provider' => 'doctors',
            'table' => 'doctor_password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
        'admins' => [
            'provider' => 'admins',
            'table' => 'admin_password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
        'secretaries' => [
            'provider' => 'secertaries',
            'table' => 'secretary_password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,

];