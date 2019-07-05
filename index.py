!/usr/bin/python
# -*- coding: utf-8 -*-


#######################################################
#
#  import
#
#######################################################

import cgitb
import cgi
import os
import json
import sys
import io
import urllib.parse  #url encode/decode


#######################################################
#
#  main
#
#######################################################
def main():

    #文字化け対策
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    #エラーの内容をブラウザに送信
    cgitb.enable()

    #値取得
    data   = sys.stdin.read()
    params = json.loads(data)

    #
    para_1 = params["para_1"]
    para_2 = params["para_2"]
    para_3 = params["para_3"]  #url encoded

    #url decode
    para_3 = urllib.parse.unquote(para_3)


    #######################################################
    #
    #  処理
    #
    #######################################################

    #処理

    #レスポンス
    response = {"res" : "aaaa"}


    #######################################################
    #
    #  response
    #
    #######################################################

    #print("Content-type: application/json")  #error
    print('Content-type: text/html\nAccess-Control-Allow-Origin: *\n')
    print("\n\n")
    print(json.JSONEncoder().encode(response))
    print('\n')


################################################
#
#  main実行
#
################################################
if __name__ == '__main__':
    main()