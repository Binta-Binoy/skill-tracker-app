from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import User
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from .models import Skill, LearningResource
from .serializers import SkillSerializer, LearningResourceSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

#--------------------------------------------- signup --------------------------------------------------------#

@api_view(['POST'])
@permission_classes([AllowAny])
def Signup(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')
    print(name,email,password)
    if not name or not email or not password:
        return Response({'error': 'name, email and password are required'},
                        status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
    name=name,
    email=email,
    password=password)   
   
    return Response({
        'message': 'User registered successfully',
       
    }, status=status.HTTP_201_CREATED)


#-------------------------------------------------------login------------------------------------------#

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def Login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if email is None or password is None:
        return Response({'error': 'Please provide both email and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(email=email, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},status=HTTP_200_OK)


#---------------------------------------------add and get skill in dashboard ----------------------------------------#


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_skill(request):
    data = request.data.copy()
    data['user'] = request.user.id  
    serializer = SkillSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_skills(request):
    skills = Skill.objects.filter(user=request.user).order_by('-created_at')
    serializer = SkillSerializer(skills, many=True)
    return Response(serializer.data)

# #----------------------------------------------add new skill details (resourses) ------------------------------------------#


@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def create_skill_with_resource(request):
        user = request.user
        skill_id = request.data.get("skill")
        skill = get_object_or_404(Skill, id=skill_id, user=user)

        resource_data = {
            "skill": skill.id,
            "title": skill.name,
            "resource_type": request.data.get("resource_type"),
            "platform": request.data.get("platform"),
            "url": request.data.get("url"),
            "status": request.data.get("status"),
            "hours_spent": request.data.get("hours_spent", 0),
            "notes": request.data.get("notes", ""),
            "difficulty": request.data.get("difficulty", 1),
        }

        serializer = LearningResourceSerializer(data=resource_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#---------------------------------------------------get new skills------------------------------------------------#



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_titles_and_notes(request):
    user = request.user
    skill_id = request.query_params.get('skill')  

    resources = LearningResource.objects.filter(skill__user=user)
    if skill_id:
        resources = resources.filter(skill__id=skill_id)

   
    data = [{"title": r.title, "notes": r.notes} for r in resources]

    return Response(data)



# #------------------------------------------------- update skill details (resources) -----------------------------------------#


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def update_skill_with_resource(request, skill_id):
#     user = request.user

#     try:
#         skill = Skill.objects.get(id=skill_id, user=user)
#     except Skill.DoesNotExist:
#         return Response({"error": "Skill not found."}, status=HTTP_404_NOT_FOUND)

#     # Update skill fields
#     skill_data = {
#         "name": request.data.get("name", skill.name),
#         "category": request.data.get("category", skill.category),
#         "user": user.id
#     }

#     skill_serializer = SkillSerializer(skill, data=skill_data)
#     if skill_serializer.is_valid():
#         skill_serializer.save()
#     else:
#         return Response(skill_serializer.errors, status=HTTP_400_BAD_REQUEST)

    
#     try:
#         resource = LearningResource.objects.get(skill=skill)
#     except LearningResource.DoesNotExist:
#         return Response({"error": "Learning resource not found for this skill."}, status=HTTP_404_NOT_FOUND)

#     resource_data = {
#         "skill": skill.id,
#         "title": request.data.get("title", resource.title),
#         "resource_type": request.data.get("resource_type", resource.resource_type),
#         "platform": request.data.get("platform", resource.platform),
#         "url": request.data.get("url", resource.url),
#         "status": request.data.get("status", resource.status),
#         "hours_spent": request.data.get("hours_spent", resource.hours_spent),
#         "notes": request.data.get("notes", resource.notes),
#         "difficulty": request.data.get("difficulty", resource.difficulty),
#     }

#     resource_serializer = LearningResourceSerializer(resource, data=resource_data)
#     if resource_serializer.is_valid():
#         resource_serializer.save()
#     else:
#         return Response(resource_serializer.errors, status=HTTP_400_BAD_REQUEST)

#     return Response({
#         "message": "Skill and resource updated successfully.",
#         "skill": skill_serializer.data,
#         "resource": resource_serializer.data
#     }, status=HTTP_200_OK)