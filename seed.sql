CREATE DATABASE bamazon;

CREATE TABLE products (
	item_id integer (11) AUTO_INCREMENT NOT NULL,
    product_name varchar (255) NOT NULL,
    department_name varchar (255) NOT NULL,
    price decimal (20,2) NOT NULL,
    stock_quantity integer (50) NOT NULL,
    Primary Key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
	('shovel', 'tool', '25', '1015'),
	('trowel', 'tool', '9', '25'),
	('trousers', 'clothing', '6', '78'),
	('rations', 'food', '6', '9025'),
	('tv', 'electronics', '2201', '7'),
	('buzz lightyear', 'toy', '10', '13'),
	('much ado about nothing', 'book', '1', '2'),
	('much ado about nothing', 'dvd', '8', '3'),
	('trampoline', 'fitness', '990', '11'),
	('kazoo', 'music', '0.31', '997'),
	('cane', 'pharmacy', '10', '7'),
	('plantain', 'food', '1.13', '24'),
	('Glue', 'School', '3.01', '64'),
	('gogurt', 'Food', '2.25', '9999');