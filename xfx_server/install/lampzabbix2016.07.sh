#!/bin/bash
#auto make install lamp
#by authors 20151216
H_FILES=httpd-2.2.34.tar.bz2
H_FILES_DIR=httpd-2.2.34
H_URL=http://mirrors.cnnic.cn/apache/httpd/
H_PREFIX=/usr/local/apache2  

#Mysql define path variable
M_FILES=mysql-5.5.52-linux2.6-x86_64.tar.gz 
M_FILES_DIR=mysql-5.5.52-linux2.6-x86_64
M_URL=http://ftp.ntu.edu.tw/pub/MySQL/Downloads/MySQL-5.5/
M_PREFIX=/usr/local/mysql2

#PHP define path variable
P_FILES=php-5.4.26.tar.gz
P_FILES_DIR=php-5.4.26
P_URL=http://mirrors.sohu.com/php/
P_PREFIX=/usr/local/php

#PHP EXT INSTALL
P_EXT=gettext
#########zabbix安装###########
ZA_URL=http://fossies.org/linux/misc/
ZA_FILE=zabbix-3.0.2.tar.gz
ZA_FILE_URL=zabbix-3.0.2
ZA_PREFIX=/usr/local/zabbix
if [ -z "$1" ];then
     echo -e "\033[36mPlease Select Install Menu follow:\033[0m"
     echo  "1)编译安装Apache服务器"
     echo  "2)编译安装Mysql服务器"
     echo  "3)编译安装PHP服务器"
     echo  "4)配置index.php并启动LAMP服务"
     echo  "5)配置P_EXT扩展模块编辑脚本输入你要的模块"
     echo  "6)Zabbix安装"
     echo  "7)Zabbix添加mysql监控"
     echo -e "\033[31m usage：{/bin/sh $0 1|2|3|4|5|6|help}\033[0m"
     exit
fi

function apache(){
echo "Apache installing..."
if [[ "$1" -eq "1" ]];then
yum -y install gcc gcc-c++ autoconf gd libjpeg libjpeg-devel libpng libpng-devel freetype \
freetype-devel libxml2 libxml2-devel \
bzip2 bzip2-devel ncurses ncurses-devel curl curl-devel e2fsprogs e2fsprogs-devel krb5-libs \
krb5-devel libidn libidn-devel openssl openssl-devel openldap openldap-devel nss_ldap \
openldap-clients openldap-servers wget expect bc patch ntp libtool vim-enhanced file sysstat
#zlib zlib-devel libc glibc-devel glib2 glib2-devel
if [ $? -eq 0 ];then
        echo -e "\033[32myum install gcc... successfully!\033[0m"
else
        echo -e "\033[32myum installl gcc.. Failed!\033[0m"
	exit
fi

wget -c  $H_URL/$H_FILES && tar -jxvf $H_FILES && cd $H_FILES_DIR ;./configure --prefix=$H_PREFIX  --with-mpm=worker  --enable-so --enable-rewrite --enable-headers  --enable-expires --enable-deflate --enable-ssl -enable-dav --enable-dav-fs --enable-so  --enable-maintainer-mode   --enable-track-vars --enable-cgi  --enable-mods-shared=all --with-mpm=worker 
     if [ $? -eq 0 ];then
          make && make install 
          /bin/cp  -fv /usr/local/lib/libiconv.so.2.0.4 /usr/lib64
          echo -e "\033[32mThe $H_FILES_DIR  server install successfully!\033[0m"
     else
          echo -e "\033[32mThe $H_FILES_DIR  server install Failed,Please check!\033[0m"
     fi
fi
}

