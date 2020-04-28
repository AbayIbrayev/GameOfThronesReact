import React, { useState, useEffect } from "react";
import "./itemList.css";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

function ItemList({ getData, onItemSelected, renderItem }) {
  const [itemList, updateList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getData()
      .then((data) => {
        setIsLoaded(true);
        updateList(data);
      })
      .catch((err) => {
        console.log(err);
        onError();
      });
  }, []);

  function onError() {
    return <ErrorMessage />;
  }

  function renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = renderItem(item);
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  if (!itemList || !isLoaded) {
    return <Spinner />;
  }

  const items = renderItems(itemList);

  return <ul className="item-list list-group">{isLoaded && items}</ul>;
}

export default ItemList;
