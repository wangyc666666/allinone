#coding:utf-8
from __future__ import unicode_literals
from django.http import Http404
from django.core.mail import send_mass_mail
import qrcode
from xfx_server import settings
from django.core.mail import send_mail
from django.core.mail.utils import DNS_NAME, CachedDnsName
from django.shortcuts import render, render_to_response, redirect
from app01.models import User
from app01.models import News
from django.contrib import auth
import time
from app01 import models,common,html_helper,mobile_html_helper
from django.contrib.messages.storage.base import Message
from django.template.context import RequestContext
from django.http.response import HttpResponse,HttpResponseRedirect
from django.core import serializers
import datetime
from django.db.models import Q
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
import smtplib
from email.mime.text import MIMEText
import email.mime.multipart
import email.mime.text
from email.header import Header
import sys
import time
#from django_seo_js.backends.base import SEOBackendBase
from django.views.decorators.csrf import csrf_exempt
from itsdangerous import URLSafeTimedSerializer as utsr
import base64
import re
from django.conf import settings as django_settings
import qrcode
import os
import sys
import time
from django.views.decorators.cache import cache_page #引入memcache
from django.db.models import Q
import zipfile, os
#import json
import json
import rarfile
import os
from urllib import parse
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
import datetime
import operator
import markdown
from django.utils.text import slugify
from markdown.extensions.toc import TocExtension
from jwt_auth.jwt_auth import Auth
from weixin import WXAPPAPI
from weixin.lib.wxcrypt import WXBizDataCrypt
from django.http import JsonResponse
from django.core import serializers

def outer(main_func):
    '''预先判断是否登入控制访问权限,登入则访问

    :param main_func:
    :return:
    '''
    def wrapper(request, *args, **kwargs):
        #if request.session.get('is_login'):
        if request.session.get('is_login', 'None') != 'None':
            return main_func(request, *args, **kwargs)
        else:
            try:
                docdetail_id = request.META['HTTP_REFERER'].split('/')[-2]
                docdetail_id = int(docdetail_id)
                docdetail_uri = request.META['HTTP_REFERER'].split('/')[-3]
                if docdetail_id:
                    url = '?'+ docdetail_uri + '=' + str(docdetail_id)
                else:
                    url = '/'
            except Exception:
                url = '/'

            return redirect('/login'+url)
    return wrapper


def checkMobile(main_func):
    """
    demo :
        @app.route('/m')
        def is_from_mobile():
            if checkMobile(request):
                return 'mobile'
            else:
                return 'pc'
    :param request:
    :return:
    """

    def wrapper(request, *args, **kwargs):
        userAgent = request.META.get('HTTP_USER_AGENT', None)

        _long_matches = r'googlebot-mobile|android|avantgo|blackberry|blazer|elaine|hiptop|ip(hone|od)|kindle|midp|mmp|mobile|o2|opera mini|palm( os)?|pda|plucker|pocket|psp|smartphone|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce; (iemobile|ppc)|xiino|maemo|fennec'
        _long_matches = re.compile(_long_matches, re.IGNORECASE)
        _short_matches = r'1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-'
        _short_matches = re.compile(_short_matches, re.IGNORECASE)
        uri = ''
        for i, v in request.GET.items():
            uri = '?' + i + '=' + v
        if _long_matches.search(userAgent) != None:
            if request.path == '/':
                request.path = '/index'
            url_path = '/'+'mobile_'+request.path.strip('/') + uri
            return redirect(url_path)
        user_agent = userAgent[0:4]
        if _short_matches.search(user_agent) != None:
            if request.path == '/':
                request.path = '/index'
            url_path = '/'+'mobile_' + request.path.strip('/')  + uri
            return redirect(url_path)
        return main_func(request, *args, **kwargs)

    return wrapper

def got_videos(main_func):
    '''预先判断是否登入控制访问权限,登入则访问

    :param main_func:
    :return:
    '''
    def wrapper(request,*args,**kwargs):
        new_id = int(args[0])
        buyer = request.session.get('is_login', None)

        buyer_videos = models.GotVideo.objects.get(buyers=buyer)
        myvideos = buyer_videos.myvideo.filter(id=new_id)
        course_price = models.News.objects.get(id=new_id).course_price

        if myvideos or course_price == 0:
            return main_func(request, *args, **kwargs)
        else:

            return HttpResponse('请先购买')
    return wrapper

class CjsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        elif isinstance(obj, datetime.date):
            return obj.strftime("%Y-%m-%d")
        else:
            return json.JSONDecoder.default(self, obj)

def qcode(data):
    '''生成二维码图片

    :param data:
    :return:
    '''
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=4,
        border=2,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image()
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    return img
@checkMobile
def index(request,**kwargs):
    '''渲染字典返回主页index

    :param request:
    :param kwargs:
    :param indexpage:主页当前page
    :param docpage: 当前文档教程page页码
    :return: response

    '''
    ret = {'clickCount': '', 'document_data': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '', 'page': '',
           'username': '', 'category': '', 'nowuser': '', 'city': '', 'province': '', 'country': '', 'area': '',
           'message': '', 'detail_url': '', 'video_selected': '','carousel_data':'', 'advertising_data':'',
            'web_name':settings.WEB_NAME}

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #servercode = qcode("http://127.0.0.1/server")
    #servercode.save(BASE_DIR + "/medias/qcode/server.jpg")
    # 视频教程数据渲染
    indexpage = kwargs['page']
    per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)
    indexpage = common.try_int(indexpage, 1)
    docpage = 1
    count = models.News.objects.all().count()
    pageObj = html_helper.PageInfo(indexpage, count, per_item)
    nowCount = models.News.objects.all()[pageObj.start:pageObj.end].count()
    results = models.News.objects.filter(check_enable=True).order_by("-create_date")[pageObj.start:pageObj.end]
    category = models.Category.objects.all()
    page_string = html_helper.Pager(indexpage, pageObj.all_page_count, '/')

    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:

        pass
    #文档教程数据渲染
    docCount = models.DocumentData.objects.all().count()
    DocPageObj = html_helper.PageInfo(docpage, docCount, per_item)
    doc_page = html_helper.Pager(docpage, DocPageObj.all_page_count, '/doc_data/')
    document_data = models.DocumentData.objects.filter(check_enable=True).order_by("-create_date")[DocPageObj.start:DocPageObj.end]
    carousel_data = models.Carousel.objects.all()
    for  carousel in carousel_data:
        if carousel.newlink:
            carousel.newlink = carousel.newlink
        else:
            carousel.newlink = "/carousel_docdetail/" + str(carousel.id)
    

    #ret['data'] = results
    #广告位
    advertising_data = models.Advertising.objects.all()
    for  advertising in advertising_data:
        if advertising.newlink:
            advertising.newlink = advertising.newlink
        else:
            advertising.newlink = "/advertising_docdetail/" + str(advertising.id)

    ret['advertising_data'] = advertising_data
    ret['count'] = count
    ret['nowCount'] = nowCount
    ret['page'] = page_string

    ret['carousel_data'] = carousel_data
    ret['category'] = category
    ret['document_data'] = document_data
    ret['doc_page'] = doc_page
    ret['detail_url'] ='videodetail/'
    ret['index_selected'] = 'on'
    ret['video_selected'] = 'off'
    ret['doc_selected'] = 'on'
    ret['doc_visibility'] = '' # or none
    ret['vio_visibility'] = 'none'


    response = render_to_response('index.html', ret,context_instance=RequestContext(request))
    response.set_cookie('pager_num', per_item)
    return response

@checkMobile
def login(request):
    ''' 用户登入页面渲染

    :param request:
    :return:
    '''
    ret = {'status': 0, 'message': '', 'category': '','web_name':settings.WEB_NAME}
    try:
        docdetail_id = request.META['HTTP_REFERER'].split('=')[-1]
        docdetail_uri = request.META['HTTP_REFERER'].split('=')[-2].split('?',-1)[-1]
        docdetail_id = int(docdetail_id)
        if docdetail_id:
            url = "/" + docdetail_uri + "/"+ str(docdetail_id)
        else:
            url = '/'
    except Exception:
        url = '/'
    loginSession = request.session.get('is_login', None)
    category = models.Category.objects.all()
    ret['category'] = category
    if_username = models.Admin.objects.filter(username__username=loginSession)
    if loginSession and not if_username:
        del request.session['is_login']
        del request.session['current_user_id']
        loginSession = request.session.get('is_login', None)
        return redirect('/')
    if loginSession:
        return redirect('/')
    else:
        try:
            if request.method == 'POST':
                username = request.POST.get('username')
                password = request.POST.get('password')
                user = auth.authenticate(username=username, password=password)
                adminuser = models.Admin.objects.get(username__username=username)

                if user is not None:
                    if adminuser.user_valid == True:
                        request.session['current_user_id'] = adminuser.id
                        request.session['is_login'] = adminuser.username.username
                        return redirect(url)
                    else:
                        ret['message'] = '账户未激活'
                else:
                    user = None
                    ret['message'] = '用户名密码错误'

                    return render_to_response('login.html', ret, context_instance=RequestContext(request))

            return render_to_response('login.html', ret,context_instance=RequestContext(request))

        except Exception as e:

            ret['message'] = e
            return render_to_response('login.html', ret, context_instance=RequestContext(request))


class Token:
    #用户注册发送邮件验证
    def __init__(self, security_key):
        self.security_key = security_key
        bytesString = security_key.encode(encoding="utf-8")
        self.salt = base64.b64encode(bytesString)

    def generate_validate_token(self, username):
        serializer = utsr(self.security_key)
        return serializer.dumps(username, self.salt)

    def confirm_validate_token(self, token, expiration=3600):
        serializer = utsr(self.security_key)
        return serializer.loads(token, salt=self.salt, max_age=expiration)

    def remove_validate_token(self, token):
        serializer = utsr(self.security_key)
        print(serializer.loads(token, salt=self.salt))
        return serializer.loads(token, salt=self.salt)


token_confirm = Token(django_settings.SECRET_KEY)


def active_user(request, token):
    '''注册用户激活

    :param request:
    :param token:
    :return:
    '''
    try:
        username = token_confirm.confirm_validate_token(token)
    except:
        username = token_confirm.remove_validate_token(token)
        users = User.objects.filter(username=username)
        for user in users:
            user.delete()
        return render(request, 'logout.html', {'message': u'对不起，验证链接已经过期，请重新<a href=' + u'/register>注册</a>'})
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return render(request, 'logout.html', {'message': u"对不起，您所验证的用户不存在，请重新注册"})
    model_user = models.Admin.objects.get(username__username=username)
    model_user.user_valid = True
    model_user.save()

    user.is_active = True
    user.is_staff = True
    user.save()
    message = u'验证成功'
    return render(request, 'mobile_login.html', {'message': message})

