#coding=utf-8
"""chouti URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
import app01
from app01.views import *
from app01 import urls
from xfx_server import settings
from django.contrib import admin
from django.contrib.auth import views as auth_views

from django.conf.urls.static import static


urlpatterns = [
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.STATIC_ROOT }),
    url(r'^medias/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.MEDIA_ROOT}),
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include(app01.urls)),
    url(r'^mdeditor/', include('mdeditor.urls')),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),


]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
