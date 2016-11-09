import AppDispatcher from "../dispatchers/AppDispatcher";
import {EventEmitter} from "events";
import UserConstants from "../constants/UserConstants";
import SessionCache from "./SessionCache";

const CHANGE_EVENT = "change_user";

class UserStore extends EventEmitter {

  constructor(){
    super();
    this.cache = new SessionCache("userstore");
  }

  onAction(action){
    var type = action.actionType;
    switch(type){

      case UserConstants.USER_SIGNUP:
      this.emitChange({type: type, data: action.data});
      break;

      case UserConstants.USER_SIGNUP_FAILED:
      this.emitChange({type: type, err: action.err});
      break;

      case UserConstants.USER_LOGIN:
      this.cache.set("token", action.token);
      this.emitChange({type: type, data: ""});
      break;

      case UserConstants.USER_LOGIN_FAILED:
      this.emitChange({type: type, err: action.err});
      break;

      case UserConstants.USER_LOGOUT:
      case UserConstants.USER_LOGOUT_FAILED:
      sessionStorage.clear();
      this.emitChange({type: type});
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
