#!/bin/env python
import os

if __name__ == "__main__":
    print('restart nginx')
    restart = os.popen('pkill -9 uwsgi').read()
    restart = os.popen('uwsgi -i /var/www/WoBanN/uwsgi.ini').read()
    cmd='service nginx restart'
    os.popen(cmd).read()
    print(restart)

