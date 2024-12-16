import pyotp
from datetime import datetime, timedelta
from django.core.mail import EmailMessage

def send_email(data):
    email = EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email='Prep Academia',
        to=[data['to_email']]
    )
    email.send()

def send_otp(request):
    totp = pyotp.TOTP(pyotp.random_base32(), interval=60)
    otp = totp.now()
    request.session['otp_secret_key'] = totp.secret
    valid_date = datetime.now() + timedelta(minutes=1)
    request.session['otp_valid_date'] = str(valid_date)

    print(f"Your otp is {otp}")
