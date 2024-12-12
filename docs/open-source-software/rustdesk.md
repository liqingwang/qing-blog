# RustDesk-开源远程桌面访问软件

## 自建服务器并搭建
1. 下载[rustdesk-server-linux-amd64.zip](https://github.com/rustdesk/rustdesk-server/releases)并解压到服务器,
   或者使用docker[拉取镜像](https://hub.docker.com/r/rustdesk/rustdesk-server/tags)  
   有两个可执行文件和一个文件夹:
- hbbs - RustDesk ID注册服务器
- hbbr - RustDesk 中继服务器
2. 在服务器上运行 hbbs/hbbr,建议使用[pm2](https://pm2.keymetrics.io/)管理服务
```
./hbbs 
./hbbr
```
使用pm2运行
```
pm2 start hbbs 
pm2 start hbbr 
```
更多[pm2命令](/docs/devops/pm2.md)
