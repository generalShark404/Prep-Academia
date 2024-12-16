# custom_payload_handler.py
import jwt
from django.contrib.auth.models import User
from django.conf import settings
from . import models

# def custom_payload_handler(token):
#     algorithms = ['HS256']
#     try:
#         decoded_token = jwt.decode(
#             token,
#             settings.SECRET_KEY,
#             algorithms=algorithms
#         )
#         user_id = decoded_token.get('user_id')

#         # Fetch additional user data if needed
#         # user = models.UserProfile.objects.filter(user_id=user_id)
#         # user_obj =  None
#         # for i in user:
#         #     print(i.id)
#         #     user_obj = i
#         # print(user_obj)
#         # email = user.email  # Example: Fetching the user's email

#         payload = {
#             'user_id':user_id,
#             # 'id':user.id,
#             # 'username':user.username,
#             # 'email': email,  # Include additional data as needed
#         }
#         return payload
#     except jwt.ExpiredSignatureError:
#         # Handle token expiration
#         return {'error': 'Token has expired.'}
#     except jwt.InvalidTokenError:
#         # Handle invalid token
#         return {'error': 'Invalid token.'}


# from django.contrib.auth.models import User
# # from rest_framework_simplejwt.utils import 
# import jwt

# def custom_payload_handler(token):
#     algorithms = ['HS256']
#     decoded_token = jwt.decode(
#         token,
#         options={"verify_signature":True},
#         algorithms=algorithms)
#     payload = {
#         'id': decoded_token['user_id'],
#         'username': decoded_token['username'],
#     }
#     return payload