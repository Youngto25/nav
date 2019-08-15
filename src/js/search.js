export class Search{
  constructor(el){
    this.$el = el
    this.$ = s=> this.$el.querySelector(s)
    this.$$ = s=> this.$el.querySelectorAll(s)
    this.$input = this.$('input')
    this.$value = '',
    this.$search = 'https://cn.bing.com/search?q='

    this.getValue()
    this.buttonClick()
    this.listenEnter()
    this.listenSpan()
  }

  getValue(){
    this.$input.addEventListener('input',(e)=>{
      this.$value = e.target.value
    })
  }

  buttonClick(){
    this.$('.search-button').addEventListener('click',()=>{
      if(!this.$value) return
      this.search() 
    })
  }

  listenEnter(){
    document.addEventListener('keyup',(e)=>{
      if(e.keyCode === 13){
        if(!this.$value) return
        this.search()
      }
    })
  }

  listenSpan(){
    this.$('.change').addEventListener('click',(e)=>{
      for(let i = 0; i < e.target.parentElement.children.length; i++){
        e.target.parentElement.children[i].classList.remove('active')
      }
      e.target.classList.add('active')
      switch(e.target.innerText){
        case 'Bing':
          this.$search = 'https://cn.bing.com/search?q='
          break
        case 'Google':
          this.$search = 'https://www.google.com/search?q='
          break
        default :
      }
    })
  }

  search(){
    window.open(`${this.$search}${this.$value}`)
  }
}