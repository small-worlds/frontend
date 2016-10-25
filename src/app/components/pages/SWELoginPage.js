import React, {Component} from 'react';
import SWELogin from "../organisms/SWELogin";
import SWEGrid from "../atoms/SWEGrid";

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
  },
};


export default class SWELoginPage extends Component {


  render(){
    return (
      <SWEGrid>
        <SWELogin/>
      </SWEGrid>
    );
  }

}
