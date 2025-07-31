from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email,name,password = None):
        if not email:
             raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email,name= name)
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
 
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

RESOURCE_TYPES = [
    ('video', 'Video'),
    ('course', 'Course'),
    ('article', 'Article'),
]

PLATFORMS = [
    ('youtube', 'YouTube'),
    ('udemy', 'Udemy'),
    ('coursera', 'Coursera'),
    ('other', 'Other'),
]

PROGRESS_STATUS = [
    ('not_started', 'Not Started'),
    ('in_progress', 'In Progress'),
    ('completed', 'Completed'),
]

class Skill(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    user = models.ForeignKey(User,on_delete=models.CASCADE, default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class LearningResource(models.Model):
    skill = models.ForeignKey(Skill, related_name='resources', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    status = models.CharField(max_length=20, choices=PROGRESS_STATUS, default='not_started')
    hours_spent = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    notes = models.TextField(blank=True)
    difficulty = models.PositiveSmallIntegerField(default=0) 
    platform = models.CharField(max_length=20, choices=PLATFORMS)
    url = models.URLField(blank=True)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    




