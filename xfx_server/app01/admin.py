# coding=utf-8
from django.contrib import admin
from imp import reload
# import sys
# reload(sys)
# sys.setdefaultencoding('utf-8')
from app01 import models
# from app01.models import MyMetadata
from django.db.models.lookups import Search

from djangoseo.admin import register_seo_admin
from django.contrib import admin
from app01.seo import MyMetadata


# # Register your models here.
# class News(admin.ModelAdmin):
#     list_display = (
#     'title', 'summary', 'category', 'news_type', 'user', 'create_date', 'url', 'favor_count', 'reply_count',)
#     list_filter = ('create_date',)
#     # search_fields = ('title', 'user__username__username', 'news_type__display', 'category__name')


register_seo_admin(admin.site, MyMetadata)
# admin.site.register(models.News)
admin.site.register(models.UserType)
admin.site.register(models.Admin)
admin.site.register(models.NewType)
admin.site.register(models.Reply)
admin.site.register(models.Category)
admin.site.register(models.serverClient)
admin.site.register(models.DocumentData)
# admin.site.register(models.BuyCart)
# admin.site.register(models.GoodsList)
# admin.site.register(models.GotVideo)
admin.site.register(models.Carousel)
admin.site.register(models.Advertising)


