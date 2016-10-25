import React, {Component} from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";


export default class SWEDrawer extends Component {


  render(){
    return (
      <Drawer
        open={this.props.drawerOpen}
        docked={false}
        onRequestChange={(open) => this.props.onChange()}
        >
        <MenuItem onTouchTap={(open) => this.props.onChange()}>Sign Up</MenuItem>
        <MenuItem onTouchTap={(open) => this.props.onChange()}>Sign In</MenuItem>
      </Drawer>
    );
  }

}
