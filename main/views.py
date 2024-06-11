from django.shortcuts import render
from django.views import generic
from .models import *


class HomePage(generic.TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['banners'] = Banner.objects.all()
        context['services'] = Service.objects.all()
        context['categories'] = Category.objects.all()
        context['employers'] = Employee.objects.all()
        context['advantages'] = Advantage.objects.all()
        context['testimonials'] = Testimonial.objects.all()
        context['projects'] = Project.objects.all()
        context['news'] = News.objects.all()[:3]
        context['site'] = SiteSetting.objects.all().first()
        return context


class NewsListView(generic.ListView):
    queryset = News.objects.all()
    model = News
    template_name = 'news.html'
    context_object_name = 'news'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['banners'] = Banner.objects.all()
        context['services'] = Service.objects.all()
        context['site'] = SiteSetting.objects.all().first()
        context['new_news'] = News.objects.all()[:3]
        return context


class NewsDetailView(generic.DetailView):
    queryset = News.objects.all()
    model = News
    template_name = 'news_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['banners'] = Banner.objects.all()
        context['services'] = Service.objects.all()
        context['site'] = SiteSetting.objects.all().first()
        context['new_news'] = News.objects.all()[:3]
        return context