@checkMobile
def register(request):
    ''' 注册页面渲染

    :param request:http 请求
    :return:
    '''

    ret = {'status': 0, 'data': '', 'message': '', 'mailstatus': '', 'category': '','web_name':settings.WEB_NAME}
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email')
    category = models.Category.objects.all()
    ret['category'] = category
    if username == "":
        ret['message'] = '用户名不能为空'
        return render_to_response('register.html', ret, context_instance=RequestContext(request))

    if password == "":
        ret['message'] = '密码不能为空'
        return render_to_response('register.html', ret, context_instance=RequestContext(request))

    if username:
        for filterspace in username:
            if filterspace.isspace():
                ret['message'] = '账户禁止输入空格'
                return render_to_response('register.html', ret, context_instance=RequestContext(request))
    if password:
        for passwdspace in password:
            if passwdspace.isspace():
                ret['message'] = '密码禁止输入空格'
                return render_to_response('register.html', ret,context_instance=RequestContext(request))

    total = models.Admin.objects.filter(username__username=username).count()
    if total > 0:
        ret['message'] = '用户名已存在'
        return render_to_response('register.html', ret, context_instance=RequestContext(request))

    if email == "":
        ret['message'] = '邮箱不能为空'
        return render_to_response('register.html', ret)
    if email:
        total = models.Admin.objects.filter(email=email).count()
        if total > 0:
            ret['message'] = '邮箱已存在'
            return render_to_response('register.html', ret, context_instance=RequestContext(request))

    if request.method == 'POST':
        try:
            token = token_confirm.generate_validate_token(username)
            message1 = "\n".join([u'{0},欢迎加入580网'.format(username), u'请访问该链接，完成用户验证:',
                                  '/'.join([settings.DOMAIN, 'activate', token])])
            message2 = "\n".join([u'{0}新用户注册'.format(username)])
            msg1 = ('新用户注册', message1, settings.DEFAULT_FORM_EMAIL, [email])
            msg2 = ('新用户注册', message2, settings.DEFAULT_FORM_EMAIL, [settings.DEFAULT_FORM_EMAIL])
            res = send_mass_mail((msg1, msg2), fail_silently=False)
            ret['message'] = '请登入邮箱验证登入'
            ret['status'] = '1'

            count = models.UserType.objects.filter(dispaly='普通用户').count()
            if count < 1:
                usertype = models.UserType.objects.create(dispaly='普通用户')

            user_type = models.UserType.objects.get(dispaly='普通用户')
            user = User.objects.create(username=username, password=password, email=email)
            user.set_password(password)
            user.save()
            username2 = User.objects.get(username=username)
            add_new = Permission.objects.get(codename='add_news')
            # change_newtype= Permission.objects.get(codename='change_newtype')

            username2.user_permissions.add(add_new)  # 增加权限
            # username2.user_permissions.add(change_newtype) #增加权限

            model_user = models.Admin.objects.create(
                username=username2,
                email=email,
                user_type=user_type,
            )

            model_user.save()

            buy_cart_init = models.BuyCart.objects.create(
                cart_owner=model_user
            )
            buy_cart_init.save()

            GotVideo_init = models.GotVideo.objects.create(
                buyers=username
            )
            GotVideo_init.save()
            return render_to_response('mobile_login.html', ret, context_instance=RequestContext(request))
            return redirect('/login/')
        except Exception as e:
            ret['message'] = e

    return render_to_response('register.html', ret, context_instance=RequestContext(request))

@checkMobile
def logout(request):
    logoutSession = request.session.get('is_login', None)
    docdetail_id = request.META['HTTP_REFERER'].split('/')[-2]
    docdetail_uri = request.META['HTTP_REFERER'].split('/')[-3]
    try:
        docdetail_id = int(docdetail_id)
        if docdetail_id:
            url = '/'+docdetail_uri +'/'+ str(docdetail_id)
        else:
            url = '/'
    except Exception:
        url = '/'
    if logoutSession:
        del request.session['is_login']
        del request.session['current_user_id']
        loginSession = request.session.get('is_login', None)
        return redirect(url)
    else:
        return redirect(url)

@checkMobile
def category(request, **kwargs):
    '''导航分类信息渲染

    :param request:http 请求
    :param kwargs:
    :return:
    '''
    ret = {'message': '', 'clickCount': '', 'document_data': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '',
           'page': '', 'username': '', 'category': '', 'cate_id': '', 'user': '', 'city': '', 'province': '',
           'country': '', 'doc_page': '', 'detail_url': '', 'video_selected': '', 'carousel_data':'',
           'advertising_data':'','web_name':settings.WEB_NAME}
    #clickCount = models.serverClient.objects.get(name='index')
    #temp = clickCount.serverclient + 1
    #clickCount.serverclient = temp
    #clickCount.save()
    cate_aid = str(request)
    cate_id = int(cate_aid[29])
    cate_page = kwargs['page']
    doc_cate_page = 1
    per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)
    cate_page = common.try_int(cate_page, 1)
    count = models.News.objects.filter(category__id=cate_id).count()
    pageObj = html_helper.PageInfo(cate_page, count, per_item)
    nowCount = models.News.objects.filter(category__id=cate_id)[pageObj.start:pageObj.end].count()
    results = models.News.objects.filter(category__id=cate_id, check_enable=True).order_by("-create_date")[pageObj.start:pageObj.end]
    page_string = html_helper.Pager(cate_page, pageObj.all_page_count, '/category/%d/'%(cate_id))
    category = models.Category.objects.all()
    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass

    docCount = models.DocumentData.objects.filter(category__id=cate_id).count()
    DocPageObj = html_helper.PageInfo(doc_cate_page, docCount, per_item)
    doc_page = html_helper.Pager(doc_cate_page, DocPageObj.all_page_count, '/doc_category/%d/'%(cate_id))
    document_data = models.DocumentData.objects.filter(category__id=cate_id, check_enable=True).order_by("-create_date")[DocPageObj.start:DocPageObj.end]
    carousel_data = models.Carousel.objects.all()
    for  carousel in carousel_data:
        if carousel.newlink:
            carousel.newlink = carousel.newlink
        else:
            carousel.newlink = "/carousel_docdetail/" + str(carousel.id)
    ret['carousel_data'] = carousel_data

    advertising_data = models.Advertising.objects.all()
    for  advertising in advertising_data:
        if advertising.newlink:
            advertising.newlink = advertising.newlink
        else:
            advertising.newlink = "/advertising_docdetail/" + str(advertising.id)

    ret['advertising_data'] = advertising_data
    #ret['data'] = results
    ret['count'] = count
    ret['nowCount'] = nowCount
    ret['page'] = page_string
    ret['category'] = category
    ret['cate_id'] = cate_id
    #ret['clickCount'] = clickCount
    ret['document_data'] = document_data
    ret['doc_page'] = doc_page
    ret['detail_url'] = 'videodetail/'
    ret['video_selected'] = 'off'
    ret['doc_selected'] = 'on'
    ret['doc_visibility'] = ''
    ret['vio_visibility'] = 'none'

    response = render_to_response('index.html', ret, context_instance=RequestContext(request))
    response.set_cookie('pager_num', per_item)
    return response

@checkMobile
def docdetail(request,new_id,**kwargs):
    '''页面详细渲染

    :param request:
    :param new_id:
    :param kwargs:
    :return:
    '''
    ret = {'docnews': '', 'username': '', 'category': '', 'nowuser': '','web_name':settings.WEB_NAME,'tuijian':[]}
    docnews = models.DocumentData.objects.get(id=new_id)
    carousel_data = models.Carousel.objects.all()
    ret['carousel_data'] = carousel_data
    predoc = None
    new_id = int(new_id)
    if new_id > 1:
        try:
            predoc = models.DocumentData.objects.get(id=new_id - 1)
        except models.DocumentData.DoesNotExist as e:
            predoc = None
    try:
        nextdoc = models.DocumentData.objects.get(id=new_id + 1)
    except models.DocumentData.DoesNotExist as e:
        nextdoc = None
    ret['predoc'] = predoc
    ret['nextdoc'] = nextdoc
    tuijian = []
    new_type = docnews.news_type.all()
    if new_type:
        for ntype in new_type:
            dispaly = ntype.display
            tuijian_one = models.DocumentData.objects.filter(news_type=ntype,check_enable=True)\
                .filter(~Q(id=new_id)).order_by("-create_date")
            tuijian_one = list(tuijian_one)
            tuijian = tuijian + tuijian_one
    else:
        tuijian = []
    if len(tuijian) > 10:
        tuijian = tuijian[0:9]
    category = models.Category.objects.all()
    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass
    docnews.content = docnews.content.replace('\r\n','<br>')
    content = markdown.markdown(docnews.content,
                                extensions=[
                                    'markdown.extensions.extra',
                                    'markdown.extensions.abbr',
                                    'markdown.extensions.attr_list',
                                    'markdown.extensions.def_list',
                                    'markdown.extensions.fenced_code',
                                    'markdown.extensions.footnotes',
                                    'markdown.extensions.tables',
                                    'markdown.extensions.admonition',
                                    'markdown.extensions.codehilite',
                                    'markdown.extensions.meta',
                                    'markdown.extensions.nl2br',
                                    'markdown.extensions.sane_lists',
                                    'markdown.extensions.smarty',
                                    'markdown.extensions.toc',
                                    'markdown.extensions.wikilinks',
                                ])
    docnews.content = content
    ret['docnews'] = docnews
    ret['category'] = category
    ret['detail_type'] = 'docdetail'
    ret['tuijian'] = tuijian
    return render_to_response('docdetail.html', ret, context_instance=RequestContext(request))

@checkMobile
def carousel_docdetail(request,new_id,**kwargs):
    '''页面详细渲染

    :param request:
    :param new_id:
    :param kwargs:
    :return:
    '''
    ret = {'docnews': '', 'username': '', 'category': '', 'nowuser': ''}
    docnews = models.Carousel.objects.get(id=new_id)
    category = models.Category.objects.all()

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass
    ret['docnews'] = docnews
    ret['category'] = category
    return render_to_response('advertising.html', ret, context_instance=RequestContext(request))


def advertising_docdetail(request,new_id,**kwargs):
    '''页面详细渲染

    :param request:
    :param new_id:
    :param kwargs:
    :return:
    '''
    ret = {'docnews': '', 'username': '', 'category': '', 'nowuser': ''}
    docnews = models.Advertising.objects.get(id=new_id)
    category = models.Category.objects.all()
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass
    ret['docnews'] = docnews
    ret['category'] = category
    ret['detail_type'] = 'advertising_docdetail'
    return render_to_response('advertising.html', ret, context_instance=RequestContext(request))

@checkMobile
def videodetail(request,new_id,**kwargs):
    '''页面详细渲染

    :param request:
    :param new_id:
    :param kwargs:
    :return:
    '''
    ret = {'news': '', 'username': '', 'category': '', 'nowuser': '', 'NewType':''}
    news = models.News.objects.get(id=new_id)

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #qcodes = qcode("http://www.askeds.com/detail/"+new_id)
    #qcodes.save(BASE_DIR + "/medias/qcode/"+ new_id+".jpg")
    category = models.Category.objects.all()
    news_type = news.news_type
    news_type_video = models.News.objects.filter(news_type=news_type).exclude(id=new_id)
    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass

    ret['news'] = news
    ret['category'] = category
    ret['news_type_video'] = news_type_video



    return render_to_response('videodetail.html', ret, context_instance=RequestContext(request))

def public_course_detail(request,new_id,**kwargs):
    '''页面详细渲染

    :param request:
    :param new_id:
    :param kwargs:
    :return:
    '''
    ret = {'news': '', 'username': '', 'category': '', 'nowuser': ''}
    news = models.courses.objects.get(id=new_id)

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #qcodes = qcode("http://www.askeds.com/detail/"+new_id)
    #qcodes.save(BASE_DIR + "/medias/qcode/"+ new_id+".jpg")
    category = models.Category.objects.all()

    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass

    ret['news'] = news
    ret['category'] = category


    return render_to_response('videodetail.html', ret, context_instance=RequestContext(request))


