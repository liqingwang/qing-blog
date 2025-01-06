# Linux上安装MySQL

## 1.确认环境（MySQL是否安装过）

~~~
检测系统是否自带安装 MySQL
rpm -qa | grep mysql
~~~

若有，类似mysql-libs-5.1.52-1.el6_0.1.x86_64

则可以进行卸载

~~~
rpm -e mysql-libs-5.1.52-1.el6_0.1.x86_64　　// 普通删除模式
rpm -e --nodeps mysql-libs-5.1.52-1.el6_0.1.x86_64　　// 强力删除模式，如果使用上面命令删除时，提示有依赖的其它文件，则用该命令可以对其进行强力删除
~~~



~~~
检查否存在 mariadb 数据库，如有，卸载之，卸载同上
rpm -qa | grep mariadb
卸载案例：
rpm -e --nodeps mariadb-libs-5.5.56-2.el7.x86_64
~~~

查看是否有MySQL残留：

~~~
find / -name mysql        #若有则会返回具体的路径
~~~



## 2.添加系统mysql组和mysql用户

检查mysql组和用户是否存在，如无创建：

~~~
cat /etc/group | grep mysql
#类似
mysql:x:490:

cat /etc/passwd | grep mysql
#类似
mysql:x:496:490::/home/mysql:/bin/bash
~~~

以上为存在的情况，如无，执行添加命令：

~~~
groupadd mysql
useradd -r -g mysql mysql
#useradd -r参数表示mysql用户是系统用户，不可用于登录系统
~~~

若是想要删除MySQL组和用户：

~~~
[root@host]# id mysql
uid=989(mysql) gid=1002(mysql) groups=1002(mysql)
[root@host]# userdel mysql
~~~

## 3.解压，移动

~~~
//解压
tar -zxvf mysql-5.7.21-linux-glibc2.12-x86_64.tar.gz
//移动并重命名至local文件夹下
mv mysql-5.7.21-linux-glibc2.12-x86_64 /usr/local/mysql
~~~

## 4.安装

### 1）修改工作目录权限

~~~
cd /usr/local/mysql
chown -R mysql:mysql ./
~~~

### 2）设置my_default.cnf等系统配置文件

~~~
[mysqld]
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES 
 
basedir = /usr/local/mysql
datadir = /usr/local/mysql/data
port = 3306
socket = /tmp/mysql.sock
character-set-server=utf8
 
log-error = /usr/local/mysql/data/mysqld.log
pid-file = /usr/local/mysql/data/mysqld.pid
~~~

参考上面，具体问题具体分析。使用ANSI编码，utf-8好像也行。

~~~
cd /usr/local/mysql/support-files
~~~

cp my-default.cnf /etc/my.cnf
cp mysql.server /etc/init.d/mysql

> **注意：**
>
> **若是自定义安装路径，则需要修改 /etc/init.d/mysql文件，对mysql文件中basedir和datadir进行配置，添加上自定义的安装路径。**



### 3）初始化

~~~
//进入mysql目录下,初始化 mysqld
bin/mysqld --initialize --user=mysql --basedir=/usr/local/mysql/ --datadir=/usr/local/mysql/data/
~~~

初始化完成之后，查看日志

/opt/mysql/mysql-5.7.25/data/mysqld.log

临时密码:

~~~
2019-04-08T06:14:29.790033Z 1 [Note] A temporary password is generated for root@localhost: a8?DQir=T+k+
~~~

### 4)启动并配置

\- 修改目录权限，进入mysql目录
`chown -R root:root ./`
`chown -R mysql:mysql data`

![这里写图片描述](Linux上安装MySQL.assets/20180404172058147)

~~~
启动mysql服务
service mysql start
~~~

bin目录下输入：

~~~
mysql -u root -p
~~~

　　--如果出现：-bash: mysql: command not found

　　--就执行： # ln -s /usr/local/mysql/bin/mysql /usr/bin --没有出现就不用执行

输入临时密码

> 更新密码
> alter user 'root'@'localhost' identified by 'root';
> flush privileges;
>
> 开启远程连接权限
>
> use mysql;
>
> update user set host='%' where user='root';
> flush privileges;
> 或者
> grant all privileges on *.* to 'root'@'%' identified by 'root' with grant option;其中%可以替换成指定主机ip，identified by后跟密码
> flush privileges;

