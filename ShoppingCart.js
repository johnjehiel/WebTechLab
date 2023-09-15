import React, { useState } from "react";
import './ShoppingCart.css'

function ShoppingCart() {
	const [selectedItems, setSelectedItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);

	const items = [
		{ id: 1, name: "Laptop", price: 40 },
		{ id: 2, name: "Phone", price: 20 },
		{ id: 3, name: "TV", price: 30 },
		{ id: 4, name: "Speaker", price: 10 },
	];

	const handleSelectItem = (itemId) => {
		const selectedItem = items.find((item) => item.id === itemId);
		setSelectedItems([...selectedItems, selectedItem]);
	};

	const handleAddToCart = () => {
		setCartItems([...cartItems, ...selectedItems]);
		setSelectedItems([]);
	};

	// Calculate total cost of selected items
	const totalCost = selectedItems.reduce(
		(total, item) => total + item.price,
		0
	);

	return (
		<div className="container">
			<h1>Shopping Cart</h1>
			<div className="item-list">
				<h2>Available Items</h2>
				<ul>
					{items.map((item) => (
						<li key={item.id}>
							{item.name} - ${item.price}
							<button onClick={() => handleSelectItem(item.id)}>Select</button>
						</li>
					))}
				</ul>
			</div>
			<div className="selected-items">
				<h2>Selected Items</h2>
				{selectedItems.length === 0 ? (
					<p>No items selected</p>
				) : (
					<ul>
						{selectedItems.map((item) => (
							<li key={item.id}>
								{item.name} - ${item.price}
							</li>
						))}
					</ul>
				)}
			</div>
			<div className="total-cost">
				<h2>Total Cost</h2>
				<p>${totalCost}</p>
			</div>
			<div className="cart">
				<button onClick={handleAddToCart}>Add to Cart</button>
			</div>
      <div className="item-list">
        <h2>Cart items</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} 
            </li> 
          ))}
        </ul>
      </div>
		</div>
	);
}

export default ShoppingCart;