def doc_data(request, **kwargs):
    '''文档教程页面渲染

    :param request:
    :param kwargs:
    :return:
    '''
    ret = {'clickCount': '', 'document_data': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '', 'page': '',
           'username': '', 'category': '', 'nowuser': '', 'city': '', 'province': '', 'country': '', 'area': '',
           'message': '','carousel_data':'','advertising_data':''}


    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #servercode = qcode("http://127.0.0.1/server")
    #servercode.save(BASE_DIR + "/medias/qcode/server.jpg")
    indexpage = 1
    docpage = kwargs['page']
    docpage = common.try_int(docpage, 1)

    per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)
    count = models.News.objects.all().count()
    pageObj = html_helper.PageInfo(indexpage, count, per_item)
    nowCount = models.News.objects.all()[pageObj.start:pageObj.end].count()
    results = models.News.objects.all().order_by("-create_date")[pageObj.start:pageObj.end]
    category = models.Category.objects.all()

    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass
    page_string = html_helper.Pager(indexpage, pageObj.all_page_count, '/')
    docCount = models.DocumentData.objects.all().count()
    DocPageObj = html_helper.PageInfo(docpage, docCount, per_item)
    doc_page = html_helper.Pager(docpage, DocPageObj.all_page_count, '/doc_data/')
    document_data = models.DocumentData.objects.all().order_by("-create_date")[DocPageObj.start:DocPageObj.end]
    carousel_data = models.Carousel.objects.all()
    for  carousel in carousel_data:
        if carousel.newlink:
            carousel.newlink = carousel.newlink
        else:
            carousel.newlink = "/carousel_docdetail/" + str(carousel.id)


    #ret['data'] = results
    #广告位
    advertising_data = models.Advertising.objects.all()
    for  advertising in advertising_data:
        if advertising.newlink:
            advertising.newlink = advertising.newlink
        else:
            advertising.newlink = "/advertising_docdetail/" + str(advertising.id)

    ret['advertising_data'] = advertising_data
    ret['carousel_data'] = carousel_data

    ret['data'] = results
    ret['count'] = count
    ret['nowCount'] = nowCount
    ret['page'] = page_string
    ret['doc_visibility'] = ''
    ret['vio_visibility'] = 'none'
    ret['category'] = category
  #  ret['clickCount'] = clickCount
    ret['detail_url'] = 'videodetail/'
    ret['document_data'] = document_data
    ret['doc_page'] = doc_page
    ret['doc_selected'] = 'on'

    response = render_to_response('index.html', ret, context_instance=RequestContext(request))
    response.set_cookie('pager_num', per_item)
    return response

def doc_category(request, **kwargs):
    '''分类目录文档页面渲染

    :param request:http 请求
    :param kwargs:
    :return:
    '''
    ret = {'message': '', 'clickCount': '', 'document_data': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '',
           'page': '', 'username': '', 'category': '', 'cate_id': '', 'user': '', 'city': '', 'province': '',
           'country': '', 'doc_page': '','carousel_data':'', 'advertising_data':''}
    #clickCount = models.serverClient.objects.get(name='index')
    #temp = clickCount.serverclient + 1
    #clickCount.serverclient = temp
    #clickCount.save()
    cate_aid = str(request)
    cate_id = int(cate_aid[33])
    doc_cate_page = kwargs['page']
    cate_page = 1
    per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)
    doc_cate_page = common.try_int(doc_cate_page, 1)
    count = models.News.objects.filter(category__id=cate_id).count()
    pageObj = html_helper.PageInfo(cate_page, count, per_item)
    nowCount = models.News.objects.filter(category__id=cate_id)[pageObj.start:pageObj.end].count()
    results = models.News.objects.filter(category__id=cate_id).order_by("-create_date")[pageObj.start:pageObj.end]
    page_string = html_helper.Pager(cate_page, pageObj.all_page_count, '/category/%d/'%(cate_id))
    category = models.Category.objects.all()
    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass


    docCount = models.DocumentData.objects.filter(category__id=cate_id).count()
    DocPageObj = html_helper.PageInfo(doc_cate_page, docCount, per_item)
    doc_page = html_helper.Pager(doc_cate_page, DocPageObj.all_page_count, '/doc_category/%d/'%(cate_id))
    document_data = models.DocumentData.objects.filter(category__id=cate_id).order_by("-create_date")[DocPageObj.start:DocPageObj.end]
    carousel_data = models.Carousel.objects.all()
    for  carousel in carousel_data:
        if carousel.newlink:
            carousel.newlink = carousel.newlink
        else:
            carousel.newlink = "/carousel_docdetail/" + str(carousel.id)


    #ret['data'] = results
    #广告位
    advertising_data = models.Advertising.objects.all()
    for  advertising in advertising_data:
        if advertising.newlink:
            advertising.newlink = advertising.newlink
        else:
            advertising.newlink = "/advertising_docdetail/" + str(advertising.id)

    ret['advertising_data'] = advertising_data
    ret['carousel_data'] = carousel_data

    ret['data'] = results
    ret['count'] = count
    ret['nowCount'] = nowCount
    ret['page'] = page_string
    ret['category'] = category
    ret['cate_id'] = cate_id
    ret['doc_visibility'] = ''
    ret['vio_visibility'] = 'none'
    ret['document_data'] = document_data
    ret['doc_page'] = doc_page
    ret['doc_selected'] = 'on'

    response = render_to_response('index.html', ret, context_instance=RequestContext(request))
    response.set_cookie('pager_num', per_item)
    return response

def userlogin(request, *args, **kwargs):
    '''判断是否登入

    :param request:
    :param args:
    :param kwargs:
    :return:
    '''
    ret = {'status': 0, 'username': '', 'message': ''}
    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = str(username)
    except Exception as e:
        pass

    return HttpResponse(json.dumps(ret))

@outer
@got_videos
def videoplayer(request, new_id, **kwargs):
    '''页面详细渲染

    :param request:
    :param new_id:
    :param kwargs:
    :return:
    '''
    ret = {'news': '', 'username': '', 'category': '', 'nowuser': ''}
    news = models.News.objects.get(id=new_id)
    request.META['CONTENT_TYPE'] = 'video/mp4'
    request.META['HTTP_ACCEPT_RANGES'] = 'bytes'
    request.META['HTTP_CONTENT_RANGE'] = '0-1'
    #request.META['HTTP_CONTENT_LENGTH'] = '1234567'

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #qcodes = qcode("http://www.askeds.com/detail/"+new_id)
    #qcodes.save(BASE_DIR + "/medias/qcode/"+ new_id+".jpg")
    category = models.Category.objects.all()

    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass
    try:
        videos_url = json.loads(news.videos_url)
    except Exception as e:
        videos_url = {}
        news.videourl = '/' + 'medias' + '/' + news.video.name
        news.save
    ret['course_list'] = videos_url
    ret['news'] = news
    ret['category'] = category

    status = 200
    return render(request, 'videoplayer.html', ret, status=status)

@outer
def uploadindex(request):
    '''上传界面渲染

    :param request:
    :return:
    '''
    ret = {'category': '', 'username': '','newtype':''}
    category = models.Category.objects.all()
    newtype = models.NewType.objects.all()
    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass

    ret['category'] = category
    ret['newtype'] = newtype

    return render_to_response('uploadindex.html', ret, context_instance=RequestContext(request))

@outer
def collectbox(request):
    '''收藏夹

    :param request:
    :return:
    '''
    ret = {'category': '', 'username': '','show_collect_videos':''}
    category = models.Category.objects.all()
    session_username = request.session.get('is_login', 'None')

    try:
        username = models.Admin.objects.get(username__username=session_username)
        ret['username'] = username
    except Exception as e:
        pass
    show_collect = User.objects.filter(username=session_username).first()
    show_collect_videos = show_collect.news_set.all().order_by("-create_date")
    show_collect_docs = show_collect.documentdata_set.all().order_by("-create_date")
    ret['category'] = category
    ret['show_collect_videos'] = show_collect_videos
    ret['show_collect_docs'] = show_collect_docs
    ret['data'] = show_collect_docs

    return render_to_response('mobile_docindex.html', ret, context_instance=RequestContext(request))

@outer
def com_collectbox(request):
    '''收藏夹

    :param request:
    :return:
    '''
    ret = {'category': '', 'username': '','show_collect_videos':''}
    category = models.Category.objects.all()
    session_username = request.session.get('is_login', 'None')

    try:
        username = models.Admin.objects.get(username__username=session_username)
        ret['username'] = username
    except Exception as e:
        pass
    show_collect = User.objects.filter(username=session_username).first()
    show_collect_videos = show_collect.news_set.all().order_by("-create_date")
    show_collect_docs = show_collect.documentdata_set.all().order_by("-create_date")
    ret['category'] = category
    ret['show_collect_videos'] = show_collect_videos
    ret['show_collect_docs'] = show_collect_docs
    ret['data'] = show_collect_docs

    return render_to_response('collectbox.html', ret, context_instance=RequestContext(request))

@outer
def usercenter(request):
    '''用户中心

    :param request:
    :return:
    '''
    ret = {'category': '', 'username': ''}
    category = models.Category.objects.all()
    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass

    ret['category'] = category

    return render_to_response('usercenter.html', ret, context_instance=RequestContext(request))

def image_to_webp(filepath, filename):

    filename_webp_foot = filename.split('.', -1)[-1]
    filename_webp = filename.strip("."+filename_webp_foot) + ".webp"
    cmd = '/usr/bin/cwebp ' + filepath + filename + ' ' + '-o ' + filepath + filename_webp
    os.popen(cmd).read()

    return True

def upload_image(request):
    if request.method == 'POST':
        callback = request.GET.get('CKEditorFuncNum')
        try:
            file_time = time.strftime("%Y%m%d%H%M%S",time.localtime())
            file_show_name = "/medias/upload_imgss/" + file_time
            path = BASE_DIR + file_show_name
            f = request.FILES["upload"]
            file_name = path + "_" + f.name
            file_show_name = file_show_name + "_" + f.name

            des_origin_f = open(file_name, "wb+")
            for chunk in f:                
                des_origin_f.write(chunk)
            des_origin_f.close()
        except Exception as e:
            print(e)
        res = r"<script>window.parent.CKEDITOR.tools.callFunction("+callback+",'"+file_show_name+"', '');</script>"
        return HttpResponse(res)
    else:
        raise Http404()


def uploadimg(request):
    ret = {'image_url': ''}
    if request.method == 'POST':
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


        try:
            img_url = "/medias/upload_imgss/"
            now_time = time.strftime("%Y%m%d%H%M%S", time.localtime())
            path = BASE_DIR + img_url
            f = request.FILES["imgage_file_id"]
            fname = now_time + f.name[-20:]
            full_file_name = path + fname
            image_static_path = img_url + fname
            print(image_static_path)
            des_origin_f = open(full_file_name, "wb+")

            for chunk in f:
                des_origin_f.write(chunk)
            des_origin_f.close()
            ifok = image_to_webp(path, fname)


        except Exception as e:
            print(e)
            sys.exit()

        res = 'ok'
        ret['image_url'] = image_static_path
        return HttpResponse(json.dumps(ret))
    else:
        raise Http404()






def uploadvideo(request):
    ret = {'video_url': ''}

    if request.method == 'POST':
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        callback = request.GET.get('CKEditorFuncNum')
        try:
            img_url = "/medias/video/"
            now_time = time.strftime("%Y%m%d%H%M%S", time.localtime())
            path = BASE_DIR + img_url


            f = request.FILES["video_file_id"]
            if f.name.split('.', -1)[-1] == 'zip':
                full_file_name = path + f.name
                video_static_path = img_url + f.name
                des_origin_f = open(full_file_name, "wb+")

                for chunk in f:
                    des_origin_f.write(chunk)
                des_origin_f.close()

            else:
                fname = str(now_time)+f.name[-20:]
                full_file_name = path + fname
                video_static_path = img_url + fname
                des_origin_f = open(full_file_name, "wb+")

                for chunk in f:
                    des_origin_f.write(chunk)
                des_origin_f.close()
        except Exception as e:
            print(e)
        res = 'ok'
        ret['video_url'] = video_static_path
        return HttpResponse(json.dumps(ret))
    else:
        raise Http404()



def un_rar(file_name, path, dest_name):
    """unrar zip file"""

    os.chdir(path)
    rar = rarfile.RarFile(file_name)
    rar.extractall(path + dest_name)
    rar.close()
    return True


