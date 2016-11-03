import http from "../utility/http";



class UserAPI {

  signup(username, email, password, call){
    http({
      type: "POST",
      url: "/auth/register/",
      data: JSON.stringify({
        username: username,
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "Application/json;charset=UTF-8"
      },
      onSuccess: (data)=>{
        console.log(data);
        var json = JSON.parse(data);

        if(json.token){
          call(null, json.token);
        }else{
          call(json, null);
        }
      },
      onError: (err)=>call(JSON.parse(err), null)
    });
  }

  logout(call){

  }

  login(username, password, call){
    http({
      type: "POST",
      url: "/auth/login/",
      data: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        "Content-Type": "Application/json;charset=UTF-8"
      },
      onSuccess: (data)=>{
        console.log(data);
        var json = JSON.parse(data);

        if(json.auth_token){
          call(null, json.token);
        }else{
          call(json, null);
        }
      },
      onError: (err)=>call(JSON.parse(err), null)
    });
  }

}


export default new UserAPI();
