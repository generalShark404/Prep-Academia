from rest_framework import serializers
from .models import Question, Quiz, Answer, Results
from main.serializers import (
    CourseSerializer,
)

class QuizSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    class Meta:
        model = Quiz
        fields = ["id","instructor", "course", "name", "topic", "duration_time","required_score_to_pass", "difficulty","get_questions_no"]
        many = True
        depth=1

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text', 'correct', 'explanation']

class QuestionSerializer(serializers.ModelSerializer):
    get_answers = AnswerSerializer(many=True)
    
    class Meta:
        model = Question
        fields = ['id', 'text','get_answers']
        depth = 2
    

class AddQuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, write_only=True)
    
    class Meta:
        model = Question
        fields = ['id','text', 'quiz', 'answers']
    
    def create(self, validated_data):
        answer_data = validated_data.pop('answers')
        print("Answer Data", answer_data)
        question = Question.objects.create(**validated_data)
        for answer in answer_data:
            print("Answer", answer)
            Answer.objects.create(question=question, **answer)
        return question

class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Results
        fields = ['quiz', 'score']

        depth = 2