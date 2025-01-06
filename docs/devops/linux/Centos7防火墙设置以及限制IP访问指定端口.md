# Centos7防火墙设置以及限制IP访问指定端口

## 1.Centos防火墙相关设置命令

### 1.1查看centos版本信息

~~~
rpm -q centos-release

cat /proc/version

cat /etc/issue

uname -a

cat  /etc/redhat-release
~~~

~~~
案例：
[root@host- /]# rpm -q centos-release
centos-release-7-5.1804.el7.centos.x86_64
[root@host- /]# cat /proc/version
Linux version 3.10.0-862.el7.x86_64 (builder@kbuilder.dev.centos.org) (gcc version 4.8.5 20150623 (Red Hat 4.8.5-28) (GCC) ) #1 SMP Fri Apr 20 16:44:24 UTC 2018
[root@host- /]# cat /etc/issue
\S
Kernel \r on an \m

[root@host- /]# uname -a
Linux  3.10.0-862.el7.x86_64 #1 SMP Fri Apr 20 16:44:24 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux
[root@host- /]# cat  /etc/redhat-release
CentOS Linux release 7.5.1804 (Core) 
~~~

### 1.2查看防火墙状态

~~~
#Firewall
#查看firewalld.service服务状态
systemctl status firewalld    
#查看firewall运行状态
firewall-cmd --state


#Iptables，CenterOS7.0以上版本并没有预装Iptables
systemctl status iptables.service
~~~

~~~
案例：
[root@host- /]# systemctl status firewalld 
● firewalld.service - firewalld - dynamic firewall daemon
   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; disabled; vendor preset: enabled)
   Active: inactive (dead)      #关闭状态
     Docs: man:firewalld(1)
     
[root@host- ~]# firewall-cmd --state
not running
~~~



### 1.3防火墙服务

~~~
#启动
service firewalld start   或   systemctl start firewalld

#设置开机启动
systemctl enable firewalld

#禁用开机启动
systemctl disable firewalld

#关闭
systemctl stop firewalld.service  或  systemctl stop firewalld

#重启
service firewalld restart  或  systemctl restart firewalld
#重新装载firewal
firewall-cmd --reload
~~~

==修改后需要重启防火墙或重新装载firewal方可生效==

### 1.4查看防火墙所有开放的端口

~~~
firewall-cmd --zone=public --list-ports

firewall-cmd --list-ports
~~~

### 1.5展示当前配置的firewall规则

~~~
firewall-cmd --list-all

firewall-cmd --list-all-zone

上述两种查看结果不同
~~~



## 2.限制IP访问指定端口

### 2.1端口的查询和开放

~~~
# 查询端口是否开放
firewall-cmd --query-port=8080/tcp
# 新建永久规则，开放8080端口（TCP协议）
firewall-cmd --permanent --add-port=8080/tcp
# 移除上述规则
firewall-cmd --permanent --remove-port=8080/tcp
# 新建永久规则，批量开放一段端口（TCP协议）
firewall-cmd --permanent --add-port=9001-9100/tcp
~~~

### 2.2IP开放

~~~
# 新建永久规则，开放192.168.1.1单个源IP的访问
firewall-cmd --permanent --add-source=192.168.1.1
# 新建永久规则，开放192.168.1.0/24整个源IP段的访问
firewall-cmd --permanent --add-source=192.168.1.0/24
# 移除上述规则
firewall-cmd --permanent --remove-source=192.168.1.1
~~~

### 2.3更改防火墙默认区域为trusted，默认放行所有连接请求

~~~
firewall-cmd --set-default-zone=trusted
~~~

### 2.4允许指定IP访问本机8080端口

~~~
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.1" port protocol="tcp" port="8080" accept'
~~~

### 2.5允许指定IP段访问本机8080-8090端口

~~~
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" port protocol="tcp" port="8080-8090" accept'
~~~

### 2.6禁止指定IP访问本机8080端口

~~~
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.1" port protocol="tcp" port="8080" reject'
~~~

### 2.7删除上述允许指定IP访问端口

~~~
firewall-cmd --permanent --remove-rich-rule="rule family="ipv4" source address=" 192.168.1.1" port protocol="tcp" port="8080" accept"
~~~



## 3.cenos7的端口白名单配置

### 3.1下面的命令必须在防火墙开启的状态下才可用 ，由于firewalld默认不是放行所有端口，所以启动firewalld会造成该机器的某些端口无法访问。

~~~
#启动firewalld服务
systemctl start firewalld
#设置开机自动启动
systemctl enable firewalld
更改防火墙默认区域为trusted，默认放行所有连接请求
firewall-cmd --set-default-zone=trusted
~~~

### 3.2新建一个zone，将想要访问本机22122端口的ip，如：172.29.77.10 ，添加的这个zone中，同时在这个zone中放行端口。

~~~
firewall-cmd --permanent --new-zone=newzone
~~~

~~~
#配置ip白名单
firewall-cmd --permanent --zone=newzone --add-source=172.29.77.10
#配置ip段白名单
firewall-cmd --permanent --zone=newzone --add-source=172.29.77.0/24
~~~

~~~
#配置开发的端口
firewall-cmd --permanent --zone=newzone --add-port=22122/tcp
~~~

### 3.3除172.29.77.10 这个ip以外的地址访问本机时会使用当前默认的trusted这个zone里的规则，即禁止访问本机的22122端口。

~~~
firewall-cmd --permanent --zone=trusted --add-rich-rule="rule family="ipv4" port protocol="tcp" port="22122" drop"
~~~

### 3.4重载防火墙配置

~~~
firewall-cmd --reload
~~~

### 3.5查看配置是否生效

~~~
firewall-cmd --list-all-zone
firewall-cmd --list-all
~~~

