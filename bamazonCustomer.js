var mysql = require('mysql');
var inquirer = require('inquirer');

var config = {
    host: 'localhost',
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'noneya',
    database: 'bamazon'
}

var connection = mysql.createConnection(config);

connection.connect( function(err) {
    if (err) throw err;
    // console.log('connected as id ' + connection.threadId);

    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        // console.log(res);
        res.forEach(function (row) {
            // console.log(`${row.item_id}: ${row.product_name}, ${row.department_name}, ${row.price}, ${row.stock_quantity}`);
            console.log(`${row.item_id}: ${row.product_name}, $${row.price}`);
        })

        start(res);
    });
});

// connection.end();

// function which prompts the user for what action they should take
function start(results) {
    inquirer
        .prompt([
        // {
        //     name: 'productChoice',
        //     type: 'rawlist',
        //     message: 'Choose the ID of a product that you would like to purchase.',
        //     choices: function () {
        //         var choiceArray = [];
        //         for (var i = 0; i < results.length; i++) {
        //             choiceArray.push(results[i].product_name);
        //         }
        //         return choiceArray;
        //     }
        // },
        {
            name: 'productChoice',
            type: 'input',
            message: 'Choose the ID of a product that you would like to purchase.'
        },        
        {
            name: 'purchaseQuantity',
            type: 'input',
            message: 'Choose the quantity that you would like to purchase.'
        }
        ]).then(function(answer) {
            // based on their answer, either... or...
            // console.log(answer);
            var sel = results[answer.productChoice - 1];
            // console.log(sel.stock_quantity);
            if (sel.stock_quantity < answer.purchaseQuantity) {
                console.log('Insufficient quantity!');
            } else {
                var updatedQuantity = sel.stock_quantity - answer.purchaseQuantity;
                // 20170726-2:24:30
                var query = 'UPDATE products SET ? WHERE ?';
                connection.query(query, [
                    {
                        stock_quantity: updatedQuantity
                    },
                    {
                        item_id: sel.item_id
                    }
                ], function (err, data) {
                    if (err) {
                        throw err;
                    } else {
                        var total = sel.price * answer.purchaseQuantity;
                        console.log('       Your total is $' + total + '. Would you like to pay with cash or check?');
                    }
                });
            }
        })
}