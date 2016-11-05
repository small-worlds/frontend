import AppDispatcher from "../dispatchers/AppDispatcher";
import ExpeditionConstants from "../constants/ExpeditionConstants";
import ExpeditionAPI from "../api/ExpeditionAPI";
import ExpeditionStore from "../stores/ExpeditionStore";


class ExpeditionActions {

  constructor(){

  }


  register(id, ship, name, range, mass, rebuy){

    ExpeditionAPI.register(id, ship, name, range, mass, rebuy, (err, data)=>{

      if(err){
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_REGISTER_FAILED,
          err: err
        });
      }else{
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_REGISTER,
          data: data
        });
      }
    });
  }


  update(id, ship, name, range, mass, rebuy){

    ExpeditionAPI.update(id, ship, name, range, mass, rebuy, (err, data)=>{

      if(err){
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_REGISTER_FAILED,
          err: err
        });
      }else{
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_REGISTER,
          data: data
        });
      }
    });
  }

  deregister(id){

    ExpeditionAPI.deregister(ExpeditionStore.getRegistrationId(id), (err, data)=>{
      
      if(err){
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_DEREGISTER_FAILED,
          err: err
        });
      }else{
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_DEREGISTER,
          id: id
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

  getWaypoint(id){

    ExpeditionAPI.getWaypoint(id, (err, data)=>{
      if(err){
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_GET_WAYPOINT_FAILED,
          err: err
        });
      }else{
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_GET_WAYPOINT,
          data: data,
          id: id
        });
      }
    });
  }

  getRegistrations(){

    ExpeditionAPI.getRegistrations((err, data)=>{
      if(err){
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_GET_REGISTRATIONS_FAILED,
          err: err
        });
      }else{
        AppDispatcher.dispatch({
          actionType: ExpeditionConstants.EXPEDITION_GET_REGISTRATIONS,
          list: data
        });
      }
    });
  }


}


export default new ExpeditionActions();
