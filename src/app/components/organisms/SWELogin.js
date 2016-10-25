import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class SWELogin extends Component {

  propTypes: {

  };

  render(){

    return (
      <Card className="swegridcard swelogincard">
        <CardHeader
          title="Small Worlds Signup"
          subtitle="Come join us!"
          avatar="assets/images/logo.png"
          />
        <form className="sweform">
          <CardText>
            <TextField
              hintText="Email"
              />
            <br/>
            <TextField
              hintText="CMDR Name"
              />
            <br/>
            <TextField
              hintText="Password"
              type="password"
              />
            <br/>
            <TextField
              hintText="Repeat Password"
              type="password"
              />
          </CardText>
          <CardActions>
            <FlatButton label="Login" />
            <FlatButton label="Signup" />
          </CardActions>
        </form>
      </Card>
    );
  }

}
