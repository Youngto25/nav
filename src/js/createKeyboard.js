export class createKeyboard {
  constructor(el, keys, hash) {
    this.$el = el
    this.$keys = keys
    this.$hash = hash
    this.generateKeyboard(this.$keys, this.$hash)
  }

  generateKeyboard(keys, hash) {
    for (let index = 0; index < keys['length']; index++) {
      let div = this.tag('div', {
        className: 'row'
      })
      this.$el.appendChild(div)

      let row = keys[index]
      for (let index2 = 0; index2 < row['length']; index2++) {
        let span = this.createSpan(row[index2])
        let button = this.createButton(row[index2])
        let img = this.createImg(hash[row[index2]])
        let kbd = this.tag('kbd')
        kbd.className = 'A'
        kbd.appendChild(span)
        kbd.appendChild(img)
        kbd.appendChild(button)
        div.appendChild(kbd)
      }
    }
  }

  tag(tagName, attributes) {
    let element = document.createElement(tagName)
    for (let key in attributes) {
      element[key] = attributes[key]
    }
    return element
  }

  createSpan(textContent) {
    let span = this.tag('span')
    span.textContent = textContent
    span.className = 'text'
    return span
  }

  createButton(id) {
    let button = this.tag('button')
    button.textContent = 'edit'
    button.id = id
    button.onclick = (wangwu)=>{
      let button2 = wangwu['target']
      let img2 = button2.previousSibling
      let v = button2['id']
      let x = prompt('给我一个网址')
      this.$hash[v] = x
      img2.src = 'http://' + x + '/favicon.ico'
      img2.onerror = function (xxx) {
        xxx.target.src = 'https://i.loli.net/2017/11/10/5a05afbc5e183.png'
      }
      localStorage.setItem('uuu', JSON.stringify(this.$hash))
    }
    return button
  }

  createImg(domain) {
    let img = this.tag('img')
    if (domain) {
      img.src = 'http://' + domain + '/favicon.ico'
    } else {
      img.src = 'https://i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    img.onerror = function (xxx) {
      xxx.target.src = 'https://i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    return img
  }
}