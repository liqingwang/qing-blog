# ES备份与恢复

## ES索引通过kibana使用备份数据重建索引
1. 获取源索引的数据(mapping) 并 创建临时索引：my_index_temp，
2. 备份数据到临时索引：my_index_temp
3. 删除原索引: my_index，
4. 重新创建正确数据类型索引：my_index
5. 再把临时索引：my_index_temp的数据备份到新创建索引 my_index。

操作步骤如下： 
1. 获取原索引
```
//获取源索引的mapping数据
GET my_index/_mapping
 
//返回示例如下
  {"my_index": {
    "mappings": {
      "_doc": {
        "properties": {
	        "whyBuy": {
	          "type": "keyword"
	        },
	        "zipcode": {
	          "type": "keyword"
	        }
        }
      }
    }
  }
```
2. 创建一个临时索引
```
PUT my_index_temp
{
  "mappings": {
    "_doc": {
      "properties": {
        "whyBuy": {
          "type": "keyword"
        },
        "zipcode": {
          "type": "keyword"
        }
      }
    }
  }
}
```
3. 备份原数据
```
// 同步数据值临时索引
POST _reindex?refresh&wait_for_completion=false
{
  "conflicts": "proceed",
  "source": {
    "index": "my_index"
  },
  "dest": {
    "index": "my_index_temp",
    "op_type": "create"
  }
}
 
//查询确认数据是否复制过去
GET  my_index_temp/_search
{
  "query": {
    "term": {
    }
  }
}
```
4. 删除原索引及数据
```
delete my_index
```
5. 重新创建正确的索引（注意是修改后的索引）
同步骤2
6. 迁移旧数据回新索引
同步骤3
7. 删除临时索引
同步骤4

## ES从本地备份数据到Linux集群操作

### 本地备份快照
1. 备份前需要在Elasticsearch的配置文件 elasticsearch.yml 中增加设置，然后需要重启es,如果es中有这个配置那么不需要进行这一步操作，直接忽略此步骤。
```yml
path.repo: ["/mount/backups"]  //文件会存储到es同一级根目录
```
2. 本地执行备份命令

```yml
#创建备份快照仓库
PUT /_snapshot/my_backup 
{
  "type": "fs",
  "settings": {
    "location": "/mount/backups"  //本地es生产快照路径，这个路径可以自己随便指定
  }
}
#指定备份的index，生成快照
PUT /_snapshot/my_backup/snapshot_1?wait_for_completion=false
{
    "indices": "index_1,index_2"//需要备份的index，不指定将备份所有的index
}
```
3. 查看备份状态：
```yml
GET _snapshot/my_backup/snapshot_1  //获取 snapshot_1 的执行状态
```
### 生产集群还原es快照
1. 生产主节点需要在Elasticsearch的配置文件 elasticsearch.yml 中增加设置，然后需要重启es。==注意从节点不需要配置这个==
```yml
path.repo: ["/mount/backups"]  //文件会存储到es同一级根目录
```

2. 在kibana中执行主节点生产快照,提前在主节点es中生成该目录`/mount/backups`,这个目录根据自己情况指定
```yml
# 创建仓库,创建备份快照
PUT /_snapshot/my_backup //my_backup快照名称
{
  "type": "fs",
  "settings": {
    "location": "/mount/backups"  //本地es快照路径，这个路径可以自己随便指定
  }
}
```
3. 将本地/mount目录下的backups备份的快照拷贝放入主节点服务器`/mount`目录下

4. 执行还原操作，执行此操作的时候，==从节点需要先关闭==，等执行完该命令之后再启动从节点。**注意事项**：还原前需要把老的
```yml
POST /_snapshot/my_backup/snapshot_1/_restore?wait_for_completion=false
{
  "indices": "index_1",
  "rename_replacement": "restored_index_1"
}
#如果没有这个
{
  "indices": "index_1",
  "rename_replacement": "restored_index_1"
}就是恢复所有的索引
#通过上面的 api，我们可以将 index_1 索引恢复到 restored_index_1 中。这个恢复过程完全是基于文件的，因此效率会比较高。

#如果只有一个索引的话可以直接执行以下操作进行还原
POST /_snapshot/my_backup/snapshot_1/_restore?wait_for_completion=false
```

5. 执行完上面操作，数据已经同步到主节点了，然后对数据进行分片和创建副本操作

分片和副本参数说明：
- `number_of_shards`：分片数量，默认值是 5
- `number_of_replicas`：副本数量，默认值是 1

我们有三个节点，在每个节点上都创建一个分片。每个分片在另两个节点上各创建一个副本。

```yml
# 设置分片和副本，根据自己情况设置分片和副本
PUT /自己索引名
{
  "settings": {
    "number_of_shards": 3, 
    "number_of_replicas": 2
  }
}
```
### 参考文档
- 备份还原：https://developer.aliyun.com/article/767043?utm_content=g_1000151932
- 备份还原：https://www.toutiao.com/i6994312724490732065/
- 索引分片和索引副本：https://blog.csdn.net/weixin_38305440/article/details/109265248

