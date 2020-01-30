#!/usr/bin/env python
#coding:utf-8

from Crypto.Cipher import AES
from binascii import b2a_hex, a2b_hex


class AES_OBJECT(object):

    def __init__(self,FilePath, key):
        self.key = key
        self.FilePath = FilePath

    def AES_File(self, fs, key):            #加密函数
        cipher = AES.new(key, AES.MODE_CBC, key)
        x = len(fs) % 16
        if x != 0:
            fs_pad = fs + b'\0' * (16 - x)  # It shoud be 16-x not
        else:
            fs_pad = fs
        msg = cipher.encrypt(fs_pad)
        return b2a_hex(msg)
        #return msg

    def decryption(self, fs, key):          #解密函数

        cryptor = AES.new(key, AES.MODE_CBC, key)
        plain_text = cryptor.decrypt(a2b_hex(fs))
        return plain_text.rstrip(b'\0')


    def little_file_encryption(self):
        fs = open(self.FilePath, 'rb')
        fs.seek(0)
        fs_msg = fs.read()
        fs.close()
        fc = open(self.FilePath, 'wb')
        fc_msg = self.AES_File(fs_msg, self.key)
        fc.write(fc_msg)
        fc.close()
        return True



    def large_file_encryption(self):
        fs = open(self.FilePath, 'rb')
        fs.seek(0)
        fs_msg = fs.read(1024)
        fs.close()
        fc = open(self.FilePath, 'ab+')
        fc_msg = self.AES_File(fs_msg, self.key)
        fc.seek(0, 2)
        fc.write(fc_msg)
        fc.close()
        return True




def client_encryption():
    print('开始加密')
    password = raw_input("请输入密码:")
    if len(password) != 16:
        print('请输入16位密码')
        exit(1)

    file_url = raw_input("请输入文件路径与文件名(如/home/test.py,...):")
    files_list = file_url.split(',', -1)
    print(files_list)
    for file in files_list:
        new_aes = AES_OBJECT(file, password)
        encryption = new_aes.little_file_encryption()
        if encryption:
            print('%s 加密完成' % (file))




def main():
    client_encryption()



if __name__ == '__main__':
    main()




