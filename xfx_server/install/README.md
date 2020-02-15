一、安装系统依赖包
 yum install libxslt-devel  install libxml2   install libxslt  openssl-devel -y \
gcc gcc-c++ autoconf gd libjpeg libjpeg-devel libpng libpng-devel freetype \
freetype-devel libxml2 libxml2-devel \
bzip2 bzip2-devel ncurses ncurses-devel curl curl-devel e2fsprogs e2fsprogs-devel krb5-libs \
krb5-devel libidn libidn-devel openssl openssl-devel openldap openldap-devel nss_ldap \
openldap-clients openldap-servers wget expect bc patch ntp libtool vim-enhanced file sysstat sqlite-devel

二、下载cloudcollege
cd /var/www/
git clone https://github.com/wangyc666666/CloudCollege.git


wget http://www.rarlab.com/rar/rarlinux-x64-5.3.0.tar.gz
 tar -xzvf rarlinux-x64-5.3.0.tar.gz 

ln -s /usr/local/rar/rar /usr/local/bin/rar
ln -s /usr/local/rar/unrar /usr/local/bin/unrar
tar -xvf Python-3.4.tar.bz2
  cd Python-3.4
  ./configure  --enable-shared       这里一定要注意，解压完之后要设置enable-shared
 make&&make install

 vim /etc/ld.so.conf.d/python3.conf
/usr/local/python3.4/lib/
ldconfig

三、部署uwsgi 与nginx
pip3 install uwsgi

ln -s /usr/local/python3.4/bin/uwsgi /usr/bin/uwsgi3

vim /var/www/CloudCollege/uwsgi.ini
[uwsgi]
# Django-related settings
socket = :81

# the base directory (project full path)
chdir           = /var/www/CloudCollege

# Django s wsgi file
module          = CloudCollege.wsgi

# process-related settings
# master
master          = true

# maximum number of worker processes
processes       = 4

# ... with appropriate permissions - may be needed
# chmod-socket    = 664
# clear environment on exit
vacuum          = true
# pidfile for record run pid 
pidfile        =pid.uwsgi
# run process background and save log to daemonize
daemonize    = UWSGI.log

uwsgi --ini /var/www/CloudCollege/uwsgi.ini
yum install nginx


vim /etc/nginx/nginx.conf


server {
    listen 80; #暴露给外部访问的端口
    server_name hicloudcollege.com;
        charset utf-8;
    location / {
        include uwsgi_params;
        uwsgi_pass 127.0.0.1:81; #外部访问8996就转发到内部8997
    }
    location /statics/ {
        alias /var/www/CloudCollege/static/; #项目静态路径设置
    }
    location /medias/ {
        alias /var/www/CloudCollege/medias/; #项目静态路径设置
    }
    location /templates/ {
        alias /var/www/CloudCollege/templates/; #项目静态路径设置
    }
    location /CloudCollege/ {
        alias /var/www/CloudCollege/; #项目静态路径设置
    }


}


四、拷贝python依赖包
zip x ./install/site-packages.zip /usr/local/python3.4/lib/python3.4/

五、安装mysql

成功部署完成mysql，建立CloudCollege账户密码

启动服务
python /var/www/CloudCollege/bin/apache_restart.py

seo 优化
https://github.com/romansalin/django-seo2.git
http://django-seo2.readthedocs.io/en/latest/introduction/tutorial.html#introduction-tutorial
