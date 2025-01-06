# nginx升级

## 1.下载软件上传Linux，并解压

~~~
tar -zxvf nginx-1.20.1.tar.gz
~~~

## 2.备份nginx的配置文件nginx.conf

~~~
cp /usr/local/nginx/conf/nginx.conf /opt/nginxbak/nginx.conf
~~~

## 3.升级参数配置

~~~
1）cd /opt/nginx-1.20.1
2）./configure         ##有情况需要用 ./configure --with-stream
                    ##若是还有问题可使用./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module 这个来试试
//这个更全一些
./configure --with-http_ssl_module --with-stream --with-http_stub_status_module
///usr/local/nginx/sbin/nginx -V 查询该nginx安装配置
3）make                ##注意此时不能用make intall
~~~

## 4.老版本备份和新版本拷贝

~~~
mv /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginxbak

cp /opt/nginx-1.20.1/objs/nginx /usr/local/nginx/sbin/
~~~

## 5.检查nginx配置文件的正确性

~~~
/usr/local/nginx/sbin/nginx -t
~~~

==正常会显示ok,success==

==若是不正常显示failed,则需要回到上述第3步，因可能少了stream,所以使用./configure --with-stream==

## 6.升级

~~~
kill -USR2 `cat  /usr/local/nginx/logs/nginx.pid`

//旧版本nginx的pid变成nginx.pid.oldbin
cd /usr/local/nginx/logs
ls -lrt nginx.pid.oldbin

//关闭旧版本nginx
kill -QUIT `cat /usr/local/nginx/logs/nginx.pid.oldbin`
~~~

## 7.查询确认

~~~
-/usr/local/nginx/sbin/nginx -v
/usr/local/nginx/sbin/nginx -V
~~~

