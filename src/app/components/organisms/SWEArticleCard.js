import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


export default class SWEArticleCard extends Component {


  propTypes: {
    avatar: React.PropTypes.string
  };

  render(){

    var admin = true;

    return (
      <Card className="articlecard feeditem">
        <CardActions>
          {
            admin === true ?
            <FlatButton label="Admin" />
            : null
          }
        </CardActions>
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          avatar="assets/images/logo.png"
          />
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
          >
          <img src="images/nature-600-337.jpg" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  }

}
