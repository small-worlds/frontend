import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';



export default class SWEDialog extends Component {

  constructor(){
    super();
  }

  render(){

    return (
      <Dialog
        title={this.props.title}
        actions={[
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.props.onCancel}
            />,
          <FlatButton
            label="Confirm"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.props.onConfirm}
            />
        ]}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleClose}
        >
        {this.props.children}
      </Dialog>
    );
  }

}
