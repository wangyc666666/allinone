#!/usr/bin/env python
#coding:utf-8
import pymysql
import time
class My_Mysqldb(object):
    
    def __init__(self,host,user,passwd,db,charset='utf8'):
        self.nowtime=time.strftime('%Y-%m-%d %H:%M:%S') 
        self.host=host
        self.user=user
        self.passwd=passwd
        self.db=db
        self.charset=charset
        conn=pymysql.connect(host=self.host,user=self.user,passwd=self.passwd,db=self.db,charset=self.charset);  
        cur=conn.cursor(); 
        self.conn=conn
        self.cur=cur
    
    def exeAdd(self,title,summary,category_id,content,img): 
        try:         
            cur=self.cur
            conn=self.conn
            cur.execute('use %s' %self.db)
            ifsql="select * from app01_news where title=%s"
            params0=(title)
            ifexist=cur.execute(ifsql,params0)
            if not ifexist:
                #sql="insert into app01_news(title,summary,url,favor_count,reply_count,create_date,category_id,content,news_type_id,user_id,newpic) values(%s,%s,'ww.askeds.com','0','0',%s,'3',%s,'2','17','/statics')"
                #params=(title,summary,self.nowtime,content)
               # result=cur.execute(sql,params)
                sql='insert into asked.app01_news set title=%s,focus_count="0",summary=%s,url="www.asked.com",favor_count="0",reply_count="0",create_date=%s,category_id=%s,content=%s,news_type_id="2",user_id="17",newpic=%s,video="statics/video/20170209130422_Broods.mp3"'
                param=(title,summary,self.nowtime,category_id,content,img)
                result=cur.execute(sql,param)
                conn.commit()
                data=cur.fetchone()
                cur.close()
                conn.close()
                print('插入成功')     
            else:
                print('您插入的标题已存在')
        except Exception as e:
            print('数据库插入失败',e) 
        

         
    def exeDel(self,table,IDs): 
        
        try:                 #删除操作  
            sta=0;  
            for eachID in IDs: 
                ifsql="select * from app01_news where id=%s"
                params0=(eachID)
                ifexist=self.cur.execute(ifsql,params0)
                print(ifexist)
                if  ifexist:  
                    self.cur.execute("delete from %s where id=%d"%(table,int(eachID)));                 
                    sta=1
                    self.conn.commit(); 
                    print(IDs,"删除完毕")
                else:
                    print('%d已删除'%eachID) 
            return (sta);         
        except Exception as e:
            print(e)
        
         
              
    def DescQuery(self,table):
        cur=self.cur
        conn=self.conn
        query=cur.execute('use %s' %self.db)
        query=cur.execute('desc %s'%table)
        data=cur.fetchall()
        mylist=[]
        for row in data:
           mylist.append(row)
          
        return mylist    
        
        cur.close()                                    #关闭游标
        conn.commit()                                  #向数据库中提交任何未解决的事务，对不支持事务的数据库不进行任何操作
        conn.close()                        #查找操作  
       
          
    def connClose(conn,cur):                    #关闭连接，释放资源  
        cur.close();  
        conn.close();  
      