def readrar(file_name, path, static_url, file_time, ret):
    try:
        videonameDic = {}

        os.chdir(path)
        rar = rarfile.RarFile(file_name)
        namelist = rar.namelist()
        for videoname in namelist:
            if '/' in videoname:
                video_name = videoname.split('/', -1)[1].replace('.mp4', "")
                videoname = file_time + '/' + videoname
                videoname = parse.unquote(videoname)
                url = static_url + videoname
                videonameDic.setdefault(video_name, url)
            else:
                if '.mp4' in videoname:
                    video_name = videoname.replace('.mp4', "")
                    videoname = file_time + '/' + videoname
                    videoname = parse.unquote(videoname)
                    url = static_url + videoname
                    videonameDic.setdefault(video_name, url)
        return videonameDic
    except Exception as e:
        message = 'rar文件压缩格式错误，请查看'
        ret['message'] = message
        ret['status'] = 1
        return HttpResponse(json.dumps(ret))




def chage_foot_image(url, new_foot):
    filename_webp_foot = url.split('.', -1)[-1]
    filename_webp = url.strip("." + filename_webp_foot) + "."+ new_foot
    return filename_webp


def save(request, *args, **kwargs):
    '''
    视频资料保存与文档资料保存
    :param request:
    :param args:
    :param kwargs:
    :return:
    '''

    ret = {'status': 0, 'data': '', 'message': '', "display_img": ''}
    try:
        videonameDic = {}
        image_storage_path = None
        video_storage_path = None
        video_storage_url = None
        data_type = request.POST.get('select_value_tit_id')
        if data_type:
            data_type_int = int(data_type)
        category = request.POST.get('upload_categrory_id')
        course_price = request.POST.get('course_price_id') or 0
        content = request.POST.get('create_content_id')
        tags = request.POST.get('tags_id')
        tags = tags.split(',' ,-1)
        cover_image = request.POST.get('preview_id')
        summary = request.POST.get('introductions_id')
        loginSession = request.session.get('is_login', None)
        img_url = "/medias/video/"
        path = BASE_DIR + img_url

        title = request.POST.get('title_text')
        videourl = request.POST.get('videourl_text')

        if not title or not category or not content or not cover_image or not data_type or not tags:
            message = 'Incomplete information'
            ret['message'] = message
            ret['status'] = 1
            return HttpResponse(json.dumps(ret))

        if not videourl:
            video_storage_url = request.POST.get('video_file_id')
            if not video_storage_url:
                video_storage_url = request.POST.get('video_file_id')
            if data_type_int == 0:
                if '.mp4' not in video_storage_url and '.rar' not in video_storage_url:
                    message = '请输入.mp4 或者.rar'
                    ret['message'] = message
                    ret['status'] = 1
                    return HttpResponse(json.dumps(ret))
            foot = video_storage_url.split('.', -1)[-1]
            if foot == 'rar':
                #file_time = time.strftime("%Y%m%d%H%M%S", time.localtime())
                fname = video_storage_url.split('/', -1)[-1]
                fname = parse.unquote(fname)
                dest_name = fname.strip('.rar').strip()[0:600]
                videonameDic = readrar(fname, path, img_url, dest_name, ret)
                if videonameDic:
                    un_rar_result = un_rar(fname, path, dest_name)
                    if un_rar_result:
                        os.remove(path+fname)
                    try:
                        video_storage_url = sorted(videonameDic.items())[0][1]
                    except Exception as e:
                        pass




        if cover_image:
            cover_image_static = cover_image.split('/', 4)[4]
            image_storage_path = BASE_DIR + '/'+cover_image_static

        if video_storage_url:
            cover_video_static = video_storage_url.split('/', 3)[3]
            video_storage_path = BASE_DIR + '/' + cover_video_static

        if video_storage_url:
            videourl = video_storage_url


        #0代表视频教程 1 代表文档教程
        if data_type_int == 0:
            if not title or not category or not content or not cover_image \
                    or not data_type or not tags or not videourl:
                message = 'Incomplete information'
                if image_storage_path:
                    if os.path.exists(image_storage_path):
                        os.remove(image_storage_path)
                if video_storage_path:
                    if os.path.exists(video_storage_path):
                        os.remove(video_storage_path)

                ret['message'] = message
                ret['status'] = 1
                return HttpResponse(json.dumps(ret))

            if loginSession:
                category = models.Category.objects.filter(name=category)[0]
                tag_obj_list = []
                for tag in tags:
                    tags_exist = models.NewType.objects.filter(display=tag)
                    if not tags_exist:
                        models.NewType.objects.create(display=tag)
                    tag = models.NewType.objects.filter(display=tag)[0]
                    if tag:
                        tag_obj_list.append(tag)
                if not tag_obj_list:
                    tag_obj_list= None
                username = models.Admin.objects.filter(username__username=loginSession)[0]
                lesson_exist = models.News.objects.filter(title=title)
                videonameDic = json.dumps(videonameDic, ensure_ascii=False)
                cover_image_webp_static = chage_foot_image(cover_image_static, 'webp')

                if not lesson_exist:
                    create_video_lesson = models.News.objects.create(
                                                                category=category,
                                                                title=title,
                                                                content=content,
                                                                course_price=course_price,
                                                                videourl=videourl,
                                                                newpic=cover_image_static,
                                                                newpic_webp=cover_image_webp_static,
                                                                news_type=tag_obj_list,
                                                                user=username,
                                                                summary=summary,
                                                                videos_url=videonameDic,
                                                                                     )
                    ret['status'] = 0
                else:
                    ret['message'] = 'Title already exist'
                    return HttpResponse(json.dumps(ret))
            ret['message'] = 'ok'
            return HttpResponse(json.dumps(ret))


        '''
        文档资料保存
        '''
        if data_type_int == 1:
            if not title or not category or not content or not cover_image or not data_type or not tags:
                message = 'Incomplete information'
                if image_storage_path:
                    if os.path.exists(image_storage_path):
                        os.remove(image_storage_path)


                ret['message'] = message
                ret['status'] = 1
                return HttpResponse(json.dumps(ret))
            if loginSession:
                category = models.Category.objects.filter(name=category)[0]

                for tag in tags:
                    tags_exist = models.NewType.objects.filter(display=tag)
                    if not tags_exist:
                        models.NewType.objects.create(display=tag)
                tag_obj_list = models.NewType.objects.filter(display__in=tags)

                username = models.Admin.objects.filter(username__username=loginSession)[0]
                lesson_exist = models.DocumentData.objects.filter(title=title)
                cover_image_webp_static = chage_foot_image(cover_image_static, 'webp')
                if not lesson_exist:
                    create_doc = models.DocumentData.objects.create(
                        category=category,
                        title=title,
                        content=content,
                        check_enable=True,
                        course_price=course_price,
                        newpic=cover_image_static,
                        # news_type__display=tag_obj_list,
                        newpic_webp=cover_image_webp_static,
                        user=username,
                        summary=summary
                    )

                    create_doc.news_type=tag_obj_list
                    ret['status'] = 0
                else:
                    ret['message'] = 'Title already exist'
                    return HttpResponse(json.dumps(ret))
            ret['message'] = 'ok'

            return HttpResponse(json.dumps(ret))
    except Exception as e:
        print(e)
        message = '上传失败，请稍后尝试'
        ret['message'] = message
        ret['status'] = 1
        return HttpResponse(json.dumps(ret))

def add_to_cart(request):
    '''
        加入购物车
        :param self:
        :return:
        '''
    ret = {'clickCount': '', 'notice': '', 'focusnew': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '',
           'page': '', 'username': '', 'category': '', 'nowuser': '', 'city': '', 'province': '', 'country': '',
           'area': '', 'message': ''}
    session_logined = request.session.get('is_login')
    if not session_logined:
        ret['message'] = 'not login'
        return HttpResponse(json.dumps(ret))

    new_id = request.POST.get('newId')
    username_logined = models.Admin.objects.get(username__username=session_logined)
    add_my_cart = models.BuyCart.objects.get(cart_owner=username_logined)
    if add_my_cart.product.filter(id=new_id).first():
        ret['message'] = 'already add to cart'
        return HttpResponse(json.dumps(ret))
    add_my_cart.product.add(new_id)
    ret['message'] = 'ok'

    return HttpResponse(json.dumps(ret))


def del_from_cart(request):
    '''
        加入购物车
        :param self:
        :return:
        '''
    ret = {'clickCount': '', 'notice': '', 'focusnew': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '',
           'page': '', 'username': '', 'category': '', 'nowuser': '', 'city': '', 'province': '', 'country': '',
           'area': '', 'message': ''}
    session_logined = request.session.get('is_login')
    if not session_logined:
        ret['message'] = 'not login'
        return HttpResponse(json.dumps(ret))

    new_id = request.POST.get('newId')
    username_logined = models.Admin.objects.get(username__username=session_logined)


    add_my_cart = models.BuyCart.objects.get(cart_owner=username_logined)

    if not add_my_cart.product.filter(id=new_id).first():
        ret['message'] = 'already del from cart'
        return HttpResponse(json.dumps(ret))
    add_my_cart.product.remove(new_id)
    ret['message'] = 'ok'

    return HttpResponse(json.dumps(ret))

def collection(request):
    '''
    用户收藏 视频教程或者文本教程
    :param self:
    :return:
    '''
    ret = {'clickCount':'','notice':'','focusnew':'','status':0,'data':'','count':'','nowCount':'','page':'','username':'','category':'','nowuser':'','city':'','province':'','country':'','area':'','message':''}
    session_logined = request.session.get('is_login')
    if not session_logined:
        ret['message'] = 'not login'
        return HttpResponse(json.dumps(ret))

    video_new_id = request.POST.get('videoNewid')
    username_logined = User.objects.get(username=session_logined)

    new = models.News.objects.get(id=video_new_id)
    if new.focususer.filter(username=username_logined).first():
        ret['message'] = 'already focus'
        return HttpResponse(json.dumps(ret))
    new.focususer.add(username_logined)
    temp = new.favor_count
    ret['data'] = temp
    ret['message'] = 'ok'

    return HttpResponse(json.dumps(ret))


def doc_collection(request):
    '''
      用户收藏 文档教程或者文本教程
      :param self:
      :return:
      '''
    ret = {'clickCount': '', 'notice': '', 'focusnew': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '',
           'page': '', 'username': '', 'category': '', 'nowuser': '', 'city': '', 'province': '', 'country': '',
           'area': '', 'message': ''}
    session_logined = request.session.get('is_login')
    if not session_logined:
        ret['message'] = 'not login'
        return HttpResponse(json.dumps(ret))

    doc_new_id = request.POST.get('docNewid')
    click_type = request.POST.get('clickType')
    username_logined = User.objects.get(username=session_logined)

    if click_type !='cancel':
        new = models.DocumentData.objects.get(id=doc_new_id)
        if new.focususer.filter(username=username_logined).first():
            ret['message'] = 'already focus'
            return HttpResponse(json.dumps(ret))
        new.focususer.add(username_logined)
    else:
        new = models.DocumentData.objects.get(id=doc_new_id)
        if not new.focususer.filter(username=username_logined).first():
            ret['message'] = 'already del focus'
            return HttpResponse(json.dumps(ret))
        new.focususer.remove(username_logined)
    ret['message'] = 'ok'
    ret['focus_count'] = new.focususer.count()

    return HttpResponse(json.dumps(ret))

