import React, { Component } from "react";
import "./itemDetails.css";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};
export { Field };

export default class CharDetails extends Component {
  gotService = new GotService();

  state = {
    item: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  onItemLoaded = (item) => {
    this.setState({ item, loading: false });
  };

  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }

    this.setState({ loading: true });

    getData(itemId).then(this.onItemLoaded);
  }

  onError() {
    this.setState({
      item: null,
      error: true,
    });
  }

  render() {
    const { item, error, loading } = this.state;
    if (!item && error) {
      return <ErrorMessage />;
    } else if (!item) {
      return <span className="select-error">Please select an item</span>;
    }

    const { name } = item;

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
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    );
  }
}
