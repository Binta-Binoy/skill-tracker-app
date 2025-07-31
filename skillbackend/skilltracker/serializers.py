from rest_framework import serializers
from .models import Skill, LearningResource

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'description', 'user', 'created_at']
        read_only_fields = ['id', 'created_at']

class LearningResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningResource
        fields = '__all__'