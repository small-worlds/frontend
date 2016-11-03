import React, {Component} from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import UserActions from "../../actions/UserActions";

export default class SWEDrawer extends Component {

  logout(){
    UserActions.logout();
  }

  render(){
    return (
      <Drawer
        open={this.props.drawerOpen}
        docked={false}
        onRequestChange={(open) => this.props.onChange()}
        >
        <MenuItem onTouchTap={(open) => {
            this.logout();
            this.props.onChange();
          }
        }>Log Out</MenuItem>
      </Drawer>
    );
  }

}
