import React, { Component } from "react";
import { Card, CardText, Col, Container, Row } from "reactstrap";
import {PaginationControl} from "react-bootstrap-pagination-control";
import NewMessageModal from "./NewMessageModal";


import axios from "axios";
import { API_URL } from "../constants";

class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            count: 0,    
            messages: []
        };
    }

  componentDidMount() {
    this.getMessages(1);
  }

  componentDidUpdate(prevProps, prevState)
  {
    if (prevProps.patient.id !== this.props.patient.id)
      this.getMessages(1);
  }

  range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
  }

  num_pages() {    
    return Math.ceil(this.state.count / 10)
  }

  getMessages = (page=1) => {
    axios.get(API_URL + `doctor/message/${this.props.patient.id}/?page=${page}`).then(
      res => {
        this.setState({
          messages: res.data.results,
          count: res.data.count,
          page: page,
      });
    })
  };
  
  resetState = () => {
    this.getMessages(this.state.page);
  };

  render() {
    const messages = this.state.messages;
    return (
      <Container style={{ marginTop: "10px" }}>
        <Row>
          <Col><h1 style={{textAlign: "center"}}>Messages</h1></Col>
        </Row>
        <Row>
          <Col>Patient {this.props.patient.username}</Col><Col style={{textAlign:"right"}}>Me</Col>
        </Row>
        <Row style={{backgroundColor:"lightgray"}}>
            <Container style={{overflowY:"scroll", height:"460px"}}>
              {!messages || messages.length <= 0 ? (
                <div style={{textAlign: "center"}}>
                    <b>Ops, no one here yet</b>
                </div>
              ) : (
                messages.toReversed().map(message => {
                  if (message.origin === this.props.doctor.id) {
                    return (
                        <Card className="w-75" style={{float:"right", backgroundColor:"lightgreen", marginTop:"5px"}}>
                          <CardText style={{fontSize:"75%", paddingLeft:"5px", paddingRight:"5px"}}>{message.text}</CardText>                            
                          <CardText style={{fontSize:"50%", textAlign:"right", marginTop:"-20px", paddingRight:"5px"}}>{message.date}</CardText>
                        </Card>
                    );
                  }
                  else {
                    return (                     
                          <Card className="w-75" style={{float:"left", backgroundColor:"grey", marginTop:"5px"}}>                            
                            <CardText style={{fontSize:"75%", paddingLeft:"5px", paddingRight:"5px"}}>{message.text}</CardText>                            
                            <CardText style={{fontSize:"50%", textAlign:"right", marginTop:"-20px", paddingRight:"5px"}} >{message.date}</CardText>                            
                          </Card>
                    );
                  }
                })
              )}
            </Container>
        </Row>
        <Row className="mt-3">
          <Col className="col-auto">
            <NewMessageModal
              patient={this.props.patient} 
              resetState={this.resetState} />
          </Col>
          <Col className="col-auto">
            <PaginationControl
              page={this.state.page}
              between={4}
              total={this.state.count}
              limit={10}
              changePage={(p)=>this.getMessages(p)}
              ellipsis={1}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MessageList;