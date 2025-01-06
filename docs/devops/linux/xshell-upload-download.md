# XSHELL工具上传文件到Linux以及下载文件到本地(Windows)

参考：https://blog.csdn.net/zengdeqing2012/article/details/47089773

Linux上需要安装安装lrzsz工具包：yum install -y lrzsz

## 1.上传

输入==rz -be==命令后，会弹出对话框，选择你要上传的文件，选择打开就上传到Linux主机。上传完可以使用ls 查看；

![img](./images/xshell-upload-download/20150727195511224)

## 2.下载

从Linux主机下载文件，下载命令为==sz== ，后面跟要下载的文件名；可以选择下载的保存文件夹。

```html
[root@xyx-vsver01 webapps]# sz 文件名称
```

![img](./images/xshell-upload-download/20150727195920314)