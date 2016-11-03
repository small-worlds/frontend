import AppDispatcher from "../dispatchers/AppDispatcher";
import ExpeditionConstants from "../constants/ExpeditionConstants";
import ExpeditionAPI from "../api/ExpeditionAPI";



class ExpeditionActions {

  constructor(){

  }


  register(id){

    ExpeditionAPI.register(id, (err, data)=>{

      if(err){
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_REGISTER_FAILED,
          data: data
        });
      }else{
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_REGISTER,
          err: err
        });
      }
    });
  }

  list(){

    ExpeditionAPI.list((err, data)=>{
      if(err){
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_LIST_FAILED,
          err: err
        });
      }else{
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_LIST,
          data: data
        });
      }
    });
  }

  get(id){

    ExpeditionAPI.get(id, (err, data)=>{
      if(err){
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_GET_FAILED,
          err: err
        });
      }else{
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_GET,
          data: data,
          id: id
        });
      }
    });
  }


}


export default new ExpeditionActions();
