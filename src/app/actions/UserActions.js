import AppDispatcher from "../dispatchers/AppDispatcher";
import UserConstants from "../constants/UserConstants";
import UserAPI from "../api/UserAPI";



class UserActions {

  constructor() {

  }


  login(username, password) {

    UserAPI.login(username, password, (err, data) => {

      if (err) {
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_LOGIN_FAILED,
          err: err
        });
      } else {
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_LOGIN,
          token: data
        });
      }
    });
  }

  logout() {

    UserAPI.logout((err, data) => {

      if (err) {
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_LOGOUT_FAILED,
          err: err
        });
      } else {
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_LOGOUT
        });
      }
    });
  }

  signup(username, email, password) {

    UserAPI.signup(username, email, password, (err, data) => {

      if (err) {
        console.log("signup failing", err);
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_SIGNUP_FAILED,
          err: err
        });
      } else {
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_SIGNUP,
          data: data
        });
      }
    });
  }

  activate(id, token) {

    UserAPI.activate(id, token, (err, data) => {

      if (err) {
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_ACTIVATE_FAILED,
          err: err
        });
      } else {
        AppDispatcher.dispatch({
          actionType: UserConstants.USER_ACTIVATE,
          data: data
        });
      }
    });
  }

}


export default new UserActions();
