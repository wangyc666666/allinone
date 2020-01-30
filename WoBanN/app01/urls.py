#coding=utf-8
"""cloudcollege URL Configuration

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
from WoBanN import settings
from django.contrib import admin
from app01.views import *
from django.contrib.auth import views as auth_views
import django
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    url(r'^login/.*', login),
    url(r'^accounts/login/$',login),
    url(r'^(?P<page>\d*)$', index),
    url(r'^register/$', register),
    url(r'^logout/$', logout),
    url(r'^category/(\d+)/(?P<page>\d*)$', category),
    url(r'^doc_data/(?P<page>\d*)$', doc_data),
    url(r'^doc_category/(\d+)/(?P<page>\d*)$', doc_category),
    url(r'^docdetail/(\d+)/$', docdetail),
    url(r'^mobile_carousel_docdetail/(\d+)/$', mobile_carousel_docdetail),
    url(r'^carousel_docdetail/(\d+)/$', carousel_docdetail),
    url(r'^advertising_docdetail/(\d+)/$', advertising_docdetail),
    url(r'^public_course_detail/(\d+)/$', public_course_detail),
    url(r'^videodetail/(\d+)/$',videodetail),
    url(r'^userlogin/$', userlogin),
    url(r'^videoplayer/(\d+)/$', videoplayer),
    url(r'^uploadindex/$', uploadindex),
    url(r'^collectbox/$', collectbox),
    url(r'^com_collectbox/$', com_collectbox),
    url(r'^user_center/$', user_center),
    url(r'^usercenter/$', usercenter),
    url(r'^uploadimg/$', uploadimg),
    url(r'^uploadvideo/$', uploadvideo),
    url(r'^save/$', save),
    url(r'^collection/$', collection),
    url(r'^add_to_cart/$', add_to_cart),
    url(r'^del_from_cart/$', del_from_cart),
    url(r'^doc_collection/$', doc_collection),
    url(r'^activate/(?P<token>\w+.[-_\w]*\w+.[-_\w]*\w+)/$',active_user),
    url(r'^resetpassword/$',auth_views.password_reset,name='password_reset'),
    url(r'^resetpassword/passwordsent/$',auth_views.password_reset_done,name='password_reset_done'),
    url(r'^reset/done/$',auth_views.password_reset_complete,name='password_reset_complete'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>.+)/$',auth_views.password_reset_confirm,name='password_reset_confirm'),
    url(r'^search/.*', search),
    url(r'^mobile_search/.*', mobile_search),
    url(r'^user_save/.*', user_save),
    url(r'^my_shopping_cart/.*', my_shopping_cart),
    url(r'^webpay/.*', webpay),
    url(r'^goods_list/.*', goods_list),
    url(r'^addfavor/$',addfavor),
    url(r'^video_addfavor/$',video_addfavor),
    url(r'^upload_image/',upload_image),

    url(r'^mobile_logout/$', mobile_logout),
    url(r'^mobile_index/(?P<page>\d*)$',mobile_docindex),
    url(r'^mobile_docindex/(?P<page>\d*)$',mobile_docindex),
    url(r'^mobile_videodetail/(\d+)/$',mobile_videodetail),
    url(r'^mobile_category/(\d+)/(?P<page>\d*)$', mobile_category),
    url(r'^mobile_doccategory/(\d+)/(?P<page>\d*)$', mobile_doccategory),
    url(r'^mobile_docdetail/(\d+)/$', mobile_docdetail),
    url(r'^mobile_login/.*',mobile_login),
    url(r'^mobile_register/$', mobile_register),
    url(r'^mobile_user_center/(?P<page>\d*)$', mobile_user_center),
    url(r'^mobile_user_push/$', mobile_user_push),
    url(r'^test/$', test),
    url(r'^mobile_tag_serach/(?P<page>\d*)$', mobile_tag_serach),


]
handler404 = page_not_found
