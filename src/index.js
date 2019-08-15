import './style.css'
import './js/svg'
import { Search } from './js/search'
import { createKeyboard } from './js/createKeyboard'

const $ = s => document.querySelector(s)
const $$ = s=> document.querySelectorAll(s)

new Search($('#wrapper'))

if(module.hot){
  module.hot.accept()
}
//1.初始化数据
let hashA = init()
let keys = hashA['keys']
let hash = hashA['hashs']

//2.生成键盘
new createKeyboard($('#zhangsan'),keys, hash)

//3.监听用户
document.addEventListener('keypress',x) 

$('.search-wrapper input').addEventListener('focus',(e)=>{
    document.removeEventListener('keypress',x)
    $('.search-wrapper').classList.add('active')
})

$('.search-wrapper input').addEventListener('focusout',()=>{
    document.addEventListener('keypress',x) 
    $('.search-wrapper').classList.remove('active')
})



function init() {
    let keys = [
        ['q', 'w','e','r','t','y', 'u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l'],
        ['z','x','c','v','b','n','m']
    ]
    let hash = {
        'q': 'qq.com',
        't': 'ted.com',
        'y': 'youtube.com',
        'g': 'google.com',
        'w': 'weibo.com',
        'z': 'zhihu.com',
        'm': 'microsoft.com'
    }
    var hashInLocalStorage = getFromLocalStorage('uuu')
    if (hashInLocalStorage) hash = hashInLocalStorage
    return {
        'keys': keys,
        'hashs': hash
    }
}

function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || 'null')
}

function x(e) {
    var key = e.key.toLowerCase()
    var website = hash[key]
    window.open('http://' + website, '_blank')
}