## es备份与恢复

### 1.备份

#### 1.1设置仓库base目录

~~~
//在elasticsearch.yml 配置文件中配置仓库base目录
//window下
path.repo: ["D:\\program\\elasticsearch-5.1.1\\data\\back"]
~~~

#### 1.2创建仓库

~~~
POST _snapshot/my_backup_1
{
  "type": "fs",
  "settings": {
    "location": "D:\\program\\elasticsearch-5.1.1\\data\\back\\my_backup_1",
    "max_snapshot_bytes_per_sec": "20mb",
    "max_restore_bytes_per_sec": "20mb",
    "compress": true
  }
}
~~~

> ==POST请求会更新已有的仓库配置, PUT会重新创建该仓库。==
>
> type：仓库的类型为共享文件系统
>  location: 指定仓库的路径，必须为path.repo 的子目录
>
> //限制备份和恢复时的速度
>
>  max_snapshot_bytes_per_sec:==快照数据进入仓库==时,**该参数可以控制过程的限流情况**,默认为每秒20M
>  max_restore_bytes_per_sec:==从仓库恢复数据==时,**该参数控制过程限流情况**，默认值：每秒20M
>  注意：如果挂在的路径为远程目录时，应该合理配置该值，不至于网络流量被占满。
>
>  compress: 数据是否压缩

#### 1.3快照所有打开的索引

~~~
#发送完请求会立即响应，快照会在后台进行
PUT _snapshot/my_backup_1/snapshot_1
# 指定wait_for_completion=true时会一直阻塞直到快照完成。
PUT _snapshot/my_backup_1/snapshot_1?wait_for_completion=true
~~~

#### 1.4快照指定索引

~~~
PUT _snapshot/my_backup_1/snapshot_3
{
  "indices": "my_index_1,my_index_2",
  "ignore_unavailable": true,
 "include_global_state": true
}
~~~

> indices:指定索引备份
>  ignore_unavailable: 如果indices指定的某些索引不存在时，是否忽略，默认为true 忽略不存在的索引。
>  include_global_state:是否阻止集群全局状态保存为快照的一部分。

#### 1.5获取快照的信息

~~~
#获取单个快照的信息
GET _snapshot/my_backup/snapshot_1
#获取仓库下所有快照的信息
GET _snapshot/my_backup/_all
~~~

#### 1.6监控快照进度

~~~
GET _snapshot/my_backup/snapshot_1
GET _snapshot/my_backup/snapshot_1/_status      //供更加详细的监控信息
~~~

~~~
//返回结果
{
   "snapshots": [
      {
         "snapshot": "snapshot_1",
         "indices": [
            ".marvel_2014_28_10",
            "index1",
            "index2"
         ],
         "state": "SUCCESS",
         "start_time": "2014-09-02T13:01:43.115Z",
         "start_time_in_millis": 1409662903115,
         "end_time": "2014-09-02T13:01:43.439Z",
         "end_time_in_millis": 1409662903439,
         "duration_in_millis": 324,
         "failures": [],
         "shards": {
            "total": 10,
            "failed": 0,
            "successful": 10
         }
      }
   ]
}
~~~

### 2.数据恢复

#### 2.1从快照中恢复
~~~
#异步调用
POST _snapshot/my_backup/snapshot_1/_restore
#同步阻塞
POST _snapshot/my_backup/snapshot_1/_restore?wait_for_completion=true
~~~

> 将快照中的索引数据全部恢复
> 注意：==如果已经存在相关索引必须先将索引关闭==
> *POST index_name/_close*
> 再将索引打开
> *POST index_name/open*

#### 2.2恢复指定索引并重命名索引

~~~
POST _snapshot/my_backup/snapshot_2/_restore
{
  "indices": "my_index_1,my_index_2",
  "rename_pattern": "my_index_(.+)",
  "rename_replacement": "restored_my_index_$1"
} 
~~~

> 参数 `indices` 设置只恢复指定索引，参数 `rename_pattern` 和 `rename_replacement` 用来正则匹配要恢复的索引，并且重命名。

#### 2.3取消恢复过程（不管是已经恢复完，还是正在恢复），直接删除索引

~~~
DELETE _snapshot/my_backup/snapshot_2
~~~

### 3.索引重命名（数据迁移）

#### 3.1直接复制索引到新的索引名称

~~~sql
POST localhost:9200/_reindex
{
  "source": {
    "index": "indexName"
  },
  "dest": {
    "index": "newIndexName"
  }
}
~~~

相当于将索引indexName里的内容复制到索引newIndexName中。==在复制前先构建好索引，设置好mapping。==localhost:9200可不加或按照当前设置加。

#### 3.2查询复制索引到新的索引名称

~~~sql
POST localhost:9200/_reindex
{
  "source": {
    "index": "indexName",
    "type": "typeName",
    "query": {
      "term": {
        "name": "shao"
      }
    }
  },
  "dest": {
    "index": "newIndexName"
  }
}
~~~

