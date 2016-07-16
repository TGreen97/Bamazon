var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("It is a BEAUtiful day at Bamazon!");
    console.log("You are now connected with us as customer " + connection.threadId);
    start();
})

var start = function() {
  connection.query("SELECT * FROM Products",
    function(err, res) {
      var invTable = new table ({
        head: ['ItemID', "Product Name", "Department","Price", "Quantity"],
        colWidths: [8, 20, 15, 10, 10]
      });

      for (var i = 0; i < res.length; i++) {
        var inventory = [res[i].ItemID, res[i].ProductName, res[i].DeptName, res[i].Price, res[i].StockQuantity];
        invTable.push(inventory);
      }
      console.log(invTable.toString());
      buyer();
  });
};

var buyer = function() {
    inquirer.prompt([{
        name: "purchaseItem",
        type: "input",
        message: "\nWhat can we help you with today?\n Please enter the ItemID of the item you wish to purchase: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            console.log("Oops. ItemID numbers only, please.");
            return false;
          }
        }
    }, {
        name: "quantityReq",
        type: "input",
        message: "How many of those would you like?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            console.log("Oops. Number quantities only, please.")
            return false;
          }
        }
    }]).then(function(answer) {
        var itemInventory = parseInt(answer.quantityReq);
        connection.query("SELECT * FROM Products WHERE ?",{
            ItemID: answer.purchaseItem
          }, function(err, data) {
            if (err) throw err;
            if (data[0].StockQuantity < itemInventory) {
              console.log("\nHmm, it looks like we have insufficient inventory on that item to complete your purchase.\n");
              start();
            } else {
                var updateInv = data[0].StockQuantity - itemInventory;
                var purchasePrice = data[0].Price * itemInventory;
                connection.query("UPDATE Products SET ? WHERE ?", [{
                    StockQuantity: updateInv
                }, {
                    ItemID: answer.purchaseItem
                }], function(err, res) {
                    if (err) throw err;
                    console.log("\nSuccess! Your purchase is confirmed\n");
                    console.log("Total purchase price is USD$ " + purchasePrice);
                    start();

            });
           }
        });
    });
};