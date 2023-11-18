<?php

namespace App\Mail;

use App\Models\Doctor;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DoctorVerificationEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $doctor;

    public function __construct($doctor)
    {
        $this->doctor = $doctor;
    }


    public function build()
    {
        return $this->view('doctor_verification')
            ->with('doctor', $this->doctor)
            ->from('klora756@gmail.com', 'sandra')
            ->subject('Verify Your Email Address');
    }

    /**
     * Get the message envelope.
     */


    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Doctor Verification Email',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'doctor_verification',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
