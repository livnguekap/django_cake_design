from django.db import models

# Create your models here.
class Cake(models.Model):
    name = models.CharField(max_length=40)
    price = models.FloatField(default=0.0)
    description = models.TextField()
