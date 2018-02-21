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
  buyProducts();
});

function readProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
    	throw err;
    }

    console.log(res);
    
  });
}

function buyProducts () {

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
			console.log(answer.item_id);
			console.log(answer.stock_quantity);
			var query = "SELECT stock_quantity FROM products WHERE ?";
			connection.query(query, {
				item_id: answer.item_id}, function(err, res) {
				if (res.length == 0) {
					console.log("Wrong item_id");
				} else {
					console.log(res[0].stock_quantity);
					if (answer.stock_quantity > res[0].stock_quantity) {
						console.log("Insufficient quantity!");
					} else { 
						// UPDATE products SET stock_quantity = 100 WHERE item_id = 30;
						var updateQuery = "UPDATE products SET ? WHERE ?";
						var newQuantity = res[0].stock_quantity - answer.stock_quantity;
						connection.query(updateQuery, [
							{
								stock_quantity: newQuantity
							},
							{
								item_id: answer.item_id
							}
							]);
						readProducts();
					}
					connection.end();
				}
			});


			
			
		});
}