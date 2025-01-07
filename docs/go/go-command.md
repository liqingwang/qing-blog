# Go命令

## Go Mod
> Go模块系统需要go.mod文件管理依赖

1. 初始化Go模块
~~~
在项目根目录下执行:
go mod init 项目名称
~~~
2. 如果有远程仓库建议使用完整的模块路径
~~~
GitHub仓库示例:
go mod init github.com/用户名/项目名
私有仓库示例:
go mod init gitlab.company.com/项目名
~~~
3. 初始化后的后续操作
~~~
下载依赖:
go mod tidy
验证依赖:
go mod verify
~~~
### go.mod文件的作用
- 声明模块路径
- 记录项目依赖
- 指定Go版本
- 管理依赖版本

## go build

## do doc