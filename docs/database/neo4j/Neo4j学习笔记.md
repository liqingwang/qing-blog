neo4j.bat console  启动服务



# Neo4j - 为什么需要图数据库

 		我们对数据的需求已经不再局限于对数据本身的获取了，我们还需要获取数据与数据间的关系（也就是连接数据）。 图数据库主要用于存储更多的**连接数据**  。

​		 图形数据库是以图形结构的形式存储数据的数据库。它根据节点，关系和属性存储我们应用程序的数据。就像RDBMS以Table的“rows，columns”的形式存储数据，GDBMS以“图”的形式存储数据。 

## RDBMS Vs图数据库

|      |  RDBMS   | 图形数据库 |
| :--: | :------: | :--------: |
|  1   |    表    |    图表    |
|  2   |    行    |    节点    |
|  3   | 列和数据 | 属性及其值 |
|  4   |   限制   |    关系    |
|  5   |   加入   |    遍历    |

## 图形

图是一组节点和连接这些节点的关系。节点和关系包含表示数据的属性。属性是用于表示数据的键值对。

**注 -**我们将在下一节探讨“什么是节点，什么是关系和什么是属性”。

##  Cypher语言 

**1.创建节点**

```
CREATE (ee:Person {name: 'Emil', from: 'Sweden', kloutScore: 99})
```

- CREATE：子句创建数据

- （）：括号表示一个节点

- ee：新节点的变量“ ee”和标签“ Person”

- {}：将属性添加到节点 

  所以整句话的意思就是创建一个新的变量ee其节点为Person，这个person有三个属性，一个是name，一个是from，还有一个是klout，他们分别对应的属性值为：Emil，Sweden，99。

**2.查找节点**

```
MATCH (ee:Person) WHERE ee.name = 'Emil' RETURN ee;
```

- `MATCH`（匹配）指定节点和关系的模式。
- `(ee:Person)`是带有标签的单节点模式。它将匹配项分配给变量。 `Person` `ee`
- `WHERE`过滤查询。
- `ee.name = 'Emil'`将 name 属性与 value 进行比较`Emil`。
- `RETURN`返回特定结果。

**3.创建多个节点及其关系**

```
MATCH (ee:Person) WHERE ee.name = 'Emil'
CREATE (js:Person { name: 'Johan', from: 'Sweden', learn: 'surfing' }),
(ir:Person { name: 'Ian', from: 'England', title: 'author' }),
(rvb:Person { name: 'Rik', from: 'Belgium', pet: 'Orval' }),
(ally:Person { name: 'Allison', from: 'California', hobby: 'surfing' }),
(ee)-[:KNOWS {since: 2001}]->(js),(ee)-[:KNOWS {rating: 5}]->(ir),
(js)-[:KNOWS]->(ir),(js)-[:KNOWS]->(rvb),
(ir)-[:KNOWS]->(js),(ir)-[:KNOWS]->(ally),
(rvb)-[:KNOWS]->(ally)
```

 联系KNOWS，第六行的属性since为2001，也就是说ee和js从2001年就认识了，这是他们之间的关系。 以下类似。

（1）、如果我们想找出一个人的好朋友，那应该怎么操作呢？
很容易想到，认识的人就是好朋友嘛，对吧。所以我们用MATCH方法，查找我们想找的ee也就是名字为Emil的人他KOWNS的人，把这些人的集合叫做friends，最后返回ee和他的朋友们。 

```
MATCH (ee:Person)-[:KNOWS]-(friends)
WHERE ee.name = 'Emil' RETURN ee, friends
```

- `MATCH`描述将根据模式检索哪些节点。
- `(ee)`是将基于`WHERE`子句返回的节点引用。
- `-[:KNOWS]-`匹配来自 的`KNOWS`关系（在任一方向）`ee`。
- `(friends)`表示作为 Emil 朋友的节点。
- `RETURN`返回此处由 引用的节点以及找到的相关节点。 `(ee)``(friends)`

（2）、其他需求

