import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import ItemList from "../itemList";
import CharDetails, { Field } from "../charDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";
export default class CharacterPage extends Component {
  gotService = new GotService();

  state = {
    selectedChar: null,
    error: false,
  };

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    });
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    const { selectedChar, error } = this.state;

    if (error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onCharSelected={this.onCharSelected}
        getData={this.gotService.getAllCharacters}
        renderItem={({ name, gender }) => `${name} (${gender})`}
      />
    );

    const charDetails = (
      <CharDetails charId={selectedChar}>
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
      </CharDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
