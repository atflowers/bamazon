# **bamazon App**

## Bamazon instruction video link
https://youtu.be/CenbVeJxKMI

## Instructions
Launch a terminal (CLI) of choice (e.g., in Windows press *Crtl+R*) and navigate to the applications folder.

### bamazonCustomer.js
Launch the program by typing *node bamazonCustomer.js* and press *Enter* or *Return* key.
1. Type the *id* of the product that you would like to purchase and press *Enter* or *Return* key.
1. Type the *quantity* of the product that you would like purchase and press *Enter* or *Return* key.
	1. If the selected quantity is greater than what is in stock, your order will not be processed.
	1. If there is available stock, your total will be displayed.

### bamazonManager.js
Launch the program by typing *node bamazonManager.js* and press *Enter* or *Return* key. The following are **four menu options** to choose from:
1. **View Products for Sale**
	1. Type *1* and press *Enter* or *Return* key.
	1. The program will query every item available for sale. The following item properties will display:
		1. ID
		1. Description
		1. Prices
		1. Quantities
1. **View Low Inventory**
	1. Type *2* and press *Enter* or *Return* key.
	1. Every item with a stock quantity less than five will display.
1. **Add to Inventory**
	1. Type *3* and press *Enter* or *Return* key.
	1. Type the *id* of the product that you would like to add more inventory to and press *Enter* or *Return* key.
	1. Type the *quantity* of the product that you would like to add to stock and press *Enter* or *Return* key.
1. **Add New Product**
	1. Type *4* and press *Enter* or *Return* key.
	1. Type the item *name* of the product and press *Enter* or *Return* key.
	1. Type the *department* name that product will be stored and press *Enter* or *Return* key.
	1. Type the unit *price* of the product and press *Enter* or *Return* key.
	1. Type the *quantity* of product will be placed in inventory and press *Enter* or *Return* key.