```
	MATCH (js:Person)-[:KNOWS]-()-[:KNOWS]-(surfer)
	WHERE js.name = "Johan" AND surfer.hobby = "surfing"
	RETURN DISTINCT surfer
```

- ()空括号可忽略这些节点
- DISTINCT 因为将有多个路径与模式匹配
- surfer 将包含一个冲浪的朋友的朋友Allison
  这句话的意思有点绕，意思就是一个js.name = "Johan"的人想问问他的朋友们有没有朋友（暂时叫他surfer）是和他一样的爱好surfer.hobby = surfing的。
  也就是在朋友的朋友里面找兴趣相同的朋友。真是个找朋友的好办法呢

(3)、 通过在前面添加前缀EXPLAIN或PROFILE，就可以了解查询的工作方式： 





















## Neo4j语法操作

1、删除数据库中以往的图

```
MATCH (n) DETACH DELETE n
```

 MATCH是匹配操作，而小括号()代表一个节点[node](https://so.csdn.net/so/search?q=node&spm=1001.2101.3001.7020)（可理解为括号类似一个圆形），括号里面的n为标识符。 

 2、我们创建一个课程节点： 

```
CREATE (n:Class {name:'大学英语Ⅱ'}) RETURN n
```

 CREATE是创建操作，Class是标签，代表节点的类型。花括号{}代表节点的属性，属性类似Python的字典。这条语句的含义就是创建一个标签为Class的节点，该节点具有一个name属性，属性值是大学英语Ⅱ。 

 3、我们继续来创建更多的课程节点，并分别命名： 

```
CREATE (n1:Class {name:'大学英语Ⅱ'}) 
CREATE (n2:Class {name:'大学英语Ⅲ'}) 
CREATE (n3:Class {name:'大学英语Ⅳ'}) 
RETURN n1,n2,n3
```

 4、接下来创建专业节点 

```
CREATE (m1:profession {name:'计算机专业'})
CREATE (m2:profession {name:'软件工程'})
CREATE (m3:profession {name:'大数据'})
CREATE (m4:profession {name:'信管'})
RETURN m1,m2,m3,m4
```

 5、接下来创建关系 

```
CREATE (n1:class {name: "大英Ⅱ"}) 
CREATE (n2:class {name: "大英Ⅲ"}) 
CREATE (n1)-[r:BASIC]->(n2)
RETURN n1, n2
```

 6、关系也可以增加属性 

```
CREATE (n1:class {name: "大英Ⅱ"}) 
CREATE (n2:class {name: "大英Ⅲ"}) 
CREATE (n1)-[r:BASIC {since:2021}]->(n2)
RETURN n1, n2
```

 7、接下来增加更多的关系 

```
CREATE (n1:class {name: "大英Ⅱ"}) 
CREATE (n2:class {name: "大英Ⅲ"}) 
CREATE (n3:Class {name:'大英Ⅳ'}) 
CREATE (n1)-[r1:BASIC]->(n2)
CREATE (n2)-[r2:BASIC]->(n3)
RETURN n1, n2,n3
```

 也可以在创建节点的时候建立关系，如例子：

CREATE (a:Person {name:'Todd'})-[r:FRIENDS]->(b:Person {name:'Carlos'}) 

 8、然后，我们需要建立不同类型节点之间的关系-课程和专业的关系 

```
CREATE (n1:class {name: "大英Ⅱ"}) 
CREATE (n2:class {name: "大英Ⅲ"}) 
CREATE (n3:Class {name:'大英Ⅳ'}) 
CREATE (m1:profession {name:'计算机专业'})
CREATE (m2:profession {name:'软件工程'})
CREATE (m3:profession {name:'大数据'})
CREATE (m4:profession {name:'信管'})
CREATE (n1)-[r1:BASIC]->(n2)
CREATE (n2)-[r2:BASIC]->(n3)
CREATE (m1)-[r3:REQUIRE]->(n1)
CREATE (m2)-[r4:REQUIRE]->(n1)
CREATE (m3)-[r5:REQUIRE]->(n1)
CREATE (m4)-[r6:REQUIRE]->(n1)
RETURN n1, n2,n3,m1,m2,m3,m4
```