@outer
def search(request,**kwargs):
    ret = {'type': '', 'document_data': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '', 'page': '',
           'username': '', 'category': '', 'nowuser': '', 'city': '', 'province': '', 'country': '', 'area': '',
           'message': ''}

    session_logined = request.session.get('is_login')
    if not session_logined:
        ret['message'] = 'not login'
        return HttpResponse(json.dumps(ret))

    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:

        pass
    searchtype = request.GET.get('type')
    keyword = request.GET.get('keywords')
    category = models.Category.objects.all()
    ret['category'] = category
    if searchtype == 'project':
        # 多个字段模糊查询， 括号中的下划线是双下划线，双下划线前是字段名，双下划线后可以是icontains或contains,区别是是否大小写敏感，竖线是或的意思
        video = models.News.objects.filter(Q(title__icontains=keyword) \
                                                        | Q(content__icontains=keyword))
        article = models.DocumentData.objects.filter(Q(title__icontains=keyword) \
                                                        | Q(content__icontains=keyword))

        ret['type'] = "videodetail"
        ret['data'] = video
        ret['article_data'] = article
    elif searchtype == "video":
        # 单个字段模糊查询
        results = models.News.objects.filter(Q(title__icontains=keyword)|Q(content__icontains=keyword))
        ret['data'] = results
        ret['type'] = "videodetail"
    elif searchtype == "article":
        page = request.GET.get('page')
        per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)
        docpage = common.try_int(page, 1)
        docCount = models.DocumentData.objects.filter(check_enable=True).filter(
            Q(title__icontains=keyword) | Q(content__icontains=keyword)).order_by("-create_date").count()
        ret['count'] = docCount
        DocPageObj = mobile_html_helper.PageInfo(docpage, docCount, per_item)
        doc_page = mobile_html_helper.Pager(docpage, DocPageObj.all_page_count,'/search/?keywords=%s&type=%s&page='%(keyword,searchtype))
        document_data = models.DocumentData.objects.filter(check_enable=True).filter(
            Q(title__icontains=keyword) | Q(content__icontains=keyword)).order_by("-create_date")[DocPageObj.start: DocPageObj.end]
        ret['page'] = doc_page
        ret['data'] = document_data
        ret['type'] = 'docdetail'
    elif searchtype == "teacher":
        tearchers = models.Admin.objects.filter(username__username__icontains=keyword)
        ret['data'] = tearchers
        response = render_to_response('teacher_search.html', ret, context_instance=RequestContext(request))
        return response
    else:
        # 使用点连接的filter链表示and
       ret['message'] = '查询类型有误'

    response = render_to_response('search.html', ret, context_instance=RequestContext(request))

    return response


def user_save(request, *args, **kwargs):
    '''
    视频资料保存与文档资料保存
    :param request:
    :param args:
    :param kwargs:
    :return:
    '''

    ret = {'status': 0, 'data': '', 'message': '', "display_img": ''}
    usernameId = request.POST.get('usernameIdNum')
    username = request.POST.get('usernameId')
    person_id = request.POST.get('personId')
    telephoneNum = request.POST.get('telephoneNumId')
    qqNum = request.POST.get('qqNumId')
    email = request.POST.get('emailId')
    type = request.POST.get('type')
    userpic= request.POST.get('userpicPreview').split('/', 4)[4]
    loginSession = request.session.get('is_login', None)


    #基本信息保存
    if type == 'base_save':

        if loginSession:
            user_change = models.Admin.objects.get(id=usernameId)
            user_change.username__username = username
            user_change.email = email
            user_change.userpic = userpic
            user_change.save()
            ret['status'] = 0
        else:
            ret['message'] = 'Title already exist'
            return HttpResponse(json.dumps(ret))
        ret['message'] = 'ok'
        return HttpResponse(json.dumps(ret))
        # 基本信息保存
    if type == 'mobile_base_save':
        if loginSession:
            user_change = models.Admin.objects.get(id=usernameId)
            user_change.userpic = userpic
            user_change.save()
            ret['status'] = 0
        else:
            ret['message'] = 'Title already exist'
            return HttpResponse(json.dumps(ret))
        ret['message'] = 'ok'
        return HttpResponse(json.dumps(ret))


@outer
def my_shopping_cart(request):
    ret = {'status': 0, 'message': '', 'category': '', 'data': '', "ids":''}
    category = models.Category.objects.all()
    loginSession = request.session.get('is_login', None)
    if not models.Admin.objects.filter(username__username=loginSession):
        return redirect('/logout')
    cart_owner = models.Admin.objects.filter(username__username=loginSession)[0]

    buycart = models.BuyCart.objects.get(cart_owner=cart_owner)
    products=buycart.product.all()
    ids=[]
    for new in products:
        ids.append(new.id)

    ret['ids'] = ids
    ret['category'] = category
    ret['data'] = products




    return render_to_response('my_shopping_cart.html', ret, context_instance=RequestContext(request))


def webpay(request):
    '''
    支付页面
    :param request:
    :return:
    '''
    ret = {'total_price': '', 'total_goods': '', 'message': ''}
    pay_list_uuid = request.GET.get('list_uuid')
    if not pay_list_uuid:
        ret['message'] = 'The order number does not exist'
        return render_to_response('404.html', ret, context_instance=RequestContext(request))
    goods_list = models.GoodsList.objects.get(list_uuid=pay_list_uuid)
    total_price = goods_list.total_price
    total_goods = goods_list.total_goods.all()
    seller_total = []
    goods_render = []
    for goods in total_goods:
        goods_render.append(goods)
        if goods.user not in seller_total:
            seller_total.append(goods.user)
    ret["total_price"] = total_price
    ret["total_goods"] = goods_render
    ret["seller_total"] = seller_total

    return render_to_response('webpay.html', ret, context_instance=RequestContext(request))




def goods_list(request, *args, **kwargs):
    '''
    视频资料保存与文档资料保存
    :param request:
    :param args:
    :param kwargs:
    :return:
    '''

    ret = {'status': 0, 'data': '', 'message': '', "display_img": '', 'list_uuid':''}
    TotalPrice = request.POST.get('TotalPrice').split('￥')[1]
    TotalPrice = int(TotalPrice)
    TotalGoods = request.POST.get('TotalGoods')
    newIdlist = json.loads(request.POST.get('newIdList'))
    loginSession = request.session.get('is_login', None)




    if loginSession:
        GoodsCreate=models.GoodsList.objects.create(total_num=TotalGoods,
                                        total_price=TotalPrice,
                                        buyers=loginSession,
                                        )
        list_uuid = GoodsCreate.list_uuid
   
        for newid in newIdlist:
            goods = models.News.objects.get(id=newid)
            GoodsCreate.total_goods.add(goods)

        ret['status'] = 0
        ret['list_uuid'] = str(list_uuid)

    else:
        ret['message'] = 'Title already exist'
        return HttpResponse(json.dumps(ret))
    ret['message'] = 'ok'
    return HttpResponse(json.dumps(ret))

#def public_course(request,**kwargs):
#    ret = {'clickCount': '', 'document_data': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '', 'page': '',
#           'username': '', 'category': '', 'nowuser': '', 'city': '', 'province': '', 'country': '', 'area': '',
#           'message': '', 'course_selected': ''}
    # 页面点击数统计
    # clickCount = models.serverClient.objects.get(name='index')
    # temp = clickCount.serverclient + 1
    # clickCount.serverclient = temp
    # clickCount.save()

#    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#    servercode = qcode("http://127.0.0.1/server")
#    servercode.save(BASE_DIR + "/medias/qcode/server.jpg")
#    # 视频教程数据渲染
#    indexpage = kwargs['page']
#    per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)
#    indexpage = common.try_int(indexpage, 1)
#    docpage = 1
#    count = models.courses.objects.all().count()
#    pageObj = html_helper.PageInfo(indexpage, count, per_item)
#    nowCount = models.courses.objects.all()[pageObj.start:pageObj.end].count()
#    results = models.courses.objects.all().order_by("-create_date")[pageObj.start:pageObj.end]
#    category = models.Category.objects.all()
#    page_string = html_helper.Pager(indexpage, pageObj.all_page_count, '/public_course/')

#    try:
#        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
#        ret['username'] = username
#    except Exception as e:

#        pass
#    # 文档教程数据渲染
#    docCount = models.DocumentData.objects.all().count()
#    DocPageObj = html_helper.PageInfo(docpage, docCount, per_item)
#    doc_page = html_helper.Pager(docpage, DocPageObj.all_page_count, '/doc_data/')
#    document_data = models.DocumentData.objects.all().order_by("-create_date")[DocPageObj.start:DocPageObj.end]
#
 #   ret['data'] = results
 #   ret['count'] = count
 #   ret['nowCount'] = nowCount
 #   ret['page'] = page_string
 #   ret['detail_url'] = 'public_course_detail/'

#    ret['category'] = category
 #   ret['document_data'] = document_data
 #   ret['doc_page'] = doc_page
 #   ret['course_selected'] = 'on'

  #  response = render_to_response('index.html', ret)
  #  response.set_cookie('pager_num', per_item)
   # return response
@outer
def user_center(request):
    ret = {'category': '', 'username': '', 'goodlist': ''}
    category = models.Category.objects.all()
    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass
    goodlist = models.GoodsList.objects.filter(buyers=username)
    ret['category'] = category
    ret['goodlist'] = goodlist
    return render_to_response('user_center.html', ret, context_instance=RequestContext(request))


def addfavor(request, *args, **kwargs):
    '''
    点赞
    :param request:
    :param args:
    :param kwargs:
    :return:
    '''
    ret = {'status': 0, 'data': '', 'message': ''}
    try:
        loginSession = request.session.get('is_login', None)
        if loginSession:
            id = request.POST.get('nid')
            DocumentObj = models.DocumentData.objects.get(id=id)
            temp = DocumentObj.favor_count + 1
            DocumentObj.favor_count = temp
            DocumentObj.save()
            ret['status'] = 1
            ret['data'] = temp
            # return HttpResponse(json.dumps(ret))
        else:
            ret['status'] = '1'
            ret['username'] = 'None'

    except Exception as e:
        ret['message'] = e

    return HttpResponse(json.dumps(ret))


def video_addfavor(request, *args, **kwargs):
    '''
       点赞
       :param request:
       :param args:
       :param kwargs:
       :return:
       '''
    ret = {'status': 0, 'data': '', 'message': ''}
    try:
        loginSession = request.session.get('is_login', None)
        if loginSession:
            id = request.POST.get('nid')
            newsObj = models.News.objects.get(id=id)
            temp = newsObj.favor_count + 1
            newsObj.favor_count = temp
            newsObj.save()
            ret['status'] = 1
            ret['data'] = temp
            # return HttpResponse(json.dumps(ret))
        else:
            ret['status'] = '1'
            ret['username'] = 'None'

    except Exception as e:
        ret['message'] = e

    return HttpResponse(json.dumps(ret))


def mobile_index(request,**kwargs):
    '''渲染字典返回主页index

    :param request:
    :param kwargs:
    :param indexpage:主页当前page
    :param docpage: 当前文档教程page页码
    :return: response

    '''
    ret = {'clickCount': '', 'document_data': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '', 'page': '',
           'username': '', 'category': '', 'nowuser': '', 'city': '', 'province': '', 'country': '', 'area': '',
           'message': '', 'detail_url': '', 'video_selected': '', 'category_url':'','carousel_data':'','toutiaos':[],
           'web_name':settings.WEB_NAME}


    indexpage = kwargs['page']
    per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)
    indexpage = common.try_int(indexpage, 1)

    count = models.News.objects.all().count()
    pageObj = mobile_html_helper.PageInfo(indexpage, count, per_item)
    nowCount = models.News.objects.all()[pageObj.start:pageObj.end].count()
    results = models.News.objects.filter(check_enable=True).order_by("-create_date")[pageObj.start:pageObj.end]

    toutiaos = models.DocumentData.objects.filter(check_enable=True,).filter(~Q(category__id=5)).order_by("-favor_count")[0:4]

    category = models.Category.objects.all()
    page_string = mobile_html_helper.Pager(indexpage, pageObj.all_page_count, '/mobile_index/')

    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:

        pass
    carousel_data = models.Carousel.objects.all()
    for carousel in carousel_data:
        if carousel.newlink:
            carousel.newlink = carousel.newlink
        else:
            carousel.newlink = "/mobile_carousel_docdetail/" + str(carousel.id)
    ret['carousel_data'] = carousel_data
    ret['data'] = results
    if indexpage >= 1:
        ret['scroll'] = 600
    else:
        ret['scroll'] = 0
    ret['count'] = count
    ret['nowCount'] = nowCount
    ret['page'] = page_string
    ret['toutiaos'] = toutiaos
    ret['category'] = category
    ret['detail_url'] ='mobile_videodetail/'
    ret['index_video_selected'] = 'active'
    ret['video_selected'] = 'active'
    ret['category_url'] = 'mobile_category'

    response = render_to_response('mobile_index.html', ret,context_instance=RequestContext(request))
    response.set_cookie('pager_num', per_item)
    return response

