import http from "../utility/http";


class ExpeditionAPI {

  register(id, ship, name, range, mass, rebuy, call){
    http({
      type: "POST",
      url: "/registrations/",
      data: JSON.stringify({
        expedition: id,
        ship_model: ship,
        ship_name: name,
        ship_jump: range,
        ship_weight: mass,
        ship_rebuy: rebuy
      }),
      headers: {
        "Content-Type": "Application/json;charset=UTF-8"
      },
      onSuccess: (data)=>{
        var json = JSON.parse(data);
        call(null, json);
      },
      onError: (err)=>call(JSON.parse(err), null)
    });
  }

  update(id, ship, name, range, mass, rebuy, call){
    http({
      type: "PATCH",
      url: "/registrations/"+id+"/",
      data: JSON.stringify({
        ship_model: ship,
        ship_name: name,
        ship_jump: range,
        ship_weight: mass,
        ship_rebuy: rebuy
      }),
      headers: {
        "Content-Type": "Application/json;charset=UTF-8"
      },
      onSuccess: (data)=>{
        console.log(data);
        var json = JSON.parse(data);
        call(null, json);
      },
      onError: (err)=>call(JSON.parse(err), null)
    });
  }

  // deregister(id, call){
  //   http({
  //     type: "DELETE",
  //     url: "/registrations/"+id+"/",
  //     onSuccess: (data)=>{
  //       call(null, null);
  //     },
  //     onError: (err)=>call("Error retracting from expedition", null)
  //   });
  // }

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
      url: "/expeditions/"+id+"/",
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

  getRegistrations(call){
    http({
      type: "GET",
      url: "/my-registrations/",
      onSuccess: (data)=>{
        var data = JSON.parse(data);
        call(null, data);
      },
      onError: (err)=>call(JSON.parse(err), null)
    });
  }

  getWaypoint(id, call){
    http({
      type: "GET",
      url: "/waypoints/"+id+"/",
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
