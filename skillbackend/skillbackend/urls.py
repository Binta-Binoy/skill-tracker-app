
from django.contrib import admin
from django.urls import path
from skilltracker import views

urlpatterns = [
    path('signup/', views.Signup),
    path('login/', views.Login),
    path('createskill/', views.create_skill),
    path('listskills/', views.list_skills),
    path('get-titles-and-notes/<int:skill_id>/', views.get_titles_and_notes),
    path('addskill/', views.create_skill_with_resource),
    path('resource-details/<int:resource_id>/', views.get_resource_details),
    path('update-learning-resource/<int:resource_id>/', views.update_learning_resource),
    path('total-hours/', views.get_total_hours),
    path('completed-resources/', views.get_completed_resources_count),
    path('learning-categories/', views.get_learning_categories),
    path('total-courses/', views.total_courses),
    path('get-skill-name/<int:skill_id>/', views.get_skill_name),
]
