// src/components/Item.js
import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {

  function handleAddToCartClick() {
    const updatedItem = { ...item, isInCart: !item.isInCart };

    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isInCart: updatedItem.isInCart }),
    })
      .then((r) => r.json())
      .then(onUpdateItem);
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          onDeleteItem(item);
        }
      });
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick} className="add">
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button onClick={handleDeleteClick} className="delete">
        Delete
      </button>
    </li>
  );
}

export default Item;
