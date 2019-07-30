# navigator
## 描述
一个集保存网址及搜索于一体的导航页。<br>
技术栈:HTML5 ES6 Webpack scss

## 效果
![效果图](https://github.com/Youngto25/nav-demo/blob/master/src/images/yilan.jpg)
- 搜索框，输入需搜索的字符串，点击搜索按钮或者enter即可搜索（调用的是Bing的搜索接口）
- 中间键盘，对应26个字母。每个字母代表一个网址。在搜索框未被focus的情况下按下相应字母即可跳转到相应网站
- 可自行编辑对应的网址。鼠标悬浮到按钮上会出现edit提醒，点击即可编辑。网址格式采用keyword.com，例如google.com

## 核心代码
### 实现搜索
#### 声明class Search
```
class Search{
  constructor(el){
    this.$el = el
    this.$ = s=> this.$el.querySelector(s)
    this.$$ = s=> this.$el.querySelectorAll(s)
    this.$input = this.$('input')
    this.$value = ''
    this.getValue()
    this.buttonClick()
    this.listenEnter()
  }
  
  getValue(){
    this.$input.addEventListener('input',(e)=>{
      this.$value = e.target.value
    })
  }
  
  search(){
    window.open(`https://cn.bing.com/search?q=${this.$value}`)
  }
}

new Search('搜索框元素')
```
- 监听input事件，得到输入的value值
- 监听搜索按钮是否被点击(click)，一旦被点击调用search函数
- 监听enter按键是否被点击(keyup,event.keyCode === 13)，一旦被点击调用search函数

### 键盘的生成
声明变量keys，此变量内容为26个英文字母
```
let keys = [
    ['q', 'w','e','r','t','y', 'u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['z','x','c','v','b','n','m']
]
```
声明变量hash，此变量存放有字母对应的网址
```
let hash = {
    'q': 'qq.com',
    't': 'ted.com',
    'y': 'youtube.com',
    'g': 'google.com',
    'w': 'weibo.com',
    'z': 'zhihu.com',
    'm': 'microsoft.com'
}
```
声明class createKeyboard,将keys hash 及需要操作的元素传入的class中
```
class createKeyboard {
  constructor(el, keys, hash) {
    this.$el = el
    this.$$ = s => this.$el.querySelectorAll(s)
    this.$keys = keys
    this.$hash = hash
    this.createRow(this.$keys)
  }
  
  createRow(keys){
    this.$el.innerHTML = keys.map(key => 
      `
        <div class="row">
          ${this.createKbd(key)}
        </div>
      `
    ).join('')
    this.createButton()
  }

  createKbd(key){
    return key.map((button)=>
    `
      <kbd class="A">
        <span class="text">${button}</span>
        ${this.createImg(button)}
        <button id="${button}" class="edit">edit</button>
      </kbd>
    `).join('')
  }

  createImg(button) {
    let address = this.$hash[button]
    if(!address){
      return `
        <img src="https://i.loli.net/2017/11/10/5a05afbc5e183.png"></img>
      `
    }else{
      return `
        <img src="http://${address}/favicon.ico"></img>
      `
    }
  }
  
  createButton() {  //监听每个字母的button是否被点击，若被点击则弹出输入框，取得输入的数组存入hash内，并获得favicon
    let edits = this.$$('.edit')
    for(let i=0; i<edits.length; i++){
      edits[i].addEventListener('click',(event)=>{
        console.log(event)
        let button2 = event.target
        let img2 = button2.previousSibling
        let v = button2.id
        let x = prompt('给我一个网址')
        this.$hash[v] = x
        img2.src = 'http://' + x + '/favicon.ico'
        img2.onerror = function (xxx) {
          xxx.target.src = 'https://i.loli.net/2017/11/10/5a05afbc5e183.png'
        }
        localStorage.setItem('uuu', JSON.stringify(this.$hash))
      })
    }
  }
}

new createKeyboard($('#zhangsan'),keys, hash)
```

### 监听document的keypress
```
document.addEventListener('keypress',x) 
function x(e) {
    var key = e.key.toLowerCase()
    var website = hash[key]
    window.open('http://' + website, '_blank')
}
```

### 在搜索框的input事件及document的keypress事件之间切换
```
$('.search-wrapper input').addEventListener('focus',(e)=>{
    document.removeEventListener('keypress',x)
})

$('.search-wrapper input').addEventListener('focusout',()=>{
    document.addEventListener('keypress',x) 
})
```

### 查看本地的localStorage,若有则替换原有的hash
```
let hashInlocalStorage = JSON.parse(localStorage.getItem('uuu')
```

