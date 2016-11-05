import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ShipData from "../../constants/ShipData";



export default class SWEShipSelect extends Component {

  constructor(){
    super();
    this.state = {
      value: 1
    }
    this.selected = false;
  }

  onSelect = (event, index, value) => {
    this.setState({value});
    this.props.onChange(ShipData[value]);
    this.selected = true;
  };

  defaultShipValue(){

    var model = this.props.defaultShipModel;
    for(var i = 0; i < ShipData.length; i++){
      if(model === ShipData[i].model){
        return i;
      }
    }

    return 0;
  }

  render(){
    return (
      <SelectField
        floatingLabelText="Ship"
        value={this.selected ? this.state.value : this.defaultShipValue()}
        onChange={this.onSelect}
        maxHeight={200}
        >
        {
          ShipData.map((ship, i)=>{
            return (
              <MenuItem value={i} primaryText={ship.model}  key={i}/>
            );
          })
        }
      </SelectField>
    );
  }
}
