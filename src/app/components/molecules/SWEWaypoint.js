import React, {Component} from "react";
import {TableRow, TableRowColumn} from 'material-ui/Table';
import ExpeditionStore from "../../stores/ExpeditionStore";
import ExpeditionActions from "../../actions/ExpeditionActions";
import ExpeditionConstants from "../../constants/ExpeditionConstants";

const STYLE = {
  wordWrap: "normal",
  whiteSpace: "normal"
};

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

    var id = this.props.id;

    switch(e.type){
      case ExpeditionConstants.EXPEDITION_GET_WAYPOINT:
      this.setState(ExpeditionStore.getWaypoint(id));
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
        <TableRowColumn style={STYLE}>{this.state.name}</TableRowColumn>
        <TableRowColumn style={STYLE}>{this.state.system}</TableRowColumn>
        <TableRowColumn style={STYLE}>{this.state.planet}</TableRowColumn>
        <TableRowColumn style={STYLE}>{this.state.latitude+", "+this.state.longitude}</TableRowColumn>
      </TableRow>
    );
  }

}
