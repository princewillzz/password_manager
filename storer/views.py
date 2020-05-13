from django.shortcuts import render
from .models import Password
from django.urls import reverse
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
import json
#from django.views.decorators.csrf import csrf_exempt

#@csrf_exempt
def index(request):
    if request.method == "GET":
        return render(request, "storer/index.html")
    
    data = json.loads(request.body)
    print(data)
    context = {"message": "Hello World!"}
    return JsonResponse(context, status=200)
