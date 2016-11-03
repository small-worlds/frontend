import React, {Component} from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import ExpeditionStore from "../../stores/ExpeditionStore";
import ExpeditionActions from "../../actions/ExpeditionActions";
import ExpeditionConstants from "../../constants/ExpeditionConstants";
import { browserHistory } from "react-router";

export default class SWEExpeditionPage extends Component {


  constructor(){
    super();
    this.state = {

    };
    this.valid = true;
  }

  onData = (e)=>{

    if(!this.valid){
      return;
    }

    switch(e.type){
      case ExpeditionConstants.EXPEDITION_GET:
      console.log(e);
      this.setState({});
      break;
    }

  }

  componentWillMount(){
    ExpeditionStore.addChangeListener(this.onData);
    if(ExpeditionStore.get(this.props.params.id) === null){
      ExpeditionActions.get(this.props.params.id);
    }
  }

  componentWillUnmount(){
    this.valid = false;
    ExpeditionStore.removeChangeListener(this.onData);
  }

  render(){

    return (
      <Card className="articlepage">
        <CardHeader
          title="Alien Encounters Tour"
          subtitle="August 3303"
          avatar="assets/images/logo.png"
          />
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
          >
          <video src="https://fat.gfycat.com/ComposedFoolishGemsbok.webm" autoPlay loop/>
        </CardMedia>
        <CardText>
          Come join us for a tour of historic thargoid fuckups
        </CardText>
        <CardActions>
          <FlatButton label="Sign Up" />
          <FlatButton
            label="Back"
            onTouchTap={()=>browserHistory.goBack()}
            />
        </CardActions>
      </Card>
    );
  }

}
