import React, {Component} from "react";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SWETheme from "./components/themes/SWETheme";
import SWEAppBar from "./components/organisms/SWEAppBar";
import SWEBottomNavigation from "./components/organisms/SWEBottomNavigation";
import SWEArticleCard from "./components/organisms/SWEArticleCard";
import SWEDrawer from "./components/organisms/SWEDrawer";
import SWELoginPage from "./components/pages/SWELoginPage";

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerOpen: false
    };
  }

  toggleDrawer(){
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  render() {

    //console.log(SWETheme);

    return (
      <MuiThemeProvider muiTheme={SWETheme}>
        <div id="background" style={{background: SWETheme.palette.canvasColor}}>
          <SWEAppBar onMenuTap={()=>this.toggleDrawer()}/>
          <SWEDrawer drawerOpen={this.state.drawerOpen} onChange={()=>this.toggleDrawer()}/>
          <SWELoginPage />
          <SWEBottomNavigation />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
