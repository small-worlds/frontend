import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import UserActions from "../../actions/UserActions";
import UserStore from "../../stores/UserStore";
import UserConstants from "../../constants/UserConstants";

export default class SWELoginCard extends Component {

  constructor(){
    super();
    this.state = {
      showSignup: false,
      form_rpassword_error: "",
      form_password_error: "",
      form_email_error: "",
      form_username_error: "",
      form_email: "",
      form_username: "",
      form_password: "",
      form_rpassword: ""
    };
  }

  onData = (e)=>{

    switch(e.type){

      case UserConstants.USER_LOGIN_FAILED:
      this.onError(e.err);
      break;

      case UserConstants.USER_SIGNUP:
      if(this.state.showSignup){
        this.toggleView();
      }
      break;

      case UserConstants.USER_SIGNUP_FAILED:
      this.onError(e.err);
      break;

    }
  }

  componentWillMount(){
    UserStore.addChangeListener(this.onData);
  }

  componentWillUnmount(){
    UserStore.removeChangeListener(this.onData);
  }

  toggleView(){

    this.setState({
      showSignup: !this.state.showSignup,
      form_password_error: "",
      form_email_error: "",
      form_username_error: "",
      form_username: "",
      form_email: "",
      form_password: "",
      form_rpassword: ""
    });

    setTimeout(()=>{
      this.refs.username.focus();
    }, 50);
  }

  changeListener(e){
    var data = {};
    data["form_" + e.target.id] = e.target.value;
    this.setState(data);
  }

  submit(){
    if(this.state.showSignup){
      this.signup();
    }else{
      this.login();
    }
  }

  login(){

    this.setState({form_rpassword_error: ""});

    if(this.state.form_username.length === 0 || this.state.form_password.length === 0){
      //TODO Focus on empty element
      return;
    }
    UserActions.login(this.state.form_username, this.state.form_password);
  }

  signup(){
    // TODO more validation etc
    this.setState({
      form_password_error: "",
      form_email_error: "",
      form_username_error: "",
      form_rpassword_error: ""
    });

    if(this.state.form_email.length === 0 || this.state.form_password.length === 0 || this.state.form_rpassword.length === 0){
      //TODO Focus on empty element
      return;
    }

    if(this.state.form_password !== this.state.form_rpassword){
      this.setState({form_rpassword_error: "Passwords do not match"});
      this.refs.rpassword.focus();
      return;
    }

    UserActions.signup(this.state.form_username, this.state.form_email, this.state.form_password);
  }

  onError(err){

    var keys = Object.keys(err);
    for(var i = 0; i < keys.length; i++){
      var key = keys[i];
      if(err.hasOwnProperty(key)){
        this.addError(key, err[key]);
      }
    }
  }

  addError(key, err){

    if(key === "non_field_errors"){
      key = "password";
    }

    var buffer = "";

    for(var i = 0; i < err.length; i++){
      buffer += err[i] + "\n";
    }

    var state = {};
    state["form_"+key+"_error"] = buffer;
    this.setState(state);
  }

  render(){
    return (
      <Card className="articlecard">
        <CardHeader
          title="Small Worlds Signup"
          subtitle="Come join us!"
          avatar="/assets/images/logo.png"
          />
        <form className="sweform">
          <CardText onChange={(e)=>this.changeListener(e)}>
            {
              this.state.showSignup ?
              (
                <div>
                  <TextField
                    ref="username"
                    id="username"
                    errorText={this.state.form_username_error}
                    hintText="Username"
                    value={this.state.form_username}
                    />
                  <br/>
                  <TextField
                    ref="email"
                    id="email"
                    errorText={this.state.form_email_error}
                    hintText="Email"
                    value={this.state.form_email}
                    />
                  <br/>
                  <TextField
                    id="password"
                    hintText="Password"
                    errorText={this.state.form_password_error}
                    type="password"
                    value={this.state.form_password}
                    />
                  <br/>
                  <TextField
                    ref="rpassword"
                    id="rpassword"
                    hintText="Repeat Password"
                    errorText={this.state.form_rpassword_error}
                    type="password"
                    value={this.state.form_rpassword}
                    />
                </div>
              ) : (
                <div>
                  <TextField
                    ref="username"
                    id="username"
                    errorText={this.state.form_username_error}
                    hintText="Username"
                    value={this.state.form_username}
                    />
                  <br/>
                  <TextField
                    id="password"
                    hintText="Password"
                    errorText={this.state.form_password_error}
                    type="password"
                    value={this.state.form_password}
                    />
                </div>
              )
            }
          </CardText>
          <CardActions>
            <FlatButton
              label={this.state.showSignup ? "Sign Up" : "Log In"}
              onSubmit={()=>this.submit()}
              />
            <FlatButton
              label={this.state.showSignup ? "Cancel" : "Sign Up"}
              onTouchTap={()=>this.toggleView()}
              />
          </CardActions>
        </form>
      </Card>
    );
  }

}
