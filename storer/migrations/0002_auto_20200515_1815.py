# Generated by Django 3.0.6 on 2020-05-15 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storer', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='password',
            name='website',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]