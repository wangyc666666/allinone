#!/bin/env python
#coding:utf-8
import os
import sys
import smtplib
from email.mime.text import MIMEText
import time
import datetime

def send_mail(content):
    msg_from = '674702627@qq.com'  # 发送方邮箱
    passwd = 'uvtqwnvkvkyvbbef'  # 填入发送方邮箱的授权码
    msg_to = '1076158802@qq.com'  # 收件人邮箱

    subject = "580网访问监控"  # 主题
    msg = MIMEText(content)
    msg['Subject'] = subject
    msg['From'] = msg_from
    msg['To'] = msg_to
    try:
        s = smtplib.SMTP_SSL("smtp.qq.com", 465)
        s.login(msg_from, passwd)
        s.sendmail(msg_from, msg_to, msg.as_string())
        print
        "发送成功"
    except Exception as e:
        print("发送失败",e)
    finally:
        s.quit()

def monitor_cloud(filter_time):
    print(filter_time)
    cmd = "cat /var/www/WoBanN/UWSGI.log |awk -F ' ' '{print $5 \" \" $10 \" \" $11 $12   " \
        "$13 \" \" $14 \" \" $15 \" \" $16 \" \" $17}'|grep bytes|sort -k 1,1 -u|grep '%s'"%(filter_time)

    output = os.popen(cmd).read()
    print(output)
    return output

def change(month):
    if month == 1:
        return 'Jan'
    if month == 2:
        return 'Feb'
    if month == 3:
        return 'Mar'
    if month == 4:
        return 'Apr'
    if month == 5:
        return 'May'
    if month == 6:
        return 'Jun'
    if month == 7:
        return 'Jul'
    if month == 8:
        return 'Aug'
    if month == 9:
        return 'Sept'
    if month == 10:
        return 'Oct'
    if month == 11:
        return 'Nev'
    if month == 12:
        return 'Dec'

def month_to_en(filter_time):
    '''
    2018-03-05 11:37:07 to Mar 4 13:55:11 2018
    :param filter_time:
    :return:
    '''
    filter_time = str(filter_time)
    filter_time = filter_time.split('-', -1)
    year = filter_time[0]
    month = int(filter_time[1])
    day = str(int(filter_time[2]))
    en_month = change(month)

    return en_month + " " + day



def main(h=21, m=30):

    '''h表示设定的小时，m为设定的分钟'''
    while True:
        now = datetime.datetime.now()
        # 到达设定时间，结束内循环
        print(now.hour, now.minute)
        if now.hour == h and now.minute == m:
            # 做正事，一天做一次
            filter_time = time.strftime('%Y-%m-%d', time.localtime(time.time()))
            filter_time = month_to_en(filter_time)
            output = monitor_cloud(filter_time)
            send_mail(str(output))
            # 不到时间就等20秒之后再次检测
            time.sleep(60)
        time.sleep(20)



main()

