#### CSS代码如下
```
dot {
    display: inline-block;
    height: 1em; line-height: 1;
    text-align: left;
    vertical-align: -.25em;
    overflow: hidden;
}
dot::before {
    display: block;
    content: '...\A..\A.';
    white-space: pre-wrap;   /* 也可以是white-space: pre */
    animation: dot 3s infinite step-start both;
}
@keyframes dot {
    33% { transform: translateY(-2em); }
    66% { transform: translateY(-1em); }
```
#### html代码
```
订单提交中<dot>...</dot>
```