#### 一、CSS3 column多栏布局
CSS3 column多栏布局是支持比较早的CSS3布局方式，目前IE10+以及其他所有现代浏览器都支持，IE浏览器不需要私有前缀，FireFox和Chrome虽然现在也不需要，但是，考虑到移动端以及可能一些用户浏览器升级不及时的现状，因此，-webkit-以及-moz-前缀目前还不能省略。
```
一般来讲，常用的属性又下面几个：

column-width: 每栏的宽度；
column-count: 最理想的分栏数目，注意这里的措辞，是“理想的”，这个词很微妙的，大家可以多多体会下；
column-gap: 栏目之间的水平间隙；
column-rule: 分割线，形式规则什么的等同于border，column-rule实际上是一个缩写，还有column-rule-width，column-rule-style，column-rule-color之类，就跟border属性一个套路；
column-fill: 效果不明，不算常用。默认值是balance，表示对每栏进行协调。还可以使用值auto，表示每一栏按顺序填充。我是没搞清楚有什么区别。
其中，还有个缩写属性，名为columns，实际上是column-width和column-count的缩写：

columns: 120px;  /* column-width: 120px; column-count: auto */
columns: auto 120px; /* column-width: 120px; column-count: auto */
columns: 2;   /* column-width: auto; column-count: 2 */
columns: 2 auto;  /* column-width: auto; column-count: 2 */
columns: auto;  /* column-width: auto; column-count: auto */
columns: auto auto; /* column-width: auto; column-count: auto */
```