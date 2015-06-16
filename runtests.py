"""
Standalone test runner for OPAT plugin
"""
import os
import sys

from django.conf import settings

settings.configure(DEBUG=True,
                   DATABASES={
                       'default': {
                           'ENGINE': 'django.db.backends.sqlite3',
                       }
                   },
                   OPAL_OPTIONS_MODULE = 'opat.tests.dummy_options_module',
                   ROOT_URLCONF='opat.urls',
                   COMPRESS_ROOT='/tmp/',
                   STATIC_URL = '/assets/',
                   MIDDLEWARE_CLASSES = (
                       'django.middleware.common.CommonMiddleware',
                       'django.contrib.sessions.middleware.SessionMiddleware',
                       'opal.middleware.AngularCSRFRename',
                       'django.middleware.csrf.CsrfViewMiddleware',
                       'django.contrib.auth.middleware.AuthenticationMiddleware',
                       'django.contrib.messages.middleware.MessageMiddleware',
                       'opal.middleware.DjangoReversionWorkaround',
                       'reversion.middleware.RevisionMiddleware',
                       'axes.middleware.FailedLoginMiddleware',
                   ),
                   INSTALLED_APPS=('django.contrib.auth',
                                   'django.contrib.contenttypes',
                                   'django.contrib.sessions',
                                   'django.contrib.admin',
                                   'django.contrib.staticfiles',
                                   'compressor',
                                   'opal',
                                   'opat',),)

from opat.tests import dummy_options_module
from opat.tests import dummy_opal_application

import django
django.setup()


from django.test.runner import DiscoverRunner
test_runner = DiscoverRunner(verbosity=1)
failures = test_runner.run_tests(['opat', ])
if failures:
    sys.exit(failures)
