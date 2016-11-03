import React, {Component} from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import UserActions from "../../actions/UserActions";
import UserStore from "../../stores/UserStore";
import UserConstants from "../../constants/UserConstants";
import { browserHistory } from "react-router";

export default class SWEExpeditionCard extends Component {

  constructor(){
    super();
    this.valid = true;
  }

  render(){

    return (
      <Card className="articlecard">
        <CardHeader
          title={this.props.name}
          subtitle={this.props.startDate + " to " + this.props.endDate}
          avatar="assets/images/logo.png"
          />
        <CardMedia
          overlay={<CardTitle title={this.props.name} subtitle={"Minimum Jump " + this.props.minJump + "Ly"} />}
          >
          <video src="https://fat.gfycat.com/ComposedFoolishGemsbok.webm" autoPlay loop/>
        </CardMedia>
        <CardText>
          Come join us for a tour of historic thargoid fuckups
        </CardText>
        <CardActions>
          <FlatButton
            label="Learn More"
            onTouchTap={()=>browserHistory.push("/expeditions/"+this.props.id)}
            />
        </CardActions>
      </Card>
    );
  }

}
