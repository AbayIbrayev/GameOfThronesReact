import React, { Component } from "react";
import "./charDetails.css";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

export default class CharDetails extends Component {
  gotService = new GotService();

  state = {
    char: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  updateChar() {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.setState({ loading: true });

    this.gotService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(() => this.onError());
  }

  onError() {
    this.setState({
      char: null,
      error: true,
    });
  }

  render() {
    const { char, loading, error } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    if (!char && error) {
      return <ErrorMessage />;
    } else if (!char) {
      return (
        <div className="text-center">
          <span className="select-error">Please select a character</span>
        </div>
      );
    }

    return (
      <div className="char-details rounded">
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;

  return (
    <>
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender</span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born</span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died</span>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture</span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  );
};
