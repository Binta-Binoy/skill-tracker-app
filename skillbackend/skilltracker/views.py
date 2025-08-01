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
from django.db.models import Count

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

# #----------------------------------------------get ------------------------------------------#
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_skills(request):
    skills = Skill.objects.filter(user=request.user)
    serializer = SkillSerializer(skills, many=True)
    return Response(serializer.data)
# --------------------------------------------------add new course details------------------------------------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def create_skill_with_resource(request):
        user = request.user
        skill_id = request.data.get("skill")
        skill = get_object_or_404(Skill, id=skill_id, user=user)

        resource_data = {
            "skill": skill.id,
            "title": request.data.get("title"),
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



#---------------------------------------------------get cards in courselist pagek------------------------------------------------#


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_titles_and_notes(request, skill_id):
    user = request.user
    # Filter only resources that belong to this user's skill
    resources = LearningResource.objects.filter(skill=skill_id, skill__user=user)
    serializer = LearningResourceSerializer(resources, many=True)
    return Response(serializer.data)




# #------------------------------------------------- update skill details (resources) -----------------------------------------#


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def update_learning_resource(request, resource_id):
#     user = request.user
#     skill_id=request.data.get("skill")
#     print(skill_id)

#     try:
#         resource = LearningResource.objects.get(id=resource_id, skill=skill_id)
#     except LearningResource.DoesNotExist:
#         return Response({"error": "Learning resource not found or you don't have permission."}, status=HTTP_404_NOT_FOUND)

#     serializer = LearningResourceSerializer(resource, data=request.data, partial=True)
    
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Learning resource updated successfully.", "resource": serializer.data}, status=HTTP_200_OK)
    
#     return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_learning_resource(request, resource_id):
    user = request.user
    
    try:
        resource = LearningResource.objects.get(id=resource_id, skill__user=user)
    except LearningResource.DoesNotExist:
        return Response({"error": "Learning resource not found or you don't have permission."}, status=HTTP_404_NOT_FOUND)

    serializer = LearningResourceSerializer(resource, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Learning resource updated successfully.", "resource": serializer.data}, status=HTTP_200_OK)
    
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


#------------------------------------------------total hours in dashboard------------------------------#

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_total_hours(request):
    user = request.user
    resources = LearningResource.objects.filter(skill__user=user)
    total_hours = sum(res.hours_spent for res in resources)
    return Response({'total_hours': total_hours})


#------------------------------------------total completed courses in dashboard-----------------------------#

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_completed_resources_count(request):
    user = request.user
    
    completed_count = LearningResource.objects.filter(
        skill__user=user,
        status='completed'
    ).count()

    return Response({"completed": completed_count})



#-----------------------------------learning category in dashboard----------------------------------#

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_learning_categories(request):
    user = request.user
  
    category_counts = (
        LearningResource.objects
        .filter(skill__user=user)
        .values('resource_type')
        .annotate(count=Count('id'))
    )

    return Response(category_counts)


#--------------------------------------- get skill details page--------------------#


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_resource_details(request, resource_id):
    try:
        resource = LearningResource.objects.get(id=resource_id, skill__user=request.user)
    except LearningResource.DoesNotExist:
        return Response({'error': 'Resource not found'}, status=404)

    serializer = LearningResourceSerializer(resource)
    return Response(serializer.data)

#--------------------------------------------get total courses in dashboard-------------------#

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def total_courses(request):
    user = request.user
    total = LearningResource.objects.filter(skill__user=user).count()
    return Response({'total_courses': total})


#----------------------------------------get skill name------------------------#

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_skill_name(request, skill_id):
    try:
        skill = Skill.objects.get(id=skill_id, user=request.user)
        return Response({"name": skill.name})
    except Skill.DoesNotExist:
        return Response({"error": "Skill not found"}, status=404)