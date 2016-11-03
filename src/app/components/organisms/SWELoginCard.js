import React, {Component} from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
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
    snackMessage: "",
    hasSnackMessage: false
  }

  onData = (e)=>{

    if(!this.valid){
      return;
    }

    switch(e.type){
      case UserConstants.USER_SIGNUP_FAILED:
      case UserConstants.USER_LOGIN_FAILED:
      this.setState({
        form_rpassword_error: e.data.non_field_errors,
        snackMessage: e.data.non_field_errors,
        hasSnackMessage: true
      });
      break;
      case UserConstants.USER_SIGNUP:
      this.setState({
        snackMessage: "Signed up, check your inbox for the Activation Email!",
        hasSnackMessage: true,
        showSignup: false
      });
      break;
      case UserConstants.USER_LOGIN:
      this.setState({
        snackMessage: "Logged in!",
        hasSnackMessage: true
      });
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
    this.setState({showSignup: !this.state.showSignup});
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
      // Focus on empty element
      return;
    }
    UserActions.login(this.state.form_username, this.state.form_password);
  }

  signup(){
    // TODO more validation etc
    this.setState({form_rpassword_error: ""});

    if(this.state.form_email.length === 0 || this.state.form_password.length === 0 || this.state.form_rpassword.length === 0){
      // Focus on empty element

      return;
    }

    if(this.state.form_password !== this.state.form_rpassword){
      // Passwords do not match
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
          avatar="assets/images/logo.png"
          />
        <form className="sweform">
          <CardText onChange={(e)=>this.changeListener(e)}>
            {
              this.state.showSignup ?
              (
                <div>
                  <TextField
                    ref="email"
                    id="email"
                    hintText="Email"
                    />
                  <br/>
                  <TextField
                    id="username"
                    hintText="Username"
                    />
                  <br/>
                  <TextField
                    id="password"
                    hintText="Password"
                    type="password"
                    />
                  <br/>
                  <TextField
                    ref="rpassword"
                    id="rpassword"
                    hintText="Repeat Password"
                    errorText={this.state.form_rpassword_error}
                    type="password"
                    />
                </div>
              )
              :
              (
                <div>
                  <TextField
                    id="username"
                    hintText="Username"
                    />
                  <br/>
                  <TextField
                    id="password"
                    hintText="Password"
                    errorText={this.state.form_rpassword_error}
                    type="password"
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
        <Snackbar
         open={this.state.hasSnackMessage}
         message={this.state.snackMessage}
         autoHideDuration={2000}
       />
      </Card>
    );
  }

}
