


export default class SessionCache {

  constructor(prefix){
    this.prefix = prefix;
  }

  set(key, value){
    sessionStorage-setItem(this.prefix + "_" + key, value);
  }

  get(key){
    return sessionStorage.getItem(this.prefix + "_" + key);
  }

  contains(key){
    return typeof sessionStorage.getItem(this.prefix + "_" + key) !== "undefined";
  }

  remove(key){
    sessionStorage.removeItem(this.prefix + "_" + key);
  }

}
