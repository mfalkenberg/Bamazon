var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("🦄 connected as id " + connection.threadId + "\n");
  readProducts();
});

function readProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
	if (err) {
		console.log("🛑 database error: " +err);
		return;
	}
    console.log(res);
    buyProducts();
  });
}

function buyProducts() {
	console.log("Welcome to Bamazon");
	inquirer.prompt([
		{
			name: "item_id",
			type: "input",
			message: "Please select the item_id for the product you want to purchase!"
		},
		{
			name: "stock_quantity",
			type: "input",
			message: "Please select how many units you want to purchase!" 
		}])
		.then(function(answer){
			
			// create a query to read stock_quantity and price for the given item_id
			var query = "SELECT stock_quantity, price FROM products WHERE ?";
			
			// execute query against the database
			connection.query(query, {item_id: answer.item_id}, function(err, res) {
				if (err) {
					console.log("🛑 database error: " +err);
					return;
				}
				// did the query return any data when not the item is wrong
				if (res.length == 0) {
					console.log("Wrong item_id");
				} else {
					// check user input stock_quantity with database stock_quantity
					if (answer.stock_quantity > res[0].stock_quantity) {
						console.log("Insufficient quantity!");
					} else { 
						// UPDATE products SET stock_quantity = 100 WHERE item_id = 30;
						var updateQuery = "UPDATE products SET ? WHERE ?";
						// calculate the new stock_quantity in the database
						var newQuantity = res[0].stock_quantity - answer.stock_quantity;
						// update the stock_quantity in the database
						connection.query(updateQuery, [
							{
								stock_quantity: newQuantity
							},
							{
								item_id: answer.item_id
							}
							]);

						// calculate the total cost for the order
						var purchase = answer.stock_quantity * res[0].price
						console.log("Your total cost for the purchase is " + purchase);
					}
					// closing the connection to the database
					connection.end();
				}
			});
		});
}