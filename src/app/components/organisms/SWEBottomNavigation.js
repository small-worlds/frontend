import React, {Component} from "react";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";
import Paper from "material-ui/Paper";
import ActionHome from "material-ui/svg-icons/action/home";
import ActionFlight from "material-ui/svg-icons/action/flight-takeoff";
import DeviceAirplaneModeActive from "material-ui/svg-icons/device/airplanemode-active";
import DeviceAirplaneModeInactive from "material-ui/svg-icons/device/airplanemode-inactive";
import { browserHistory } from "react-router";

const style = {
  marginLeft: "auto",
  marginRight: "auto"
};

const homeIcon = (<ActionHome style={style}/>);
const fleetIcon = (<DeviceAirplaneModeActive style={style}/>);
const rebuyIcon = (<DeviceAirplaneModeInactive style={style}/>);
const scheduleIcon = (<ActionFlight style={style}/>);


export default class SWEBottomNavigation extends Component {

  state = {
    selectedIndex: 0
  }

  select(index){
    this.setState({selectedIndex: index});
    switch(index){
      case 0:
      browserHistory.push("/");
      break;

      
    }
  }

  render() {

    return (
      <Paper zDepth={1} id="navigation-bottom">
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Home"
            icon={homeIcon}
            onTouchTap={() => this.select(0)}
            />
          <BottomNavigationItem
            label="Schedule"
            icon={scheduleIcon}
            onTouchTap={() => this.select(1)}
            />
          <BottomNavigationItem
            label="Fleet"
            icon={fleetIcon}
            onTouchTap={() => this.select(2)}
            />
          <BottomNavigationItem
            label="Insurance"
            icon={rebuyIcon}
            onTouchTap={() => this.select(3)}
            />
        </BottomNavigation>
      </Paper>
    );
  }
}
