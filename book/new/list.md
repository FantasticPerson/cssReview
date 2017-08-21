告别图片—使用字符实现兼容性的圆角尖角效果beta版
http://www.zhangxinxu.com/wordpress/2009/11/%E5%91%8A%E5%88%AB%E5%9B%BE%E7%89%87%E2%80%94%E4%BD%BF%E7%94%A8%E5%AD%97%E7%AC%A6%E5%AE%9E%E7%8E%B0%E5%85%BC%E5%AE%B9%E6%80%A7%E7%9A%84%E5%9C%86%E8%A7%92%E5%B0%96%E8%A7%92%E6%95%88%E6%9E%9Cbeta/

对html与body的一些研究与理解
http://www.zhangxinxu.com/wordpress/2009/09/%E5%AF%B9html%E4%B8%8Ebody%E7%9A%84%E4%B8%80%E4%BA%9B%E7%A0%94%E7%A9%B6%E4%B8%8E%E7%90%86%E8%A7%A3/

鲜为人知的一个解决兼容性问题的利器——小数
http://www.zhangxinxu.com/wordpress/2009/09/%E9%B2%9C%E4%B8%BA%E4%BA%BA%E7%9F%A5%E7%9A%84%E4%B8%80%E4%B8%AA%E8%A7%A3%E5%86%B3%E5%85%BC%E5%AE%B9%E6%80%A7%E9%97%AE%E9%A2%98%E7%9A%84%E5%88%A9%E5%99%A8%E2%80%94%E2%80%94%E5%B0%8F%E6%95%B0/

搜狐白社会似iphone短信对话框效果的优化
http://www.zhangxinxu.com/wordpress/2009/09/%E6%90%9C%E7%8B%90%E7%99%BD%E7%A4%BE%E4%BC%9Apopup%E5%AF%B9%E8%AF%9D%E6%A1%86%E6%A0%B7%E5%BC%8F%E6%95%88%E6%9E%9C%E5%AE%9E%E7%8E%B0%E7%9A%84%E4%BC%98%E5%8C%96/

复选框单选框与文字对齐问题的研究与解决
http://www.zhangxinxu.com/wordpress/2009/08/%E5%A4%8D%E9%80%89%E6%A1%86%E6%88%96%E5%8D%95%E9%80%89%E6%A1%86%E4%B8%8E%E6%96%87%E5%AD%97%E5%AF%B9%E9%BD%90%E7%9A%84%E9%97%AE%E9%A2%98%E7%9A%84%E6%B7%B1%E5%85%A5%E7%A0%94%E7%A9%B6%E4%B8%8E%E4%B8%80/

css margin的相关属性，问题及应用
http://www.zhangxinxu.com/wordpress/2009/08/css-margin%E7%9A%84%E7%9B%B8%E5%85%B3%E5%B1%9E%E6%80%A7%EF%BC%8C%E9%97%AE%E9%A2%98%E5%8F%8A%E5%BA%94%E7%94%A8/

设置百分比高度：
其一，父标签有高度可寻，就是向上遍历父标签要找到一个定值高度（body，html另外讨论），如果中途有个height为auto或是没有设置height属性，则高度百分比不起作用；其二，标签本身的属性，如果inline属性的标签，如果没有浮动，zoom，或是绝对定位之类属性是不支持百分比高度的，block或inline-block属性可以说是高度百分比起作用的前提条件之一吧。

行高设置  150% 和 1.5的区别
区别在于继承性，150%会先计算出具体的高度值  然后继承，1.5先继承1.5再计算高度

在某些情形下，line-height可以和height互换，因为实现的效果一样。都能撑开一个高度，然而这两个css属性有一个较隐蔽的差异，就是使用height会使标签haslayout，而使用line-height则不会