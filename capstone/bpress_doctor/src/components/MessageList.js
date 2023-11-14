import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, CardText, Col, Container, Row, Input, InputGroup } from "reactstrap";
import Dayjs from "dayjs";


import axios from "axios";
import { API_URL } from "../constants";

class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message_text: ""
        };
    }

  componentDidMount() {
    this.getMessages();
  }

  componentDidUpdate(prevProps, prevState)
  {
    if (prevProps.patient.id !== this.props.patient.id)
      this.getMessages();
  }

  range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
  }


  getMessages = () => {
    axios.get(API_URL + `doctor/message/${this.props.patient.id}/`).then(
      res => {
        this.setState({
          messages: res.data
      });
    })
  };
  
  resetState = () => {
    this.getMessages();
  };
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendMessage = e => {
    e.preventDefault();
    axios.post(API_URL+`doctor/message/${this.props.patient.id}/`, {text:this.state.message_text}).then(() => {
      this.setState({message_text: ""});
      this.resetState();
    });
  };

  render() {
    const messages = this.state.messages;
    return (
      <Container style={{ marginTop: "10px", backgroundColor:"lightblue" }}>
        <Row>
          <Col><h1 style={{textAlign: "center"}}>Messages</h1></Col>
        </Row>
        <Row style={{height:"538px"}}>
        <Container>
        <Row style={{backgroundColor:"gray"}}>
          <Col>{this.props.patient.username}</Col>
          <Col style={{textAlign:"right"}}>Me</Col>
        </Row>
        <Row style={{backgroundColor:"gray"}}>
            <Container style={{overflowY:"scroll", height:"497px"}}>
              {!messages || messages.length <= 0 ? (
                <div style={{textAlign: "center", paddingTop:"25%"}}>
                    <b>Ops, no one here yet</b>
                </div>
              ) : (
                messages.map(message => {
                  if (message.origin === this.props.doctor.id) {
                    return (
                        <Card key={message.id} className="w-75" style={{float:"right", backgroundColor:"lightgreen", marginTop:"5px"}}>
                          <CardText style={{fontSize:"75%", paddingLeft:"5px", paddingRight:"5px"}}>{message.text}</CardText>                            
                          <CardText style={{fontSize:"50%", textAlign:"right", marginTop:"-20px", paddingRight:"5px"}}>{Dayjs(message.date).format('DD/MM/YY H:mm')}</CardText>
                        </Card>
                    );
                  }
                  else {
                    return (                     
                          <Card key={message.id} className="w-75" style={{float:"left", backgroundColor:"lightgrey", marginTop:"5px"}}>                            
                            <CardText style={{fontSize:"75%", paddingLeft:"5px", paddingRight:"5px"}}>{message.text}</CardText>                            
                            <CardText style={{fontSize:"50%", textAlign:"right", marginTop:"-20px", paddingRight:"5px"}} >{Dayjs(message.date).format('DD/MM/YY H:mm')}</CardText>                            
                          </Card>
                    );
                  }
                })
              )}
            </Container>
        </Row>
        </Container>
        </Row>
        <Row className="pb-3">          
          <Col className="col-10">
                <InputGroup>
                  <Input 
                    type="text" 
                    name="message_text" 
                    value={this.props.message_text} 
                    onChange={this.onChange} 
                    placeholder="Type a new message"
                  />
                  <Button color="primary" onClick={this.sendMessage}>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                  </Button>
                </InputGroup>
          </Col>
          <Col className="col-1">
            <Button color="primary" onClick={this.resetState}>
              <FontAwesomeIcon icon={faArrowsRotate}/>
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MessageList;