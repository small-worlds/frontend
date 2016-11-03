import http from "../utility/http";



class UserAPI {

  signup(username, email, password, call){
    http({
      type: "POST",
      url: "/auth/register",
      data: JSON.stringify({
        username, username,
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
          call("Invalid", null);
        }
      },
      onError: (err)=>call("Error: "+err, null)
    });
  }

  logout(call){

  }

  login(email, password, call){

  }

}


export default new UserAPI();
