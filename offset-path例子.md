##offset-path

####CSS代码：
```
.horse-run {
    /* 之前语法 始于2015年9月，M58版本会移除，大约2017年4月 */
    motion-path: path("M10,80 q100,120 120,20 q140,-50 160,0");

    /* 当前规范上的语法 2016年12月支持 */
    offset-path: path("M10,80 q100,120 120,20 q140,-50 160,0");

    animation: move 3s linear infinite;
}

@keyframes move {
  /* 之前语法 */
  100% { motion-offset: 100%;}
  /* 当前规范语法 */
  100% { offset-distance: 100%;}
}
```
####HTML代码：
```
<img src="http://www.zhangxinxu.com/study/201702/horse.png" width="40" height="43" class="horse-run">
<svg width="280" height="150" viewBox="0 0 280 150">
    <path d="M10,80 q100,120 120,20 q140,-50 160,0" stroke="#cd0000" stroke-width="2" fill="none" />
</svg>
```