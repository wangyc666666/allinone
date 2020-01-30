# -*- coding:utf-8 -*-
from django.db import models
from django.template.defaultfilters import default
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
import uuid
from mdeditor.fields import MDTextField



class Carousel(models.Model):
    class Meta:
        verbose_name = '推荐阅读'
        verbose_name_plural = '推荐阅读'
    title = models.CharField('标题', max_length=30)
    summary = models.CharField('简介', max_length=256, blank=True, null=True)
    content = RichTextField('推荐内容', blank=True, null=True)
    newlink = models.URLField('推荐文章链接，如有连接，忽视推荐内容', blank=True, null=True)
    newpic = models.ImageField('封面图片(2360x700)', upload_to="upload_imgss/", default="upload_imgss/logo.jpg")
    create_date = models.DateTimeField('发布时间', auto_now_add=True)

    def __str__(self):
        return self.title

class Advertising(models.Model):
    class Meta:
        verbose_name = '广告位'
        verbose_name_plural = '广告位'
    title = models.CharField('标题', max_length=30)
    summary = models.CharField('简介', max_length=256, blank=True, null=True)
    content = RichTextField('广告内容', blank=True, null=True)
    newlink = models.URLField('广告链接', blank=True, null=True)
    newpic = models.ImageField('封面图片(280x125)', upload_to="upload_imgss/", default="upload_imgss/logo.jpg")
    create_date = models.DateTimeField('发布时间', auto_now_add=True)

    def __str__(self):
        return self.title

class NewType(models.Model):
    class Meta:
        verbose_name = '标签云'
        verbose_name_plural = '标签云'

    display = models.CharField('标签云', max_length=50,  blank=True, null=True,default=None)

    def __str__(self):
        return self.display

class News(models.Model):
    class Meta:
        verbose_name = '视频'
        verbose_name_plural = '视频'

    category = models.ForeignKey('Category', blank=True, null=True,on_delete=models.CASCADE)
    title = models.CharField('标题', max_length=30)
    summary = models.CharField('简介', max_length=256, blank=True, null=True)
    content = RichTextField('课程内容', blank=True, null=True)
    course_price = models.IntegerField('课程价格(默认免费)', blank=True, default=0)
    weixinnum = models.CharField('微信号(可选)', max_length=20, blank=True, null=True)
    video = models.FileField('教程(.mp3 .mp4)', upload_to="video/", blank=True, null=True)
    videourl = models.CharField('教程URL', max_length=5000, blank=True, null=True)
    newpic = models.ImageField('封面图片', upload_to="upload_imgss/", default="upload_imgss/logo.jpg")
    newpic_webp = models.ImageField('封面图片.webp', upload_to="upload_imgss/", default="upload_imgss/logo.jpg")
    url = models.URLField('链接地址', default='ais580.com', blank=True, null=True)
    videos_url = models.TextField('课程列表', blank=True, null=True)
    favor_count = models.IntegerField('点赞数', default=0)
    reply_count = models.IntegerField('评论数', default=0)
    focus_count = models.IntegerField('关注数', default=0)
    news_type = models.ManyToManyField('NewType', blank=True)
    user = models.ForeignKey('Admin',on_delete=models.CASCADE)
    create_date = models.DateTimeField('发布时间', auto_now_add=True)
    #iffocus = models.BooleanField('是否被关注',default=False)
    check_enable = models.BooleanField('是否审核', default=False)
    focususer = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.title


class DocumentData(models.Model):
    class Meta:
        verbose_name = '发布文章'
        verbose_name_plural = '发布文章'
        ordering = ["favor_count","focus_count"]
    category = models.ForeignKey('Category', blank=True, null=True,on_delete=models.CASCADE)
    title = models.CharField('标题', max_length=30)
    summary = models.CharField('简介', max_length=256, blank=True, null=True)
    #content = RichTextField('内容', blank=True, null=True)
    content = MDTextField(verbose_name='内容')
    course_price = models.IntegerField('课程价格(默认免费)', blank=True, default=0)
    document_data = models.FileField('文档资料', upload_to="document/",default="document/20170209130422_Broods.txt")
    newpic = models.ImageField('封面图片', upload_to="upload_imgss", default="upload_imgss/logo.jpg")
    newpic_webp = models.ImageField('封面图片.webp', upload_to="upload_imgss/", default="upload_imgss/logo.jpg")
    url = models.URLField('链接地址', default='ais580.com', blank=True, null=True)
    favor_count = models.IntegerField('点击数', default=0)
    reply_count = models.IntegerField('评论数', default=0)
    focus_count = models.IntegerField('关注数', default=0)
    news_type = models.ManyToManyField('NewType', blank=True, null=True,default=None)
    user = models.ForeignKey('Admin',on_delete=models.CASCADE)
    create_date = models.DateTimeField('发布时间', auto_now_add=True)
    check_enable = models.BooleanField('是否审核', default=False)
    focususer = models.ManyToManyField(User, blank=True, null=True,default=None)

    def __str__(self):
        return self.title



