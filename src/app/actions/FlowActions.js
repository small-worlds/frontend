import AppDispatcher from "../dispatchers/AppDispatcher";
import FlowConstants from "../constants/FlowConstants";



class FlowActions {

  constructor(){

  }


  askConfirm(attr){
    AppDispatcher.dispatch({
      actionType: FlowConstants.FLOW_ASK_CONFIRM,
      attr
    });
  }

}


export default new FlowActions();
