import React, {Component} from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import SWEWaypoint from "../molecules/SWEWaypoint";
import ExpeditionStore from "../../stores/ExpeditionStore";
import ExpeditionActions from "../../actions/ExpeditionActions";
import ExpeditionConstants from "../../constants/ExpeditionConstants";
import {browserHistory} from "react-router";

export default class SWEExpeditionPage extends Component {


  constructor(){
    super();
    this.state = {
      waypoints: []
    };
    this.valid = true;
  }

  onData = (e)=>{

    if(!this.valid){
      return;
    }

    var id = this.props.params.id;

    switch(e.type){

      case ExpeditionConstants.EXPEDITION_GET:
      this.setState(ExpeditionStore.get(id));
      break;

    }
  }

  componentWillMount(){

    var id = this.props.params.id;
    ExpeditionStore.addChangeListener(this.onData);
    var data = ExpeditionStore.get(id);

    if(data === null){
      ExpeditionActions.get(id);
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
      <Card className="articlepage">
        <CardHeader
          title={this.state.name}
          subtitle={this.state.start_date + " to " + this.state.end_date}
          avatar="/assets/images/logo.png"
          />
        <CardMedia
          overlay={<CardTitle title={this.state.name} subtitle={"Minimum Jump " + this.state.min_jump + "Ly"} />}
          >
          {
            this.state.teaser_is_movie ? (
              <video src={this.state.teaser_image} autoPlay loop/>
            ) : (
              <img src={this.state.teaser_image} />
            )
          }
        </CardMedia>
        <CardText>
          {this.state.description}
        </CardText>
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            >
            <TableRow>
              <TableHeaderColumn>Waypoint</TableHeaderColumn>
              <TableHeaderColumn>System</TableHeaderColumn>
              <TableHeaderColumn>Planet</TableHeaderColumn>
              <TableHeaderColumn>Coords</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.waypoints.map((id, i)=>{
                return (
                  <SWEWaypoint id={id} key={id}/>
                );
              })
            }
          </TableBody>
        </Table>
        <CardActions>
          <FlatButton
            label="Sign Up"
            onTouchTap={()=>browserHistory.push("/expeditions/"+this.props.params.id+"/register")}
            />
          <FlatButton
            label="Back"
            onTouchTap={()=>browserHistory.goBack()}
            />
        </CardActions>
      </Card>
    );
  }

}
