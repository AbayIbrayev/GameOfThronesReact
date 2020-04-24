import React, { Component } from "react";
import "./charDetails.css";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const Field = ({ char, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{char[field]}</span>
    </li>
  );
};
export { Field };

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
    const { char, error, loading } = this.state;
    if (!char && error) {
      return <ErrorMessage />;
    } else if (!char) {
      return <span className="select-error">Please select an item</span>;
    }

    const { name } = char;

    if (loading) {
      return (
        <div className="char-details rounded">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { char });
          })}
        </ul>
      </div>
    );
  }
}
