# docker命令

## 镜像命令
```
1. 查看本地所有镜像
docker images
2. 查看远程仓库镜像
docker search [镜像名称]
3. 从远程仓库下载镜像到本地
docker pull [镜像名称]:[tag版本号]
4. 查看镜像/容器/数据卷所占用空间
docker system df
5. 删除镜像
docker rmi -f [镜像ID]
6. 查询镜像latest版本
docker image inspect redis:latest|grep -i version
```

## 容器命令
```
1. 新建、启动容器
docker run [options] image [command][arg...]
    options 常用说明：
    --name=：给容器指定一个名称，不使用则会随机分配一个名称
    -d：后台运行容器并返回一个容器ID （后台守护式容器，部分容器会在启动后自杀，也就是启动未成功，如：ubuntu）
    -i：以交互模式运行容器，通常和-t同时使用（前台交互式容器）
    -t：为容器重新分配一伪输入终端，通常和-i同时使用（前台交互式容器）
    -P：随机端口映射，大写P
    -p：指定端口映射，小写p
    -v：指定容器卷
2. 列出当前所有正在运行的容器
docker ps [options]
    options常用说明：
    -a：列出当前所有正在运行的容器 + 历史上运行过得容器
    -l：显示最近创建的容器
    -n：显示最近n个创建的容器
    -q：静默模式，只显示容器编号
```

### 容器重启、停止、删除

```
docker start [容器ID]：启动已经停止运行的容器
docker restart [容器ID]：重启容器
docker stop [容器ID]：停止正在运行的容器
docker kill [容器ID]：强制停止正在运行的容器
docker rm [容器ID]：删除已经停止的容器
docker rm -f [容器ID]：强制删除容器
docker rm -f $(docker ps -aq)：一次性删除多个容器（谨慎使用）
```

### 容器日志、进程、进入命令行
```
查看容器日志：docker logs [容器ID]
查看容器进程：docker ps -a | grep [名称]
例：docker ps -a | grep mysql ； docker ps -a | grep redis
查看容器内运行的进程：docker top [容器ID]
查看容器内部细节：docker inspect [容器ID]
进入正在运行的容器并以命令行进行交互：
命令1：docker exec -it [容器ID] bash
命令2：docker attach [容器ID]
（推荐使用docker exec命令，因为docker attach命令使用exit退出，会导致容器停止，而docker exec命令不会）
```

### 容器复制、导入、导出
```
1. 复制
语法：docker cp [容器ID]:[容器内路径] [目的主机路径]
例：想把容器ID为8b6c3cb3470b，路径/bin下面的一个a.txt文件cp到主机目录/test下docker cp 8b6c3cb3470b:/bin/a.txt /test
2. 导出
作用：export导出容器的内容作为一个tar文档文件[对应import命令]
语法：docker export [容器ID] > [文件名.tar]
3. 导入
作用：import从tar包中的内容创建一个新的文件系统再导入为镜像[对应export]
语法：cat [文件名.tar] | docker import - 镜像用户/镜像名:镜像版本号
```

## 数据卷命令
```
1. 创建
docker volume create my_volume
2. 使用数据卷
docker run -v my_volume:/path/in/container my_image
3. 列出所有数据卷
docker volume ls
4.查看数据卷信息
docker volume inspect my_volume
5. 删除数据卷
docker volume rm my_volume

```

