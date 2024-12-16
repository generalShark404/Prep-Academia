from django.utils.deprecation import MiddlewareMixin
from django.middleware.csrf import get_token

class CSRFMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        response['Set-Cookie'] = f"csrftoken={get_token(request)}; SameSite=None; Secure"
        return response
    
