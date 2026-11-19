# -*- coding: utf-8 -*-
"""从公网服务器拉素材包(大厅res+12游戏客户端)并解压到本仓库。"""
import os, sys, tarfile, urllib.request, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', line_buffering=True)
URL = 'http://82.158.228.38:8888/g/assets.tar'
HERE = os.path.dirname(os.path.abspath(__file__))
tmp = os.path.join(HERE, 'assets.tar')
print('downloading', URL)
urllib.request.urlretrieve(URL, tmp)
print('extracting...')
with tarfile.open(tmp) as tf:
    tf.extractall(HERE)
os.remove(tmp)
print('done. lobby/res and g/ ready.')