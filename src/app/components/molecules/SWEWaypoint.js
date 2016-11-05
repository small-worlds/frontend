import React, {Component} from "react";
import {TableRow, TableRowColumn} from 'material-ui/Table';
import ExpeditionStore from "../../stores/ExpeditionStore";
import ExpeditionActions from "../../actions/ExpeditionActions";
import ExpeditionConstants from "../../constants/ExpeditionConstants";

export default class SWEExpeditionPage extends Component {


  constructor(){
    super();
    this.state = {};
    this.valid = true;
  }

  onData = (e)=>{

    if(!this.valid){
      return;
    }

    switch(e.type){
      case ExpeditionConstants.EXPEDITION_GET_WAYPOINT:
      console.log("fuck shit",e);
      this.setState(e.data);
      break;
    }

  }

  componentWillMount(){

    var id = this.props.id;
    ExpeditionStore.addChangeListener(this.onData);
    var data = ExpeditionStore.getWaypoint(id);

    if(data === null){
      ExpeditionActions.getWaypoint(id);
    }else{
      console.log(data);
      this.setState(data);
    }

  }

  componentWillUnmount(){
    this.valid = false;
    ExpeditionStore.removeChangeListener(this.onData);
  }

  render(){

    return (
      <TableRow>
        <TableRowColumn>{this.state.name}</TableRowColumn>
        <TableRowColumn>{this.state.system}</TableRowColumn>
        <TableRowColumn>{this.state.planet}</TableRowColumn>
        <TableRowColumn>{this.state.latitude+", "+this.state.longitude}</TableRowColumn>
      </TableRow>
    );
  }

}
