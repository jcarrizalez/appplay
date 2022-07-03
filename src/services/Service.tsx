import {redux, navigator, toast} from 'lib'

export default  class Service
{
  protected mounted_value

  protected running = []
  
  public time = 1000

  protected navigator = navigator
  
  protected redux = redux

  protected toast = toast

  constructor()
  {
  }

  setTime(time: int)
  {
    this.time = time 
  }

  isRunning(value: string)
  {
    return this.running.includes(value)
  }

  setRunning(value: string)
  {
    if(this.running.includes(value)){

      setTimeout(() => {
        this.running = this.running.filter(item => item !== value)
      },
      this.time)
    }
    else{
      this.running.push(value)
    }
  }

  mounted(){
    this.mounted_value = true
  }

  unmounted(){
    this.mounted_value = false
  }

  isMounted(){
    return this.mounted_value
  }

  goBack(){
    return this.navigator(`goBack`)
  }
}
