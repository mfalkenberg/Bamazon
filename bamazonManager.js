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
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })

    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;
        case "View Low Inventory":
          lowInvent();
          break;

        case "Add to Inventory":
          addInvent();
          break;

        case "Add New Product":
          addProduct();
          break;
      }
    });
}

function viewProducts() {
   connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
      console.log("🛑 database error: " + err);
      return;
    }
    console.log(res);
  });
}

function lowInvent() {
  connection.query("SELECT item_id FROM products WHERE stock_quantity < 5", function(err, res) {
    console.log(res);
  });
}

function addInvent(){
  // select quantity from ...
  var currentQuantity;
  // query(,function(error,res){
    // currentQuantity = res[0].stock_quantity;

  //})
  inquirer.prompt([
    {
      name: "item_id",
      type: "input",
      message: "Please select the item_id you want to add"
    },
    {
      name: "stock_quantity",
      type: "input",
      message: "Please select how many units you want to add!" 
    }])
    .then(function(answer) {
      var query = "UPDATE products SET ? WHERE ?";
      //var newQuantity = currentQuantity + answer.stock_quantity;
      connection.query(query, [
        {
          stock_quantity: newQuantity
        },
        {
          item_id: answer.item_id
        }, function(err, res) {
          // 
          console.log("done");
        }
      ]);
    });
}

function addProduct() {
  inquirer.prompt([
    {
      name: "item_id",
      type: "input",
      message: "Please select the item_id you want to add"
    },
    {
      name: "stock_quantity",
      type: "input",
      message: "Please select how many units you want to add!" 
    },
    {
      name: "department_name",
      type: "input",
      message: "Please select department you want to add!" 
    },
    {
      name: "price",
      type: "input",
      message: "Please select the price you want to add!" 
    },
    {
      name: "product_name",
      type: "input",
      message: "Please select product_name you want to add!" 
    }
  ])
  .then(function(answer) {
    var query = "INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES (?)";
  
    connection.query(query,
      [
        [
          parseInt(answer.item_id), 
          answer.product_name, 
          answer.department_name, 
          parseFloat(answer.price), 
          parseInt(answer.stock_quantity)
        ]
      ]
    );
    viewProducts();
  });  
}



