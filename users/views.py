from django.shortcuts import render
from django.urls import reverse
from django.http import HttpRequest, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout


def index(request):
    logout(request)
    print("logged out")
    return render(request, "users/login.html")

def login_view(request):
    if not request.method == "POST":
        return index(request)
        
    username = request.POST["username"]
    password = request.POST["password"]

    user = authenticate(request, username=username, password=password)

    print(user)
    if user is None:
        return index(request)
    else:
        login(request, user)
        return HttpResponseRedirect(reverse("index")) 
        
    