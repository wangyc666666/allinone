#!/usr/bin/env python
# -*- coding: utf-8 -*-
# __author__ = 'wangyc'
# __time__ = 2018/2/22 10:18
# Copyright (c) 2018 WangSu Corp.
# All Rights Reserved.
import time
import os
import datetime

home_dir = '/home/flow.text'

def if_syncFrog_in_used():
    cmd = 'ps -ef|grep "monitor_flow.py"|wc -l'
    output = os.popen(cmd).read()
    output = int(output.strip())
    if output >= 4:
        print('monitor_flow.py already running')
        exit(1)


def monitor():
    if_syncFrog_in_used()
    while True:
        print('start monitor')
        t_1 = "cat /proc/net/dev|grep eth0|awk -F ' ' '{print $10}'"
        t_1_1 = os.popen(t_1).read().strip()
        old = time.time()
        time.sleep(60)
        t_2 = "cat /proc/net/dev|grep eth0|awk -F ' ' '{print $10}'"
        t_1_2 = os.popen(t_2).read().strip()
        new = time.time()
        interval = int(new - old)
        result = float(t_1_2) - float(t_1_1)
        Mpbs = result * 8 / 1024 / 1024 / interval
        MBs = result / 1024 / 1024 / interval
        nowTime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        data = 'Mpbs:%s MB/s:%s date:%s' % (Mpbs, MBs, nowTime) + '\n'
        write_data(data)
        print(home_dir, data)


def write_data(data):
    with open(home_dir, 'a+') as f:
        f.write(data)

monitor()

