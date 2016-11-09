import AppDispatcher from "../dispatchers/AppDispatcher";
import FlowConstants from "../constants/FlowConstants";



class FlowActions {

  constructor(){

  }

  dialog(attr){
    AppDispatcher.dispatch({
      actionType: FlowConstants.FLOW_DIALOG,
      attr: attr
    });
  }

}


export default new FlowActions();
