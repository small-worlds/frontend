import AppDispatcher from "../dispatchers/AppDispatcher";
import {EventEmitter} from "events";
import UserConstants from "../constants/UserConstants";
import SessionCache from "./SessionCache";

const CHANGE_EVENT = "change";

class UserStore extends EventEmitter {

  constructor(){
    super();
    this.cache = new SessionCache("userstore");
  }

  onAction(action){
    var data;
    switch(action.actionType){

      case UserConstants.USER_LOGIN:
      this.cache.set("data", action.data);
      this.emitChange();
      break;
      case UserConstants.USER_LOGOUT:
      this.cache.remove("data");
      break;
    }
  }

  isLoggedIn(){
    return this.cache.contains("data");
  }

  getUserData(){
    return this.cache.get("data");
  }

  emitChange(){
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(call){
    this.on(CHANGE_EVENT, call);
  }

  removeChangeListener(call){
    this.removeListener(CHANGE_EVENT, call);
  }
}


var userStore = new UserStore();
AppDispatcher.register((action)=>userStore.onAction(action));
export default userStore;
