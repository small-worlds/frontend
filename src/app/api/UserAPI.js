import http from "../utility/http";



class UserAPI {

  login(email, password, call){
    http({
      url: "/user/login",
      data: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "Application/json;charset=UTF-8"
      },
      onSuccess: (data)=>{

      },
      onError: (err)=>call("error contacting server", null);
    });
  }

  logout(){

  }

  signup(email, password, cmdr){

  }

}


export default let api = new UserAPI();
