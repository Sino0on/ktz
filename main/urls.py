from django.urls import path
from .views import *


urlpatterns = [
    path('', HomePage.as_view(), name='home'),
    path('news/', NewsListView.as_view(), name='news'),
    path('news/<int:pk>/', NewsDetailView.as_view(), name='news_detail'),
]
