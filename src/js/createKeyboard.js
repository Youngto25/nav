export class createKeyboard {
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

  createButton() {
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