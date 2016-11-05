


export default class SessionCache {

  constructor(prefix, invalidate){
    this.prefix = prefix;

    if(typeof invalidate === "number" && invalidate !== 0){
      setInterval(()=>this.update(invalidate), 1000*30);
      this.update(invalidate);
    }
  }

  update(invalidate){

    var now = Date.now();

    if(this.contains("invalidate")){
      var n = parseInt(this.get("invalidate"));
      var delta = now - n;

      if(delta > invalidate*60*1000){
        this.clear();
        this.set("invalidate", now);
      }
    }else{
      this.set("invalidate", now);
    }
  }

  clear(){
    console.log("clearing cache "+this.prefix);
    var keys = Object.keys(sessionStorage);

    for(var i = 0; i < keys.length; i++){
      var key = keys[i];
      if(key.startsWith(this.prefix) && key[this.prefix.length] !== '*'){
        this.remove(key);
      }
    }
  }

  set(key, value){
    sessionStorage.setItem(this.prefix + "_" + key, value);
  }

  get(key){
    return sessionStorage.getItem(this.prefix + "_" + key);
  }

  contains(key){
    return sessionStorage.getItem(this.prefix + "_" + key) !== null;
  }

  remove(key){
    sessionStorage.removeItem(this.prefix + "_" + key);
  }

}
