from django.shortcuts import render
from .models import Password
from django.urls import reverse
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
import json
from django.core import serializers
#from django.views.decorators.csrf import csrf_exempt

#@csrf_exempt
def index(request):
    if request.method == "GET":
        return render(request, "storer/index.html")
    
def getPassword(request):
    if request.method == "GET":
        context = {
            "message": "Error"
        }
        return JsonResponse(context)

    data = json.loads(request.body)

    objects = Password.objects.filter(website__icontains=data).values('website', 'password')
    print(objects, data)
    
    context = list(objects)


    print(context, type(context))

    return JsonResponse(context, safe=False, status=200)
