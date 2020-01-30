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

        # cipher = AES.new(key, AES.MODE_CBC,key)
        # x = len(fs) % 16
        # if x != 0:
        #     fs_pad = fs + b'\0' * (16 - x)  # It shoud be 16-x not
        # else:
        #     fs_pad = fs
        # msg = cipher.decrypt(fs_pad)
        # return msg




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


def get_all_base_file_name():
    file_dir = './'

    for root, dirs, files in os.walk(file_dir):
        files_list = [val for val in files if val.split('.', -1)[-1] == 'mp4' \
                      or val.split('.', -1)[-1] == 'doc']

    print(files_list)
    return files_list

def if_not_make_file(client_home_file):
    if not os.path.exists(client_home_file):
        f = open(client_home_file, 'w')
        f.close()

def register_read(client_home_file, account):
    if_not_make_file(client_home_file)
    with open(client_home_file, 'r') as exist_account:
        for lines in exist_account.readlines():
            account_in_file = re.findall(account, lines)
            if account_in_file:
                return True
            else:
                continue
    os.remove(client_home_file)
    return False

def register():
    account = raw_input("请输入用户名:")
    password = raw_input("请输入密码:")
    if len(password) != 16:
        print('请输入16位密码')
        exit(1)
    client_home_file = client_home + account
    result = register_read(client_home_file, account)
    account_message = str(account) + "|" + str(password)
    if not result:
        files_list = get_all_base_file_name()
        for file in files_list:
            line = account_message + "|" + str(file) + '|' + 'not encrypt' + '|' + '\n'
            with open(client_home_file, 'a') as f:
                f.writelines(line)
            print('注册成功')
    else:
        print('已注册')





def if_account_in_file(client_home_file, account, filename=None, password=None):
    try:
        with open(client_home_file, 'r') as exist_account:
            for lines in exist_account.readlines():
                account_in_file = re.findall(account, lines)
                if not account_in_file:
                    print('用户不存在!')
                    exit(1)
                if password != lines.split('|', -1)[1]:
                    print('用户已存在，密码错误')
                    exit(1)
                name = lines.split('|', -1)[2]
                if filename == name:
                    result = lines.split('|', -1)[3]
                    if result == 'already encrypt':
                        return True
                    else:
                        return False
                else:
                    continue
        print('%s 请先注册' % (filename))

    except Exception as error_des:
        print(error_des)
        exit()

def uniq_text(client_home_file):
    '''
    文件内容去重
    :param client_home_file:
    :return:
    '''
    file_data = ""
    with open(client_home_file, "r", encoding="utf-8") as f:
        for line in f:
            if line not in file_data:
                file_data += line
    with open(client_home_file, "w", encoding="utf-8") as f:
        f.write(file_data)

def content_change(client_home_file, file, type='encrypt'):
    file_data = ""
    if type == 'encrypt':
        old_str = 'not encrypt'
        new_str = 'already encrypt'
    else:
        new_str = 'not encrypt'
        old_str = 'already encrypt'
    with open(client_home_file, "r", encoding="utf-8") as f:
        for line in f:
            if file == line.split('|', -1)[2]:
                if old_str in line:
                    line = line.replace(old_str, new_str)
            if line not in file_data:
                file_data += line
    with open(client_home_file, "w", encoding="utf-8") as f:
        f.write(file_data)

def get_already_regist_file_name(client_home_file):
    data_list = []
    with open(client_home_file, "r", encoding="utf-8") as f:
        for line in f:
            filename_exitst = line.split('|', -1)[2]
            data_list.append(filename_exitst)
    return data_list

def client_encryption():
    print('开始加密')
    account = raw_input("请输入用户名:")
    password = raw_input("请输入密码:")
    if len(password) != 16:
        print('请输入16位密码')
        exit(1)
    client_home_file = client_home + account
    register_result = register_read(client_home_file, account)
    if not register_result:
        print('请先注册!')
        exit()
    files_list = get_already_regist_file_name(client_home_file)
    for file in files_list:
        account_result = if_account_in_file(client_home_file, account, filename=file, password=password)
        if not account_result:
            new_aes = AES_OBJECT(file, password)
            encryption = new_aes.large_file_encryption()
            if encryption:
                print('%s 加密完成' % (file))
                content_change(client_home_file, file)
        else:
            print('%s 您已加密请勿重复加密!' % (file))

def client_decription():
    print('开始解密')
    account = raw_input("请输入用户名:")
    password = raw_input("请输入密码:")
    if len(password) != 16:
        print('请输入16位密码')
        exit(1)
    client_home_file = client_home + account
    register_result = register_read(client_home_file, account)
    if not register_result:
        print('请先注册!')
        exit()

    files_list = get_already_regist_file_name(client_home_file)
    for file in files_list:
        account_result = if_account_in_file(client_home_file, account, file, password)
        if account_result:
            new_aes = AES_OBJECT(file, password)
            decription = new_aes.large_file_decription()
            if decription:
                print('%s 解密完成' % (file))
                content_change(client_home_file, file, type='decript')
        else:
            print('%s 请先加密你的文件，再解密!' % (file))


def main():
    #client_encryption()
    client_decription()
    #register_result = register()



if __name__ == '__main__':
    main()




