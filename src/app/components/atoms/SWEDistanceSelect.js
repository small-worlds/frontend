import React, {Component} from 'react';
import TextField from "material-ui/TextField";


export default class SWEDistanceSelect extends Component { // TODO

  constructor(){
    super();
  }

  render(){

    return (
      <TextField
        id="range"
        hintText="Jump Range Full Tank"
        errorText={""}
        type="number"
        />
    );
  }
}
