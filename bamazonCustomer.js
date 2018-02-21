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
    	throw err;
    }

    console.log(res);
    connection.end();
  });
}