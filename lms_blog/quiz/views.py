import json
import logging

from django.apps import apps
from django.db import transaction
from django.shortcuts import render
from django.db.models import Prefetch
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import HttpResponse,JsonResponse

from rest_framework.pagination import PageNumberPagination
from rest_framework import permissions
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import renderer_classes
from rest_framework.views import Response, status,APIView

from .models import (
     Quiz, 
     Question, 
     Answer, 
     Results,
     UserAnswer
)

from .serializer import (
     QuizSerializer,
     AnswerSerializer, 
     ResultsSerializer,
     QuestionSerializer,
     AddQuestionSerializer, 
)

from main.views import (
     IsInstructor,
     StandardResultSetPagination
)

class QuizListView(APIView):
     serializer_class = QuizSerializer
     pagination_class = StandardResultSetPagination
     permission_classes = (permissions.IsAuthenticated, IsInstructor)

     def get_queryset(self):
          return Quiz.objects.filter(instructor=self.request.user.instructor)

     def get(self, request, *args, **kwargs):
          try:              
               course_id = kwargs.get('course_id')      
               quiz = Quiz.objects.filter(course_id=course_id)
               serializer = self.serializer_class(quiz, many=True)
               # print('serializer', serializer.data)
               return Response({'quiz': serializer.data})
          except Quiz.DoesNotExist:
               return Response({'error':'No quiz yet'})
          
     def post(self, request, *args, **kwargs):
          quiz_data = request.data
          name = quiz_data.get('name')
          course = quiz_data.get('course')
          instructor_id = request.user.instructor.id
          difficulty = quiz_data.get('difficulty')
          pass_mark = quiz_data.get('pass_mark')
          duration_time = quiz_data.get('duration_time')

          try:
               pass_mark = int(pass_mark)
               duration_time =  int(duration_time)
          except ValueError:
               return Response({'message':'Pass Mark and Duration Time must be valid integers.'}, status=status.HTTP_400_BAD_REQUEST)
          
          if not difficulty or difficulty == "Select Difficulty":
               return Response({'message':'Difficulty level must be selected.'}, status=status.HTTP_400_BAD_REQUEST)

          if not name:
               return Response({'error':'name is required'},status=status.HTTP_400_BAD_REQUEST)
          if not course:
               return Response({'error':'course is required'},status=status.HTTP_400_BAD_REQUEST)
          if not instructor_id:
               return Response({'error':'instructor id is required'},status=status.HTTP_400_BAD_REQUEST)
          if not difficulty:
               return Response({'error':'difficulty is required'},status=status.HTTP_400_BAD_REQUEST)
          if not pass_mark:
               return Response({'error':'pass mark is required'},status=status.HTTP_400_BAD_REQUEST)
          if not pass_mark:
               return Response({'error':'pass mark is required'},status=status.HTTP_400_BAD_REQUEST)
          if not duration_time:
               return Response({'error':'duration time is required'},status=status.HTTP_400_BAD_REQUEST)
          
          try:
               instructor =  apps.get_model('instructor', 'Instructor').objects.get(id=instructor_id)
          except apps.get_model('instructor','Instructor').DoesNotExist:
               return Response({'error':'instructor not found'},status=status.HTTP_404_NOT_FOUND)
          
          try:
               course = apps.get_model('main', 'Course').objects.get(id=course)
          except apps.get_model('main','Course').DoesNotExist:
               return Response({'error':'course not found'},status=status.HTTP_404_NOT_FOUND)
          
          if course.instructor !=  instructor:
               return Response({'message':'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
                    
          quiz = Quiz(name=name, course=course, instructor=instructor, difficulty=difficulty, required_score_to_pass=pass_mark, duration_time=duration_time)
          quiz.save()
          return Response({'message':'Quiz created successfully', 'quiz_id': quiz.id}, status=status.HTTP_201_CREATED)
          

# class Result(APIView):
#     pagination_class = StandardResultSetPagination

#     def get(self, request, pk):
#         try:
#             user = request.user
#             quiz = Quiz.objects.get(id=pk)
#             questions = quiz.question_set.all()
#             user_answers = request.query_params  # Assume frontend sends answers as query params
#             no_of_questions = questions.count()

#             # Ensure user is a valid student
#             student = get_object_or_404(apps.get_model('student', 'Student'), student=user.id)

#             unanswered_results = []
#             answered_results = []

#             for question in questions:
#                 user_answer = user_answers.get(question.text)
#                 correct_answers = Answer.objects.filter(question=question, correct=True)
#                 correct_answer_serializer = json.loads(json.dumps(AnswerSerializer(correct_answers, many=True).data))
 
#                 if user_answer is None:
#                     # Add unanswered question details
#                     unanswered_results.append({
#                         'id': question.id,
#                         'question': question.text,
#                         'user_answer': "No answer provided",
#                         'correct': False,
#                         'correct_answer': correct_answer_serializer
#                     })
#                 else:
#                     try:
#                         answer = Answer.objects.get(question=question, text=user_answer)
#                         answered_results.append({
#                             'id': question.id,
#                             'question': question.text,
#                             'user_answer': user_answer,
#                             'correct': answer.correct,
#                             'correct_answer': correct_answer_serializer
#                         })
#                     except Answer.DoesNotExist:
#                         answered_results.append({
#                             'id': question.id,
#                             'question': question.text,
#                             'user_answer': user_answer,
#                             'correct': False,
#                             'correct_answer': correct_answer_serializer
#                         })

#             results = unanswered_results + answered_results

#             # Paginate and return the results
#             paginator = self.pagination_class()
#             paginated_results = paginator.paginate_queryset(results, request)
#             return paginator.get_paginated_response({'quiz':paginated_results})

#         except Exception as e:
#             logging.error(e)
#             return Response({'error': str(e)}, status=400)
#     def post(self, request, pk):
#         try:
#             return self.process_result(request, pk)
#         except Exception as e:
#             logging.error(e)
#             logging.error(request.user.id)
#             return Response({'error': str(e)}, status=400)

#     def process_result(self, request, pk):
#         user = request.user
#         quiz = Quiz.objects.get(id=pk)
#         questions = quiz.question_set.all()
#         user_answers = request.data  # Ensure this is a dictionary
#         no_of_question = quiz.question_set.count()

#         # Ensure user is a valid student
#         student = get_object_or_404(apps.get_model('student', 'Student'), student=user.id)

#         score = 0
#         multiplier = 100 / no_of_question
#         results = []

#         for question in questions:
#             user_answer = user_answers.get(question.text)
#             correct_answer = Answer.objects.filter(question=question, correct=True)
#             correct_answer_serializer = json.loads(json.dumps(AnswerSerializer(correct_answer, many=True).data))

#             if user_answer is None:
#                 results.append({
#                     'id': question.id,
#                     'question': question.text,
#                     'user_answer': "No answer provided",
#                     'correct': False,
#                     'correct_answer': correct_answer_serializer
#                 })
#                 continue

#             try:
#                 answer = Answer.objects.get(question=question, text=user_answer)
#                 if answer.correct:
#                     score += 1
#                 results.append({
#                     'id': question.id,
#                     'question': question.text,
#                     'user_answer': user_answer,
#                     'correct': answer.correct,
#                     'correct_answer': correct_answer_serializer
#                 })
#             except Answer.DoesNotExist:
#                 results.append({
#                     'id': question.id,
#                     'question': question.text,
#                     'user_answer': user_answer,
#                     'correct': False,
#                     'correct_answer': correct_answer_serializer
#                 })

#         score_ = round(score * multiplier, 1)

#         # Save results
#         if user != 'AnonymousUser' and user.is_student:
#             Results.objects.update_or_create(
#                 quiz=quiz,
#                 user=student,
#                 defaults={'score': score_}
#             )

#         # Paginate and serialize results
#         paginator = self.pagination_class()
#         paginated_results = paginator.paginate_queryset(results, request)
#         return paginator.get_paginated_response({
#             'quiz': paginated_results,
#             'score': score_,
#         })

class Result(APIView):
    pagination_class = StandardResultSetPagination

    def get(self, request, pk):
        try:
            user = request.user
            quiz = Quiz.objects.get(id=pk)

            # Ensure user is a valid student
            student = get_object_or_404(apps.get_model('student', 'Student'), student=user.id)
            result = get_object_or_404(Results, quiz=quiz, user=student)

            # Retrieve all UserAnswer entries for the result
            user_answers = UserAnswer.objects.filter(result=result).select_related('question', 'selected_answer')



            print('Result 1', result.score)
            # Prepare paginated results
            paginator = self.pagination_class()
            paginated_answers = paginator.paginate_queryset(user_answers, request)

            # Serialize the data
            results = []
            for user_answer in paginated_answers:
                correct_answers = Answer.objects.filter(question=user_answer.question, correct=True)
                correct_answer_serializer = AnswerSerializer(correct_answers, many=True)

                results.append({
                    'id': user_answer.question.id,
                    'question': user_answer.question.text,
                    'user_answer': user_answer.selected_answer.text if user_answer.selected_answer else "No answer provided",
                    'correct': user_answer.is_correct,
                    'correct_answer': correct_answer_serializer.data,
                })

            return paginator.get_paginated_response(
                 (results, {'score':result.score, 'pass_mark':quiz.required_score_to_pass})
             )

        except Exception as e:
            logging.error(e)
            return Response({'error': str(e)}, status=400)

    def post(self, request, pk):
        try:
            return self.process_result(request, pk)
        except Exception as e:
            logging.error(e)
            return Response({'error': str(e)}, status=400)

    def process_result(self, request, pk):
     user = request.user
     quiz = Quiz.objects.get(id=pk)
     questions = quiz.question_set.all()
     user_answers = request.data  # Ensure this is a dictionary
     no_of_questions = questions.count()

     # Ensure user is a valid student
     student = get_object_or_404(apps.get_model('student', 'Student'), student=user.id)

     score = 0
     multiplier = 100 / no_of_questions

     # Create or update the result object
     result, _ = Results.objects.update_or_create(
          quiz=quiz,
          user=student,
          defaults={'score': 0}
     )

     # Process each question
     for question in questions:
          user_answer_text = user_answers.get(question.text)
          correct_answers = Answer.objects.filter(question=question, correct=True)

          try:
               selected_answer = Answer.objects.get(question=question, text=user_answer_text)
               is_correct = selected_answer.correct
          except Answer.DoesNotExist:
               selected_answer = None
               is_correct = False

          # Update or create the UserAnswer record
          user_answer, created = UserAnswer.objects.update_or_create(
               result=result,
               question=question,
               defaults={
                    'selected_answer': selected_answer,
                    'is_correct': is_correct
               }
          )

          # Update score if the answer is correct
          if is_correct:
               score += 1

     # Update the result score
     result.score = round(score * multiplier, 1)
     result.save()

     return Response({'message': 'Results submitted successfully', 'score': result.score}, status=201)



def submit_quiz(request, quiz_id):
    user = request.user
    quiz = Quiz.objects.get(id=quiz_id)
    selected_answers = request.POST  # Assuming the frontend sends selected answers via POST.
    
    # Create or get Results
    result, created = Results.objects.get_or_create(user=user, quiz=quiz)

    score = 0
    total_questions = quiz.question_set.count()

    for question_id, answer_id in selected_answers.items():
        question = Question.objects.get(id=question_id)
        answer = Answer.objects.get(id=answer_id)

        # Create UserAnswer
        user_answer = UserAnswer.objects.create(
            result=result,
            question=question,
            selected_answer=answer
        )

        # Update score if correct
        if answer.correct:
            score += 1

    # Finalize result
    result.score = (score / total_questions) * 100
    result.save()

    return JsonResponse({"message": "Quiz submitted successfully", "score": result.score})

class Quiz_data(APIView):
     serializer_class = QuestionSerializer
     pagination_class = StandardResultSetPagination

     def get(self, request, pk):
          quiz = Quiz.objects.get(pk=pk)

          if quiz.instructor != request.user.instructor:
               return Response(status=status.HTTP_401_UNAUTHORIZED)

          questions = quiz.get_questions()
          serializer = self.serializer_class(questions, many=True)

          paginator = self.pagination_class()
          paginated_questions = paginator.paginate_queryset(questions, request)
          serializer = self.serializer_class(paginated_questions, many=True)
          return paginator.get_paginated_response(
               {
                    'quiz': serializer.data, 
                    'pass_mark':quiz.required_score_to_pass
               }
          )
     
     def post(self, request, pk):
          try:
               user = request.user
               quiz = Quiz.objects.get(id=pk)
           
               if quiz.instructor != request.user.instructor:
                   return Response(status=status.HTTP_401_UNAUTHORIZED)

               questions = quiz.question_set.all()
               user_answers = request.data  # Ensure this is a dictionary
               no_of_question = quiz.question_set.count()

               # Ensure user is a valid student
               student = get_object_or_404(apps.get_model('student', 'Student'), student=user.id)

               score = 0
               multiplier = 100 / no_of_question
               results = []

               for question in questions:
                    # Get user's answer for the question text
                    user_answer = user_answers.get(question.text)  # Ensure `question.text` is valid
                    correct_answer = Answer.objects.filter(question=question, correct=True)
                    correct_answer_serializer = json.loads(json.dumps(AnswerSerializer(correct_answer, many=True).data))

                    # Handle missing answer
                    if user_answer is None:
                         results.append({
                              'id': question.id,
                              'question': question.text,
                              'user_answer': "No answer provided",
                              'correct': False,
                              'correct_answer': correct_answer_serializer
                         })
                         continue

                    try:
                         # Fetch answer object
                         answer = Answer.objects.get(question=question, text=user_answer)
                         if answer.correct:
                              score += 1
                              results.append({
                              'id': question.id,
                              'question': question.text,
                              'user_answer': user_answer,
                              'correct': True,
                              'correct_answer': correct_answer_serializer
                              })
                         else:
                              results.append({
                              'id': question.id,
                              'question': question.text,
                              'user_answer': user_answer,
                              'correct': False,
                              'correct_answer': correct_answer_serializer
                              })
                    except Answer.DoesNotExist:
                         # Handle case where user_answer doesn't match any valid answer
                         results.append({
                              'id': question.id,
                              'question': question.text,
                              'user_answer': user_answer,
                              'correct': False,
                              'correct_answer': correct_answer_serializer
                         })

               # Calculate final score
               score_ = round(score * multiplier, 1)

               # Save results to the database
               if user != 'AnonymousUser' and user.is_student:
                    Results.objects.update_or_create(
                         quiz=quiz,
                         user=student,
                         defaults={'score': score_}
                    )

               # Paginate and serialize results
               paginator = self.pagination_class()
               paginated_results = paginator.paginate_queryset(results, request)
               serializer = AnswerSerializer(paginated_results, many=True)
               return paginator.get_paginated_response({
                    'quiz': paginated_results,
                    'score': score_
               })

          except Exception as e:
               logging.error(e)
               return Response({'error': str(e)}, status=400)
     
     def put(self, request, *args, **kwargs):
          try:
               user = request.user
               quiz_id = kwargs.get('pk')
               quiz = Quiz.objects.get(id=quiz_id)

               if quiz.instructor != request.user.instructor:
                    return Response(status=status.HTTP_401_UNAUTHORIZED)
               
               quiz_data = request.data.get('quiz_data')
               if not quiz_data:
                    return Response({'error':'No data provided'}, status=status.HTTP_400_BAD_REQUEST)
               
               quiz_questions = json.loads(quiz_data)
               
               if not isinstance(quiz_questions, list):
                    return Response({'error':'Invalid data format'}, status=status.HTTP_400_BAD_REQUEST)
               
               with transaction.atomic():
                    for question in quiz_questions:
                         question_id = question.get('id')
                         question_text = question.get('question')
                         question_answers = question.get('answers')

                         print("Question: ", question)

                         for answers in question_answers:
                              try:
                                   answer_id = answers.get('id')
                                   answer_text = answers.get('text')
                                   answer_explanation = answers.get('explanation')

                                   print("Answer Explanation: ",answer_explanation)

                                   if answer_id and answer_text:
                                        AnswerModel = Answer.objects.get(id=answer_id)
                                        AnswerModel.text = answer_text
                                        AnswerModel.explanation = answer_explanation
                                        AnswerModel.save()
                                   else:
                                        logging.error(f"All Answer fields required")
                                        return Response({'error':'Answer field required'}, status=status.HTTP_400_BAD_REQUEST)
                              except Answer.DoesNotExist:
                                   logging.error(f"Answer with the Id {answer_id} does not exist")
                                   return Response({'error':f'Answer with the id {answer_id} does not exists'})
                              # return Response({'success':'Answers Updated successfully'})
                              
                         if question_id and question_text:
                              try:
                                   QuestionModel = Question.objects.get(id=question_id)
                                   QuestionModel.text = question_text

                                   QuestionModel.save()
                                   logging.error('Question saved !')

                              except Question.DoesNotExist:
                                   return Response({'error':f'question with id {question_id} does not exist '}, status=status.HTTP_400_BAD_REQUEST)
                         else:
                              print('All Questions needed !')
                              return Response({'error':'All fields required !'}, status=status.HTTP_400_BAD_REQUEST)
               return Response({'success':'Questions updated successfully'}, status=status.HTTP_200_OK)
          except Exception as e:
               logging.error(f"Error updating question {e}")
               return Response({'error':'An unexpected error occured'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
          
     def delete(self, request, *args, **kwargs):
          question_id = kwargs.get('pk')

          if question_id:
               try:
                    QuestionModel = Question.objects.get(id=question_id)
                    QuestionModel.delete()
               except Question.DoesNotExist:
                    logging.error(f"Question does not exist")
                    return Response({'error':'Something occured !'}, status=status.HTTP_400_BAD_REQUEST)

          else:
               logging.error(f"Question with question id {question_id} does not exist")
               return Response({'error':'Something occured !'}, status=status.HTTP_400_BAD_REQUEST)
          return Response({'message':'Question deletd successfully'}, status=status.HTTP_200_OK)
     


class GetInstructorQuiz(APIView):
     permission_classes = (permissions.IsAuthenticated, IsInstructor)
     
     def get(self, request):
          quiz = Quiz.objects.filter(instructor=request.user.instructor)
          
          if not quiz.exists():
               return Response({'error':'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)
          
          serializer = QuizSerializer(quiz, many=True)
          return Response({'instructor_quiz': serializer.data})


class AddQuizQuestionAndAnswer(APIView):
     permission_classes = (permissions.IsAuthenticated, )

     def post(self, request, *args, **kwargs):
        try:
          quiz_id = kwargs.get('quiz_id')
          instructor_id = request.user.instructor.id
          
          quiz = Quiz.objects.get(id=quiz_id) 

          question_text = request.data.get('question')
          explanation_text = request.data.get('explanation')
          correct_answer = request.data.get('correct')

          optionA = request.data.get('optionA')
          optionB = request.data.get('optionB')
          optionC = request.data.get('optionC')
          optionD = request.data.get('optionD')

          print("instructor_id", instructor_id)
          print("quiz.instructor.id", quiz.instructor.id)

          if quiz.instructor.id == instructor_id:
               answers = [
                    {
                         'text': optionA, 
                         'correct': request.data.get('optionA') == correct_answer,
                         'explanation': explanation_text if optionA == correct_answer else "NULL"
                    },
                    {
                         'text':optionB, 
                         'correct': optionB == correct_answer,
                         'explanation': explanation_text if optionB == correct_answer else "NULL" 
                    },
                    {
                         'text': optionC, 
                         'correct': optionC == correct_answer,
                         'explanation': explanation_text if optionC == correct_answer else "NULL" 
                    },
                    {
                         'text': optionD, 
                         'correct': optionD == correct_answer,
                         'explanation':explanation_text if optionD == correct_answer else "NULL" 
                    },
               ]
               question_data = {
                    'text':question_text, 
                    'answers':answers, 
                    'explanation':explanation_text, 
                    'quiz':quiz_id
               }
               print(question_data)
               serializer = AddQuestionSerializer(data=question_data)
               
               # print(q)
               if serializer.is_valid():
                    print('Done')
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
               return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          else:
               return Response(status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
           logging.error(e)
     
class GetStudentQuiz(APIView):
     permission_classes = (permissions.IsAuthenticated, )

     def get(self, request, *args, **kwargs):
          student_id = request.user.student.id
          # student_id = kwargs.get('student_id')
          student = get_object_or_404( apps.get_model('student','Student'), id=student_id)

          # print("Student", student)
          enrollments = apps.get_model('student','StudentCourseEnrolled').objects.filter(student=student).prefetch_related(
               Prefetch('course__quiz_set', queryset=Quiz.objects.all())
          )

          quizzes = []
          for enrollment in enrollments:
               course = enrollment.course
               quizzes.extend(course.quiz_set.all())
          
          serializer = QuizSerializer(quizzes, many=True)
          pass
          return Response({'quiz': serializer.data})
     
class GetQuizResults(APIView):
     serializer_class = ResultsSerializer
     
     def get(self, request, *args, **kwargs):
          # print(request.user)
          print('req.user.student')
          print(dir(request.user))
          student_id = request.user.student.id
          print("Quiz result Student ID: ",student_id)
          student = apps.get_model('student','Student').objects.get(id=student_id)
          results = Results.objects.filter(user=student.id)
          print(results)
          serializer = self.serializer_class(results, many=True)

          # return Response({'results': ""})
          return Response({'results': serializer.data})
     
class GetUpdateDeleteQuiz(APIView):
     permission_classes = (permissions.IsAuthenticated, IsInstructor)
     serializer_class = QuizSerializer

     def get(self, request, *args, **kwargs):
          quiz_id = self.kwargs.get('quiz_id')
          quiz = Quiz.objects.get(id=quiz_id)
          
          if quiz.instructor.id != request.user.instructor.id:
               return Response(status=status.HTTP_401_UNAUTHORIZED)
          
          serializer = self.serializer_class(quiz)

          return Response({'quiz':serializer.data})
     
     def put(self, request, *args, **kwargs):
          quiz_id = self.kwargs.get('quiz_id')
          quiz = Quiz.objects.get(id=quiz_id)
          
          if quiz.instructor.id != request.user.instructor.id:
               return Response(status=status.HTTP_401_UNAUTHORIZED)
          
          data = request.data
          
          if data.get('name'):
               quiz.name = data['name']
          if data.get('pass_mark'):
               quiz.required_score_to_pass = data['pass_mark']
          if data.get('duration_time'):
               quiz.duration_time = data['duration_time']
          if data.get('difficulty'):
               quiz.difficulty = data['difficulty']

          try:
               with transaction.atomic():
                    quiz.save()
          except Exception as e:
               pass
          return Response({'message':'Quiz Edited Successfuly'})
          
     def delete(self, request, *args, **kwargs):
         quiz_id = kwargs.get('quiz_id')
     
         quiz = Quiz.objects.get(id=quiz_id)
         if quiz.instructor.id != request.user.instructor.id:
              quiz.delete()
              return Response(status=status.HTTP_401_UNAUTHORIZED)
         return Response(status=status.HTTP_200_OK)