import React, {Component} from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import Snackbar from "material-ui/Snackbar";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SWEShipSelect from "../atoms/SWEShipSelect";
import ExpeditionStore from "../../stores/ExpeditionStore";
import ExpeditionActions from "../../actions/ExpeditionActions";
import ExpeditionConstants from "../../constants/ExpeditionConstants";
import ShipData from "../../constants/ShipData";
import {browserHistory} from "react-router";

export default class SWEExpeditionRegisterCard extends Component {


  constructor(){
    super();
    this.state = {
      ship_model: ShipData[0].model,
      ship_name: "",
      ship_jump: "",
      ship_weight: "",
      ship_rebuy: "",
      snackMessage: "",
      hasSnackMessage: false
    };
    this.valid = true;
  }

  onData = (e)=>{

    var id = this.props.params.id;

    switch(e.type){
      case ExpeditionConstants.EXPEDITION_GET:
      this.setState(e.data);
      break;
      case ExpeditionConstants.EXPEDITION_GET_REGISTRATIONS:
      if(this.isRegistered()){
        this.setState(ExpeditionStore.getRegistration(id));
      }
      break;
      case ExpeditionConstants.EXPEDITION_REGISTER:
      this.showSnackBar("Saved Registration!");
      break;
      case ExpeditionConstants.EXPEDITION_REGISTER_FAILED:
      this.showSnackBar(e.err);
      break;
      case ExpeditionStore.EXPEDITION_DEREGISTER:
      this.showSnackBar("Retracted from Expedition");
      break;
      case ExpeditionStore.EXPEDITION_DEREGISTER_FAILED:
      this.showSnackBar("Error Retracting from Expedition");
      break;
    }
  }

  isRegistered(){
    var id = this.props.params.id;
    return ExpeditionStore.isRegistered(id);
  }

  showSnackBar(e){
    if(typeof e !== "string"){
      e = JSON.stringify(e);
    }
    this.setState({hasSnackMessage: true, snackMessage: e});
    setTimeout(()=>this.setState({hasSnackMessage: false}), 2000);
  }

  componentWillMount(){
    ExpeditionStore.addChangeListener(this.onData);
    var id = this.props.params.id;
    var data = ExpeditionStore.get(id);
    var details = ExpeditionStore.getRegistration(id);

    if(data === null){
      ExpeditionActions.get(id);
    }else{
      console.log(data);
      this.setState(data);
    }

    if(details === null){
      ExpeditionActions.getRegistrations();
    }else{
      this.setState(details);
    }
  }

  componentWillUnmount(){
    ExpeditionStore.removeChangeListener(this.onData);
  }

  changeListener(e){
    var data = {};
    data["ship_" + e.target.id] = e.target.value;
    this.setState(data);
  }

  changeShip(ship){
    this.setState({ship_model: ship.model});
  }

  saveDetails(){

    var id = this.props.params.id;
    console.log(this.state);

    if(this.isRegistered()){

      ExpeditionActions.update(
        ExpeditionStore.getRegistrationId(id),
        this.state.ship_model,
        this.state.ship_name,
        this.state.ship_jump,
        this.state.ship_weight,
        this.state.ship_rebuy
      );
    }else{
      ExpeditionActions.register(
        id,
        this.state.ship_model,
        this.state.ship_name,
        this.state.ship_jump,
        this.state.ship_weight,
        this.state.ship_rebuy
      );
    }
  }

  retract(){
    if(this.isRegistered()){
      var id = this.props.params.id;
      ExpeditionActions.deregister(ExpeditionStore.getRegistrationId(id));
      this.setState({
        ship_name: "",
        ship_jump: "",
        ship_weight: "",
        ship_rebuy: ""
      });
    }
  }

  render(){

    return (
      <Card className="articlecard">
        <CardHeader
          title={this.state.name}
          subtitle="Edit Registration"
          avatar="/assets/images/logo.png"
          />
        <form className="sweform">
          <CardText onChange={(e)=>this.changeListener(e)}>
            <SWEShipSelect
              id="ship"
              onChange={(e)=>this.changeShip(e)}
              defaultShipModel={this.state.ship_model}
              />
            <TextField
              id="name"
              value={this.state.ship_name}
              hintText="Name"
              type="text"
              />
            <TextField
              id="jump"
              value={this.state.ship_jump}
              hintText="Jump Range Full Tank"
              errorText={""}
              type="number"
              />
            <TextField
              id="weight"
              value={this.state.ship_weight}
              hintText="Ship Weight"
              errorText={""}
              type="number"
              />
            <TextField
              id="rebuy"
              value={this.state.ship_rebuy}
              hintText="Ship Rebuy"
              errorText={""}
              type="number"
              />
          </CardText>
        </form>
        <CardActions>
          <FlatButton
            label="Save"
            onTouchTap={()=>this.saveDetails()}
            />
          <FlatButton
            label="Retract"
            onTouchTap={()=>this.retract()}
            />
          <FlatButton
            label="Back"
            onTouchTap={()=>browserHistory.goBack()}
            />
        </CardActions>
        <Snackbar
          open={this.state.hasSnackMessage}
          message={this.state.snackMessage}
          autoHideDuration={2000}
          />
      </Card>
    );
  }

}
