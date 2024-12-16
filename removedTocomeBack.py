# class StudentRegister(APIView):
#     permission_classes = (permissions.AllowAny, )
#     def post(self, request, format='json'):
#         serializer = CreateUserSerializer(data=request.data)
#         if serializer.is_valid():
#             username = request.data['username']
#             password = request.data['password']
#             confirm_password = request.data['confirm_password']
#             if password != confirm_password:
#                 return Response({'error':'Password do not match'}, status=status.HTTP_400_BAD_REQUEST)
#             if models.User.objects.filter(username=username).exists():
#                     return Response({'error':'Username Exists'}, status=status.HTTP_400_BAD_REQUEST)
#             try:
#                 serializer.validated_data['is_student'] = True
#                 user = serializer.save()
#                 if user:
#                     json = serializer.data
#                     return Response(json, status=status.HTTP_201_CREATED)
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#             except Exception as e:
#                 print(e)
#                 if 'Duplicate entry' in str(e):
#                     return Response({'error':"Email in exists please use another"}, status=status.HTTP_400_BAD_REQUEST)
#                 return Response({'Error':'errrrr.....'})
      
    # def post(self, request, format=None):
    #     data = request.data
    #     username = data['username']
    #     email = data['email']
    #     password = data['password']
    #     re_password = data['re_password']
    #     mobile_number = data['mobile_number']

    #     if password == re_password:
    #         if len(password) < 8:
    #             return Response({'error':'Password must be atleast 8 characters'})
    #         else:
    #             if models.User.objects.filter(username=username).exists():
    #                 return Response({'error':'Username exists try another'})
    #             elif models.User.objects.filter(email=email).exists():
    #                 return Response({'error':'Email exists try another'})
    #             else:
    #                 instructor = models.User.objects.create_user(username=username, email=email, password=password, is_instructor = True)
                    

    #                 instructor = models.User.objects.get(id=instructor.id)
    #                 instructor_profile = models.Instructor.objects.create(instructor=instructor, mobile_number=mobile_number, email=email)
    #                 instructor_profile.save()
    #                 return Response({'success':'Instructor Created successfully'})
    #     else:
    #         return Response({'error':'Passwords do not match !'})

# class IntructorRegister(APIView):
#     permission_classes = (permissions.AllowAny, )
#     def post(self, request, format=None):
#         serializer = InstructorSerializer(data=data)
#         data = request.data
#         username = data['username']
#         email = data['email']
#         password = data['password']
#         re_password = data['re_password']
        
#         # try:
#         if password == re_password:
#                 if password == re_password:
#                         if models.UserProfile.objects.filter(username=username).exists():
#                             return Response({'error':'Username Already exists'})
#                         elif models.UserProfile.objects.filter(email=email).exists():
#                             return Response({'error':'Email Already exists'})
#                         else: 
#                             if len(password) < 6:
#                                 return Response({'error':'Password must be at least 6 characters'})
#                             else:                     
#                                 if serializer.is_valid():
#                                     user = serializer.save()
#                                     if user:
#                                         json = serializer.data
#                                         return Response(json, status=status.HTTP_201_CREATED)
#                                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             return Response({'error':'Passwords do not match'})
        # except:
        #     return Response({'error':'Something occured while registering user'})
    
# class CustomTokenObtainPairView(TokenObtainPairView):
#     permission_classes = (permissions.AllowAny, )
#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#         if response.status_code == 200:
#             response.data['payload'] = custom_payload_handler(response.data['access'])
#             print(request)
#             print(response)
#         return response
# @method_decorator(ensure_csrf_cookie, name='dispatch')
# class GetCSRFToken(APIView):
#     permission_classes = (permissions.AllowAny, )
#     def get(self, request, format=None):
#         return Response({'success':'CSRF cookie set'})
