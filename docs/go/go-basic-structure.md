# Go基本结构

## 文件名、标识符
- go源文件以“.go”结尾，文件名由**小写字母**组成，多个单词的文件名由“_”拼接，文件名不包含空格及其他字符
- 代码行数没有限制，源文件大小没有限制
- 标识符区分大小写，合法的标识符必须以字符（可以使用任何 UTF-8 编码的字符或 _）开头，然后紧跟0个或多个字符或Unicode 数字。
  - 有效列举：X56、group1、_x23、i、өԑ12。
  - 无效列举：1ab（以数字开头）、case（Go 语言的关键字）、a+b（运算符是不允许的）
- 特殊的标识符“_”称为空白标识符
- 每行的结尾不需要“;”结尾，如果多个语句写在同一行，需要人为加上“;”区分

## 关键字和保留字
|          |             |         |           |         |
|----------|-------------|---------|-----------|---------|
| break    | default     | func    | interface | select  |
| case	   | defer	     | go	   | map	   | struct  |
| chan	   | else        | goto    | package   | switch  |
| const	| fallthrough | if	   | range     | type    |
| continue | 	for      | import  | return    | var     |

- 除了以上的关键字Go 语言还有 36 个预定义标识符，其中包含了基本类型的名称和一些基本的内置函数

## 包
> 包是结构化代码的一种方式，每个Go文件都属于且仅属于一个包，一个包中可以由许多“.go”的源文件组成。
- 源文件中非注释的首行指明属于哪个包，"package main"表示一个可独立执行的程序，每个Go应用程序都包含一个名为“man”的包。
- 包名小写
- 包的依赖关系决定了构建顺序，同一个包的源文件需要一起被编译，一个包是一个编译单元。通常每个目录都只包含一个包
- Go中包模型采用了**显式依赖关系**的机制来达到快速编译的目的，编译器从go文件中提取传递依赖类型的信息
  - 列如“a.go”依赖“b.go”，而“b.go”依赖"c.go",编译顺序：cba,为编译“a.go",编译器读取的是"b.go"
  - 这种机制使得编译大型项目可显著的提升速度
- 导入包等同于包含了这个包的所有代码对象
- 包通过可见性规则来决定是否将自身的代码对象暴漏给外部使用
  - 当标识符（包括常量、变量、类型、函数名、结构字段等等）以一个大写字母（任何Unicode 编码的字符）开头，如：Group，那么这种标识符的对象可被外部包调用，这称为**导出**（像Java的public）
  标识符以小写字母开头，则对包外不可见，但是在包内部是可用（像private）。
  - 导出的变量或函数，便可以通过包名.变量名来调用。如“fmt.Printf("")”,包名不可以省略。
  - 包也可以作为命名空间使用，帮助避免命名冲突，因此两个包可以有相同的变量名
- 包的导入
``` 
# 分别导入
import "fmt"
import "os"
# 优雅导入
import (
   "fmt"
   "os"
)
# 包名冲突：包名重置
import fm "fmt"
```
- 导入没有用到的包在构建时会引发错误

## 函数
- man函数是每一个可执行程序必须包含的，man函数既没有参数，也没有返回类型。
- 函数体使用“{}”括起来，左大括号“{”必须与方法的声明放在一行。右大括号“}”需要放在紧接着函数体的下一行，如果函数很短，也可以放在同一行
```
func Sum(a, b int) int { return a + b }
# 或者
func Sum(a, b int) int { 
    return a + b 
}
```
- 对应大括号的任何使用规则都是相同的。例如if语句等。
- 因此符合规范的函数一般写成如下的形式：
  - parameter_list 的形式为 (param1 type1, param2 type2, …)
  - return_value_list 的形式为 (ret1 type1, ret2 type2, …)
```
func functionName(parameter_list) (return_value_list) {
   …
}
```
- 只有当某个函数需要被外部包调用的时候才使用大写字母开头，并遵循 Pascal（帕斯卡） 命名法，既驼峰命名法中的大驼峰式命名规则；否则就遵循骆驼命名法，即第一个单词的首字母小写，其余单词的首字母大写。
  - 驼峰命名法（小驼峰命名规则）如：selectStudentInfo();帕斯卡(Pascal)命名法（大驼峰命名规则）如：SelectStudentInfo(); 
- 程序正常退出的代码为 0 即 Program exited with code 0，异常终止返回非 0 值如：1。

