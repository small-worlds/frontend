import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SWETheme from "./components/themes/SWETheme";
import Snackbar from "material-ui/Snackbar";
import SWEAppBar from "./components/organisms/SWEAppBar";
import SWEBottomNavigation from "./components/organisms/SWEBottomNavigation";
import SWEDrawer from "./components/organisms/SWEDrawer";
import SWEGrid from "./components/atoms/SWEGrid";
import SWEDialog from "./components/atoms/SWEDialog";
import SWELoginCard from "./components/organisms/SWELoginCard";
import UserStore from "./stores/UserStore";
import UserConstants from "./constants/UserConstants";
import ExpeditionStore from "./stores/ExpeditionStore";
import ExpeditionConstants from "./constants/ExpeditionConstants";
import FlowStore from "./stores/FlowStore";
import FlowConstants from "./constants/FlowConstants";
import FlowActions from "./actions/FlowActions";
import {browserHistory} from "react-router";

class Main extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerOpen: false,
      authenticated: UserStore.isLoggedIn(),
      snackMessage: "",
      hasSnackMessage: false,
      hasDialog: false,
      dialog_title: "",
      dialog_text: "",
      dialog_onConfirm: null,
      dialog_onCancel: null
    };
    this.dialogQueue = [];
    this.counter = 0;
    this.timeout = null;
    this.dialogChildren = null;
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

      case FlowConstants.FLOW_DIALOG:
      this.addDialog(e.attr);
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

      case UserConstants.USER_ACTIVATE:
      this.setSnackMessage("Activated account, you can now log in!");
      browserHistory.push("/");
      break;

      case UserConstants.USER_ACTIVATE_FAILED:
      this.setSnackMessage("Error activating account!");
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

  addDialog(attr){
    if(this.state.dialogOpen){
      this.dialogQueue.push(attr);
      return;
    }
    this.showDialog(attr);
  }

  nextDialog(){
    this.setState({hasDialog: false});
    if(this.dialogQueue.length !== 0){
      this.showDialog(this.dialogQueue.shift());
    }
  }

  showDialog(attr){

    this.dialogChildren = attr.children;

    this.setState({
      hasDialog: true,
      dialog_onConfirm: (e)=>{
        if(attr.onConfirm){
          attr.onConfirm(e);
        }
        this.nextDialog();
      },
      dialog_onCancel: ()=>{
        if(attr.onCancel){
          attr.onCancel();
        }
        this.nextDialog();
      },
      dialog_text: attr.text,
      dialog_title: attr.title
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

    var path = this.props.location.pathname;
    var showAuth = !this.state.authenticated && !path.startsWith("/activate/");

    return (
      <MuiThemeProvider muiTheme={SWETheme}>
        <div id="background">
          <SWEAppBar onMenuTap={()=>this.toggleDrawer()}/>
          <SWEDrawer drawerOpen={this.state.drawerOpen} onChange={()=>this.toggleDrawer()}/>
          <SWEGrid>
            {
              showAuth ?
              (
                <SWELoginCard />
              ) : (
                this.props.children
              )
            }
          </SWEGrid>
          <SWEDialog
            title={this.state.dialog_title}
            text={this.state.dialog_text}
            onConfirm={this.state.dialog_onConfirm}
            onCancel={this.state.dialog_onCancel}
            open={this.state.hasDialog}
            >
            {this.dialogChildren}
          </SWEDialog>
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
