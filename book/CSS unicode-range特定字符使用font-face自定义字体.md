#### 一、unicode-range是什么？

```
case 1:
.font{
    font-family:'microsoft yahei';
}

case 2:
@font-face{
    font-family:YH;
    src:local("microsoft yahei");
}

.font{
    font-family:YH;
}

case 3:
@font-face {
  font-family: BASE;
  src: local('PingFang SC'),
       local("Microsoft Yahei");
}
于是乎，我们的字体就更加智能了，要使用直接：

.font {
    font-family: BASE;
}
```

```
于是提出了这么一个需求，希望引号全部都是宋体，而其他字体依然是苹方或者微软雅黑。

微软雅黑引号问题

如果这种需求，我们可以有下面几种做法：

晓之以理动之以情否决这个需求，但是，你也少了一个在设计师大显身手的机会；
引号外面套用个span标签之类，然后设置宋体。但是，如果我们的内容是动态的，啊哦，估计就麻烦了，就需要内容输出的时候匹配替换了。
使用字蛛这样的中文字体生成工具，生成一个仅具有上引号和下引号的字体，假设font-family命名为quote，则如下CSS：
.font {
    font-family: quote, BASE;
}
但是宋体系统都有，这另外生成外加额外的请求都是成本啊。

使用本文的unicode-range，也就是我们使用unicode-range指定就引号使用宋体。如下CSS代码：
@font-face {
  font-family: BASE;
  src: local('PingFang SC'),
       local("Microsoft Yahei");
}
@font-face {
  font-family: quote;
  src: local('SimSun');
  unicode-range: U+201c, U+201d;
}
.font {
    font-family: quote, BASE;
}
```