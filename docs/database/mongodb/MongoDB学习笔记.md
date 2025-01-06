MongoDB：是一种非关系型数据库

 基于分布式文件存储 ； 为WEB应用提供可扩展的高性能数据存储解决方案 。

## MongoDB有什么特点?

它的特点是高性能、易部署、易使用，存储数据非常方便。主要功能特性有：

*面向集合存储，易存储对象类型的数据。

*模式自由。

*支持动态查询。

*支持完全索引，包含内部对象。

*支持查询。

*支持复制和故障恢复。

*使用高效的二进制数据存储，包括大型对象（如视频等）。

*自动处理碎片，以支持云计算层次的扩展性

*支持RUBY，PYTHON，JAVA，C++，PHP，C#等多种语言。

*文件存储格式为BSON（一种JSON的扩展）。

*可通过网络访问。

.skip ： skip() 方法默认参数为 0 表示不跳过任何行 

cond ：模糊查询

```
MongoDB常用操作

一、查询 
find方法 
db.collection_name.find(); 
查询所有的结果： 
select * from users; 
db.users.find();

指定返回那些列（键）： 
select name, skills from users;

db.users.find({}, {‘name’ : 1, ‘skills’ : 1}); 
补充说明： 第一个{} 放where条件 第二个{} 指定那些列显示和不显示 （0表示不显示 1表示显示)

where条件：

1.简单的等于: 
select name, age, skills from users where name = ‘hurry’; 
db.users.find({‘name’ : ‘hurry’},{‘name’ : 1, ‘age’ : 1, ‘skills’ : 1});

2.使用and 
select name, age, skills from users where name = ‘hurry’ and age = 18; 
db.users.find({‘name’ : ‘hurry’, ‘age’ : 18},{‘name’ : 1, ‘age’ : 1, ‘skills’ : 1});

3.使用or 
select name, age, skills from users where name = ‘hurry’ or age = 18; 
db.users.find({ ‘$or’ : [{‘name’ : ‘hurry’}, {‘age’ : 18}] },{‘name’ : 1, ‘age’ : 1, ‘skills’ : 1});

4.<, <=, >, >= (lt,lt,lte, gt,gt,gte ) 
select * from users where age >= 20 and age <= 30; 
db.users.find({‘age’ : {‘gte′:20,′gte′:20,′lte’ : 30}});

5.使用in, not in (in,in,nin) 
select * from users where age in (10, 22, 26); 
db.users.find({‘age’ : {‘$in’ : [10, 22, 26]}});

6.匹配null 
select * from users where age is null; 
db.users.find({‘age’ : null);

7.like (mongoDB 支持正则表达式) 
select * from users where name like “%hurry%”; 
db.users.find({name:/hurry/}); 
select * from users where name like “hurry%”; 
db.users.find({name:/^hurry/});

8.使用distinct 
select distinct (name) from users; 
db.users.distinct(‘name’);

9.使用count 
select count(*) from users; 
dunt();

10.数组查询 （mongoDB自己特有的） 
如果skills是 [‘java’,’python’] 
db.users.find({‘skills’ : ‘java’}); 该语句可以匹配成功 
alldb.users.find(‘skills′:‘$all′:[‘java′,′python′])skills中必须同时包含java和pythonalldb.users.find(‘skills′:‘$all′:[‘java′,′python′])skills中必须同时包含java和pythonsize 
db.users.find({‘skills’ : {‘size' : 2}}) 遗憾的是size' : 2}}) 遗憾的是size不能与lt等组合使用lt等组合使用slice 
db.users.find({‘skills’ : {‘$slice : [1,1]}}) 
两个参数分别是偏移量和返回的数量
```



 要在 MongoDB 中对查询到的文档进行排序，您可以使用 sort() 方法，该方法的语法格式如下： 

```
db.collection_name.find().sort({key:1})
```

 其中 key 用来定义要根据那个字段进行排序，后面的值 1 则表示以升序进行排序，若要以降序进行排序则需要将其设置为 -1。 



 "$ne" ： 不等于查询

