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
    this.valid = true;
  }

  state = {
    showSignup: false,
    form_rpassword_error: "",
    form_email: "",
    form_username: "",
    form_password: "",
    form_rpassword: ""
  }

  onData = (e)=>{

    if(!this.valid){
      return;
    }

    switch(e.type){

      case UserConstants.USER_SIGNUP_FAILED:
      case UserConstants.USER_LOGIN_FAILED:
      this.setState({
        form_rpassword_error: e.data.non_field_errors
      });
      break;

      case UserConstants.USER_SIGNUP:
      if(this.state.showSignup){
        this.toggleView();
      }
      break;

    }
  }

  componentWillMount(){
    this.valid = false;
    UserStore.addChangeListener(this.onData);
  }

  componentWillUnmount(){
    UserStore.removeChangeListener(this.onData);
  }

  toggleView(){

    this.setState({
      showSignup: !this.state.showSignup,
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
    this.setState({form_rpassword_error: ""});

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
                    hintText="Username"
                    value={this.state.form_username}
                    />
                  <br/>
                  <TextField
                    ref="email"
                    id="email"
                    hintText="Email"
                    value={this.state.form_email}
                    />
                  <br/>
                  <TextField
                    id="password"
                    hintText="Password"
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
                    hintText="Username"
                    value={this.state.form_username}
                    />
                  <br/>
                  <TextField
                    id="password"
                    hintText="Password"
                    errorText={this.state.form_rpassword_error}
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
              onTouchTap={()=>this.submit()}
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
