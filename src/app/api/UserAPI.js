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
    http({
      type: "POST",
      url: "/auth/logout/",
      data: JSON.stringify({}),
      headers: {
        "Content-Type": "Application/json;charset=UTF-8"
      },
      onSuccess: (data)=>{
        call(null, null);
      },
      onError: (err)=>call(null, null)
    });
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
        var json = JSON.parse(data);
        if(json.auth_token){
          console.log(json);
          call(null, json.auth_token);
        }else{
          call(json, null);
        }
      },
      onError: (err)=>call(JSON.parse(err), null)
    });
  }

}


export default new UserAPI();
