import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import CharacterPage from "../characterPage";
import styled from "styled-components";
import ErrorMessage from "../errorMessage";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import GotService from "../../services/gotService";

export default class App extends Component {
  gotService = new GotService();
  state = {
    showRandomChar: true,
    error: false,
    selectedItem: null,
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
    const { error, showRandomChar, selectedItem } = this.state;

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
          <Row>
            <Col md="6">
              <ItemList
                onCharSelected={this.onCharSelected}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => item.name}
              />
            </Col>
            <Col md="6">
              <CharDetails charId={selectedItem} />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList
                onCharSelected={this.onCharSelected}
                getData={this.gotService.getAllHouses}
                renderItem={(item) => item.name}
              />
            </Col>
            <Col md="6">
              <CharDetails charId={selectedItem} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
