import http from "../utility/http";


class ExpeditionAPI {

  register(call){
    http({
      type: "POST",
      url: "/auth/register/",
      data: JSON.stringify({
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

  list(call){
    http({
      type: "GET",
      url: "/expeditions/",
      headers: {
        "Content-Type": "Application/json;charset=UTF-8"
      },
      onSuccess: (data)=>{
        var list = JSON.parse(data);
        call(null, list);
      },
      onError: (err)=>call(JSON.parse(err), null)
    });
  }

  get(id, call){
    http({
      type: "GET",
      url: "/expeditions/"+id,
      headers: {
        "Content-Type": "Application/json;charset=UTF-8"
      },
      onSuccess: (data)=>{
        var data = JSON.parse(data);
        call(null, data);
      },
      onError: (err)=>call(JSON.parse(err), null)
    });
  }

}


export default new ExpeditionAPI();
