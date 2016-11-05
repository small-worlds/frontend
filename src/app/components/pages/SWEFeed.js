"use strict";
import React, {Component} from "react";
import SWEExpeditionCard from "../organisms/SWEExpeditionCard";
import ExpeditionStore from "../../stores/ExpeditionStore";
import ExpeditionActions from "../../actions/ExpeditionActions";
import ExpeditionConstants from "../../constants/ExpeditionConstants";


export default class SWEFeed extends Component {

  constructor(){
    super();
    this.state = {
      expeditions: ExpeditionStore.list()
    };
    this.valid = true;
  }

  onData = (e)=>{

    if(!this.valid){
      return;
    }

    switch(e.type){
      case ExpeditionConstants.EXPEDITION_LIST:
      this.setState({expeditions: ExpeditionStore.list()});
      break;
    }

  }

  componentWillMount(){
    ExpeditionStore.addChangeListener(this.onData);
    if(ExpeditionStore.list().length === 0){
      ExpeditionActions.list();
    }
  }

  componentWillUnmount(){
    this.valid = false;
    ExpeditionStore.removeChangeListener(this.onData);
  }


  render(){

    console.log(this.state.expeditions);

    return (
      <div>
        {
          this.state.expeditions.map((entry, i)=>{
            return (
              <SWEExpeditionCard
                key={entry.id}
                id={entry.id}
                name={entry.name}
                startDate={entry.start_date}
                endDate={entry.end_date}
                minJump={entry.min_jump}
                description={entry.description}
                isMovie={entry.teaser_is_movie}
                image={entry.teaser_image}
                />
            );
          })
        }
      </div>
    );
  }

}
