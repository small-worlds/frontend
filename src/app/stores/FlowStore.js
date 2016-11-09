import AppDispatcher from "../dispatchers/AppDispatcher";
import {EventEmitter} from "events";
import FlowConstants from "../constants/FlowConstants";
import SessionCache from "./SessionCache";

const CHANGE_EVENT = "change_flow";

class FlowStore extends EventEmitter {

  constructor(){
    super();
    this.cache = new SessionCache("flowstore");
  }

  onAction(action){
    var type = action.actionType;
    switch(type){

      case FlowConstants.FLOW_DIALOG:
      this.emitChange({type: type, attr: action.attr});
      break;

    }
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


var flowStore = new FlowStore();
AppDispatcher.register((action)=>flowStore.onAction(action));
export default flowStore;
