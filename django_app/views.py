from django.shortcuts import render, HttpResponse, redirect
from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse
from .models import Cake


def home(request):
    return render(request, "home.html")

def display_cakes(request):
    if request.method == "POST":
        data = request.POST
        name = data.get("name")
        price = data.get("price")
        descr = data.get("description")
        cake = Cake(name=name, price=price, description=descr)
        cake.save()
        return redirect("/cakes/")
    else:
        cakes = Cake.objects.all()
        return render(request, "cakes_2.html", {"cakes": cakes})

def display_cake(request, id1):
    try:
        cake = Cake.objects.get(id=id1)
        return render(request, "cake.html", {"cake": cake})
    except ObjectDoesNotExist:
        return HttpResponse(status=204)
    
def add_cake(request):
    return render(request, "add_cake.html")

def delete_cake(request, id1):
    if request.method == "POST":
        data = request.POST
        cb = data.get("cb")
        cake_to_del = Cake.objects.get(id=id1)
        cake_to_del.delete()
        return redirect(reverse('cakes'))

def update_cake(request, id1):
    if request.method == "POST":
        cake = Cake.objects.get(id=id1)
        return render(request, "update_cake.html", {"cake": cake})
    else:
        return redirect(reverse('cakes'))

def updated_cake(request):
    if request.method == "POST":
        data = request.POST
        id1 = data.get("id")
        cake = Cake.objects.get(id=id1)
        cake.name = data.get("name")
        cake.price = data.get("price")
        cake.description = data.get("description")
        cake.save()
        return HttpResponse("Success")
    
