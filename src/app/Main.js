import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SWETheme from "./components/themes/SWETheme";
import Snackbar from "material-ui/Snackbar";
import SWEAppBar from "./components/organisms/SWEAppBar";
import SWEBottomNavigation from "./components/organisms/SWEBottomNavigation";
import SWEDrawer from "./components/organisms/SWEDrawer";
import SWEGrid from "./components/atoms/SWEGrid";
import SWEConfirm from "./components/atoms/SWEConfirm";
import SWELoginCard from "./components/organisms/SWELoginCard";
import UserStore from "./stores/UserStore";
import UserConstants from "./constants/UserConstants";
import ExpeditionStore from "./stores/ExpeditionStore";
import ExpeditionConstants from "./constants/ExpeditionConstants";
import FlowStore from "./stores/FlowStore";
import FlowConstants from "./constants/FlowConstants";
import FlowActions from "./actions/FlowActions";

class Main extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerOpen: false,
      authenticated: UserStore.isLoggedIn(),
      snackMessage: "",
      hasSnackMessage: false,
      hasConfirm: false,
      confirm_title: "",
      confirm_text: "",
      confirm_onConfirm: null,
      confirm_onCancel: null
    };
    this.confirmQueue = [];
    this.counter = 0;
    this.timeout = null;
  }

  componentWillMount(){
    FlowStore.addChangeListener(this.onFlowData);
    UserStore.addChangeListener(this.onUserData);
    ExpeditionStore.addChangeListener(this.onExpeditionData);
  }

  componentWillUnmount(){
    FlowStore.removeChangeListener(this.onFlowData);
    UserStore.removeChangeListener(this.onUserData);
    ExpeditionStore.removeChangeListener(this.onExpeditionData);
  }

  onFlowData = (e)=>{

    switch(e.type){

      case FlowConstants.FLOW_ASK_CONFIRM:
      this.addConfirm(e.attr);
      break;

    }
  }

  onUserData = (e)=>{

    switch(e.type){

      case UserConstants.USER_LOGIN:
      this.setState({authenticated: true});
      this.setSnackMessage("Logged In!");
      break;

      case UserConstants.USER_LOGOUT:
      this.setState({authenticated: false});
      break;

      case UserConstants.USER_SIGNUP:
      this.setSnackMessage("Signed up, check your inbox for the Activation Email!");
      break;

      case UserConstants.USER_SIGNUP_FAILED:
      this.setSnackMessage("Error Signing Up!");
      break;

    }
  }

  onExpeditionData = (e)=>{

    switch(e.type){

      case ExpeditionConstants.EXPEDITION_REGISTER:
      this.setSnackMessage("Saved Registration!");
      break;

      case ExpeditionConstants.EXPEDITION_REGISTER_FAILED:
      this.setSnackMessage(e.err);
      break;

      case ExpeditionConstants.EXPEDITION_DEREGISTER:
      this.setSnackMessage("Retracted from Expedition");
      break;

      case ExpeditionConstants.EXPEDITION_DEREGISTER_FAILED:
      this.setSnackMessage("Error Retracting from Expedition");
      break;
    }
  }

  addConfirm(attr){
    if(this.state.confirmOpen){
      this.confirmQueue.push(attr);
      return;
    }
    this.showConfirm(attr);
  }

  nextConfirm(){
    this.setState({hasConfirm: false});
    if(this.confirmQueue.length !== 0){
      this.showConfirm(this.confirmQueue.shift());
    }
  }

  showConfirm(attr){
    this.setState({
      hasConfirm: true,
      confirm_onConfirm: ()=>{
        if(attr.onConfirm){
          attr.onConfirm();
        }
        this.nextConfirm();
      },
      confirm_onCancel: ()=>{
        if(attr.onCancel){
          attr.onCancel();
        }
        this.nextConfirm();
      },
      confirm_text: attr.text,
      confirm_title: attr.title
    });
  }

  setSnackMessage(str){

    if(typeof str !== "string"){
      str = JSON.stringify(str, 0, '\t');
    }

    this.setState({
      snackMessage: str,
      hasSnackMessage: true
    });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(()=>this.setState({hasSnackMessage: false}), 2000);
  }

  toggleDrawer(){
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={SWETheme}>
        <div id="background">
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
          <SWEConfirm
            title={this.state.confirm_title}
            text={this.state.confirm_text}
            onConfirm={this.state.confirm_onConfirm}
            onCancel={this.state.confirm_onCancel}
            open={this.state.hasConfirm}
            />
          <Snackbar
            open={this.state.hasSnackMessage}
            message={this.state.snackMessage}
            autoHideDuration={2000}
            />
          <SWEBottomNavigation />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
