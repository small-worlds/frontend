import React, {Component} from 'react';




export default class SWEGrid extends Component {


  render(){

    return (
      <div className="swegrid">
        {this.props.children}
      </div>
    );
  }

}
