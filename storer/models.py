from django.db import models

class Password(models.Model):
    password = models.CharField(max_length=20)

    def __str__(self):
        return f"The password is {self.password}"