# WSL安装教程

## WSL安装 

1. 列出WSL可用的发行版列表
    wsl --list --online
2. 安装Ubuntu-20.04
   wsl --install Ubuntu-20.04

## WSL修改默认安装目录到其他盘
1. 列出已安装的WSL发行版及其版本信息：
   wsl -l --all -v
2. 关闭WSL： 
   wsl --shutdown
3. 导出分发版为tar文件到d盘
   wsl --export Ubuntu-20.04 d:\1234\wsl-ubuntu20.04.tar
4. 注销当前分发版
   wsl --unregister Ubuntu-20.04
5. 重新导入并安装WSL在d:\Program_Files_NoAdmin\wsl-ubuntu20.04
   wsl --import Ubuntu-20.04 d:\Program_Files_NoAdmin\wsl-ubuntu20.04 d:\1234\wsl-ubuntu20.04.tar --version 2
6. 删除tar文件
   del d:\Program_Files_NoAdmin\wsl-ubuntu20.04

## kali-linux迁移
1. 查看所有安装的版本
 wsl -l --all -v
2. 导出分发版为 tar文件到 D盘
 wsl --export kali-linux D:\wsl-kali-linux.tar
3. 注销当前分发版
 wsl --unregister kali-linux
4. 重新导入并安装WSL在D盘
 wsl --import kali-linux D:\Program_Files_NoAdmin\wsl-kali-linux D:\wsl-kali-linux.tar --version 2
5. 设置默认登陆用户为安装时用户名
 kali-linux config --default-user USERNAME
6. 删除 wsl-kali-linux.tar
 del D:\wsl-kali-linux.tar