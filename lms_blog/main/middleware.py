from django.utils.deprecation import MiddlewareMixin
from django.conf import settings

class CSRFTokenMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.get_response = get_response

        def __call__(self, request):
            response = self.get_response(response)
            if settings.CSRF_USE_SESSSION:
                request.META['X_CSRFToken'] = request.session.get('_csrftoken')
                return response