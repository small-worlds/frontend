import React, {Component} from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import UserActions from "../../actions/UserActions";
import UserStore from "../../stores/UserStore";
import {browserHistory} from "react-router";

export default class SWEDrawer extends Component {

  logout(){
    UserActions.logout();
  }

  badgeGenerator(){
    browserHistory.push("/badgegenerator/");
  }

  render(){

    var logged = UserStore.isLoggedIn();

    return (
      <Drawer
        open={this.props.drawerOpen}
        docked={false}
        onRequestChange={(open) => this.props.onChange()}
        >
        {
          logged ?
          (
            <div>
              <MenuItem onTouchTap={
                  (open) => {
                    this.logout();
                    this.props.onChange();
                  }
                }>
                Log Out
              </MenuItem>
              <MenuItem onTouchTap={
                  (open) => {
                    this.badgeGenerator();
                    this.props.onChange();
                  }
                }>
                Badge Designer
              </MenuItem>
            </div>
          ) : (
            null
          )
        }
      </Drawer>
    );
  }
}