class serverClient(models.Model):
    class Meta:
        verbose_name = '访问量'
        verbose_name_plural = '访问量'

    name = models.CharField('访问量类型', max_length=30, blank=True)
    serverclient = models.IntegerField('访问量', default=0)

    def __str__(self):
        return self.name


class Admin(models.Model):
    class Meta:
        verbose_name = '账户'
        verbose_name_plural = '账户'

    username = models.OneToOneField(User, blank=True, null=True)
    email = models.EmailField('邮件', blank=True, null=True)
    user_type = models.ForeignKey("UserType", blank=True, null=True,on_delete=models.CASCADE)
    user_valid = models.BooleanField('是否有效', default=False)
    userpic = models.ImageField('头像', upload_to="images/", default="images/image30.png")
    gender = models.CharField('性别', choices=(('M', '男'), ('F', '女')), max_length=1, default='男')
    signature = models.CharField('签名档(100字)', max_length=100, default='hello world')
    focus_count = models.IntegerField('关注数', default=0)
    focususer = models.ManyToManyField('Admin', blank=True)
    create_date = models.DateTimeField('用户创建时间',auto_now_add=True,blank=True,null=True)
    my_cart = models.OneToOneField('BuyCart', blank=True, null=True)



    def __str__(self):
        return self.username.username


class UserType(models.Model):
    class Meta:
        verbose_name = '用户类型'
        verbose_name_plural = '用户类型'

    dispaly = models.CharField('用户类型', max_length=50, blank=True, null=True)

    def __str__(self):
        return self.dispaly



class Reply(models.Model):
    class Meta:
        verbose_name = '评论'
        verbose_name_plural = '评论'

    content = models.TextField()
    user = models.ForeignKey('Admin',on_delete=models.CASCADE)
    new = models.ForeignKey('News')
    create_date = models.DateTimeField('评论时间', auto_now_add=True)

    def __str__(self):
        return self.content


class Category(models.Model):
    class Meta:
        verbose_name = '导航栏'
        verbose_name_plural = '导航栏'

    name = models.CharField('类别', max_length=32, unique=True, blank=True, null=True)
    administrator = models.ForeignKey('Admin',on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Chat(models.Model):
    class Meta:
        verbose_name = '聊天室'
        verbose_name_plural = '聊天室'

    content = models.TextField()
    username = models.ForeignKey('Admin')
    chat_date = models.DateTimeField('聊天时间', auto_now_add=True)

    def __str__(self):
        return self.content


class BuyCart(models.Model):
    class Meta:
        verbose_name = '购物车'
        verbose_name_plural = '购物车'
        db_table = 'BuyCart'
        ordering = ['date_added']
    cart_owner = models.OneToOneField(Admin, blank=True, null=True)  # 相同cart_id的CartItem是同一个购物车里的
    date_added = models.DateTimeField(auto_now_add=True)
    quantity = models.IntegerField(default=1)
    product = models.ManyToManyField('News',blank=True, null=True, unique=False)
    total_price = models.IntegerField('总价格', blank=True, default=0)
    def __str__(self):
        return self.cart_owner.username.username
    def total(self):
        return self.quantity * self.product.course_price
    def name(self):
        return self.product.title
    def price(self):
        return self.product.course_price
    def augment_quantity(self, quantity):
        self.quantity += int(quantity)
        self.save()


class GoodsList(models.Model):
    class Meta:
        verbose_name = '购买清单'
        verbose_name_plural = '购买清单'

    list_uuid = models.UUIDField(default=uuid.uuid4, null=False,
                           verbose_name=u'list uuid',
                           help_text="app uuid")
    total_num = models.IntegerField('已选商品数', blank=True, default=0)
    total_price = models.IntegerField('已选商品合计', blank=True, default=0)
    total_goods = models.ManyToManyField('News',blank=True, null=True, unique=False)
    create_date = models.DateTimeField('购买时间', auto_now_add=True)
    buyers = models.CharField('购买者', max_length=100)
    ifpay = models.BooleanField('是否付款', default=False)

    def __str__(self):
        return str(self.buyers)


class GotVideo(models.Model):
    class Meta:
        verbose_name = '我购买的视频'
        verbose_name_plural = '我购买的视频'
    create_date = models.DateTimeField('购买时间', auto_now_add=True)
    myvideo = models.ManyToManyField('News', blank=True, null=True, unique=False)
    buyers = models.CharField('购买者', max_length=100, blank=True, null=True, unique=True)

    def __str__(self):
        return str(self.buyers)



