# ElasticSearch操作命令（curl）

## 删除索引
```
DELETE index01
```
## 用curl查看索引结构：
```
curl -XGET -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/index01'
```
## 用curl查看索引数据：
```
curl -XGET -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/index01/_search' -d '{
"query": {
"match_all": {}
},
"from": 0,
"size": 1
}'
```
## 用curl条件查询索引数据某一字段
```
curl -XGET -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/index01/_search' -d '{
"_source": [
"name"
],
"query": {
"match": {
"id":"ec17d636fce9c5c"}}}'
```
## 按时间搜索
``` 
curl -XGET -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/t_job_log/_search' -d '{
"query": {
"range": {
"create_time": {
"gte": "2023-10-15 00:00:00",
"lte": "2023-10-23 12:00:05"}}}}'
```
## 用url添加一条数据
```
curl -XPOST -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/index01/_doc' -d '{
"id":"12354654645",
"name":"张三",
"sex":"1"
}'
```
## 用curl清空数据
```
curl -XPOST -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/index01/_delete_by_query' -d '{
"query": {
"match_all": {}
}
}'
```
## 用curl创建索引：
- ①
```
curl -XPUT -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/index01' -d '
{
"settings":{
"number_of_shards":"3",
"number_of_replicas" : "1",
"index.refresh_interval":"1s"
}
}'
```
- ②
```
curl -XPUT -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/index01/_settings' -d '
{
"index":{
"number_of_replicas":1,
"refresh_interval": "1s",
"max_result_window":"100000"
}
}'
```
- ③
```
curl -XPOST -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/_aliases' -d '{
"actions": [
{
"add": {
"index": "index01",
"alias": "index01_alias"
}
}
]
}'
```
- ④
```
curl -XPOST -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/index01/_mapping/_doc' -d '
{
"properties" : {
"id" : {
"type" : "keyword"
},
"create_time" : {
"type" : "date",
"format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
}
}
}'
```
## 设置某索引分片副本为0
```
curl -XPUT -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/sh_yp_apply_accept_validator/_settings' -d '
{
"number_of_replicas" : 0
}'
```

## 设置所有分片副本为1
```
curl -XPUT -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/*/_settings' -d '
{
"index" : {
"number_of_replicas" : 1
}
}'
```


## 查询集群状态
```
curl -XGET -u "username:password"  -H "Content-Type: application/json" '127.0.0.1:9200/_cat/indices?v&pretty'
curl http://ip:9200/_cat/health?v
```