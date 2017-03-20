## 代码
#### CSS代码：
```
.box {
    font-size: 16px;
    font-size: calc(100% + 2 * (100vw - 375px) / 225);
}
@media screen and (min-width: 600px) {
    .box {
        font-size: calc(112.5% + 4 * (100vw - 600px) / 400);
    }
}
@media screen and (min-width: 1000px) {
    .box {
        font-size: calc(137.5% + 5 * (100vw - 1000px) / 1000);
    }
}

.box {
    width: 100%;
    max-width: 480px;
    margin: auto;
}
.title {
    text-align: center;
    font-size: 1.2em;
}
.list {
    overflow: hidden;
}
.image {
    float: left;
    width: 5em; height: 3.75em;
    margin-right: 1em;
}
.content {
    overflow: hidden;
}
```
#### HTML代码：
```
<div class="box">
    <h2 class="title">标题</h2>
    <div class="list">
        <img src="mm1.jpg" class="image">
        <div class="content">
            由于Android4.4才开始支持vw单位，所以，基于视区宽度的排版和布局迟迟没有火起来，但是，显然，快了~~
        </div>
    </div>
</div>
```