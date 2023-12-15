from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("cakes/", views.display_cakes, name="cakes"),
    path("cakes/<int:id1>", views.display_cake, name="display_cake"),
    path("cakes/del/<int:id1>", views.delete_cake, name="delete_cake"),
    path("add_cake/", views.add_cake, name="add_cake"),
    path("update_cake/<int:id1>", views.update_cake, name="update_cake"),
    path("updated_cake/", views.updated_cake, name="updated_cake")
]