#auto insall mysql
function mysql(){
if [[ "$1" -eq "2" ]];then
echo "Mysql installing..."
     yum install -y libaio libaio-devel ncurses ncurses-devel
	if [ $? -eq 0 ];then
          make && make install
          echo -e "\033[32mThe libaio install successfully!\033[0m"
        else
          echo -e "\033[32mThe libaio install Failed,Please check!\033[0m"
           exit
        fi
     wget -c  $M_URL/$M_FILES && tar -zxvf $M_FILES && cd /usr/local/downloads/$M_FILES_DIR 
/bin/mkdir $M_PREFIX
/bin/mv * -fv  $M_PREFIX 
/bin/cp -vf  $M_PREFIX/support-files/my-small.cnf /etc/my.cnf 
/bin/cp -vf  $M_PREFIX/support-files/mysql.server /etc/init.d/mysqld2 
/usr/sbin/useradd -M -s /sbin/bash mysql
/bin/chown -R mysql.mysql  $M_PREFIX
cd $M_PREFIX/scripts
./mysql_install_db --user=mysql --datadir=$M_PREFIX/data  --basedir=$M_PREFIX --pid-file=$M_PREFIX/data/mysql.pid
sed -i 's/\/usr\/local\/mysql/\/usr\/local\/mysql2/g' /etc/init.d/mysqld2
/bin/chmod +x /etc/init.d/mysqld2
/sbin/chkconfig --add mysqld2
/sbin/chkconfig mysqld2 on
     if [ $? -eq 0 ];then
	 
	echo "export PATH=$PATH:/usr/local/mysql2/bin">>/etc/profile			#设置mysql2环境变量 注意只能执行一次
	source /etc/profile
	sed -i '/skip-external-locking/i\basedir =/usr/local/mysql2' /etc/my.cnf 			 #修改配置文件添加basedir datadir 注意只能执行一次
	sed -i '/skip-external-locking/i\datadir =/usr/local/mysql2/data' /etc/my.cnf		
          echo -e "\033[32mThe $M_FILES_DIR  server install successfully!\033[0m"
     else
          echo -e "\033[32mThe $M_FILES_DIR  server install Failed,Please check!\033[0m"
	exit
     fi
fi
}

#Auto PHP Install
function php(){    
echo "php is waiting install..."
if [[ "$1" -eq "3" ]];then
yum install perl -y
wget -c http://ftp.gnu.org/pub/gnu/libiconv/libiconv-1.7.tar.gz && tar -zxvf libiconv-1.7.tar.gz;cd libiconv-1.7; 
./configure 
 if [ $? -eq 0 ];then
          make && make install
          echo -e "\033[32mThe libiconv install successfully!\033[0m"
     else
          echo -e "\033[32mThe libiconv install Failed,Please check!\033[0m"
     fi
	cd ..
     wget -c  $P_URL/$P_FILES && tar -zxvf $P_FILES && cd $P_FILES_DIR 
./configure  --prefix=$P_PREFIX  \
--with-apxs2=$H_PREFIX/bin/apxs --enable-sockets --enable-sigchild  --enable-mbstring  \
--with-gd --with-iconv --with-jpeg-dir --with-png-dir --enable-ftp --with-zlib  --with-freetype-dir  \
--with-mysql=$M_PREFIX --with-mysqli=$M_PREFIX/bin/mysql_config \
--with-pdo-mysql=$M_PREFIX --enable-sockets --enable-sigchild  --with-gettext --enable-fpm --enable-bcmath --enable-mbstring 

######################### php+zabbix编译参数 ############
#./configure  --prefix=/usr/local/php/  --with-apxs2=/usr/local/apache2/bin/apxs --enable-sockets --enable-sigchild  --with-gettext --enable-fpm --enable-bcmath \
#--enable-mbstring  --with-gd --with-iconv --with-jpeg-dir --with-png-dir --enable-ftp --with-zlib  --with-freetype-dir  --with-mysql=/usr/local/mysql2/ \ 
#--with-mysqli=$M_PREFIX/bin/mysql_config --with-pdo-mysql=/usr/local/mysql2/

     if [ $? -eq 0 ];then
	  /bin/ln -s /usr/local/lib/libiconv.so.2 /usr/lib64/
	  make ZEND_EXTRA_LIBS='-liconv' && make && make install
          echo -e "\033[32mThe $P_FILES_DIR  server install successfully!\033[0m"
     else
          echo -e "\033[32mThe $P_FILES_DIR  server install Failed,Please check!\033[0m"
     fi
fi
}

