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

      case UserConstants.USER_SIGNUP:
      this.emitChange({type: UserConstants.USER_SIGNUP, data: action.data});
      break;
      case UserConstants.USER_SIGNUP_FAILED:
      this.emitChange({type: UserConstants.USER_SIGNUP_FAILED, data: action.err});
      break;
      case UserConstants.USER_LOGIN:
      this.cache.set("token", action.token);
      this.emitChange({type: UserConstants.USER_LOGIN, data: ""});
      break;
      case UserConstants.USER_LOGIN_FAILED:
      this.emitChange({type: UserConstants.USER_LOGIN_FAILED, data: action.err});
      break;
      case UserConstants.USER_LOGOUT:
      this.cache.remove("data");
      this.cache.remote("token");
      this.emitChange();
      break;
    }
  }

  isLoggedIn(){
    return this.cache.contains("token");
  }

  getToken(){
    return this.cache.get("token");
  }

  getUserData(){
    return this.cache.get("data");
  }

  emitChange(e){
    this.emit(CHANGE_EVENT, e);
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
