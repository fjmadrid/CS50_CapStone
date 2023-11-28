import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Card,
  CardText,
  Col,
  Container,
  Row,
  Input,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import Dayjs from "dayjs";

import axios from "axios";
import { API_URL } from "../constants";

function MessageList(props) {
  var [messages, setMessages] = useState([]);
  var [message, setMessage] = useState("");

  const getMessages = () => {
    axios.get(API_URL + `patient/message/`).then((res) => {
      setMessages(res.data);
    });
  };

  const resetState = () => {
    getMessages();
  };

  const onChangeMessageText = (e) => {    
    setMessage(e.target.value);
  };

  const sendMessage = (e) => {    
    axios.post(API_URL + `patient/message/`, { text: message }).then(() => {
      setMessage("");
      resetState();
    });
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <Container style={{ marginTop: "10px", backgroundColor: "lightblue" }}>
      <Row>
        <Col>
          <h1 style={{ textAlign: "center" }}>Messages</h1>
        </Col>
      </Row>
      <Row style={{ height: "538px" }}>
        <Container>
          <Row style={{ backgroundColor: "gray" }}>
            <Col>{props.doctor.username}</Col>
            <Col style={{ textAlign: "right" }}>Me</Col>
          </Row>
          <Row style={{ backgroundColor: "gray" }}>
            <ListGroup
              className="p-1"
              style={{ overflowY: "scroll", height: "497px" }}
            >
              {!messages || messages.length <= 0 ? (
                <ListGroupItem>
                  <div style={{ textAlign: "center", paddingTop: "25%" }}>
                    <b>Ops, no one here yet</b>
                  </div>
                </ListGroupItem>
              ) : (
                messages.map((message) => {
                  if (message.origin === props.patient.id) {
                    return (
                      <ListGroupItem key={message.id}>
                        <Card
                          className="w-75"
                          style={{
                            float: "right",
                            backgroundColor: "lightgreen",
                            marginTop: "5px",
                          }}
                        >
                          <CardText
                            style={{
                              fontSize: "75%",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                            }}
                          >
                            {message.text}
                          </CardText>
                          <CardText
                            style={{
                              fontSize: "50%",
                              textAlign: "right",
                              marginTop: "-20px",
                              paddingRight: "5px",
                            }}
                          >
                            {Dayjs(message.date).format("DD/MM/YY H:mm")}
                          </CardText>
                        </Card>
                      </ListGroupItem>
                    );
                  } else {
                    return (
                      <ListGroupItem key={message.id}>
                        <Card
                          className="w-75"
                          style={{
                            float: "left",
                            backgroundColor: "lightgrey",
                            marginTop: "5px",
                          }}
                        >
                          <CardText
                            style={{
                              fontSize: "75%",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                            }}
                          >
                            {message.text}
                          </CardText>
                          <CardText
                            style={{
                              fontSize: "50%",
                              textAlign: "right",
                              marginTop: "-20px",
                              paddingRight: "5px",
                            }}
                          >
                            {Dayjs(message.date).format("DD/MM/YY H:mm")}
                          </CardText>
                        </Card>
                      </ListGroupItem>
                    );
                  }
                })
              )}
            </ListGroup>
          </Row>
        </Container>
      </Row>
      <Row className="pb-3">
        <Col className="col-10">
          <InputGroup>
            <Input
              type="text"
              name="message_text"
              value={message}
              onChange={onChangeMessageText}
              placeholder="Type a new message"
            />
            <Button color="primary" onClick={sendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </InputGroup>
        </Col>
        <Col className="col-1">
          <Button color="primary" onClick={resetState}>
            <FontAwesomeIcon icon={faArrowsRotate} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MessageList;
