
var serverUrl = "";


function http(attr){

  var request = new XMLHttpRequest();
  var backoff = attr.hasOwnProperty("backoff") ? attr.backoff : 0;

  request.onreadystatechange = function(){
    if(request.readyState === 4){
      if(request.status === 200){
        attr.onSuccess(this.response, this);
      }else if(backoff > 0 && request.status !== 404){

        var attempts = attr.hasOwnProperty("attempts") ? attr.attempts : 1;

        setTimeout(function(){
          attr.backoff = backoff - 1;
          attr.attempts = attempts + 1;
          http(attr);
        }, 1000 * (1 + attempts*attempts));

      }else if(attr.hasOwnProperty("onError")){
        attr.onError(this.response, this);
      }
    }
  };

  request.open(attr.type, serverUrl + attr.url, true);

  if(attr.hasOwnProperty("responseType")){
    request.responseType = attr.responseType;
  }

  if(attr.hasOwnProperty("headers")){
    var keys = Object.keys(attr.headers);

    for(var i = 0; i < keys.length; i++){

      var key = keys[i];

      if(attr.headers.hasOwnProperty(key)) {
        request.setRequestHeader(key, attr.headers[key]);
      }
    }
  }

  var data = null;

  if(attr.body){

    data = new FormData();
    var keys = Object.keys(attr.body);
    var key;

    for(var i = 0; i < keys.length; i++){
      key = keys[i];
      if(attr.body.hasOwnProperty(key)){
        data.append(key, attr.body[key]);
      }
    }

  }else if(attr.form){
    data = Net.formEncode(attr.form);
  }else if(attr.data){
    data = attr.data;
  }

  request.send(data);
}


export default http;
