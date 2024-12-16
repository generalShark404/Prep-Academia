from django.utils.deprecation import MiddlewareMixin

class SessionMiddleWare(MiddlewareMixin):
    def process_response(self, request, response):
        if request.session.session_key:
            response['Set-Cookie'] = f"sessionid={request.session.session_key}"
            return response