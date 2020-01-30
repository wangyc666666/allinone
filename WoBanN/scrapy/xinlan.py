#encoding=utf-8
import time
from selenium import webdriver
import requests

# 该段代码在ubuntu上能成功运行，并没有在windows上面运行过
# 直接登陆新浪微博
url = 'http://weibo.com/login.php'
driver = webdriver.PhantomJS()
driver.get(url)

driver.maximize_window()
print(u'开始登陆')

# 定位到账号密码表单
login_tpye = driver.find_element_by_class_name('info_header').find_element_by_xpath('//a[2]')
login_tpye.click()
time.sleep(3)

name_field = driver.find_element_by_id('loginname')
name_field.clear()
name_field.send_keys('674702627@qq.com')

password_field = driver.find_element_by_class_name('password').find_element_by_name('password')
password_field.clear()
password_field.send_keys('118732011053wyc')

submit = driver.find_element_by_link_text(u'登录')
submit.click()

# 等待页面刷新，完成登陆
time.sleep(5)
print('登陆完成')
sina_cookies = driver.get_cookies()

cookie = [item["name"] + "=" + item["value"] for item in sina_cookies]
cookiestr = '; '.join(item for item in cookie)

# 验证cookie是否有效
redirect_url = 'https://weibo.com/2675799031/profile?topnav=1&wvr=6&is_all=1'
headers = {'cookie': cookiestr}
html = requests.get(redirect_url, headers=headers).text
print(html)