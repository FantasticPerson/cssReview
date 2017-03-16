## 了解CSS属性font-kerning,font-smoothing,font-variant
#### 一、字距调整属性font-kerning
font-kerning应该算是一个CSS3属性，主要作用是调整字形间距，且基本上是英文字符形状的间距，因为英文字符形状都是不规则的，有宽有窄，有的圆乎乎，有的棱角分明，就会导致排列在一起的时候疏密不一致，而font-kerning可以有效利用字符形状间的间隙，使字形之间的空间更加相似，如下图所示（图来自MDN文档）：
```
font-kerning: auto | normal | none
auto
    默认值。浏览器自己决定是否要字距调整。例如字号，也就是font-size属性值比较小的时候，如果进行字距调整就会显得很奇怪，因此，浏览器会禁止。
normal
    应用字距调整。
none
    不根据字体文件中的字距信息进行字距调整。
    但是，font-kerning并不是什么时候都有作用的。

    一般中文是无效的，中文汉字本身就是方方正正，一般没有必要用到字距调整，除非是行书或者草书或者一些手写体字体。
    必须是具有字距调整信息的OpenType字体①才有用，如果字体文件没有字距调整信息或者不是OpenType字体，都是没效果的。
    IE浏览器，包括edge版本都是没效果的，iOS目前需要私有前缀。
```
#### 二、文字平滑属性font-smoothing
```
实际上，Chrome等webkit浏览器使用的是-webkit-font-smoothing，Firefox浏览器下是-moz-osx-font-smoothing，

相关语法和含义如下：
-webkit-font-smoothing

none
关闭抗锯齿，字体边缘犀利。
antialiased
字体像素级平滑，在深色背景上会让文字看起来更细了。
subpixel-antialiased
字体亚像素级平滑，主要为了在非视网膜设备下更好的显示。
-moz-osx-font-smoothing

auto
览器只能选择字体渲染表现。
grayscale
webkit下的"antialiased"，可以让深色背景下的文字看起来更细。
```
```
body { -webkit-font-smoothing: antialiased; }
@media
(-webkit-min-device-pixel-ratio: 1.5),
(min-resolution: 2dppx){
    /* Retina下仍使用默认字体渲染 */
    body { -webkit-font-smoothing: subpixel-antialiased; }
}
```
#### 三、小体型大写字母font-variant
两个属性值，要么normal要么small-caps，font-variant:small-caps