#@outer
def mobile_videodetail(request,new_id,**kwargs):
    '''页面详细渲染

    :param request:
    :param new_id:
    :param kwargs:
    :return:
    '''
    ret = {'news': '', 'username': '', 'category': '', 'nowuser': '', 'NewType':'', 'course_list':'',
           'web_name':settings.WEB_NAME}
    news = models.News.objects.get(id=new_id)

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #qcodes = qcode("http://www.askeds.com/detail/"+new_id)
    #qcodes.save(BASE_DIR + "/medias/qcode/"+ new_id+".jpg")
    category = models.Category.objects.all()
    news_type = news.news_type
    news_type_video = models.News.objects.filter(news_type=news_type,check_enable=True).exclude(id=new_id)
    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass
    try:
        videos_url = json.loads(news.videos_url)
    except Exception as e:
        videos_url={}
        news.videourl = '/' + 'medias' + '/' + news.video.name
        news.save

    ret['news'] = news
    ret['course_list'] = videos_url
    ret['category'] = category
    ret['news_type_video'] = news_type_video



    return render_to_response('mobile_videodetail.html', ret, context_instance=RequestContext(request))



def mobile_category(request, **kwargs):
    '''导航分类信息渲染

    :param request:http 请求
    :param kwargs:
    :return:
    '''
    ret = {'message': '', 'clickCount': '', 'document_data': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '',
           'page': '', 'username': '', 'category': '', 'cate_id': '', 'user': '', 'city': '', 'province': '',
           'country': '', 'doc_page': '', 'detail_url': '', 'video_selected': '','carousel_data':''}


    cate_aid = str(request)
    cate_id = int(cate_aid[36])
    cate_page = kwargs['page']
    per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)
    cate_page = common.try_int(cate_page, 1)
    count = models.News.objects.filter(category__id=cate_id).count()
    pageObj = mobile_html_helper.PageInfo(cate_page, count, per_item)
    nowCount = models.News.objects.filter(category__id=cate_id)[pageObj.start:pageObj.end].count()
    results = models.News.objects.filter(category__id=cate_id, check_enable=True).order_by("-create_date")[pageObj.start:pageObj.end]
    page_string = mobile_html_helper.Pager(cate_page, pageObj.all_page_count, '/mobile_category/%d/'%(cate_id))
    category = models.Category.objects.all()
    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass

    carousel_data = models.Carousel.objects.all()
    for carousel in carousel_data:
        if carousel.newlink:
            carousel.newlink = carousel.newlink
        else:
            carousel.newlink = "/mobile_carousel_docdetail/" + str(carousel.id)
    toutiaos = models.DocumentData.objects.filter(check_enable=True,).filter(~Q(category__id=5)).order_by("-favor_count")[0:4]
    ret['toutiaos'] = toutiaos
    ret['carousel_data'] = carousel_data
    ret['data'] = results
    ret['count'] = count
    ret['nowCount'] = nowCount
    ret['page'] = page_string
    ret['category'] = category
    ret['cate_id'] = cate_id
    ret['keyword'] = '请输入你要查找的内容'
    ret['video_selected'] = 'active'

    response = render_to_response('mobile_index.html', ret, context_instance=RequestContext(request))
    response.set_cookie('pager_num', per_item)
    return response


def mobile_doccategory(request, **kwargs):
    '''导航分类信息渲染

    :param request:http 请求
    :param kwargs:
    :return:
    '''
    ret = {'message': '', 'clickCount': '', 'document_data': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '',
           'page': '', 'username': '', 'category': '', 'cate_id': '', 'user': '', 'city': '', 'province': '',
           'country': '', 'doc_page': '', 'detail_url': '', 'video_selected': '',
           'carousel_data':'','web_name':settings.WEB_NAME}

    cate_id = int(request.path.split('/', -1)[-2])
    doc_cate_page = request.path.split('/', -1)[-1]
    doc_cate_page = common.try_int(doc_cate_page, 1)
    per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)
    category = models.Category.objects.all()
    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass

    docCount = models.DocumentData.objects.filter(category__id=cate_id).count()
    DocPageObj = mobile_html_helper.PageInfo(doc_cate_page, docCount, per_item)
    doc_page = mobile_html_helper.Pager(doc_cate_page, DocPageObj.all_page_count, '/mobile_doccategory/%d/'%(cate_id))
    document_data = models.DocumentData.objects.filter(category__id=cate_id, check_enable=True).order_by("-create_date")[DocPageObj.start:DocPageObj.end]
    carousel_data = models.Carousel.objects.all()
    for carousel in carousel_data:
        if carousel.newlink:
            carousel.newlink = carousel.newlink
        else:
            carousel.newlink = "/mobile_carousel_docdetail/" + str(carousel.id)
    toutiaos = models.DocumentData.objects.filter(check_enable=True,).filter(~Q(category__id=5)).order_by("-favor_count")[0:4]
    # ret['toutiaos'] = toutiaos
    if cate_id >= 1:
        ret['scroll'] = 600
    else:
        ret['scroll'] = 0
    # ret['carousel_data'] = carousel_data
    ret['data'] = document_data
    ret['count'] = docCount
    ret['page'] = doc_page
    ret['category'] = category
    ret['cate_id'] = cate_id
    ret['doc_selected'] = 'active'
    ret['keyword'] = '请输入你要查找的内容'
    response = render_to_response('mobile_docindex.html', ret, context_instance=RequestContext(request))
    response.set_cookie('pager_num', per_item)
    return response


def check_if_pre(new_id):
    new_id = new_id - 1
    predoc = models.DocumentData.objects.filter(id=new_id).first()
    if not predoc:
        if new_id >= 1:
            predoc = check_if_pre(new_id)
            return predoc
        else:
            return None
    else:
        return predoc



def check_if_next(new_id,all_count):
    new_id = new_id + 1
    next_docc = models.DocumentData.objects.filter(id=new_id).first()
    if not next_docc:
        if new_id <= all_count:
            next_docc = check_if_next(new_id,all_count)
            return next_docc
        else:
            return None
    else:
        return next_docc

def mobile_docdetail(request,new_id,**kwargs):
    '''页面详细渲染

    :param request:
    :param new_id:
    :param kwargs:
    :return:
    '''
    ret = {'docnews': '', 'username': '', 'category': '', 'nowuser': '','web_name':settings.WEB_NAME,
           'tuijian':[],'new_type':'','predoc':'','nextdoc':'','carousel_data':[]}
    tuijian = []
    predoc = None
    new_id = int(new_id)
    docnews = models.DocumentData.objects.get(id=new_id)
    ret['cate_id'] = docnews.category.id
    carousel_data = models.Carousel.objects.all()
    predoc = check_if_pre(new_id)
    all_count = models.DocumentData.objects.order_by('-id')[0]
    all_count = all_count.id
    nextdoc = check_if_next(new_id,all_count)

    all_lable = models.NewType.objects.all()
    new_type = docnews.news_type.all()
    if new_type:
        for ntype in new_type:
            dispaly = ntype.display
            tuijian_one = models.DocumentData.objects.filter(news_type=ntype,check_enable=True)\
                .filter(~Q(id=new_id)).order_by("-create_date")
            tuijian_one = list(tuijian_one)
            tuijian = tuijian + tuijian_one

    else:
        tuijian = []
    if len(tuijian)>10:
        tuijian = tuijian[0:9]
    category = models.Category.objects.all()

    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass
    docnews.content = docnews.content.replace('\r\n','<br>')
    content = markdown.markdown(docnews.content,
                                extensions=[
                                    'markdown.extensions.extra',
                                    'markdown.extensions.abbr',
                                    'markdown.extensions.attr_list',
                                    'markdown.extensions.def_list',
                                    'markdown.extensions.fenced_code',
                                    'markdown.extensions.footnotes',
                                    'markdown.extensions.tables',
                                    'markdown.extensions.admonition',
                                    'markdown.extensions.codehilite',
                                    'markdown.extensions.meta',
                                    'markdown.extensions.nl2br',
                                    'markdown.extensions.sane_lists',
                                    'markdown.extensions.smarty',
                                    'markdown.extensions.toc',
                                    'markdown.extensions.wikilinks',
                                ])
    docnews.content = content
    if request.session.get('is_login', 'None'):
        if docnews.focususer.filter(username=request.session.get('is_login', 'None')).first():
           ret['if_collect'] = '取消收藏'
        else:
            ret['if_collect'] = '收藏'
    ret['docnews'] = docnews
    ret['category'] = category
    ret['tuijian'] = tuijian
    ret['new_type'] = all_lable
    ret['predoc'] = predoc
    ret['nextdoc'] = nextdoc
    ret['detail_type'] = 'mobile_docdetail'
    ret['carousel_data'] = carousel_data
    ret['index_doc_selected'] = 'active'
    ret['doc_selected'] = 'active'
    ret['new_doc_selected'] = 'selected'

    return render_to_response('mobile_docdetail.html', ret, context_instance=RequestContext(request))


def mobile_carousel_docdetail(request,new_id,**kwargs):
    '''页面详细渲染

    :param request:
    :param new_id:
    :param kwargs:
    :return:
    '''
    ret = {'docnews': '', 'username': '', 'category': '', 'nowuser': ''}
    docnews = models.Carousel.objects.get(id=new_id)
    category = models.Category.objects.all()
    ret['category'] = category

    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:
        pass
    ret['docnews'] = docnews

    return render_to_response('mobile_advertising.html', ret, context_instance=RequestContext(request))


def mobile_tag_serach(request,**kwargs):
    ret = {'clickCount': '', 'document_data': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '', 'page': '',
           'username': '', 'category': '', 'nowuser': '', 'city': '', 'province': '', 'country': '', 'area': '',
           'message': '', 'detail_url': '', 'video_selected': '', 'carousel_data': '', 'web_name': settings.WEB_NAME,
           'toutiaos': []}

    new_type = request.GET.get('new_type')

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # 视频教程数据渲染
    per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)

    docpage = kwargs['page']
    docpage = common.try_int(docpage, 1)
    category = models.Category.objects.all()

    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:

        pass
    # 文档教程数据渲染
    docCount = models.DocumentData.objects.all().count()
    DocPageObj = mobile_html_helper.PageInfo(docpage, docCount, per_item)
    doc_page = mobile_html_helper.Pager(docpage, DocPageObj.all_page_count, '/mobile_docindex/')
    document_data = models.DocumentData.objects.filter(check_enable=True).order_by("-create_date")[
                    DocPageObj.start: DocPageObj.end]
    toutiaos = models.DocumentData.objects.filter(check_enable=True,).filter(~Q(category__id=5)).order_by("-favor_count")[0:4]
    carousel_data = models.Carousel.objects.all()
    for carousel in carousel_data:
        if carousel.newlink:
            carousel.newlink = carousel.newlink
        else:
            carousel.newlink = "/mobile_carousel_docdetail/" + str(carousel.id)
    ret['carousel_data'] = carousel_data

    ret['data'] = document_data
    ret['count'] = docCount
    ret['page'] = doc_page
    ret['toutiaos'] = toutiaos
    ret['category'] = category
    ret['detail_url'] = 'mobile_docdetail/'
    ret['index_doc_selected'] = 'active'
    ret['doc_selected'] = 'active'
    ret['category_url'] = 'mobile_doccategory'

    response = render_to_response('mobile_docindex.html', ret, context_instance=RequestContext(request))
    response.set_cookie('pager_num', per_item)
    return response


