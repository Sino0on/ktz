# Generated by Django 5.0.6 on 2024-06-19 07:12

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0018_product_mini_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='sitesetting',
            name='director',
            field=models.CharField(default=1, max_length=123, verbose_name='Директор'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sitesetting',
            name='video',
            field=models.URLField(default=1, verbose_name='Ссылка на ютуб'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='mini_description',
            field=ckeditor.fields.RichTextField(blank=True, null=True, verbose_name='Мини Описание'),
        ),
    ]
