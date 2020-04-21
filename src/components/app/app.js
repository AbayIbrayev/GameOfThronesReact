import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import CharacterPage from "../characterPage";
import styled from "styled-components";
import ErrorMessage from "../errorMessage";

export default class App extends Component {
  state = {
    showRandomChar: true,
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

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
      border-radius: 0.25rem !important;
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
          <CharacterPage />
        </Container>
      </>
    );
  }
}