def mobile_docindex(request,**kwargs):
    '''渲染字典返回主页index

    :param request:
    :param kwargs:
    :param indexpage:主页当前page
    :param docpage: 当前文档教程page页码
    :return: response

    '''
    ret = {'clickCount': '', 'document_data': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '', 'page': '',
           'username': '', 'category': '', 'nowuser': '', 'city': '', 'province': '', 'country': '', 'area': '',
           'message': '', 'detail_url': '', 'video_selected': '','carousel_data':'','web_name':settings.WEB_NAME,
           'toutiaos':[]}
    # 视频教程数据渲染
    per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)

    docpage = kwargs['page']
    if docpage != '':
        ret['scroll'] = 600
    else:
        ret['scroll'] = 0
    docpage = common.try_int(docpage, 1)
    category = models.Category.objects.all()

    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:

        pass
    #文档教程数据渲染
    docCount = models.DocumentData.objects.all().count()
    ret['count'] = docCount
    DocPageObj = mobile_html_helper.PageInfo(docpage, docCount, per_item)
    doc_page = mobile_html_helper.Pager(docpage, DocPageObj.all_page_count, '/mobile_docindex/')
    document_data = models.DocumentData.objects.filter(check_enable=True).order_by("-create_date")[DocPageObj.start: DocPageObj.end]
    toutiaos = models.DocumentData.objects.filter(check_enable=True,).filter(~Q(category__id=5)).order_by("-favor_count")[0:4]
    carousel_data = models.Carousel.objects.all()
    for carousel in carousel_data:
        if carousel.newlink:
            carousel.newlink = carousel.newlink
        else:
            carousel.newlink = "/mobile_carousel_docdetail/" + str(carousel.id)
    if docpage <= 1:
        ret['carousel_data'] = carousel_data
        ret['toutiaos'] = toutiaos
    ret['data'] = document_data
    ret['keyword'] = '请输入你要查找的内容'
    ret['page'] = doc_page
    ret['category'] = category
    ret['detail_url'] ='mobile_docdetail/'
    ret['index_doc_selected'] = 'active'
    ret['doc_selected'] = 'active'
    ret['new_doc_selected'] = 'selected'
    ret['category_url'] = 'mobile_doccategory'

    response = render_to_response('mobile_docindex.html', ret, context_instance=RequestContext(request))
    response.set_cookie('pager_num', per_item)
    return response


def mobile_login(request):
    ''' 用户登入页面渲染

    :param request:
    :return:
    '''
    ret = {'status': 0, 'message': '', 'category': '','web_name':settings.WEB_NAME}
    loginSession = request.session.get('is_login', None)

    try:
        docdetail_id = request.META['HTTP_REFERER'].split('=')[-1]
        docdetail_uri = request.META['HTTP_REFERER'].split('=')[-2].split('?', -1)[-1]
        docdetail_id = int(docdetail_id)
        if docdetail_id:
            url = "/" + docdetail_uri + "/" + str(docdetail_id)
        else:
            url = '/'
    except Exception:
        url = '/'
    category = models.Category.objects.all()
    ret['category'] = category
    if_username = models.Admin.objects.filter(username__username=loginSession)
    if loginSession and not if_username:
        del request.session['is_login']
        del request.session['current_user_id']
        loginSession = request.session.get('is_login', None)
        return redirect('/mobile_index')
    if loginSession:
        return redirect('/mobile_index')
    else:
        try:
            if request.method == 'POST':
                username = request.POST.get('username')
                password = request.POST.get('password')
                user = auth.authenticate(username=username, password=password)
                adminuser = models.Admin.objects.get(username__username=username)

                if user is not None:
                    if adminuser.user_valid == True:
                        request.session['current_user_id'] = adminuser.id
                        request.session['is_login'] = adminuser.username.username
                        return redirect(url)
                    else:
                        ret['message'] = '账户未激活'
                else:
                    user = None
                    ret['message'] = '用户名密码错误'
                    return render_to_response('mobile_login.html', ret, context_instance=RequestContext(request))
            return render_to_response('mobile_login.html', ret, context_instance=RequestContext(request))

        except Exception as e:

            ret['message'] = e
            return render_to_response('mobile_login.html', ret, context_instance=RequestContext(request))



def mobile_register(request):
    ''' 注册页面渲染

    :param request:http 请求
    :return:
    '''

    ret = {'status': 0, 'data': '', 'message': '', 'mailstatus': '', 'category': '','web_name':settings.WEB_NAME}
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email')


    category = models.Category.objects.all()
    ret['category'] = category
    if username == "":
        ret['message'] = '用户名不能为空'
        return render_to_response('mobile_register.html', ret, context_instance=RequestContext(request))

    if password == "":
        ret['message'] = '密码不能为空'
        return render_to_response('mobile_register.html', ret, context_instance=RequestContext(request))

    if username:
        for filterspace in username:
            if filterspace.isspace():
                ret['message'] = '账户禁止输入空格'
                return render_to_response('mobile_register.html', ret, context_instance=RequestContext(request))
    if password:
        for passwdspace in password:
            if passwdspace.isspace():
                ret['message'] = '密码禁止输入空格'
                return render_to_response('mobile_register.html', ret, context_instance=RequestContext(request))

    total = models.Admin.objects.filter(username__username=username).count()
    if total > 0:
        ret['message'] = '用户名已存在'
        return render_to_response('mobile_register.html', ret, context_instance=RequestContext(request))

    if email == "":
        ret['message'] = '邮箱不能为空'
        return render_to_response('mobile_register.html', ret, context_instance=RequestContext(request))
    if email:
        total = models.Admin.objects.filter(email=email).count()
        if total > 0:
            ret['message'] = '邮箱已存在'
            return render_to_response('mobile_register.html', ret, context_instance=RequestContext(request))

    if request.method == 'POST':
        try:
            token = token_confirm.generate_validate_token(username)
            message1 = "\n".join([u'{0},欢迎加入580网'.format(username), u'请访问该链接，完成用户验证:',
                                  '/'.join([settings.DOMAIN, 'activate', token])])
            message2 = "\n".join([u'{0}新用户注册'.format(username)])
            msg1 = ('新用户注册', message1, settings.DEFAULT_FORM_EMAIL, [email])
            msg2 = ('新用户注册', message2, settings.DEFAULT_FORM_EMAIL, [settings.DEFAULT_FORM_EMAIL])
            res = send_mass_mail((msg1, msg2), fail_silently=False)
            ret['message'] = '请登入邮箱验证登入'
            ret['status'] = '1'

            count = models.UserType.objects.filter(dispaly='普通用户').count()
            if count < 1:
                usertype = models.UserType.objects.create(dispaly='普通用户')

            user_type = models.UserType.objects.get(dispaly='普通用户')
            user = User.objects.create(username=username, password=password, email=email)
            user.set_password(password)
            user.save()
            username2 = User.objects.get(username=username)
            add_new = Permission.objects.get(codename='add_news')
            # change_newtype= Permission.objects.get(codename='change_newtype')

            username2.user_permissions.add(add_new)  # 增加权限
            # username2.user_permissions.add(change_newtype) #增加权限

            model_user = models.Admin.objects.create(
                username=username2,
                email=email,
                user_type=user_type,
            )

            model_user.save()

            buy_cart_init = models.BuyCart.objects.create(
                cart_owner = model_user
            )
            buy_cart_init.save()
            GotVideo_init = models.GotVideo.objects.create(
                buyers=username
            )
            GotVideo_init.save()
            return render_to_response('mobile_login.html', ret, context_instance=RequestContext(request))
            return redirect('/mobile_login/')
        except Exception as e:
            ret['message'] = e

    return render_to_response('mobile_register.html', ret, context_instance=RequestContext(request))


def mobile_logout(request):
    logoutSession = request.session.get('is_login', None)
    if logoutSession:
        del request.session['is_login']
        del request.session['current_user_id']
        loginSession = request.session.get('is_login', None)
        return redirect('/mobile_index')
    else:
        return redirect('/mobile_index')


def page_not_found(request):
    return render_to_response('404.html')

@outer
def mobile_search(request,**kwargs):
    ret = {'type': '', 'document_data': '', 'status': 0, 'data': '', 'count': '', 'nowCount': '', 'page': '',
           'username': '', 'category': '', 'nowuser': '', 'city': '', 'province': '', 'country': '', 'area': '',
           'message': '','toutiaos':[]}

    session_logined = request.session.get('is_login')
    if not session_logined:
        ret['message'] = 'not login'
        return HttpResponse(json.dumps(ret))
    searchtype = request.GET.get('type')
    page = request.GET.get('page')
    keyword = request.GET.get('keywords')
    category = models.Category.objects.all()
    # toutiaos = models.DocumentData.objects.filter(check_enable=True,).filter(~Q(category__id=5)).order_by("-favor_count")[0:4]
    # ret['toutiaos'] = toutiaos
    ret['category'] = category
    ret['search'] = 'search'
    ret['search_result'] = '搜索结果:'
    ret['keyword'] = keyword
    carousel_data = models.Carousel.objects.all()

    for carousel in carousel_data:
        if carousel.newlink:
            carousel.newlink = carousel.newlink
        else:
            carousel.newlink = "/mobile_carousel_docdetail/" + str(carousel.id)
    # ret['carousel_data'] = carousel_data
    try:
        username = models.Admin.objects.get(username__username=request.session.get('is_login', 'None'))
        ret['username'] = username
    except Exception as e:

        pass
    if searchtype == 'project':
        # 多个字段模糊查询， 括号中的下划线是双下划线，双下划线前是字段名，双下划线后可以是icontains或contains,区别是是否大小写敏感，竖线是或的意思
        video = models.News.objects.filter(check_enable=True).filter(Q(title__icontains=keyword) \
                                                        | Q(content__icontains=keyword))
        article = models.DocumentData.objects.filter(check_enable=True).filter(Q(title__icontains=keyword) \
                                                        | Q(content__icontains=keyword))

        ret['type'] = "videodetail"
        ret['data'] = video
        ret['article_data'] = article
    elif searchtype == "video":
        # 单个字段模糊查询
        results = models.News.objects.filter(check_enable=True).filter(Q(title__icontains=keyword)|Q(content__icontains=keyword))
        ret['data'] = results
        ret['type'] = "videodetail"
        ret['video_selected'] = 'active'
        response = render_to_response('mobile_index.html', ret, context_instance=RequestContext(request))
        return response
    elif searchtype == "article":
        per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)
        docpage = common.try_int(page, 1)
        docCount = models.DocumentData.objects.filter(check_enable=True).filter(
            Q(title__icontains=keyword) | Q(content__icontains=keyword)).order_by("-create_date").count()
        ret['count'] = docCount
        DocPageObj = mobile_html_helper.PageInfo(docpage, docCount, per_item)
        doc_page = mobile_html_helper.Pager(docpage, DocPageObj.all_page_count,'/mobile_search/?keywords=%s&type=%s&page='%(keyword,searchtype))
        document_data = models.DocumentData.objects.filter(check_enable=True).filter(
            Q(title__icontains=keyword) | Q(content__icontains=keyword)).order_by("-create_date")[DocPageObj.start: DocPageObj.end]
        ret['page'] = doc_page
        ret['data'] = document_data
        ret['type'] = 'docdetail'
        ret['doc_selected'] = 'active'
        response = render_to_response('mobile_docindex.html', ret, context_instance=RequestContext(request))
        return response
    elif searchtype == "tag":
        news_type = models.NewType.objects.filter(display=keyword)
        document_data = models.DocumentData.objects.filter(check_enable=True,news_type=news_type)
        ret['data'] = document_data
        ret['type'] = 'docdetail'
        ret['doc_selected'] = 'active'
        response = render_to_response('mobile_docindex.html', ret, context_instance=RequestContext(request))
        return response

    else:
        # 使用点连接的filter链表示and
       ret['message'] = '查询类型有误'

