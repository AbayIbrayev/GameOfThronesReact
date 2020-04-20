import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import styled from "styled-components";
import ErrorMessage from "../errorMessage";

export default class App extends Component {
  state = {
    showRandomChar: true,
    error: false,
  };

  toggleRandomChar = () => {
    this.setState((state) => {
      return {
        showRandomChar: !state.showRandomChar,
      };
    });
  };

  render() {
    const { error, showRandomChar } = this.state;

    const Button = styled.button`
      margin-bottom: 40px;
      padding: 12px 14px;
      background-color: #ffffff;
      border: 1px solid #111111;
    `;

    if (error) {
      return <ErrorMessage />;
    }

    const char = showRandomChar ? <RandomChar /> : null;

    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>{char}</Col>
          </Row>
          <Button onClick={this.toggleRandomChar}>
            Toggle Random Character
          </Button>
          <Row>
            <Col md="6">
              <ItemList />
            </Col>
            <Col md="6">
              <CharDetails />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
