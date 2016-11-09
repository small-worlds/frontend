import React, {Component} from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SWEShipSelect from "../atoms/SWEShipSelect";
import ExpeditionStore from "../../stores/ExpeditionStore";
import ExpeditionActions from "../../actions/ExpeditionActions";
import ExpeditionConstants from "../../constants/ExpeditionConstants";
import ShipData from "../../constants/ShipData";
import {browserHistory} from "react-router";
import FlowActions from "../../actions/FlowActions";

export default class SWEExpeditionRegisterCard extends Component {


  constructor(){
    super();
    this.state = {
      ship_model: ShipData[0].model,
      ship_name: "",
      ship_jump: "",
      ship_weight: "",
      ship_rebuy: ""
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
      case ExpeditionConstants.EXPEDITION_DEREGISTER:
      this.setState({
        ship_name: "",
        ship_jump: "",
        ship_weight: "",
        ship_rebuy: ""
      });
      break;
    }
  }

  isRegistered(){
    var id = this.props.params.id;
    return ExpeditionStore.isRegistered(id);
  }

  componentWillMount(){
    ExpeditionStore.addChangeListener(this.onData);
    var id = this.props.params.id;
    var data = ExpeditionStore.get(id);
    var details = ExpeditionStore.getRegistration(id);

    if(data === null){
      ExpeditionActions.get(id);
    }else{
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

      FlowActions.dialog({
        title: "Are You Sure?",
        text: "Retract from Expedition: "+this.state.name,
        onConfirm: ()=>{
          var id = this.props.params.id;
          ExpeditionActions.deregister(id);
        }
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
          {
            this.isRegistered() ?
            (
              <FlatButton
                label="Retract"
                onTouchTap={()=>this.retract()}
                />
            ) : (
              null
            )
          }
          <FlatButton
            label="Back"
            onTouchTap={()=>browserHistory.goBack()}
            />
        </CardActions>
      </Card>
    );
  }

}
