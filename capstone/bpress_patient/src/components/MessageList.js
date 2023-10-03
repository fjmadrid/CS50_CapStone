import React, { Component } from "react";
import { Card, CardText, CardBody, CardFooter, Col, Container, Row, Table } from "reactstrap";
import {PaginationControl} from "react-bootstrap-pagination-control";
import NewMessageModal from "./NewMessageModal";


import axios from "axios";
import { API_URL } from "../constants";

class MessageList extends Component {
  
  state = {
    page: 1,
    count: 0,    
    messages: []
  };

  componentDidMount() {
    this.getMessages(1);
  }

  range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
  }

  num_pages() {    
    return Math.ceil(this.state.count / 10)
  }

  getMessages = (page=1) => {
    axios.get(API_URL + `patient/message/?page=${page}`).then(
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
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col><h1 style={{textAlign: "center"}}>Messages</h1></Col>
        </Row>
        <Row>
          <Col>Doctor {this.props.doctor.username}</Col><Col style={{textAlign:"right"}}>Me</Col>
        </Row>
        <Row style={{height:"75%", backgroundColor:"darkblue"}}>            
            <Container style={{overflowY:"scroll", maxHeight:"500px"}}>
              {!messages || messages.length <= 0 ? (
                <div style={{textAlign: "center"}}>
                    <b>Ops, no one here yet</b>
                </div>
              ) : (
                messages.toReversed().map(message => {
                  if (message.origin === this.props.patient.id) {
                    return (
                        <Card className="w-75" style={{float:"right", backgroundColor:"lightgreen"}}>
                          <CardBody>
                            <CardText style={{fontSize:"75%"}}>{message.text}</CardText>                            
                          </CardBody>
                          <CardFooter style={{fontSize:"50%", textAlign:"left"}}>{message.date}</CardFooter>
                        </Card>
                    );
                  }
                  else {
                    return (                     
                          <Card className="w-75" style={{float:"left", backgroundColor:"grey"}}>
                            <CardBody>
                              <CardText style={{fontSize:"75%"}}>{message.text}</CardText>                            
                            </CardBody>
                            <CardFooter style={{fontSize:"50%", textAlign:"left"}} >{message.date}</CardFooter>
                          </Card>
                    );
                  }
                })
              )}
            </Container>
        </Row>
        <Row>
            <PaginationControl
              page={this.state.page}
              between={4}
              total={this.state.count}
              limit={10}
              changePage={(p)=>this.getMessages(p)}
              ellipsis={1}
            />
        </Row>
        <Row>
          <Col>
          <NewMessageModal resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MessageList;