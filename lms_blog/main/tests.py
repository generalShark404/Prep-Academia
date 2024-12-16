from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from . import models
from .serializers import DiscussionCommentSerializer2
from account.models import User
from django.conf import settings

class DiscussionCommentView2Tests(APITestCase):
    def setUp(self):
        # Create a user and set up client authentication
        self.user = User.objects.create(email='testuser@gmail.com',first_name='test', last_name='user', password='testpassword')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # Set up a course and some comments
        self.course_id = 1  # Assume a course with ID 1 exists or is handled by your setup
        self.comment1 = models.DiscussionComment.objects.create(course_id=self.course_id, content="Top level comment 1", reply_to=None)
        self.comment2 = models.DiscussionComment.objects.create(course_id=self.course_id, content="Top level comment 2", reply_to=None)
        self.reply_comment = models.DiscussionComment.objects.create(course_id=self.course_id, content="Reply to comment 1", reply_to=self.comment1)

    def test_get_top_level_comments_authenticated_user(self):
        # Test if authenticated user can retrieve top-level comments
        url = reverse('discussion-comments', args=[self.course_id])  # Adjust the URL name if necessary
        response = self.client.get(url)

        # Check for status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Fetch expected top-level comments directly from the database
        top_level_comments = models.DiscussionComment.objects.filter(course_id=self.course_id, reply_to__isnull=True)
        serializer = DiscussionCommentSerializer2(top_level_comments, many=True)

        # Check if returned data matches serialized data
        self.assertEqual(response.data, serializer.data)

    def test_get_comments_unauthenticated_user(self):
        # Test if unauthenticated user receives a 403 Forbidden
        self.client.logout()  # Log out the user to make the request unauthenticated
        url = reverse('discussion-comments', args=[self.course_id])  # Adjust the URL name if necessary
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_only_top_level_comments(self):
        # Test if only top-level comments are returned (no replies included)
        url = reverse('discussion-comments', args=[self.course_id])  # Adjust the URL name if necessary
        response = self.client.get(url)

        # Ensure only the top-level comments are returned (not the reply comment)
        self.assertEqual(len(response.data), 2)
        self.assertTrue(all(comment['reply_to'] is None for comment in response.data))
