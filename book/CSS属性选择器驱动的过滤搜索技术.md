#### CSS搜索过滤元素的原理
CSS3选择器中，有一个叫做属性选择器的东西，有：\[attr](有该属性), \[attr=xxx](属性值是xxx), \[attr^=xxx](属性值是xxx开头), \[attr$=xxx](属性值xxx擦屁股), \[attr*=xxx](属性值包含xxx)这些用法。
demo中的过滤使用的是任意匹配，也就是\[attr*=xxx]这种用法。于是，我们再结合not选择器就可以把不匹配的元素给隐藏了，例如：
```
.list:not([data-index*="sh"]) { display: none; }
```
就是所有data-index值中不含有sh的列表隐藏。
我们来看下demo的HTML，部分列表省略，关键部分标记大姨妈：
```
<input type="search" class="search" id="city" placeholder="输入省会或直辖市名称" />
<label class="datalist" for="city">
    <div class="list" data-index="重庆市chongqing">重庆市</div>
    <div class="list" data-index="哈尔滨市haerbing">哈尔滨市</div>
    <div class="list" data-index="长春市changchun">长春市</div>
    ...
</label>
```
可见，CSS实现搜索的关键就是data-index这个自定义属性间的匹配。
SO，我们要实现搜索或者过滤，只要动态改变\[attr*=xxx]中xxx这个值就可以了，JS验证？No, No, No! 浏览器都帮你做了，兄弟。
于是，配合下面这点JS，效果即完成：
```
var eleStyle = document.createElement("style");
document.querySelector("head").appendChild(eleStyle);

// 文本框输入
document.querySelector("input").addEventListener("input", function() {
    var val = this.value.trim().toLowerCase();
    if (val !== '') {
        // 改变CSS筛选规则
        eleStyle.innerHTML = '.list:not([data-index*="'+ this.value +'"]) { display: none; }';
    } else {
        eleStyle.innerHTML = '';
    }
});
```

#### 兼容性
因此，本技术目前IE9+支持，IE6-IE8需要您继续加班写JS代码实现。