function php_httpd()
{
if [[ "$1" -eq "4" ]];then
	sed -i '/DirectoryIndex/s/index.html/index.php index.html/g' $H_PREFIX/conf/httpd.conf 
	$H_PREFIX/bin/apachectl restart
	echo "AddType  application/x-httpd-php .php">>$H_PREFIX/conf/httpd.conf
	echo "AddType application/x-httpd-php .php .php3 .phtml .inc">>$H_PREFIX/conf/httpd.conf
	ip=`ifconfig eth1|grep "Bcast"|awk '{print $2}'|cut -d: -f2`
	echo "you can access http://$ip/"
cat >$H_PREFIX/htdocs/index.php<<EOF
<?php
phpinfo();
?>
EOF
fi
}

function php_ext(){
if [[ "$1" -eq "5" ]];then
cd /usr/local/downloads/php-5.4.26/ext/$P_EXT && $P_PREFIX/bin/phpize && ./configure --with-php-config=/usr/local/php/bin/php-config &&make && make install 
echo "extension = /usr/local/php/lib/php/extensions/no-debug-zts-20100525/$P_EXT.so">> /usr/local/php/lib/php.ini  #注意次数和拷贝php.ini 
	if [ $? -eq 0 ];then
		echo -e "\033[32m$P_EXT installed success\033[1m"
	else
		echo -e "\033[32m$P_EXT installed failed\033[1m"
		exit
	fi
fi
}


