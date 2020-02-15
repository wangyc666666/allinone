#!/usr/bin/env python
#coding:utf-8

from Crypto.Cipher import AES
import os
from binascii import b2a_hex, a2b_hex
import re

client_home = "/home/"



class AES_OBJECT(object):

    def __init__(self,FilePath, key):
        self.key = key
        self.FilePath = FilePath

    def AES_File(self, fs, key):
        cipher = AES.new(key, AES.MODE_CBC, key)
        x = len(fs) % 16
        if x != 0:
            fs_pad = fs + b'\0' * (16 - x)
        else:
            fs_pad = fs
        msg = cipher.encrypt(fs_pad)
        return b2a_hex(msg)


    def decryption(self, fs, key):

        cryptor = AES.new(key, AES.MODE_CBC, key)
        plain_text = cryptor.decrypt(a2b_hex(fs))
        return plain_text.rstrip(b'\0')


    def little_file_decription(self):
        fs = open(self.FilePath, 'rb')
        fs.seek(0)
        fs_msg = fs.read()
        fs.close()
        fc = open(self.FilePath, 'wb')
        fc.seek(0)
        fc_msg = self.decryption(fs_msg, self.key)
        fc.write(fc_msg)
        fc.close()
        return True


    def large_file_decription(self):
        size = os.path.getsize(self.FilePath)
        if size <= 2048:
            print('无法获取文件大小')
            exit(1)
        obset = int(size) - 2048
        fs = open(self.FilePath, 'rb')
        fs.seek(0)
        fs_msg = fs.read(obset)
        fs.close()

        fc = open(self.FilePath, 'wb')
        fc.seek(0)
        fc.write(fs_msg)
        fc.close()
        return True




def client_decription():
    print('开始解密')
    password = raw_input("请输入密码:")
    file_url = raw_input("请输入文件路径与文件名(如/home/test.py,...):")
    if len(password) != 16:
        print('请输入16位密码')
        exit(1)
    files_list = file_url.split(',',-1)
    print(files_list)
    for file in files_list:
        new_aes = AES_OBJECT(file, password)
        decription = new_aes.little_file_decription()
        if decription:
            print('%s 解密完成' % (file))



def main():
    client_decription()




if __name__ == '__main__':
    main()




