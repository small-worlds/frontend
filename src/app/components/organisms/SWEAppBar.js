import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";


export default class SWEAppBar extends Component {

  state = {};


  openHome(){
    console.log("open home");
  }

  render(){
    return (
      <AppBar
        onTitleTouchTap={()=>this.openHome()}
        onLeftIconButtonTouchTap={()=>this.props.onMenuTap()}
        title="Small Worlds Expedition"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
    );
  }
}
