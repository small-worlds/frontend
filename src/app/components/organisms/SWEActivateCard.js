import React, {Component} from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import UserActions from "../../actions/UserActions";
import UserStore from "../../stores/UserStore";
import UserConstants from "../../constants/UserConstants";
import {browserHistory} from "react-router";

export default class SWEActivateCard extends Component {

  constructor() {
    super();
  }

  activate() {
    var id = this.props.params.id;
    var token = this.props.params.token;
    UserActions.activate(id, token);
  }

  render() {
    return (
      <Card className="articlecard">
        <CardHeader title="SWE Confirm Actication" subtitle="Welcome!" avatar="/assets/images/logo.png"/>
        <CardText>
          Activate account?
        </CardText>
        <CardActions>
          <FlatButton label="Cancel" onTouchTap={() => browserHistory.push("/")}/>
          <FlatButton label="Activate!" onTouchTap={() => this.activate()}/>
        </CardActions>
      </Card>
    );
  }

}
