from django.shortcuts import render
from django.urls import reverse
from django.http import HttpRequest, JsonResponse
from django.contrib.auth import authenticate, login, logout


def index(request):
    logout(request)
    print("logged out")
    return render(request, "users/login.html")

def login_view(request):

    username = request.POST["username"]
    password = request.POST["password"]

    user = authenticate(request, username=username, password=password)

    print(user)
    if user is not None:
        login(request, user)
        return render(request, "storer/index.html")
    else:
        return render(request, "users/login.html")
    