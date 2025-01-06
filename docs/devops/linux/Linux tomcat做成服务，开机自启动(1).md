# Linux tomcat做成服务，开机自启动

## 1.修改脚本

~~~
cp -p /opt/dataX/apache-tomcat-8.5.73/bin/catalina.sh /etc/init.d/tomcat
~~~

将bin目录下的catalina.sh文件到/etc/init.d目录下，并重命名为tomcat。

~~~
vi /etc/init.d/tomcat
输入i

#在脚本较前面的位置的位置加上下面注释

	# chkconfig: 112 63 37
	# description: tomcat server init script
	# Source Function Library
	. /etc/init.d/functions
	JAVA_HOME=/opt/dataX/jdk1.8.0_191/
	CATALINA_HOME=/opt/dataX/apache-tomcat-8.5.73
	
~~~

注意：若是不加**\#chkconfig:2345 10 90**  **#description:Tomcat service**会报错：tomcat不支持chkconfig

## 2.修改脚本的可执行权限

~~~
chmod 755 /etc/init.d/tomcat
~~~

## 3.添加到服务

~~~
chkconfig --add tomcat
~~~

## 4.开机启动

~~~
chkconfig tomcat on
~~~

## 5.自启动服务完成

~~~
service tomcat stop

service tomcat start
~~~

出现 OK 的提示，说明Tomcat服务停止/启动成功。

## 6.服务器重启

~~~
reboot    #表示立即重启，效果等同于shutdown -r now
~~~

