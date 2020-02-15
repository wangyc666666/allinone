#!/usr/bin/env python
import urllib

#coding:utf - 8  
html_doc = """
<html><head><title>The Dormouse's story</title></head>
<body>
<p class="title"><b>The Dormouse's story</b></p>

<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>

<p class="story">...</p>
"""

from tools.my_mysql import My_Mysqldb

import requests
import time
from bs4 import BeautifulSoup
from multiprocessing import Pool
import re

start_url = 'http://yun.itheima.com/course/c27.html'
class WebCrawler(object):
    
    def __init__(self, start_url):

        self.webheader2 = {
            'Connection': 'Keep-Alive',
            'Accept': 'text/html, application/xhtml+xml, */*',
            'Accept-Language': 'en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
            'Accept-Encoding': 'gzip, deflate',
            'Host': 'yun.itheima.com',
            'DNT': '1'
        }
        webData = requests.get(start_url, headers=self.webheader2)
        soup = BeautifulSoup(webData.text, 'lxml')
        links = soup.select('a')

        self.detailUrl = []
        for link in links:

            link = link.get('href')
            pattern = re.compile(r'course/.*html$')
            match = pattern.search(link)

            if match:
                self.detailUrl.append(link)
            else:
                pass     
                     
        self.detailUrl = sorted(set(self.detailUrl), key=self.detailUrl.index)

     
    def get_detail_content(self):
        
        ret = {'title': '', 'summary': '', 'content': '', 'allimgName': '', 'videoUrl': ''}
        title = []
        summary = []
        content = []
        allimgName = []
        videoUrl = []
    
        for detailUrl in self.detailUrl: 
            try:
                print(detailUrl)
                detailUrl='http://yun.itheima.com/' + detailUrl
                detailData = requests.get(detailUrl, headers=self.webheader2)
                soup = BeautifulSoup(detailData.text, 'lxml')
                title = str(soup.select('div.playr_in > h2')).strip('[<h2 class="vname">').strip('</h2>]')

                videoUrl = str(soup.select('div.playl > video > source')).strip('[<source src="').strip('" type="video/mp4"/>]')
                content = soup.find_all('div', class_='inner')







                linkimg = soup.select('div.indent > div > div > div > a > img ')
                imghref = []
                for link in linkimg:
                    link = link.get('src')
                    imghref.append(link)
                    imgcontent = urllib.request.urlopen(link).read()
                    filename = link.split('/')[-1]
                    with open("/var/www/html/asked/statics/paChouImg/%s"%filename, 'wb') as f:
                        f.write(imgcontent)
                        f.close()
                    allimgName.append('statics/paChouImg/'+filename)
                       
                       
                   
                        
            except Exception as e:
                print('url错误', e)
            
  
        
        ret['title'] = title
        ret['summary'] = summary
        ret['content'] = content
        ret['allimgName'] = allimgName
        ret['videoUrl'] = videoUrl
        
        return ret
       
        
if __name__ == '__main__':       
    crawler = WebCrawler(start_url)
    total = crawler.get_detail_content()
    news = zip(total['title'],total['summary'],total['content'],total['allimgName'])
    print(total['title'])
    print(total['summary'])
    print(total['content'])   
    print(total['allimgName'])                     
    for t,s,c,newpic in news:
            
        t=str(t).replace('[','').replace(']','')
        s=str(s).replace('[','').replace(']','')
        c=str(c).replace('[','').replace(']','')
        newpic=str(newpic)
        print(t)
        print(s)
        print(c)
        print(newpic) 
                  
        if  t and s and newpic:
            try: 
                conndb=My_Mysqldb('127.0.0.1','root','','asked') #默认app01_news
                exeAdd=conndb.exeAdd(t,s,'6',c,newpic)  #插入图书             
               #查询
               #DescQuery=conndb.DescQuery('app01_news')
               # print(DescQuery)
            
               #增加self,table,title,summary,content,url,favor_count,reply_count,category_id,news_type_id,user_id,newpic
               
               # 默认阿app01_news   
            
               #IDs=[41,42,43,44,45]
               #exeDel=conndb.exeDel('app01_news',IDs)
               #print(exeDel)    
            except (TypeError,AttributeError) as e:
               print('数据库连接异常',e) 
               continue   
        else:
            continue
                
        
        
        
        
        
        
               
                
            
            
            
               
               
           
                 
                 
    

