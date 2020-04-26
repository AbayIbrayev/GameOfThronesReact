import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import { CharacterPage, BooksPage, HousesPage, BooksItem } from "../pages";
import styled from "styled-components";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.css";

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
    const H1 = styled.h1`
      color: #ffffff;
    `;

    if (error) {
      return <ErrorMessage />;
    }

    const char = showRandomChar ? <RandomChar /> : null;

    return (
      <Router>
        <div className="app">
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
            <Route
              path="/"
              exact
              component={() => <H1>Welcome to the GoT DB!</H1>}
            />
            <Route path="/characters" component={CharacterPage} />
            <Route path="/houses" component={HousesPage} />
            <Route path="/books" exact component={BooksPage} />
            <Route
              path="/books/:id"
              render={({ match }) => {
                const { id } = match.params;
                return <BooksItem bookId={id} />;
              }}
            />
          </Container>
        </div>
      </Router>
    );
  }
}
