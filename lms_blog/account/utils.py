import pyotp
from datetime import datetime, timedelta
from django.core.mail import EmailMessage

def send_email(data):
    email = EmailMessage(
        subject=data[''],
        body="""
          
        """,
        from_email='[Prep Academia',
        to=[data['email']]
    )
    email.send()

def send_otp(request):
    totp = pyotp.TOTP(pyotp.random_base32(), interval = 60)
    otp = totp.now()
    
    request.session['otp_secret_key'] = totp.secret
    valid_date = datetime.now() + timedelta(minutes=1)
    request.session['otp_valid_date'] = str(valid_date)


    print(f"Your otp is {otp}")

def generate_otp(secret_key):
    totp = pyotp.TOTP(secret_key, interval=60)
    return totp.now()

def verify_otp(secret_key, otp):
    totp = pyotp.TOTP(secret_key, interval=60)
    return totp.verify(otp)
    pass

def send_email_with_otp(email, otp):
    email = EmailMessage(
        subject='Account verification',
        body=f"""
          Hi {email},

          We're almost there! To complete your account setup, we neede to verify your email address.
          if you didn't sign up for an account, feel free to ignore this email.

          Your verification code is: {otp}

          Thanks for taking the time to verify your account!
        """,
        from_email='Prep Academia <no-reply@prepacademia.com>',
        to=['email']
    )
    email.send()
