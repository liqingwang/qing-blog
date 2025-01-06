# 前言

Groovy中def代表可选类型；

Groovp中for-in语句可以用于循环Map

break终止最内层的循环

@Value  1.@Value(“${xxxx}”)注解从配置文件读取值的用法，也就是从application.[yaml](https://so.csdn.net/so/search?q=yaml&spm=1001.2101.3001.7020)文件中获取值。  2.常量注入 

 2.@Value(“#{}”)是获取bean属性，系统属性，表达式 

# 基本语法

## 关键字解释

 **def** **：**相当于Object，所用定义方法名，定义字段名，定义数组名，定义Bean都可以使用def声明。需要避免和基本类型重合定义，例如：def String user

  **assert ：**断言，判断传入的参数是否合法，根据异常会直接终止程序，还有减少使用这个关键字，会造成大量性能的浪费。

### 范围运算符

```
 def range = 5..10
 println(range)              //输出5..10
 println(range.get(3))        //输出8
```

###  赋值运算符

```
		// 除余
        int a = 5
        int b = 2
        def x = a %= b
        println(x)        //输出1
        if ((a %= b) == 1) {
            println(true)        //输出true
        } else {
            println(false)
        }
```

### 循环（for-in语句）

```
 		// for-in语句
        def range = 5..10;
        for (int r in range) {
            print(r + ",");           //5,6,7,8,9,10,
        }
        
        int[] arr = [0, 1, 2, 3, 4];
        for (int i in arr) {
            println(i);        //0 1 2 3 4 
        }
```

### 可以直接声明键值对

```
        def employee = ["key" : 1,"name": "Jokn", "Age": 30]
        // 不需要声明属性类型，def可以忽略
        for (emp in employee) {
            println(emp);      //key=1  name=Jokn  Age=30
        }
```

### 方法（默认参数）

```
	 // 可以直接在参数里赋值
    static def someMethod(int a, int c = 1) {
        int d = a + c;
        return d;
    }
 
    static void main(String[] args){
        // 调用的时候，分两种方式
        int result = someMethod(2);
        println(result);      //3
        // 可以直接传入新参数，进行计算
        int result2 = someMethod(5, 5);          //10
        println(result2);
    }
```

### 对象的使用

```
class User implements Serializable{
    private String name
    private  String age
    private String sex
    //可以忽略get/set
    String getName() {
        return name
    }

    void setName(String name) {
        this.name = name
    }
    //构造器避免使用def
    User() {
    }
}
```

### get/set的使用

```
        def user = new User()
        // with：可以忽略大量的前缀，例如user.setName()
        user.with {
            name = 'Tom'
            age = 50
            sex = '男'
        }
        println "name=${user.name} age=${user.age} sex=${user.sex}"
        // set/get可以直接调用
        user.sex = "女"
        user.name = "something"
        println "name=${user.name} age=${user.age} sex=${user.sex}"
        // 结果  name=something age=50 sex=女
        -------------------分割线------------------------
        // 第二种直接声明，构造器都不需要
        def user2 = new User(name: "huanfeng", age: 22, sex: "男")
        // 输出的时候，需要双引号，否则会直接报错
        println "${user2.name} ${user2.age} ${user2.sex}"  //huanfeng 22 男

```

### 分行打印快捷方式

可以忽略括号，但是有的方法需要

 “\”这个符号并没有换行，只有相当于tab键的空格

 三个双引号框起后，里面的空格也会直接输出，并不会换行处理 

### 三元运算符的使用

```
 //三元运算的简写只能用来判断非空
    static def check(String name){
        assert name      //name为空时报异常
        def result = name ?: "Unknown" //name为""或null时执行：后面的
        // 可以省略return
        result
    }
    //三元运算还是需要按照以前Java的格式
    static def checkNum(String str) {
        def reulst = str.length() > 3 ? str : "xiaoyu"
        reulst
    }
```

### 集合



## 语言特性

### 可以忽略return，默认public

```
	def check() {
        def result = "Unknown"
        // 可以省略return，分号也可以忽略
        result
    }
```

### 可以忽略括号

```
class{
    static void main(String[] args){
        // 结果都是相同的 Hello World!
        println("Hello World!")
        println "Hello World!"
    }
 
    // 方法体的命名不可以忽略
    def test(){
    }
}
```

### get/set 

```
class User{
    def name;
    int age;
    String sex;
    blooean flg;
    dobule num
    List<String> list
    // 可以忽略Java的get/set方法声明    
    String toString() {
        "${name},${age},${sex},${flg},${num}"
    } 
}
```

### 语言执行前 

```
class{
    // 执行错误，执行前编译器不会检查闭包内的代码
    test(){
        head{}
        body{}
    }
    // 异常 Error:(32, 5) Groovyc: unexpected token: test
    // 正确写法(执行时每行去检查，编译无错后运行代码)
    test(){
        head(){}
        body(){}    //傻逼up主，为了说明问题都tm不规避常规错误
    }
}
```

### equals和==和is()

```
	// 排除掉了空指针异常（NullPointerException）
    def num1
    def num2
    // == 等价于java的equals方法
    if (num1 == (num2 = 2)) {
         println "相等"
    } else {
         println "不相等"
    }
    if (num1.equals(num2)) {
         println "相等"
    } else {
         println "不相等 ${num2}"
    }
    // is()等价于java的==方法
    if (num1.is(num2++)) {
        println "相等"
    } else {
        println "不相等 ${num2}"
    }
```

### 未声明的变量还是不能++

```
		def i
        println i++
        // Exception in thread "main" java.lang.NullPointerException: Cannot invoke method next() on null object
```

### <<的使用

```
		def list =[1,2,3]
        // 和add方法一样
        list << 0
        println list    // [1, 2, 3, 0]     
        --------------分割线------------------------
        // {}里不能使用"," 编译器直接显示报错
        // 这里的语言特性不懂，有问题，语言的bug吗，取不出来值
        def json = {
                    name:"Tom"
                    sex:"猫"
                    }
        // 闭包里可以写进变量，但是不可以拿出来
        json << [age:21]
        println json.toString()
        json.each {
            println it
        }
```

### 安全取值

```
class{
    
    static void main(String[] args){
 
    Person person = new Person()
    // 错误赋值方式（NullPointerException）,这里又有一个语言特性的问题，又是一个坑点
    // person.character.lively = "活泼"
    // person.character.lively << "1"
    Character characters = new Character();
    characters.lively = "123"
    println(characters.lively) //123
 
    person.with {
        person.character =
                characters
    }
    // 学到这里，我已经开始吐槽了，说好的
    if (person != null) {
        if (person.character != null) {
            println "结果：" + person.getCharacter().getLively().toString() //123
        }
    }
    println person.character?.lively  //123
    }
 
   static class Person {
        private String name
        private String year
        private Character character
        private Character getCharacter() {
            character
        }
    }
    static class Character {
        private def lively
        private def getLively() {
            lively
        }
        String toString() {
            "${lively}"
        }
    }
}
```

### try/catch

```
try {
    // ...
} catch (any) {
    // 异常处理
}
 
// 和下面一样
try {
    // ...
} catch (Exception e) {
    // 异常处理
}
```

### 可选形参

```
class Example {
    static void main(String[] args) {
        test2(1, 3)
        // 可选参数可以不用传值
        test3(1)
        test3(2, "12", "213")
        // 结果
        5
        1,[]
        2,[12, 213]
 
    }
 
    def static test2(x, num = 10) {
        println(x = 2 + num)
    }
 
    def static test3(x, String[] src) {
        println("$x,$src")
    }
 
    def static test4(x, String... arg) {
        println("$x,$arg")
    }
 
}
```

### 赋值使用

```
def param1, param2, param3

    def caseTest(param1, param2, param3) {
        println("param1:$param1,param2:$param2,param3:$param3")
    }

    @Test
    public void changeOutOrderTest() {
        def Groo2Test stringAssignmentTest = new Groo2Test();
        // 没有任何效果，赋值无视
        stringAssignmentTest.caseTest(param2 = "12", param1 = 2, param3 = 10) //param1:12,param2:2,param3:10
        // 不行，运行报错
         //stringAssignmentTest.caseTest(param2 : "12", param1 : 2, param3 : 10)
        // 赋值方式还是需要在外层申明才有效
        param3 = "12"
        param1 = 10
        param2 = 5
        stringAssignmentTest.caseTest(param1, param1, param2) //param1:10,param2:10,param3:5
    }

    @Test
    public void stringPattern() {
        def paramPattern = /.*foo\.* /          //输出.*foo\.* 
        println(paramPattern)
    }

    @Test
    public void handyAssignmentTest() {
        // 返回一个数组
        def (firstParam, lastParam) = StringAssignmentTest.splitStringMethod("name Tom")
        // 可以直接分割字符串传给两个参数，不需要繁重的赋值过程
        println("$firstParam,$lastParam")
        // 结果 ： name,Tom

        // 可以直接替换两个值
        def age = 11, age2 = 12
        (age, age2) = [age2, age]
        println("age:$age,age2:$age2")
        // 结果 ： age:12,age2:11

        // 当赋值数组多出数值，会自动忽略掉多余对象值
        def (String strA, String strB) = ["AA", "BB", "CC", "DD"]
        println(strA + "," + strB)
        // 结果：AA,BB

        // 相反需要赋值对象的值少了，还是会报空指针异常
        def (String strC, String strD) = ["CC"]
        // 神奇的是，如果只取出赋值对象有值的话，并没有发生异常
        println(strC)
        // 结果 ： CC
        println(strC, strD)
        // 结果 ：MissingMethodException
    }

    def static splitStringMethod(param) {
        param.split(" ")
    }
```

# 文件处理

### 读取文件

```
class test{
    
    static void main(String[] args){
         def file = new File("C:\\Users\\12134\\Desktop\\个人进阶之旅\\Groovy\\user.txt");
         file .eachLine {
                // 声明文件内的文本属性名叫lines，然后用$符号可以使用，输出里面的内容
            lines -> println "$lines"
        }
 
        // 不能在{}格式里写代码，需要声明变量后，再用来使用
        def lineFiles = file.readLines();
        lineFiles.each {
            println it.toLowerCase()
        }
 
        // 读取每一行，分割文本，CSV文件分割很好用
        def eachFile = file.splitEachLine("：") {
            println "类型=${it[0]} 内容=${it[1]}"
        }
 
        // 处理二进制文件，以字节访问文件，和这个方法一样eachLine
        file.eachByte {
            print it;
        }
        
        new File("C:\\Users\\12134\\Desktop\\个人进阶之旅\\Groovy").eachFile {
            // 获取目录下的文件名
            println it.getName()
            // 获取文件里的文本,不能直接读取Excel文件
            // println it.getText('utf-8')
        }
 
        // 遍历路径下的所有文件，忽略不是文件夹
        def file2 = new File("C:\\Users\\12134\\Desktop\\个人进阶之旅")
        file2.eachDir {
            println(it.getName())
        }
 
        def dir = new File("C:\\Users\\12134\\Desktop\\个人进阶之旅\\Groovy")
        if (dir.isDirectory()) {
            dir.eachFileMatch(~/.*\.txt/) { File it -> println it.name } //使正则表达式匹配文件名
        }
 
        // 遍历所路径下的子文件目录
        file2.eachDirRecurse {
            directory -> println directory
        }
 
        // 递归地将目录大小计算为其所有文件的总大小。
        long fileSize = file2.directorySize();
        println(fileSize)
 
        /**
         *  FileType有三种类型
         *      FILES：文件,不包括文件夹
         *      DIRECTORIES：文件夹
         *      ANY：包括此目录下的文件夹、文件
         *  eachFileRecurse:读取此目录和任何子目录中的每个后代文件。
         */
        file2.eachFileRecurse(FileType.FILES, {
                // 局部变量
            directory -> println directory
        })
 
        def baseDir = "C:\\Users\\12134\\Desktop\\个人进阶之旅\\Groovy"
        try {
            new File(baseDir, 'AB_12.txt').eachLine {
                    // 错误写法，读取不了文件内容
                    //line ->  println(line.text)
                line -> println(line)
            }
        } catch (any) {
 
        }
        
    }
 
}
```

### 写入文件

```
  // 第一种方式
   def file = new File("C:\\Users\\12134\\Desktop\\个人进阶之旅\\Groovy\\user.txt");
   println file.text
   // writer 直接写入文本，会覆盖文件
   file.withWriter('utf-8') {
       writer -> writer.writeLine 'Hello World'
   }
 
    // 第二种方式
    // 直接调用写入方法
    file.write('abc')
 
    //第三种方式
    // 更加简便的写法
    file << '''Into the ancient pond
    A frog jumps
    Water’s sound!'''
 
    //第四种方式
    // append方法追加文本内容
    file.append("名字：李先生\n" + "年龄：21")
    file.eachLine {
        // 文本转换为大写
        println it.toUpperCase()
    }
```

### 其他处理

```
    // 文件内容各行存放到list
    def list = new File(baseDir, 'AB_12.txt').collect { it }
    list.each {
         println it
    }
 
    new File("C:\\Users\\12134\\Desktop\\个人进阶之旅\\Groovy").traverse { list2 ->
        //如果当前文件是一个目录且名字是mybat，则停止遍历
        if (file2.directory && file2.name == '个人进阶之旅') {
             //否则打印文件名字并继续
             println "mybat" + file2.name
        } else {
             println file2.name
        }
    }
 
 
    String message = 'Hello from Groovy'
 
    // 序列化数据到文件
    file.withDataOutputStream { out ->
        out.writeBoolean(true)
        out.writeUTF(message)
    }
    // 从文件读取数据并反序列化
    file.withDataInputStream { input ->
         assert input.readBoolean() == true
         assert input.readUTF() == message
     }
 
   // User类实现了Serializable接口
   User p = new User()
   p.setName('Bob')
   // 序列化对象到文件
   file.withObjectOutputStream { out ->
        out.writeObject(p)
   }
   // 从文件读取数据进行反序列化
   file.withObjectInputStream { input ->
        def p2 = input.readObject()
        assert p2.name == p.name
        assert p2.age == p.age
   }
```

# 数据库处理



# XML/JSON/Excel处理



# 单元测试