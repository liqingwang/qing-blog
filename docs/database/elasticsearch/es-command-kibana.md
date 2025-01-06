# ElasticSearch操作命令（kibana）

## 模糊查询
```
curl -XGET -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/index01/_search' -d '
{
  "query": {
    "bool": {
      "must": [
        {
          "wildcard": {
            "name": {
              "value": "*张三*"
            }
          }
        }
      ]
    }
  }
}'
```


## 清空数据
```
POST index01/_delete_by_query
{
    "query": {
    "match_all": {}
  }
}
```

## 创建索引
```
PUT index01
{
  "settings":{
    "number_of_shards":"3",
	"number_of_replicas" : "0",
    "index.refresh_interval":"1ms"
  }
}
```

## 设置索引
```
PUT index01/_settings
{
  "index":{
    "number_of_replicas":1,
  	"refresh_interval": "1s",
	"max_result_window":"100000"
  }
}
```

## 设置索引别名
```
POST /_aliases
{
  "actions": [
    {
      "add": {
        "index": "index01",
        "alias": "index01_alias"
      }
    }
  ]
}
```

## 设置索引mapping
```
PUT index01/_mapping/_doc
{
  "properties": {
    "id": {
      "type": "keyword"
    }
  }
}
```

## 向索引写入主键为指定值的数据
```
POST index01/_doc/ug2JEocBlP1-UcDN9f
{
  "id": "ug2JEocBlP1-UcDN9f",
  "code": "11010",
  "fromtimestamp": "2023-03-23 02:03:14_1373783"
}
```

## 查看索引数据
```
GET index01/_search
```


## 条件查询数据
```
GET index01/_search
{
  "query": {
    "match": {
      "id": "79d6722b-9f1b-4108-b380"
    }
  }
}
```

## 按条件查看索引数据并返回指定字段
```
GET index01/_search
{
  "_source": [
    "name"
  ],
  "query": {
    "match": {
      "id":"f44e8ec4-6245"
    }
  }
}
```
## 按时间范围查询
``` 
GET index01/_search
{
  "query": {
    "range": {
      "creareDate": {
        "gte": "2023-04-26 00:59:55",
        "lte": "2023-04-26 20:59:55"
      }
    }
  }
}
```

## 删除索引（需谨慎）
```
DELETE index01
```

## 删除数据
```
DELETE index01/_doc/4d53b8fb-1bf5
```