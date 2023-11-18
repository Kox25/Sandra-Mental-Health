<!DOCTYPE html>
<html lang="en">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>


<body>
    <h2>Verify Your Email Address</h2>
    <p>Dear {{ $doctor->user_name }},</p>
    <p>Thank you for signing up as a doctor in our app. To complete your registration, please verify your email address by clicking the button below:</p>
    
    <table role="presentation" align="center" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center">
                <a href="{{ route('verify.email', ['token' => $doctor->verification_token]) }}" style="padding: 10px 20px; background-color: #b9f7eb; color: #fffff; text-decoration: none; border-radius: 4px; display: inline-block;">Verify Email Address</a>
            </td>
        </tr>
    </table>
    
    <p>If you did not sign up for an account, please ignore this email.</p>
    <p>Thank you,</p>
    <p>Sandra Team</p>
</body>


</html>