# docker镜像安装

## docker 安装 portainer
```
1. 设置卷
docker volume create portainer_data
2. 搜索portainer镜像
docker search portainer
3. 拉取portainer镜像
docker pull portainer/portainer
4. 启动portainer容器
docker run -d -p 9000:9000 -p 8000:8000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
5. 启动完成后，访问http://ip:9000
```

## docker 安装mysql5.7
```
1. 拉取MySQL指定版本的镜像
docker pull mysql:5.7

2.运行容器
docker run --name mysql57 --restart=always -v /mydata/mysql/data:/var/lib/mysql -v /mydata/mysql/logs:/var/log/mysql -v /mydata/mysql/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql:5.7
docker run：这是 Docker 启动容器的命令。
-p 3306:3306：这部分命令将主机的端口 3306 映射到容器内的 3306 端口。这样，您可以通过主机的 3306 端口来访问容器内运行的 MySQL 服务。
--name mysql：通过此选项，您为容器指定了一个名称，即 mysql。这使得容器更容易识别和管理。
-v /mydata/mysql/logs:/var/log/mysql：这是一个数据卷挂载操作，这样，MySQL 日志文件将在主机上存储，以供查看。
-v /mydata/mysql/data:/var/lib/mysql：同样，这是另一个数据卷挂载操作，这用于将 MySQL 数据文件保存在主机上，以便数据持久化。
-v /mydata/mysql/conf:/etc/mysql/conf.d： MySQL 配置文件。
--restart=always：这个选项指示 Docker 在容器退出时自动重新启动容器。这对于确保 MySQL 服务一直可用非常有用。
-e MYSQL_ROOT_PASSWORD=123456：这个选项设置 MySQL 根用户的密码。在示例中，密码被设置为 123456
-d：这个选项使容器在后台运行，以允许您继续在终端中执行其他命令。
mysql:5.7：这是要运行的 Docker 镜像的名称和标签。在此示例中，使用 MySQL 5.7 镜像。

3. 创建mysql的配置文件，mysql57_conf/my.cnf,写入如下内容：
[client]
default-character-set=utf8mb4
[mysql]
default-character-set=utf8mb4
[mysqld]
default-time_zone = '+8:00'
init_connect="SET collation_connection = utf8mb4_unicode_ci"
init_connect="SET NAMES utf8mb4"
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
skip-character-set-client-handshake
skip-name-resolve

4. 改完配置文件，重启MySQL：docker restart mysql

5. 进入容器，容器内部连接mysql：docker exec -it mysql /bin/bash
					登录mysql：	mysql -u root -p
```
## docker 安装mysql8.0

```
1. 拉取MySQL指定版本的镜像
docker pull mysql:8.0

2. 创建挂载文件夹
mkdir -p  /mydata/mysql80/{conf,data,logs}

3. 创建配置文件
在conf 中 vim my.cnf

[client]
#设置客户端默认字符集utf8mb4
default-character-set=utf8mb4
[mysql]
#设置服务器默认字符集为utf8mb4
default-character-set=utf8mb4
[mysqld]
#配置服务器的服务号，具备日后需要集群做准备
server-id = 1
#开启MySQL数据库的二进制日志，用于记录用户对数据库的操作SQL语句，具备日后需要集群做准备
log-bin=mysql-bin
#设置清理超过30天的日志，以免日志堆积造过多成服务器内存爆满。2592000秒等于30天的秒数
binlog_expire_logs_seconds = 2592000
#解决MySQL8.0版本GROUP BY问题
sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'
#允许最大的连接数
max_connections=1000
# 禁用符号链接以防止各种安全风险
symbolic-links=0
# 设置东八区时区
default-time_zone = '+8:00'

4. 运行镜像

docker run \
-p 13306:3306 \
--restart=always \
--name mysql80 \
--privileged=true \
-v /mydata/mysql80/logs:/var/log/mysql \
-v /mydata/mysql80/data:/var/lib/mysql \
-v /mydata/mysql80/conf/my.cnf:/etc/mysql/my.cnf \
-e MYSQL_ROOT_PASSWORD=123456 \
-d mysql:8.0 

-p表示端口映射
--restart=always表示容器退出时总是重启
--name表示容器命名
--privileged=true表示赋予容器权限修改宿主文件权利
-v /mydata/mysql80/logs:/var/log/mysql表示容器日志挂载到宿主机
-v /mydata/mysql80/data:/var/lib/mysql表示容器存储文件挂载到宿主机
-v /mydata/mysql80/conf/my.cnf:/etc/mysql/my.cnf表示容器配置文件挂载到宿主机
-e MYSQL_ROOT_PASSWORD=123456 表示设置mysql的root用户密码,建议用强密码
-d表示后台运行
                        
原文链接：https://blog.csdn.net/donkor_/article/details/139879575
```

## docker 安装 zookeeper

