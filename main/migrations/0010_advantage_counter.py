# Generated by Django 5.0.6 on 2024-06-17 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_employee_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='advantage',
            name='counter',
            field=models.PositiveIntegerField(default=1, verbose_name='Счетчик'),
            preserve_default=False,
        ),
    ]