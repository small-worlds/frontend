import AppDispatcher from "../dispatchers/AppDispatcher";
import UserConstants from "../constants/UserConstants";
import UserAPI from "../api/UserAPI";



class UserActions {

  constructor(){

  }


  login(username, password){

    UserAPI.login(username, password, (err, data)=>{

      if(err){
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_LOGIN_FAILED,
          err: err
        });
      }else{
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_LOGIN,
          token: data
        });
      }
    });
  }

  logout(){

    UserAPI.logout((err, data)=>{

      if(err){
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_LOGOUT_FAILED,
          err: err
        });
      }else{
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_LOGOUT
        });
      }
    });
  }

  signup(username, email, password){

    UserAPI.signup(username, email, password, (err, data)=>{

      if(err){
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_LOGIN_FAILED,
          err: err
        });
      }else{
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_LOGIN,
          data: data
        });
      }
    });
  }


}


export default new UserActions();
