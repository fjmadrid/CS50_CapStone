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
  var [text, setText] = useState({ text: "" });

  function getMessages(patient_id) {
    axios.get(API_URL + `doctor/message/${patient_id}/`).then((res) => {
      setMessages(res.data);
    });
  }

  useEffect(() => {
    getMessages(props.patient.id);
  }, [props]);

  function resetState() {
    getMessages(props.patient.id);
  }

  function sendMessage(e) {
    e.preventDefault();
    axios
      .post(API_URL + `doctor/message/${props.patient.id}/`, text)
      .then(() => {
        setText({ text: "" });
        resetState();
      });
  }

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
            <Col>{props.patient.username}</Col>
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
                  if (message.origin === props.doctor.id) {
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
              value={text.text}
              onChange={(e) => {
                setText({ text: e.target.value });
              }}
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
