#!/usr/bin/env python
import urllib
from django.template.defaultfilters import title
#coding:utf-8  
from tools.my_mysql import My_Mysqldb
start_url='http://neihanshequ.com/pic/'

import requests
import time
from bs4 import BeautifulSoup
from multiprocessing import Pool
import re
from random import choice


class WebCrawler(object):     
    
    def __init__(self,base_url='http://neihanshequ.com/'):
        webheader2 = {
                'Connection': 'Keep-Alive',
                'Accept': 'text/html, application/xhtml+xml, */*',
                'Accept-Language': 'en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
                'Accept-Encoding': 'gzip, deflate',
                'Host': 'www.douban.com',
                'DNT': '1'
                } 
        data=requests.get(base_url)
        soup=BeautifulSoup(data.text,'lxml') 
        linkrc=soup.select('a[class="image share_url"]')
        self.id=[]
        for link in linkrc:
            link=link.get('href')
            link=link.split('/')[-2]            
            self.id.append(link)
        gifurl=['','index_2.html','index_8.html','index_20.html','index_25.html','index_30.html','index_35.html','index_40.html']
        self.gifurl=choice(gifurl)  
    
    def get_gif(self,url='http://www.gaoxiaogif.com/'):
        baseurl=url+self.gifurl
        print(baseurl)
        webheader2 = {
        'Connection': 'Keep-Alive',
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Accept-Language': 'en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
        'Accept-Encoding': 'gzip, deflate',
        'Host': 'www.douban.com',
        'DNT': '1'
        } 
                
        webData=requests.get(baseurl)                                           
        soup=BeautifulSoup(webData.text,'lxml')  
        links=soup.select('.listgif-giftu > p > img')
        linkhf=soup.select('h2 > a')
        htmlid=[]
        allimgName=[]
        for hf in linkhf:
            hf=hf.get('href')
            hf=str(hf).split('/',1)[1]
            htmlid.append(hf)
            print(url+hf)
            gifdata=requests.get(url+hf)
            soupgif=BeautifulSoup(gifdata.text,'lxml')
            linkgif=soupgif.select('.listgif-giftu   > p > img')
            for gif in linkgif:
                gif=gif.get('src')
                filename=gif.split('/')[-1]
                print(filename)
                headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
                req = urllib.request.Request(url=gif, headers=headers)                
                imgcontent=urllib.request.urlopen(req).read()            
                #with open("C:\\Users\\wangyc\\git1.git\\class03\\statics\\%s"%filename,'wb') as f:
                #      f.write(imgcontent)
                #      f.close()
                urllib.request.urlretrieve(gif,'/var/www/html/asked/statics/paChouImg/%s' % filename);
                allimgName.append('statics/paChouImg/'+filename)
              
        return allimgName
          
            #print(link)     
            #imgcontent=urllib.request.urlopen(link).read()
                       
              
          
            
            
           # with open("C:\\Users\\wangyc\\git1.git\\class03\\statics\\%s"%filename,'wb') as f:
                
            #    f.write(imgcontent)
            #    f.close()
           
   
        
    
    def get_content(self,start_url):   
        ret ={'title':'','summary':'','content':'','gifname':''}
        title=[]
        summary=[]
        content=[]   
        try:
            for id in self.id:                                                                  
                webheader2 = {
                'Connection': 'Keep-Alive',
                'Accept': 'text/html, application/xhtml+xml, */*',
                'Accept-Language': 'en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
                'Accept-Encoding': 'gzip, deflate',
                'Host': 'www.douban.com',
                'DNT': '1'
                } 
                
                
                url=start_url+id
                print(url)
                webData=requests.get(url)                                           
                soup=BeautifulSoup(webData.text,'lxml')               
                                      
                for link in soup.select('.upload-txt > p'): 
                    linkt=link.string[0:12]+'...'                     
                    #link=link.string
                    links=link.string
                    
                    title.append(linkt)
                    summary.append(links)
                    #content.append(link)
                        
                                         
        except Exception as e:
            print('url错误',e)
            
        ret['title']=title
        ret['summary']=summary
        ret['content']=content
        return ret
       
        
if __name__ == '__main__':       
    crawler=WebCrawler()
    gif=crawler.get_gif()
    total=crawler.get_content('http://neihanshequ.com/')     
    news=zip(total['title'],total['summary'],gif)
    
    print(gif)  
    print(total['title'])   
    
    sucess=0
    faild=0        
    for t,s,newpic in news:            
        t=str(t)
        s=str(s)
        newpic=str(newpic)
        print(t)
        print(s)
        print(newpic) 
         
          
        if  t and s and newpic:
            try: 
                sucess+=1
                conndb=My_Mysqldb('127.0.0.1','WoBanN','','jw1jsrTUC&v9HDzds') #默认app01_news
                exeAdd=conndb.exeAdd(t,s,'4','',newpic)                           
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
        faild+=1
        
    print('爬取总数:',len(total['title']),'成功:',sucess,'失败:',faild)   
