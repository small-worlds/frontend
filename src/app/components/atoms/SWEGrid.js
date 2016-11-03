import React, {Component} from 'react';




export default class SWEGrid extends Component {


  render(){

    return (
      <ul className="articlegrid">
        {this.props.children}
      </ul>
    );
  }

}
