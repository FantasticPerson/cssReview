#### CSS变量var()语法和用法和特性
```
CSS中原生的变量定义语法是：--*，变量使用语法是：var(--*)，其中*表示我们的变量名称。关于命名这个东西，各种语言都有些显示，例如CSS选择器不能是数字开头，JS中的变量是不能直接数值的，但是，在CSS变量中，这些限制通通没有，例如：

:root {
  --1: #369;
}
body {
  background-color: var(--1);
}

如果你想变量全局使用，则你可以设置在:root选择器上
```
```
CSS属性名可以走变量吗？

类似下面这样：

body {
    --bc: background-color;
    var(--bc): #369;
}
答案是“不可以”，要是可以支持的话，那CSS的压缩可就要逆天了，估计所有的属性都会变成1~2个字符。
```
```
CSS变量使用完整语法
CSS变量使用的完整语法为：var( [, ]? )，用中文表示就是：var( <自定义属性名> [, <默认值 ]? )，

意思就是，如果我们使用的变量没有定义（注意，仅限于没有定义），则使用后面的值作为元素的属性值。举个例子：

.box {
  --1: #369;
}
body {
  background-color: var(--1, #cd0000);
}
则此时的背景色是#cd0000：
```
```
CSS变量的空格尾随特性

请看下面这个例子：

body {
  --size: 20;
  font-size: var(--size)px;
}
请问，此时<body>的font-size大小是多少？

如果你以为是20px就太天真了，实际上，此处font-size:var(--size)px等同于font-size:20 px，注意，20后面有个空格，所以，这里的font-size使用的是<body>元素默认的大小。因此，就不要妄图取消就使用一个数值来贯穿全场，还是使用稳妥的做法：

body {
  --size: 20px;
  font-size: var(--size);
}
或者使用CSS3 calc()计算：

body {
  --size: 20;
  font-size: calc(var(--size) * 1px);
}
此时，<body>的font-size大小才是20px，
```