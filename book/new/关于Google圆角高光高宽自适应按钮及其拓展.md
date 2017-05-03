url(http://www.zhangxinxu.com/wordpress/2009/10/%E5%85%B3%E4%BA%8Egoogle%E5%9C%86%E8%A7%92%E9%AB%98%E5%85%89%E9%AB%98%E5%AE%BD%E8%87%AA%E9%80%82%E5%BA%94%E6%8C%89%E9%92%AE%E5%8F%8A%E5%85%B6%E6%8B%93%E5%B1%95/);

## 关于Google圆角高光高宽自适应按钮

#### css代码如下
```
.g_a{display:inline-block; border-width:1px 0; border-color:#bbbbbb; border-style:solid; vertical-align:middle;}
.g_b{float:left; background:#e3e3e3; border-width:0 1px; border-color:#bbbbbb; border-style:solid; margin:0 -1px; position:relative;}
.g_c{display:block; line-height:0.6em; background:#f9f9f9; border-bottom:2px solid #eeeeee;}
.g_d{display:block; padding:0.1em 0.6em; margin-top:-0.6em; cursor:pointer;}
```

#### html代码如下
```
<a href="#nogo" class="g_a">
     <span class="g_b">
         <span class="g_c">&nbsp;</span>
         <span class="g_d">圆角按钮</span>
     </span>
</a>
```