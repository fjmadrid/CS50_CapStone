import React, { Component } from "react";
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
    this.getMessages(1);
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
    axios.get(API_URL + `patient/message/`).then(
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
    axios.post(API_URL+`patient/message/`, {text:this.state.message_text}).then(() => {
      this.setState({message_text: ""});
      this.resetState();
    });
  };

  render() {
    const messages = this.state.messages;
    return (
      <Container style={{ marginTop: "10px" }}>
        <Row>
          <Col><h1 style={{textAlign: "center"}}>Messages</h1></Col>
        </Row>
        <Row style={{backgroundColor:"grey"}}>
          <Col>{this.props.doctor.username}</Col>
          <Col style={{textAlign:"right"}}>Me</Col>
        </Row>
        <Row style={{backgroundColor:"gray"}}>
            <Container style={{overflowY:"scroll", maxHeight:"460px"}}>
              {!messages || messages.length <= 0 ? (
                <div style={{textAlign: "center", paddingTop:"25%"}}>
                  <b>Ops, no one here yet</b>
                </div>
              ) : (
                messages.map(message => {
                  if (message.origin === this.props.patient.id) {
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
        <Row className="mt-3">
          <Col className="col-auto">
            <Button color="primary" onClick={this.resetState}>Refresh</Button>
          </Col>
          <Col className="col-auto">
                <InputGroup>
                  <Input 
                    type="text" 
                    name="message_text" 
                    value={this.props.message_text} 
                    onChange={this.onChange} 
                    placeholder="Type a new message"
                  />
                  <Button color="primary" onClick={this.sendMessage}>Send</Button>
                </InputGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MessageList;