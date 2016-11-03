import React, {Component} from 'react';
import SWELoginCard from "../organisms/SWELoginCard";
import SWEGrid from "../atoms/SWEGrid";


export default class SWELoginPage extends Component {

  render(){
    return (
      <SWEGrid>
        <SWELoginCard/>
      </SWEGrid>
    );
  }
}