@outer
def mobile_user_center(request,**kwargs):
    ret = {'username':'', 'message':'', 'category':'', 'collect_count':'','web_name':settings.WEB_NAME}
    session_logined = request.session.get('is_login','none')
    per_item = common.try_int(request.COOKIES.get("pager_num", 10), 10)

    docpage = kwargs['page']
    # if docpage != '':
    #     ret['scroll'] = 600
    # else:
    #     ret['scroll'] = 0
    page = common.try_int(docpage, 1)

    category = models.Category.objects.all()
    ret['category'] = category

    try:
        username = models.Admin.objects.get(username__username=session_logined)
        ret['username'] = username
    except Exception as e:
        pass


    show_collect = User.objects.filter(username=session_logined).first()
  #  show_collect_docs = show_collect.documentdata_set.all().order_by("-create_date")
    ret['category'] = category


    docpage = common.try_int(page, 1)
    docCount = show_collect.documentdata_set.all().order_by("-create_date").count()
    ret['count'] = docCount
    DocPageObj = mobile_html_helper.PageInfo(docpage, docCount, per_item)
    doc_page = mobile_html_helper.Pager(docpage, DocPageObj.all_page_count,
                                        '/mobile_user_center/')
    show_collect_docs = show_collect.documentdata_set.all().order_by("-create_date").order_by("-create_date")[
                    DocPageObj.start: DocPageObj.end]
    ret['page'] = doc_page
    ret['show_collect_docs'] = show_collect_docs
    ret['collect_count'] = len(show_collect_docs)
    response = render_to_response('mobile_user_center.html', ret, context_instance=RequestContext(request))
    return response


def mobile_user_push(request):
    return render_to_response('mobile_user_push.html')

def test(request):
   
    print('requst',request) 
    print(request.POST)
    return HttpResponse('Hello,World!')

#####微信小程序
def get_token(request, uername=None):
    response = {'code': 200, 'data': None}
    login_time = int(time.time())
    user_id=request.GET.get('user_id') or uername
    jwt_token=Auth
    try:
        token=jwt_token.encode_auth_token(user_id, login_time).decode('utf-8')
    except Exception as e:
        print(e)
    response['data'] = {'token':token}

    return HttpResponse(json.dumps(response))

def auth_token(request):
    data={ 'code': ''}
    jwt_token=Auth
    auth_token = request.GET.get('token')  or request.META.get('HTTP_TOKEN')
    payload = jwt_token.decode_auth_token(auth_token)
    if ('data' in payload and 'id' in payload['data']):
        data['code'] = 0
        return HttpResponse(json.dumps(data))
    else:
        data['code'] = 403
        data['msg'] = payload
        return HttpResponse(json.dumps(data))

APP_ID = 'wx8cbbd9528e25d378'
APP_SECRET = '99eede95323383fbc1933c40856e75f6'

def wx_auth(request):
    code = request.GET.get('code')
    userInfo = request.GET.get('userInfo')
    userInfo=json.loads(userInfo)
    api = WXAPPAPI(appid=APP_ID,
                   app_secret=APP_SECRET)

    session_info = api.exchange_code_for_session_key(code=code)

    # 获取session_info 后
    session_key = session_info.get('session_key')
    openid = session_info.get('openid')
    userInfo['nickName']=userInfo['nickName']
    username=userInfo['nickName']
    #crypt = WXBizDataCrypt(APP_ID, session_key)
    data=get_token(request, username).content.decode('utf-8')
    data=json.loads(data)
    key = data['data']['token']
    #import uuid
    #user_uuid = str(uuid.uuid4())
    value = session_key + username
    request.session[key] = value
   # uid = user_uuid
    total = models.Admin.objects.filter(username__username=username).count()
    if total > 0:
        data={'token':key,'code':0,'msg':'已注册','registryStatus':1}
        return HttpResponse(json.dumps(data))
    else:
        try:
            debug = wx_registry(userInfo)
            data = {'token': key, 'code': 0, 'msg': '已注册','registryStatus':1}
        except Exception as e:
            data = {'token': key, 'code': 500, 'msg': '注册失败', 'errorMsg': str(e),'registryStatus':0}
        return HttpResponse(json.dumps(data))

    # data={'token':key,'code':1000,'msg':'未注册'}
    #
    # return HttpResponse(json.dumps(data))
    # encrypted_data 包括敏感数据在内的完整用户信息的加密数据
    # iv 加密算法的初始向量
    # 这两个参数需要js获取
    # user_info = crypt.decrypt(encrypted_data, iv)
    # print(user_info)
def bindMobile(request):
    iv = request.GET.get('iv')
    code = request.GET.get('code')
    encrypted_data = request.GET.get('encryptedData')
    api = WXAPPAPI(appid=APP_ID,
                   app_secret=APP_SECRET)

    session_info = api.exchange_code_for_session_key(code=code)

    # 获取session_info 后
    session_key = session_info.get('session_key')
    openid = session_info.get('openid')

    crypt = WXBizDataCrypt(APP_ID, session_key)
    phone_info = crypt.decrypt(encrypted_data, iv)
    return HttpResponse(phone_info)

def wx_registry(userInfo):
    ret={}
    # iv = request.GET.get('iv')
    # code = request.GET.get('code')
    # encrypted_data = request.GET.get('encryptedData')
    # api = WXAPPAPI(appid=APP_ID,
    #                app_secret=APP_SECRET)
    #
    # session_info = api.exchange_code_for_session_key(code=code)
    #
    # # 获取session_info 后
    # session_key = session_info.get('session_key')
    # openid = session_info.get('openid')
    #
    # crypt = WXBizDataCrypt(APP_ID, session_key)
    # user_info = crypt.decrypt(encrypted_data, iv)
    #username = user_info.get('openId')
    username=userInfo['nickName']
    password = '123456'
    email=''
    if username == "":
        ret['message'] = '用户名不能为空'
        return HttpResponse(json.dumps(ret))

    if password == "":
        ret['message'] = '密码不能为空'
        return HttpResponse(json.dumps(ret))

    if username:
        for filterspace in username:
            if filterspace.isspace():
                ret['message'] = '账户禁止输入空格'
                return HttpResponse(json.dumps(ret))
    if password:
        for passwdspace in password:
            if passwdspace.isspace():
                ret['message'] = '密码禁止输入空格'
                return HttpResponse(json.dumps(ret))

    total = models.Admin.objects.filter(username__username=username).count()
    if total > 0:
        ret['message'] = '用户名已存在'
        ret['code'] = 200
        HttpResponse.status_code = 200
        return ret

    # if email == "":
    #     ret['message'] = '邮箱不能为空'
    #     return render_to_response('register.html', ret)
    # if email:
    #     total = models.Admin.objects.filter(email=email).count()
    #     if total > 0:
    #         ret['message'] = '邮箱已存在'
    #         return render_to_response('register.html', ret, context_instance=RequestContext(request))

    count = models.UserType.objects.filter(dispaly='普通用户').count()
    if count < 1:
        usertype = models.UserType.objects.create(dispaly='普通用户')

    user_type = models.UserType.objects.get(dispaly='普通用户')
    user = User.objects.create(username=username, password=password, email=email)
    user.set_password(password)
    user.save()
    username2 = User.objects.get(username=username)
    add_new = Permission.objects.get(codename='add_news')
    # change_newtype= Permission.objects.get(codename='change_newtype')

    username2.user_permissions.add(add_new)  # 增加权限
    # username2.user_permissions.add(change_newtype) #增加权限

    model_user = models.Admin.objects.create(
        username=username2,
        email=email,
        user_type=user_type,
    )

    model_user.save()

    buy_cart_init = models.BuyCart.objects.create(
        cart_owner=model_user
    )
    buy_cart_init.save()

    GotVideo_init = models.GotVideo.objects.create(
        buyers=username
    )
    GotVideo_init.save()


    #return HttpResponse(json.dumps('200'))
    HttpResponse.status_code=200
    ret['message'] = '用户名注册成功'
    ret['code'] = 200
    return ret

def outer_token_auth(main_func):
    def wrapper(request, *args, **kwargs):
        #if request.session.get('is_login'):
        result_auth = auth_token(request).content.decode('utf-8')
        result_auth = json.loads(result_auth)
        if result_auth.get('code') == 0:
            return main_func(request, *args, **kwargs)
        else:
            data={'code':'403'}
            return HttpResponse(json.dumps(data))
    return wrapper

@outer_token_auth
def wx_docindex(request,**kwargs):
    '''渲染字典返回微信小程序index
    :param request:
    :param kwargs:
    :param indexpage:主页当前page
    :param docpage: 当前文档教程page页码
    :return: response
    '''
    ret = { 'document_data': '', 'code': 0,  'category': '', 'message': '','carousel_data':''}
    # 导航分类
    category = models.Category.objects.all().values()
    #文档教程数据渲染
    # document_data = models.DocumentData.objects.filter(check_enable=True).order_by("-create_date").values('id',
    #                                                                                                       'title',
    #                                                                                                       "category",
    #                                                                                                       "newpic")
    index_data={}

    for cate in category:
        result = models.DocumentData.objects.filter(category__id=cate['id'], check_enable=True).order_by("-create_date")
        data = []
        for obj in result:
            arr=[]
            news_types = obj.news_type.all()
            for news_type in news_types:
                arr.append({'id':news_type.id,'value':news_type.display})
            data.append({'id':obj.id,'sale_content':obj.sale_content,
                         'course_price':obj.course_price,'num':obj.num,
                         'title':obj.title,"category":obj.category.name,"category_id":obj.category.id,
                         "newpic":obj.newpic.name,'news_type':arr})

        result=list(data)
        index_data[cate['id']] = result

    carousel_data = models.Carousel.objects.all().values('id','title','newlink','newpic','create_date')
    category = json.dumps(list(category), ensure_ascii=False)
    carousel_data = json.dumps(list(carousel_data), cls=CjsonEncoder,ensure_ascii=False)
    index_data = json.dumps(index_data, ensure_ascii=False)
    ret['carousel_data'] = carousel_data
    ret['index_data'] = index_data
    ret['category'] = category
    ret['detail_url'] ='mobile_docdetail/'
    ret['category_url'] = 'mobile_doccategory'

    ret = json.dumps(ret,ensure_ascii=False)
    response = HttpResponse(ret,content_type="application/json, charset=utf-8")

    return response


@outer_token_auth
def wx_goodsdetail(request):
    '''渲染字典返回微信小程序index
    :param request:
    :param kwargs:
    :param indexpage:主页当前page
    :param docpage: 当前文档教程page页码
    :return: response
    '''
    ret = {'docnews': '','code':''}
    id = request.GET.get('id')
    category_id = request.GET.get('category_id')
    docnews = models.DocumentData.objects.filter(id=id,category__id=category_id).values()
    if docnews:
        docnews=list(docnews)[0]
    else:
        docnews={}
    docnews = json.dumps(docnews, cls=CjsonEncoder,ensure_ascii=False)
    ret['data'] = docnews
    ret['code'] = 0
    ret = json.dumps(ret,ensure_ascii=False)
    response = HttpResponse(ret,content_type="application/json, charset=utf-8")

    return response

@outer_token_auth
def wx_categrory(request):
    ret = {'docnews': '', 'code': ''}
    cate_id = request.GET.get('categoryId')
    if cate_id == '0':
        docnews = models.DocumentData.objects.filter(check_enable=True).order_by("-create_date").values('id',
                                                                                                          'title',
                                                                                                          "category",
                                                                                                           "newpic")
    else:
        docnews = models.DocumentData.objects.filter(category__id=cate_id, check_enable=True).\
            order_by("-create_date").values('id',
                                              'title',
                                              "category",
                                              "newpic")
    docnews = json.dumps(list(docnews),cls=CjsonEncoder, ensure_ascii=False)
    ret['docnews'] = docnews
    ret['code'] = 0
    ret = json.dumps(ret, ensure_ascii=False)
    response = HttpResponse(ret, content_type="application/json, charset=utf-8")

    return response