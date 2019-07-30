export class Search{
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

  search(){
    window.open(`https://cn.bing.com/search?q=${this.$value}`)
  }
}