## 注释
- 单行注释：// 注释
- 多行注释又称块注释：/* 注释 */
- 在package语句之前的块注释被默认为包的文档说明，一个包可以分散在多个文件中，只需要在其中一个进行注释说明即可。想了解包的情况可用godoc来显示文档说明
- 多段注释应用空行加以区分。 示例：
``` 
// Package superman implements methods for saving the world.
//
// Experience has shown that a small number of procedures can prove
// helpful when attempting to save the world.
package superman
```
- 全局作用域的类型、变量、常量、函数、被导出的对象都应该拥有文档注释，文档注释出现在函数前面，应以函数名作为开头，示例：
``` 
// enterOrbit causes Superman to fly into low Earth orbit, a position
// that presents several possibilities for planet salvation.
func enterOrbit() error {
   ...
}
```
## 类型
- 使用var声明的变量的值会自动初始化为该类型的零值
- 类型可以是基本类型，如：int、float、bool、string；结构化的（复合的），如：struct、array、slice、map、channel；只描述类型的行为的，如：interface
- 结构化的类型没有真正的值，默认值是nil（在 Objective-C 中是 nil，在 Java 中是 null，在 C 和 C++ 中是 NULL 或 0）
- Go语言中不存在类型继承
- 函数也可以作为一个决定的类型，函数也可以作为返回类型，声明在函数名及可选参数列表之后,如：
```
func FunctionName (a typea, b typeb) typeFunc
```
- 一个函数可以有多个返回值，返回类型之间需要使用逗号分割，并使用小括号（）将它们括起来，如：
```
func FunctionName (a typea, b typeb) (t1 type1, t2 type2)
# 返回形式：
return var1,var2
```
这种返回值一般用于判断某个函数是否执行成功（true/false）或与其它返回值一同返回错误消息
- **type关键字用于自定义类型**，例如定义一个结构体，也可以定义一个已经存在的类型别名。如：
```
type IZ int
```
这里并不是真正意义上的别名，因为使用这种方法定义之后的类型可以拥有更多的特性，且在类型转换时必须显式转换。  
声明变量的方式：
```
var a IZ = 5
```
- 若需要定义多个类型，可以用因式分解关键字的方式，如：
```
type (
   IZ int
   FZ float64
   STR string
)
```
上述每个值都必须在经过编译后属于某个类型（编译器能够推断出所有值的类型），因为**Go语言是一种静态类型语言**

## Go程序的一般结构
- 编译器不关心main函数在前还是变量声明在前，但统一的结构能够方便阅读代码
  1. 完成导包以后开始对常量、变量和类型的定义或声明
  2. 存在init函数，则对该函数进行定义（含有init函数的包都会首先执行这个函数）
  3. 如果当前包是main包，则定义main函数
  4. 然后定义其余的函数，首先是类型的方法，接着是按照 main 函数中先后调用的顺序来定义相关函数，如果有很多函数，则可以按照字母顺序来进行排序。
    ```
    package main
    
    import (
       "fmt"
    )
    
    const c = "C" //声明字符串常量
    
    var v int = 5 //声明变量
    
    type T struct{} //定义空结构体
    
    func init() { // initialization of package
    }
    
    func main() {
       var a int
       Func1()
       // ...
       fmt.Println(a)
    }
    
    func (t T) Method1() {
       //...
    }
    
    func Func1() { // exported function Func1
       //...
    }
    ```
- Go 程序的执行（程序启动）顺序如下：
1. 按顺序导入所有被main包引用的其他包，然后在每个包中执行如下流程
2. 如果该包又导入了其它的包，则从第一步开始递归执行，但是每个包只会被导入一次。
3. 然后以相反的顺序在每个包中初始化常量和变量，如果该包含有 init 函数的话，则调用该函数。
4. 在完成这一切之后，main 也执行同样的过程，最后调用 main 函数开始执行程序。

## 类型转换
- Go语言不存在隐式类型转换，所有的转换都必须显示说明，像调用函数一般（类型在这里的作用可以看作是一种函数）
```
valueOfTypeB = typeB(valueOfTypeA)
// 类型 B 的值 = 类型 B (类型 A 的值)
```
示例：
```
a := 5.0
b := int(a)
```
在精度丢失（截断）的情况下，例如取值范围较大的转换为取值范围较小的类型时（例如将int32转换为int16或float32转换为int），当编译器捕捉到这种非法
类型转换时会引发编译时错误，否则会引发运行时错误。
- 相同底层类型的变量之间相互转换
```
var a IZ = 5
c := int(a)
d := IZ(c)
```
## Go 命名规范
- 目标：干净、可读、简洁
- 名称不需要指出自己属于哪个包（因为在调用的时候会使用包名作为限定符）
- 返回某个对象的函数或方法名称一般用名词即可，无需Get之类的字符，若是修改某个对象则使用“SetName”，可以大小写混合的方式，如 MixedCaps 或 mixedCaps
  而不是使用下划线来分割多个名称。