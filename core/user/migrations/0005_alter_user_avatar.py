# Generated by Django 4.2.7 on 2023-11-27 06:24

import core.user.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_user', '0004_user_is_staff'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to=core.user.models.user_directory_path),
        ),
    ]