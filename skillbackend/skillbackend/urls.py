
from django.contrib import admin
from django.urls import path
from skilltracker import views

urlpatterns = [
    path('signup/', views.Signup),
    path('login/', views.Login),
    path('createskill/', views.create_skill),
    path('listskills/', views.list_skills),
    path('resourcenotes/', views.get_titles_and_notes),
    path('addskill/', views.create_skill_with_resource),
    # path('updateskill/<int:skill_id>/',views.update_skill_with_resource),

]
