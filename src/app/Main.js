import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SWETheme from "./components/themes/SWETheme";
import SWEAppBar from "./components/organisms/SWEAppBar";
import SWEBottomNavigation from "./components/organisms/SWEBottomNavigation";
import SWEDrawer from "./components/organisms/SWEDrawer";
import SWEGrid from "./components/atoms/SWEGrid";
import SWELoginCard from "./components/organisms/SWELoginCard";
import UserStore from "./stores/UserStore";
import UserConstants from "./constants/UserConstants";

class Main extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerOpen: false,
      authenticated: UserStore.isLoggedIn()
    };
    this.counter = 0;
  }

  componentWillMount(){
    UserStore.addChangeListener(this.onUserData);
  }

  componentWillUnmount(){
    UserStore.removeChangeListener(this.onUserData);
  }

  onUserData = (e)=>{

    switch(e.type){
      case UserConstants.USER_LOGIN:
      this.setState({authenticated: true});
      break;
      case UserConstants.USER_LOGOUT:
      this.setState({authenticated: false});
      break;

    }

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
          <SWEGrid>
          {
            this.state.authenticated ?
            (
              this.props.children
            ) :
            (
              <SWELoginCard />
            )
          }
          </SWEGrid>
          <SWEBottomNavigation />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
