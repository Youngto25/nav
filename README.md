## navigator
### 描述
一个集保存网址及搜索于一体的导航页。<br>
技术栈:HTML5 ES6 Webpack scss

### 效果
![效果图](https://github.com/Youngto25/make-a-doraemon/raw/master/src/images/yilan.jpg)
- 搜索框，输入需搜索的字符串，点击搜索按钮或者enter即可搜索（调用的是Bing的搜索接口）
- 中间键盘，对应26个字母。每个字母代表一个网址。在搜索框未被focus的情况下按下相应字母即可跳转到相应网站
- 可自行编辑对应的网址。鼠标悬浮到按钮上会出现edit提醒，点击即可编辑。网址格式采用keyword.com，例如google.com

## 核心代码

### 如何动态生成
#### 声明code
```
let code = `哆啦A梦的样式`
```
#### 声明方法writeCode
利用setTimeout实现setInterval，通过按钮改变interval的值来改变innerHTML的加载速率。
通过substring来逐步加载code。
当结束按钮被点击时，wirte值被改变，跳出定时器，不再进行递归。
```
let interval = 5
let write = true
function writeCode(code){
  let domCode = document.querySelector('#code')
  let styleTag = document.querySelector('#styleTag')
  let n = 0
  setTimeout(function x(){
    if(!write) return
    n += 1
    domCode.innerHTML = code.substring(0,n)
    styleTag.innerHTML = code.substring(0,n)
    domCode.scrollTop = domCode.scrollHeight
    if(n>=code.length) return
    setTimeout(x,interval)
  },interval)
}
```

### 移动端的适配方法
当刚被加载时，调用change()函数，clientWidht大于等于800时，使用样式default，否则使用phone。
监听window的resize事件，一旦被触发，则调用change()函数。
```
change()
window.addEventListener('resize',change)
function change(){
  if(document.documentElement.clientWidth >= 800){
    document.querySelector('link').href = './default.css'
  }else{
    document.querySelector('link').href = './phone.css'
  }
}
```
