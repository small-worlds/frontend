import React, {Component} from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import TextField from "material-ui/TextField";
import Slider from 'material-ui/Slider';
import {SketchPicker} from "react-color";
import {browserHistory} from "react-router";
import BadgeGenerator from "../../utility/BadgeGenerator";
import FlowActions from "../../actions/FlowActions";
import FileSaver from "../../utility/FileSaver";



export default class SWEBadgeGeneratorPage extends Component {

  constructor(){
    super();
    this.state = {
      outlineColor: "",
      borderColor: "",
      fontColor: "",
      name: "",
      title: "",
      image: "",
      imageScale: 1,
      fontSize: 50
    };

    this.badge = null;
    this.timer = null;
  }

  update(){

    if(this.timer !== null){
      return;
    }

    this.timer = setTimeout(()=>{
      this.badge.set(this.state);
      this.badge.make();
      this.timer = null;
    },500);
  }

  changeListener(e){
    var data = {};
    data[e.target.id] = e.target.value;
    this.setState(data);

    this.update();
  }

  componentDidMount(){
    this.badge = new BadgeGenerator(this.refs.badge, this.state);
    this.badge.make();
  }

  componentWillUnmount(){

  }

  pickImage(){

    var url = "";

    FlowActions.dialog({
      title: "Pick Image",
      children: (
        <TextField
          id="url"
          hintText="Image URL"
          type="text"
          onChange={(e)=>{
            url = e.target.value;
          }}
          />
      ),
      onConfirm: ()=>{
        this.setState({image: url});
        this.update();
      }
    });

  }

  pickColor(type){

    var prevColor = this.state[type];

    FlowActions.dialog({
      title: "Pick Color",
      children: (
        <SketchPicker
          color={prevColor}
          onChangeComplete={(color)=>this.setColor(type, color.hex)}
          />
      ),
      onCancel: ()=>this.setColor(type, prevColor)
    });
  }

  setColor(type, val){
    var form = {};
    form[type] = val;
    this.setState(form);
    this.update();
  }

  setFontSize(e, value){
    var size = Math.max(Math.ceil(value*100), 1);
    this.setState({fontSize: size});
    this.update();
  }

  setImageSize(e, value){
    var size = 4 * value + 0.1;
    this.setState({imageScale: size});
    this.update();
  }

  save(){
    var canvas = this.refs.badge;
    canvas.toBlob(
      function(blob) {
        FileSaver.saveAs(blob, "badge.png");
      },
      "image/png"
    );
  }

  render(){
    return (
      <Card className="articlepage">
        <CardHeader
          title="Badge Designer"
          avatar="/assets/images/logo.png"
          />
        <CardMedia id="badge">
          <canvas ref="badge"/>
        </CardMedia>
        <form>
          <CardText onChange={(e)=>this.changeListener(e)}>

            <TextField
              id="name"
              hintText="CMDR"
              type="text"
              />
            <br/>

            <TextField
              id="title"
              hintText="Title"
              type="text"
              />
            <br/>

            <TextField
              id="outlineColor"
              hintText="Primary Color"
              type="text"
              value={this.state.outlineColor}
              onTouchTap={()=>this.pickColor("outlineColor")}
              />
            <br/>

            <TextField
              id="borderColor"
              hintText="Border Color"
              type="text"
              value={this.state.borderColor}
              onTouchTap={()=>this.pickColor("borderColor")}
              />
            <br/>

            <TextField
              id="fontColor"
              hintText="TextColor"
              type="text"
              value={this.state.fontColor}
              onTouchTap={()=>this.pickColor("fontColor")}
              />
            <br/>

            <p>Text Size</p>
            <Slider
              id="fontSize"
              defaultValue={0.5}
              onChange={(e,v)=>this.setFontSize(e,v)}
              />


            <p>Image Size</p>
            <Slider
              id="imageScale"
              defaultValue={0.5}
              onChange={(e,v)=>this.setImageSize(e,v)}
              />

          </CardText>
        </form>
        <CardActions>
          <FlatButton
            label="Image"
            onTouchTap={()=>this.pickImage()}
            />
          <FlatButton
            ref="save"
            label="Download"
            onTouchTap={()=>this.save()}
            />
          <FlatButton
            label="Back"
            onTouchTap={()=>browserHistory.goBack()}
            />
        </CardActions>
      </Card>
    );
  }

}
