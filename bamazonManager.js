var mysql = require('mysql');
var inquirer = require('inquirer');

var config = {
    host: 'localhost',
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'lola79',
    database: 'bamazon'
}

var connection = mysql.createConnection(config);

connection.connect( function(err) {
    if (err) throw err;
    // console.log('connected as id ' + connection.threadId);

    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        // console.log(res);
        // res.forEach(function (row) {
        //     // console.log(`${row.item_id}: ${row.product_name}, ${row.department_name}, ${row.price}, ${row.stock_quantity}`);
        //     console.log(`${row.item_id}: ${row.product_name}, $${row.price}`);
        // })

        start(res);
    });
});

// connection.end();

// function which prompts the user for what action they should take
function start(results) {
    inquirer
        .prompt([
        {
            name: 'selection',
            type: 'rawlist',
            message: 'Choose from the following list of options.',
            // choices: function () {
            //     var choiceArray = [];
            //     for (var i = 0; i < results.length; i++) {
            //         choiceArray.push(results[i].product_name);
            //     }
            //     return choiceArray;
            // }
            choices: [
                {name: 'View Products for Sale', value: 1},
                {name: 'View Low Inventory', value: 2},
                {name: 'Add to Inventory', value: 3},
                {name: 'Add New Product', value: 4}
            ]
        }
        // {
        //     name: 'productChoice',
        //     type: 'input',
        //     message: 'Choose the ID of a product that you would like to purchase.'
        // },        
        // {
        //     name: 'purchaseQuantity',
        //     type: 'input',
        //     message: 'Choose the quantity that you would like to purchase.'
        // }
        ]).then(function(answer) {
            // based on their answer, either... or...
            // console.log(answer);
            switch (answer.selection) {
                case 1:
                    results.forEach(function (row) {
                        console.log(`   ${row.item_id}: ${row.product_name}, ${row.department_name}, $${row.price}, ${row.stock_quantity}`);
                    });
                    break;
                case 2:
                     results.forEach(function (row) {
                        if (row.stock_quantity < 5) {
                            console.log(`   ${row.item_id}: ${row.product_name}, ${row.department_name}, ${row.price}, ${row.stock_quantity}`);
                        }
                    });
                    break;
                case 3:
                    inquirer
                        .prompt([
                        {
                            name: 'productChoice',
                            type: 'input',
                            message: 'Choose the ID of a product that you would like to add inventory.'
                        },        
                        {
                            name: 'qtyInc',
                            type: 'input',
                            message: 'Choose the quantity that you would like to add.'
                        }
                        ]).then(function(ans) {
                            //console.log(ans);
                            var sel = results[ans.productChoice - 1];
                            var updatedQuantity = parseFloat(sel.stock_quantity) + parseFloat(ans.qtyInc);
                            var query = 'UPDATE products SET ? WHERE ?';
                            connection.query(query, [
                                {
                                    stock_quantity: updatedQuantity
                                },
                                {
                                    item_id: ans.productChoice
                                }
                            ], function (err, data) {
                                if (err) {
                                    throw err;
                                } else {
                                    
                                }
                            });
                        })
                    break;
                case 4:
                    inquirer
                        .prompt([
                        {
                            name: 'pName',
                            type: 'input',
                            message: 'What is the name of the product?'
                        },
                        {
                            name: 'dept',
                            type: 'input',
                            message: 'In which department is this product located?'
                        },
                        {
                            name: 'unitPrice',
                            type: 'input',
                            message: 'What is the unit price of this product?'
                        }, 
                        {
                            name: 'qty',
                            type: 'input',
                            message: 'How much inventory of this product will be stocked?'
                        }
                        ]).then(function(ans) {
                            //console.log(ans);
                            var query = 'INSERT INTO `bamazon`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES (?, ?, ?, ?)';
                            // var query = 'INSERT INTO products WHERE ?';
                            connection.query(query, [
                                // {
                                //     product_name: ans.pName,
                                //     department_name: ans.dept,
                                //     price: ans.unitPrice,
                                //     stock_quantity: ans.qty
                                // }
                                    ans.pName,
                                    ans.dept,
                                    ans.unitPrice,
                                    ans.qty  
                            ], function (err, data) {
                                if (err) {
                                    throw err;
                                } else {
                                    
                                }
                            });
                        })
                    break;
                default:
                    console.log("Nothing valid was selected.");
            }
            
            // var sel = results[answer.productChoice - 1];
            // // console.log(sel.stock_quantity);
            // if (sel.stock_quantity < answer.purchaseQuantity) {
            //     console.log('Insufficient quantity!');
            // } else {
            //     var updatedQuantity = sel.stock_quantity - answer.purchaseQuantity;
            //     // 20170726-2:24:30
            //     var query = 'UPDATE products SET ? WHERE ?';
            //     connection.query(query, [
            //         {
            //             stock_quantity: updatedQuantity
            //         },
            //         {
            //             item_id: sel.item_id
            //         }
            //     ], function (err, data) {
            //         if (err) {
            //             throw err;
            //         } else {
            //             var total = sel.price * answer.purchaseQuantity;
            //             console.log('       Your total is $' + total + '. Would you like to pay with cash or check?');
            //         }
            //     });
            // }
        })
}