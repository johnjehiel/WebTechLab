const mysql = require("mysql2");
const readline = require("readline");

// Create a connection to the MySQL database
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "supermarket",
});

// Connect to the database
connection.connect((error) => {
	if (error) {
		console.error("Failed to connect to the database:", error);
		process.exit(1);
	}
});

// Create readline interface 
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Function to search for products based on ID or name
function searchProducts() {
	rl.question("Enter product ID or name to search: ", (searchInput) => {
		rl.pause();
		// Query the database for products matching the search input
		const query = `SELECT * FROM products WHERE id = ? OR name LIKE ?`;
		connection.query(
			query,
			[searchInput, `%${searchInput}%`],
			(error, results) => {
				if (error) {
					console.error("Error executing the query:", error);
					rl.close();
					return;
				}

				if (results.length === 0) {
					console.log("No products found matching the search input.");
				} else {
					// Sort the results by price in ascending order
					results.sort((a, b) => a.price - b.price);

					// Display the results in table format
					console.log("\nProduct Details:");
					console.log(" ");
					results.forEach((product) => {
						console.log(
							`${product.id}\t${product.name}\t\t${product.brand}\t\t${product.price}`
						);
					});
				}

				promptAction();
			}
		);
	});
}

// Function to display all products
function displayProducts() {
	// Query the database to retrieve all products
	const query = `SELECT id, name, brand, price FROM products`;
	connection.query(query, (error, results) => {
		if (error) {
			console.error("Error executing the query:", error);
			rl.close();
			return;
		}

		if (results.length === 0) {
			console.log("No products found.");
		} else {
			// Display the results in table format
			console.log("\nProduct List:");
			console.log("");
			console.log("ID\tName\t\tBrand\t\tPrice");
			console.log("");
			results.forEach((product) => {
				console.log(
					`${product.id}\t${product.name}\t\t${product.brand}\t\t${product.price}`
				);
			});
		}

		promptAction();
	});
}

// Function to add a new product
function addProduct() {
	rl.question("Enter product name: ", (name) => {
		rl.question("Enter product brand: ", (brand) => {
			rl.question("Enter product price: ", (price) => {
				rl.pause(); // Pause the readline interface
				// Insert the new product into the database
				const query = `INSERT INTO products (name, brand, price) VALUES (?, ?, ?)`;
				connection.query(query, [name, brand, price], (error) => {
					if (error) {
						console.error("Error adding the product:", error);
					} else {
						console.log("Product added successfully.");
					}
					promptAction();
				});
			});
		});
	});
}

// Function to delete a product
function deleteProduct() {
	rl.question("Enter the ID of the product to delete: ", (id) => {
		rl.pause(); // Pause the readline interface
		// Delete the product from the database
		const query = ` DELETE FROM products WHERE id = ?`;
		connection.query(query, [id], (error) => {
			if (error) {
				console.error("Error deleting the product:", error);
			} else {
				console.log("Product deleted successfully.");
			}

			promptAction();
		});
	});
}

// Function to prompt for the next action
function promptAction() {
	console.log("\nChoose an action:");
	console.log("1. Search for products");
	console.log("2. Display all products");
	console.log("3. Add a product");
	console.log("4. Delete a product");
	console.log("5. Exit");

	rl.question("Enter your choice: ", (choice) => {
		switch (choice) {
			case "1":
				searchProducts();
				break;
			case "2":
				displayProducts();
				break;
			case "3":
				addProduct();
				break;
			case "4":
				deleteProduct();
				break;
			case "5":
				console.log("Goodbye!");
				connection.end(); // Close the database connection 
				rl.close();
				break;
			default:
				console.log("Invalid choice. Please try again.");
				promptAction();
		}
	});
}