```
1. 运行镜像启动容器
docker run -d --name zookeeper --privileged=true -p 2181:2181  -v /mydata/zookeeper/data:/data -v /mydata/zookeeper/conf:/conf -v /mydata/zookeeper/logs:/datalog zookeeper:latest

参数说明:
-e TZ="Asia/Shanghai" # 指定上海时区 
-d # 表示在一直在后台运行容器
-p 2181:2181 # 对端口进行映射，将本地2181端口映射到容器内部的2181端口
--name # 设置创建的容器名称
-v # 将本地目录(文件)挂载到容器指定目录；
--restart always #始终重新启动zookeeper，看需求设置不设置自启动

2.添加ZooKeeper配置文件，在挂载配置文件目录(/mydata/zookeeper/conf)下，新增zoo.cfg 配置文件，配置内容如下：

dataDir=/data  # 保存zookeeper中的数据
clientPort=2181 # 客户端连接端口，通常不做修改
dataLogDir=/datalog
tickTime=2000  # 通信心跳时间
initLimit=5    # LF(leader - follower)初始通信时限
syncLimit=2    # LF 同步通信时限
autopurge.snapRetainCount=3
autopurge.purgeInterval=0
maxClientCnxns=60
standaloneEnabled=true
admin.enableServer=true
server.1=localhost:2888:3888;2181

3. 进入zookeeper 容器内部
docker exec -it zookeeper /bin/bash
4. 检查容器状态
docker exec -it zookeeper /bin/bash ./bin/zkServer.sh status
5. 进入控制台
docker exec -it zookeeper zkCli.sh
```
## docker 安装kafka及zookeeper

```
1.下载镜像

docker pull wurstmeister/kafka
docker pull wurstmeister/zookeeper

1.1 创建自定义网络
docker network create kafka-network

2.启动 Zookeeper

docker run -d --name zookeeper -p 2181:2181 -t wurstmeister/zookeeper

3.启动 Kafka

docker run -d --name kafka -p 9092:9092 --link zookeeper:zookeeper --env KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 --env KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 --env KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 --env KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 wurstmeister/kafka

这里，我们链接了ZooKeeper容器，并且设置了几个环境变量来配置Kafka。

在这个命令中：

--name kafka: 设置容器的名字为“kafka”。

-p 9092:9092: 将容器的9092端口映射到宿主机的9092端口。

--link zookeeper:zookeeper: 连接到名为“zookeeper”的另一个Docker容器，并且在当前的容器中可以通过zookeeper这个别名来访问它。

--env KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181: 设置环境变量，指定ZooKeeper的连接字符串。

--env KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092: 设置环境变量，指定Kafka的advertised listeners。

--env KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092: 设置环境变量，指定Kafka的listeners。

--env KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1: 设置环境变量，指定offsets topic的副本因子。

wurstmeister/kafka: 使用的Docker镜像名字。

4.添加 Topic

创建topic lottery_activity_partake：bin/kafka-topics.sh --create --zookeeper 172.17.0.3:2181 --replication-factor 1 --partitions 1 --topic lottery_activity_partake

创建topic lottery_invoice：bin/kafka-topics.sh --create --zookeeper 172.17.0.3:2181 --replication-factor 1 --partitions 1 --topic lottery_invoice

注意 创建Topic的时候，地址需要换成自己zookeeper的地址

查看主题
bin/kafka-topics.sh --list --zookeeper 172.20.28.52:2181

发送消息
bin/kafka-console-producer.sh --broker-list 172.20.28.52:9092 --topic Hello-Kafka

监听消息
bin/kafka-console-consumer.sh --bootstrap-server 172.20.28.52:9092 --topic Hello-Kafka --from-beginning

5. 安装 kafka-eagle

docker pull nickzurich/efak:latest

docker run -d --name kafka-eagle -p 8048:8048 --link zookeeper:zookeeper --link kafka:kafka -e KE_ZK_CLUSTER=zookeeper:2181 -e KE_KAFKA_BROKER=kafka:9092 nickzurich/efak:latest
```

## docker 安装 redis

```
1.下载镜像
docker pull redis:latest

2.查询latest版本
docker image inspect redis:latest|grep -i version

3. 获取Redis配置文件

https://github.com/redis/redis/blob/7.4/redis.conf

修改如下

#bind 127.0.0.1 -::1
#这个的话改成 0.0.0.0 即可，127.0.0.1 是只允许本机访问
bind 0.0.0.0

# requirepass foobared 找到这个，改成你想改的密码即可
requirepass 123456

chmod 777 redis.conf

4. 指定redis.conf 启动 redis 容器

docker run --restart=always \
-p 6379:6379 \
--name redis \
-v /mydata/redis/redis.conf:/etc/redis/redis.conf \
-v /mydata/redis/data:/data \
-d redis:latest redis-server /etc/redis/redis.conf

各参数的意义：

1）-restart=always 总是开机启动
2）-p 6379:6379 将6379端口挂载出去
3）–name 给这个容器取一个名字
4）-v 数据卷挂载宿主机/home/dj/redis/redis.conf文件映射到redis容器下的/etc/redis/redis.conf  /home/dj/redis/redis.conf:/etc/redis/redis.conf
5）-d redis:7.0.12 后台运行容器，不加-d就是直接在控制台输出，关闭窗口即停止容器。
6） redis-server /etc/redis/redis.conf 以配置文件启动redis，加载容器内的 redis.conf文件，最终找到的是挂载的目录 /etc/redis/redis.conf 也就是宿主机下共享的 /home/dj/redis/redis.conf。

参考：https://blog.csdn.net/weixin_45821811/article/details/116211724

docker stop [容器名|容器ID] #停止容器
docker start   [容器名|容器ID]  #启动停止的容器
docker restart  [容器名|容器ID]  # 将容器重新启动
docker kill [容器名|容器ID] #强行终止
docker rm [容器名|容器ID]   # 删除停止的容器

```
