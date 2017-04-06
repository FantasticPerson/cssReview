#### 方法之移除空格
```
<div class="space">
    <a href="##">
    惆怅</a><a href="##">
    淡定</a><a href="##">
    热血</a>
</div>

或者

<div class="space">
    <a href="##">惆怅</a
    ><a href="##">淡定</a
    ><a href="##">热血</a>
</div>

或者

<div class="space">
    <a href="##">惆怅</a><!--
    --><a href="##">淡定</a><!--
    --><a href="##">热血</a>
</div>
```

#### 方法之使用margin负值
```
.space a {
    display: inline-block;
    margin-right: -3px;
}
```

#### 让闭合标签吃胶囊
```
如下处理：

<div class="space">
    <a href="##">惆怅
    <a href="##">淡定
    <a href="##">热血</a>
</div>
注意，为了向下兼容IE6/IE7等喝蒙牛长大的浏览器，最后一个列表的标签的结束（闭合）标签不能丢。

在HTML5中，我们直接：

<div class="space">
    <a href="##">惆怅
    <a href="##">淡定
    <a href="##">热血
</div>
好吧，虽然感觉上有点怪怪的，但是，这是OK的。
```

#### 使用font-size:0
```
.space {
    font-size: 0;
}
.space a {
    font-size: 12px;
}
这个方法，基本上可以解决大部分浏览器下inline-block元素之间的间距(IE7等浏览器有时候会有1像素的间距)。不过有个浏览器，就是Chrome, 其默认有最小字体大小限制，因为，考虑到兼容性，我们还需要添加：
类似下面的代码：

.space {
    font-size: 0;
    -webkit-text-size-adjust:none;
}
```

#### 使用letter-spacing
```
.space {
    letter-spacing: -3px;
}
.space a {
    letter-spacing: 0;
}
```

#### 使用word-spacing
```
.space {
    word-spacing: -6px;
}
.space a {
    word-spacing: 0;
}
```

####　八、其他成品方法
```
 下面展示的是YUI 3 CSS Grids 使用letter-spacing和word-spacing去除格栅单元见间隔方法（注意，其针对的是block水平的元素，因此对IE8-浏览器做了hack处理）：

 .yui3-g {
     letter-spacing: -0.31em; /* webkit */
     *letter-spacing: normal; /* IE < 8 重置 */
     word-spacing: -0.43em; /* IE < 8 && gecko */
 }

 .yui3-u {
     display: inline-block;
     zoom: 1; *display: inline; /* IE < 8: 伪造 inline-block */
     letter-spacing: normal;
     word-spacing: normal;
     vertical-align: top;
 }
 以下是一个名叫RayM的人提供的方法：

 li {
     display:inline-block;
     background: orange;
     padding:10px;
     word-spacing:0;
     }
 ul {
     width:100%;
     display:table;  /* 调教webkit*/
     word-spacing:-1em;
 }

 .nav li { *display:inline;}
 也就是上面一系列CSS方法的组组合合。
 ```

https://css-tricks.com/fighting-the-space-between-inline-block-elements/