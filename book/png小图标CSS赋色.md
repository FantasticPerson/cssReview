#### CSS代码：
```
.icon {
    display: inline-block;
    width: 20px; height: 20px;
    overflow: hidden;
}
.icon-del {
    background: url(delete.png) no-repeat center;
}
.icon > .icon {
    position: relative;
    left: -20px;
    border-right: 20px solid transparent;
    -webkit-filter: drop-shadow(20px 0);
    filter: drop-shadow(20px 0);
}
````
#### HTML代码：
````
<p><strong>原始图标</strong></p>
<i class="icon icon-del"></i>
<p><strong>可以变色的图标</strong></p>
<i class="icon"><i class="icon icon-del"></i></i>
````