import os
import sys
from django.core.wsgi import get_wsgi_application

try:
    sys.path.append('/var/www/WoBanN')
    os.environ['DJANGO_SETTINGS_MODULE'] = 'WoBanN.settings'

    os.environ['PYTHON_EGG_CACHE'] = '/var/www/WoBanN.python-egg'
    application = get_wsgi_application()
except Exception as e:
    print(e)


#import os
#
#from django.core.wsgi import get_wsgi_application
#
#os.environ.setdefault("DJANGO_SETTINGS_MODULE", "WoBanN.settings")
#
#application = get_wsgi_application()