function install_zabbix(){

if [[ "$1" -eq 6 ]];then
groupadd zabbix
useradd -g zabbix zabbix
if [ ! -f $M_PREFIX/bin/mysql ];then
mysql 2
fi
if [ ! -f $P_PREFIX/bin/php ];then
php 3
fi
yum -y install  mysql-dev gcc  perl-DBI php-gd php-mysql php-bcmath php-mbstring php-xm libcurl-devel libxml2-devel net-snmp-devel curl-devel  net-snmp-devel
if [[ ! -f /usr/local/downloads/$ZA_FILE ]];then
wget $ZA_URL/$ZA_FILE
fi
tar -xvf $ZA_FILE
####判断是否已经编译安装#############################
if [ ! -f /usr/local/zabbix/etc/zabbix_server.conf ];then

cd $ZA_FILE_URL

./configure --with-mysql=/usr/local/mysql2/bin/mysql_config --with-net-snmp --with-libcurl --enable-server --enable-agent --enable-proxy --prefix=/usr/local/zabbix 
make clean&&make && make install 
fi
cd /usr/local/downloads/$ZA_FILE_URL
chmod  +x  /etc/init.d/zabbix_*
if [ ! -d /var/www/zabbix ];then
mkdir -p /var/www/zabbix
fi
\cp  -fv misc/init.d/fedora/core/zabbix_server /etc/init.d/
\cp -fv  misc/init.d/fedora/core/zabbix_agentd /etc/init.d/zabbix_agentd
\cp -fva frontends/php/*  /var/www/zabbix/
\cp -fva /usr/local/downloads/php-5.4.26/php.ini-development $P_PREFIX/lib/php.ini
chown -R zabbix.zabbix /var/www/zabbix/
chmod 777 $P_PREFIX/lib/php.ini
sed -i 's/BASEDIR=\/usr\/local/BASEDIR=\/usr\/local\/zabbix/g' /etc/init.d/zabbix_agentd
###修改php设置###
sed -i 's/;date.timezone =/date.timezone = Asia\/Shanghai/g' /usr/local/php/lib/php.ini
sed -i 's/post_max_size = 8M/post_max_size = 16M/g' /usr/local/php/lib/php.ini
sed -i 's/max_input_time = 60/max_input_time = 300/g' /usr/local/php/lib/php.ini
sed -i 's/;extension=php_openssl.dll/extension=php_openssl.dll/g' /usr/local/php/lib/php.ini
#####修改zabbix_server.conf配置文件##
sed -i 's/\# DBPassword=/DBPassword=zabbix/g' $ZA_PREFIX/etc/zabbix_server.conf
sed -i 's/\# ListenPort=10051/ListenPort=10051/g' $ZA_PREFIX/etc/zabbix_server.conf
sed -i 's/\# DBSocket=\/tmp\/mysql.sock/DBSocket=\/tmp\/mysql.sock/g' $ZA_PREFIX/etc/zabbix_server.conf
sed -i 's/\# DBPort=3306/DBPort=3306/g' $ZA_PREFIX/etc/zabbix_server.conf
sed -i 's/\# ListenIP=127.0.0.1/ListenIP=127.0.0.1/g'   $ZA_PREFIX/etc/zabbix_server.conf
sed -i 's/BASEDIR\=\/usr\/local/BASEDIR\=\/usr\/local\/zabbix/g' /etc/init.d/zabbix_server
#####修改zabbix_agentd.conf配置文件##
sed -i 's/\# ListenPort=10050/ListenPort=10050/g' $ZA_PREFIX/etc/zabbix_agentd.conf
sed -i 's/# UnsafeUserParameters=0/UnsafeUserParameters=1/g'  $ZA_PREFIX/etc/zabbix_agentd.conf
chown -R zabbix.zabbix /usr/local/zabbix
/usr/local/mysql2/bin/mysql -e "create database zabbix default character set utf8;"
/usr/local/mysql2/bin/mysql -e "grant all privileges on zabbix.* to zabbix@localhost  identified  by 'zabbix';"
/usr/local/mysql2/bin/mysql -e "flush privileges;"
/usr/local/mysql2/bin/mysql -uroot zabbix < /usr/local/downloads/zabbix-3.0.2/database/mysql/schema.sql
echo "数据导入mysql中"
sleep 2
/usr/local/mysql2/bin/mysql -uroot zabbix < /usr/local/downloads/zabbix-3.0.2/database/mysql/images.sql
/usr/local/mysql2/bin/mysql -uroot zabbix < /usr/local/downloads/zabbix-3.0.2/database/mysql/data.sql

##启动环境软连接##
ln -s /usr/local/zabbix/bin/* /usr/bin/
ln -s /usr/local/zabbix/sbin/* /usr/sbin/
if [ ! -L /lib/libmysqlclient.so.18 ];then
ln -s /usr/local/mysql2/lib/libmysqlclient.so.18 /lib/
fi
if [ ! -L /lib64/libmysqlclient.so.18 ];then
ln -s /usr/local/mysql2/lib/libmysqlclient.so.18 /lib64/
fi
###zabbix 服务端-客户端启动##
/etc/init.d/zabbix_server restart
chkconfig --add zabbix_server
chkconfig --add zabbix_agentd
chkconfig zabbix_server on
chmod +x /etc/init.d/zabbix_agentd #添加脚本执行权限
chkconfig zabbix_agentd on #添加开机启动
service zabbix_agentd restart #启动Zabbix客户端
if [[ ! -f /root/lock.db ]];then
touch /root/lock.db 
fi

if [ ! -s /root/lock.db ];then
echo -e "[!]脚本已锁定,若无人使用,请手动删除/root/lock.db" 
cat >>/usr/local/apache2/conf/extra/httpd-vhosts.conf <<EOF

<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host.example.com
    DocumentRoot "/var/www/zabbix"
    ServerName zabbix.com
    ServerAlias www.zabbix.com
         <Directory "/var/www/zabbix">
                AllowOverride None
                Options None
                Order allow,deny
                Allow from all
        </Directory>
    ErrorLog "logs/zabbix-error_log"
    CustomLog "logs/zabbix-access_log" common
</VirtualHost>

EOF

sed -i 's/max_execution_time = 30/max_execution_time = 300/g' /usr/local/php/lib/php.ini
echo 'zabbix-agent 10050/tcp #Zabbix Agent' >> /etc/services
echo 'zabbix-agent 10050/udp #Zabbix Agent' >> /etc/services
echo 'zabbix-trapper 10051/tcp #Zabbix trapper' >> /etc/services
echo 'zabbix-trapper 10051/udp #Zabbix trapper' >> /etc/services
sed -i '/*filter/a-A INPUT -s 192.168.21.127 -m state --state NEW -m tcp -p tcp --dport 10050:10051 -j ACCEPT' /etc/sysconfig/iptables
sed -i '/*filter/a-A INPUT -s 192.168.21.127 -m state --state NEW -m udp -p udp --dport 10050:10051 -j ACCEPT' /etc/sysconfig/iptables
cat >> /var/www/zabbix/conf/zabbix.conf.php<< EOF
---------------------------------------------------------->
<?php
// Zabbix GUI configuration file.
global $DB;

$DB['TYPE']    = 'MYSQL';
$DB['SERVER']  = '127.0.0.1';
$DB['PORT']    = '0';
$DB['DATABASE'] = 'zabbix';
$DB['USER']    = 'zabbix';
$DB['PASSWORD'] = 'zabbix';

// Schema name. Used for IBM DB2 and PostgreSQL.
$DB['SCHEMA'] = '';

$ZBX_SERVER      = '127.0.0.1';
$ZBX_SERVER_PORT = '10051';
$ZBX_SERVER_NAME = '';

$IMAGE_FORMAT_DEFAULT = IMAGE_FORMAT_PNG;
EOF

echo 1 >> /root/lock.db
fi
service iptables restart
/usr/local/apache2/bin/apachectl restart
fi
}
function zabbix_monitor_mysql(){

if [[ "$1" -eq 7  ]];then
if [ ! -d  /usr/local/zabbix-2.4.4/scripts/ ];then
mkdir  /usr/local/zabbix/scripts/ -p
fi

if [ ! -s /root/lock2.db ];then
echo "脚本已添加请删除 /root/lock2.db重新执行"
if [ ! -f /root/lock2.db ];then
touch /root/lock2.db
fi

cat >>/usr/local/zabbix/scripts/chk_mysql.sh<<EOF
#!/bin/bash
# -------------------------------------------------------------------------------
# FileName:    check_mysql.sh
# Revision:    1.0
# Date:        2015/06/09
# Author:      DengYun
# Email:       dengyun@ttlsa.com
# Website:     www.ttlsa.com
# Description: 
# Notes:       ~
# -------------------------------------------------------------------------------
# Copyright:   2015 (c) DengYun
# License:     GPL
 
# 用户名
MYSQL_USER='zabbix'
 
# 密码
MYSQL_PWD='zabbix'
 
# 主机地址/IP
MYSQL_HOST='127.0.0.1'
 
# 端口
MYSQL_PORT='3306'
 
# 数据连接
MYSQL_CONN="/usr/bin/mysqladmin -u${MYSQL_USER} -p${MYSQL_PWD} -h${MYSQL_HOST} -P${MYSQL_PORT}"
 
# 参数是否正确
if [ $# -ne "1" ];then 
    echo "arg error!" 
fi 
 
# 获取数据
case $1 in 
    Uptime) 
        result=`${MYSQL_CONN} status|cut -f2 -d":"|cut -f1 -d"T"` 
        echo $result 
        ;; 
    Com_update) 
        result=`${MYSQL_CONN} extended-status |grep -w "Com_update"|cut -d"|" -f3` 
        echo $result 
        ;; 
    Slow_queries) 
        result=`${MYSQL_CONN} status |cut -f5 -d":"|cut -f1 -d"O"` 
        echo $result 
        ;; 
    Com_select) 
        result=`${MYSQL_CONN} extended-status |grep -w "Com_select"|cut -d"|" -f3` 
        echo $result 
                ;; 
    Com_rollback) 
        result=`${MYSQL_CONN} extended-status |grep -w "Com_rollback"|cut -d"|" -f3` 
                echo $result 
                ;; 
    Questions) 
        result=`${MYSQL_CONN} status|cut -f4 -d":"|cut -f1 -d"S"` 
                echo $result 
                ;; 
    Com_insert) 
        result=`${MYSQL_CONN} extended-status |grep -w "Com_insert"|cut -d"|" -f3` 
                echo $result 
                ;; 
    Com_delete) 
        result=`${MYSQL_CONN} extended-status |grep -w "Com_delete"|cut -d"|" -f3` 
                echo $result 
                ;; 
    Com_commit) 
        result=`${MYSQL_CONN} extended-status |grep -w "Com_commit"|cut -d"|" -f3` 
                echo $result 
                ;; 
    Bytes_sent) 
        result=`${MYSQL_CONN} extended-status |grep -w "Bytes_sent" |cut -d"|" -f3` 
                echo $result 
                ;; 
    Bytes_received) 
        result=`${MYSQL_CONN} extended-status |grep -w "Bytes_received" |cut -d"|" -f3` 
                echo $result 
                ;; 
    Com_begin) 
        result=`${MYSQL_CONN} extended-status |grep -w "Com_begin"|cut -d"|" -f3` 
                echo $result 
                ;; 
                        
        *) 
        echo "Usage:$0(Uptime|Com_update|Slow_queries|Com_select|Com_rollback|Questions|Com_insert|Com_delete|Com_commit|Bytes_sent|Bytes_received|Com_begin)" 
        ;; 
esac
EOF

cat >>/usr/local/zabbix/etc/zabbix_agentd.conf<<EOF
# 获取mysql版本
UserParameter=mysql.version,mysql -V
# 获取mysql性能指标,这个是上面定义好的脚本
UserParameter=mysql.status[*],/usr/local/zabbix/scripts/chk_mysql.sh $1
# 获取mysql运行状态
UserParameter=mysql.ping,mysqladmin -uzabbix -pzabbix -P3306 -h127.0.0.1  ping | grep -c alive
EOF

echo 1 >>/root/lock2.db
fi
chmod 777 /usr/local/zabbix/scripts/chk_mysql.sh 
service zabbix_agentd restart
echo -e "\033[31m \033[05m请在zabbix监控上添加模板\033[0m"
fi
}

installSvn(){
if [[ $1 -eq "8" ]];then
apr=apr-1.5.2.tar.gz
apr_util=apr-util-1.5.4.tar.gz
scons=scons-2.3.5.tar.gz
openssl=openssl-1.0.1o.tar.gz
serf=serf-1.3.8.tar.gz
subversion=subversion-1.8.16.tar.gz
sqlite_amalgamation=sqlite-amalgamation-201506201411.zip


wget https://dist.apache.org/repos/dist/release/apr/$apr
tar -xvf $apr
cd apr-1.5.2 
./configure --prefix=/usr/local/apr 
make && make install
echo -e "\033[36m $apr安装成功 \033[0m"

#2、下载apr-util
wget https://dist.apache.org/repos/dist/release/apr/$apr_util
tar -xvf $apr_util
cd apr-util-1.5.4
./configure --with-apr=/usr/local/apr/bin/apr-1-config

make&&make install
echo -e "\033[36m $apr_util安装成功 \033[0m"


#3、下载scons
wget http://prdownloads.sourceforge.net/scons/$scons
tar -xvf $scons
cd scons-2.3.5
python setup.py install
echo -e "\033[36m $scons安装成功 \033[0m"

#4、下载openssl
wget http://www.openssl.org/source/$openssl
tar -xvf $openssl
cd openssl-1.0.1o
CFLAGS=-fPIC ./config --prefix=/usr/local/openssl enable-shared

make && make install
echo -e "\033[36m $openssl安装成功 \033[0m"

#5、下载serf
wget http://fossies.org/linux/www/$serf
tar -xvf $serf
cd serf-1.3.8
scons PREFIX=/usr/local/serf APR=/usr/local/apr/bin/apr-1-config APU=/usr/local/apr/bin/apu-1-config OPENSSL=/usr/local/openssl
scons install
cp /usr/local/serf/lib/libserf-1.so* /usr/local/lib/
echo -e "\033[36m $serf安装成功 \033[0m"


#7、下载sqlite-amalgamation
wget http://www.sqlite.org/snapshot/$sqlite_amalgamation

#6、下载svn
wget http://www.apache.org/dist/subversion/$subversion

tar -xvf $subversion
cd subversion-1.8.16
mkdir sqlite-amalgamation

unzip ../sqlite-amalgamation-201506201411.zip -d sqlite-amalgamation

./configure --prefix=/usr/local/svn --with-apr=/usr/local/apr/bin/apr-1-config --with-apr-util=/usr/local/apr/bin/apu-1-config --with-serf=/usr/local/serf --with-openssl=/usr/local/openssl --enable-mod-activation
make && make install
echo -e "\033[36m $subversion安装成功 \033[0m"


else
exit

fi


}


installdjango(){
	if [[ $1 -eq '9' ]];then

	echo "installing python3.4 django1.8 mode_wsgi apache "
	echo -e "\033[36m 上传 python3.4 django1.8 mode_wsgi 至/usr/local/downloads/ \033[0m"

	rz
	tar -xvf  Django-1.8.11.tar.gz
	tar -xvf mod_wsgi-4.5.7.tar.gz
	tar -xvf pip-8.1.2.tar.gz
	tar -xvf Python-3.3.4.tgz
	tar -xvf setuptools-23.0.0.tar.gz
	unzip django-ckeditor-master.zip


	cd Python-3.3.4

	./configure --prefix=/usr/local/python3.4  --enable-shared ;make&&make install 



	sed -i "/export PATH/a\PYTHON_HOME=\/usr\/local\/python3.4\/bin\/" ~/.bash_profile 

	sed -i "/PYTHON_HOME=\/usr\/local\/python3.4\/bin/a\export PYTHON_HOME" ~/.bash_profile

	source ~/.bash_profile

	mv /usr/bin/python /usr/bin/python2.6
	cp /usr/local/python3.4/bin/python3 /usr/bin/python

	echo "\033[31m installed Python-3.3.4 \033[0m"
	cd ../setuptools-23.0.0

	python setup.py install

	echo "\033[31m installed setuptools-23.0.0 \033[0m"
	cd ../pip-8.1.2
	python setup.py install
	source ~/.bash_profile

	cd ../Django-1.8.11
	python setup.py install
	echo "\033[31m installed Django-1.8.11 \033[0m"

	cd ../mod_wsgi-4.5.7

	python setup.py install

	echo "\033[31m installed mod_wsgi-4.5.7 \033[0m"

	cd ../django-ckeditor-master
	python setup.py install
	echo "\033[31m installed django-ckeditor-master \033[0"

	pip install Pillow
	echo "\033[31m installed Pillow \033[0m"

	pip install django-grappelli
	echo "\033[31m installed django-grappelli \033[0m"

	pip install pymysql
	echo "\033[31m installed pymysql \033[0m"


	fi

}



apache $1
mysql $1
php $1
php_httpd $1
php_ext  $1
install_zabbix $1
zabbix_monitor_mysql $1
installdjango $1
installSvn $1

##########v-2
