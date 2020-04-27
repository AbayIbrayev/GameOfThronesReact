import React, { Component } from "react";
import "./itemList.css";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import PropTypes from "prop-types";
import GotService from "../../services/gotService";

class ItemList extends Component {
  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    const { data } = this.props;

    const items = this.renderItems(data);

    return <ul className="item-list list-group">{items}</ul>;
  }
}

const withData = (View, getData) => {
  return class extends Component {
    state = {
      data: null,
      error: false,
    };

    static defaultProps = {
      onItemSelected: () => {},
    };

    static propTypes = {
      onItemSelected: PropTypes.func,
    };

    componentDidMount() {
      getData()
        .then((data) => {
          this.setState({
            data,
            // error: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.onError();
        });
    }

    componentDidCatch() {
      this.setState({
        error: true,
        data: null,
      });
    }

    onError(status) {
      this.setState({
        data: null,
        error: true,
      });
    }

    render() {
      const { data, error } = this.state;

      if (error) {
        return <ErrorMessage />;
      }

      if (!data) {
        return <Spinner />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};
const { getAllCharacters } = new GotService();
export default withData(ItemList, getAllCharacters);
