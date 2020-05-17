from django.shortcuts import render
from .models import Password
from django.urls import reverse
from django.http import Http404, JsonResponse, HttpResponseRedirect, HttpResponse
import json
from django.contrib.auth import authenticate
#from django.views.decorators.csrf import csrf_exempt

#@csrf_exempt
def index(request):
    if not request.user.is_authenticated:
        print("logged out")
        already_present.clear()
        return render(request, "users/login.html")

    print("logged in")
    if request.method == "GET":
        return render(request, "storer/index.html")


already_present = list()    
def getPassword(request):

    if not request.user.is_authenticated:
        raise Http404("Not Found")

    if request.method == "GET":
        context = []
        for ele in already_present:
            object = Password.objects.filter(website=ele).values('website', 'password')
            context.append(object[0])
        return JsonResponse(context, safe=False, status = 200)
    
    data = json.loads(request.body)

    print(data)
    context = []
    
    try:
        objects = Password.objects.filter(website__icontains=data).values('website', 'password')
        for ele in objects:
            if ele["website"] not in already_present:
                context.append(ele)
                already_present.append(ele["website"])
    except Exception as e: 
        print(e)

    return JsonResponse(context, safe=False, status=200)
