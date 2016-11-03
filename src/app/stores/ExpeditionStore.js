import AppDispatcher from "../dispatchers/AppDispatcher";
import {EventEmitter} from "events";
import ExpeditionConstants from "../constants/ExpeditionConstants";
import SessionCache from "./SessionCache";

const CHANGE_EVENT = "change";

class ExpeditionStore extends EventEmitter {

  constructor(){
    super();
    this.cache = new SessionCache("expeditionstore");
  }

  onAction(action){
    var data;
    var type = action.actionType;
    switch(type){
      case ExpeditionConstants.EXPEDITION_LIST:
      this.cache.set("list", JSON.stringify(action.data));
      this.emitChange({type: type, data: action.data});
      break;
      case ExpeditionConstants.EXPEDITION_GET:
      this.cache.set(action.id, JSON.stringify(action.data));
      this.emitChange(type: type, data: action.data);
      break;
      case ExpeditionConstants.EXPEDITION_REGISTER_FAILED:
      //this.emitChange({type: UserConstants.USER_SIGNUP_FAILED, data: action.err});
      break;
    }
  }

  get(id){
    return this.cache.contains(id) ? JSON.parse(this.cache.get(id)) : null;
  }

  list(){
    return this.cache.contains("list") ? JSON.parse(this.cache.get("list")) : [];
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


var expeditionStore = new ExpeditionStore();
AppDispatcher.register((action)=>expeditionStore.onAction(action));
export default expeditionStore;
