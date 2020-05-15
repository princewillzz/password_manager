from django.db import models

class Password(models.Model):
    website = models.CharField(unique=True, max_length=200)
    password = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.website}: {self.password}"


