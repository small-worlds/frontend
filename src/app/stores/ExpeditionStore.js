import AppDispatcher from "../dispatchers/AppDispatcher";
import {EventEmitter} from "events";
import ExpeditionConstants from "../constants/ExpeditionConstants";
import SessionCache from "./SessionCache";

const CHANGE_EVENT = "change_expedition";

class ExpeditionStore extends EventEmitter {

  constructor(){
    super();
    this.cache = new SessionCache("expeditionstore", 5);
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
      this.emitChange({type: type, data: action.data});
      break;
      case ExpeditionConstants.EXPEDITION_GET_WAYPOINT:
      this.cache.set("wp"+action.id, JSON.stringify(action.data));
      this.emitChange({type: type, data: action.data});
      break;
      case ExpeditionConstants.EXPEDITION_GET_REGISTRATIONS:
      this.cache.set("*reg_fetched", Date.now());
      action.list.map((entry, i)=>{
        this.setRegistration(entry);
      });
      this.emitChange({type: type, data: action.data});
      break;
      case ExpeditionConstants.EXPEDITION_REGISTER:
      this.setRegistration(action.data);
      this.emitChange({type: type, data: action.data});
      break;
      case ExpeditionConstants.EXPEDITION_REGISTER_FAILED:
      this.emitChange({type: type, err: action.err});
      break;
      case ExpeditionConstants.EXPEDITION_DEREGISTER:
      this.cache.remove("*reg"+action.id);
      this.emitChange({type: type});
      break;
    }
  }

  get(id){
    return this.cache.contains(id) ? JSON.parse(this.cache.get(id)) : null;
  }

  getWaypoint(id){
    return this.cache.contains("wp"+id) ? JSON.parse(this.cache.get("wp"+id)) : null;
  }

  list(){
    return this.cache.contains("list") ? JSON.parse(this.cache.get("list")) : [];
  }

  setRegistration(entry){
    this.cache.set("*reg"+entry.expedition, JSON.stringify(entry));
  }

  getRegistration(id){
    return this.cache.contains("*reg"+id) ? JSON.parse(this.cache.get("*reg"+id)) : null;
  }

  getRegistrationId(id){
    var data = this.getRegistration(id);
    return data === null ? -1 : data.id;
  }

  isRegistered(id){
    return this.cache.contains("*reg"+id);
  }

  isRegistrationsFetched(){
    return this.cache.contains("*reg_fetched");
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
