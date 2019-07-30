import './style.css'
import './js/svg'
import { Search } from './js/search'
import { createKeyboard } from './js/createKeyboard'

const $ = s => document.querySelector(s)
const $$ = s=> document.querySelectorAll(s)

new Search($('.search-wrapper'))

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
    let keys = {
        '0': { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10 },
        '1': { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: 9 },
        '2': { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: 7 },
        'length': 3
    }
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
    var key = e.key
    var website = hash[key]
    window.open('http://' + website, '_blank')
}