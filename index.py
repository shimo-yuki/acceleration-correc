import cgitb
import cgi
import os
import json
import sys
import io
import urllib.parse 



def main():
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    cgitb.enable()
    data   = sys.stdin.read()
    params = json.loads(data)
    para_1 = params["para_1"]
    response = {"res" : "aaaa"}
    print('Content-type: text/html\nAccess-Control-Allow-Origin: *\n')
    print("\n\n")
    print(json.JSONEncoder().encode(response))
    print('\n')

if __name__ == '__main__':
    main()