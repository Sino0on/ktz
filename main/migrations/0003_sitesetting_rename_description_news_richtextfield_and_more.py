# Generated by Django 5.0.6 on 2024-06-11 02:15

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_banner'),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteSetting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contacts', models.TextField(blank=True, verbose_name='Контакт')),
                ('emails', models.TextField(blank=True, verbose_name='Почта')),
                ('description', ckeditor.fields.RichTextField(blank=True, null=True, verbose_name='О нас')),
                ('address', models.CharField(max_length=123, verbose_name='Адрес')),
                ('address_map', models.TextField(default='\n    <a class="dg-widget-link" href="http://2gis.kg/bishkek/firm/70000001021088130/center/74.587426,42.845011/zoom/16?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=bigMap">Посмотреть на карте Бишкека</a><div class="dg-widget-link"><a href="http://2gis.kg/bishkek/firm/70000001021088130/photos/70000001021088130/center/74.587426,42.845011/zoom/17?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=photos">Фотографии компании</a></div><div class="dg-widget-link"><a href="http://2gis.kg/bishkek/center/74.587426,42.845011/zoom/16/routeTab/rsType/bus/to/74.587426,42.845011╎Кыргызский Государственный Технический Университет им. И. Раззакова, ректорат?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=route">Найти проезд до Кыргызский Государственный Технический Университет им. И. Раззакова, ректорат</a></div><script charset="utf-8" src="https://widgets.2gis.com/js/DGWidgetLoader.js"></script><script charset="utf-8">new DGWidgetLoader({"width":640,"height":600,"borderColor":"#a3a3a3","pos":{"lat":42.845011,"lon":74.587426,"zoom":16},"opt":{"city":"bishkek"},"org":[{"id":"70000001021088130"}]});</script><noscript style="color:#c00;font-size:16px;font-weight:bold;">Виджет карты использует JavaScript. Включите его в настройках вашего браузера.</noscript>\n    ', verbose_name='Адрес на карте')),
            ],
            options={
                'verbose_name': 'Настройка сайта',
                'verbose_name_plural': 'Настройки сайта',
            },
        ),
        migrations.RenameField(
            model_name='news',
            old_name='description',
            new_name='RichTextField',
        ),
        migrations.AlterField(
            model_name='advantage',
            name='icon',
            field=models.CharField(max_length=255, verbose_name='Иконка'),
        ),
        migrations.AlterField(
            model_name='project',
            name='description',
            field=ckeditor.fields.RichTextField(verbose_name='Описание'),
        ),
        migrations.AlterField(
            model_name='project',
            name='secondary_description',
            field=ckeditor.fields.RichTextField(blank=True, null=True, verbose_name='Второе описание'),
        ),
    ]