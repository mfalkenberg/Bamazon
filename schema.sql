DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	item_id INT NULL,
	product_name VARCHAR(30) NULL,
	department_name VARCHAR(30) NULL,
	price DECIMAL(10,2),
	stock_quantity INT NULL,
	PRIMARY KEY (id) 
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (11, "Pink Socks", "Socks", 5.50, 90);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (13, "Green Pants", "Bottom", 19.50, 80);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (16, "Red Sweeter", "Top", 35.50, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (18, "Blue Socks", "Socks", 6.50, 99);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (20, "Pink Underwear", "Bottom", 10.50, 70);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (30, "White Pants", "Bottom", 75.50, 90);

SELECT * FROM products;
-- SELECT item_id, product_name
-- FROM products
-- WHERE item_id = 15;

UPDATE products SET stock_quantity = 100 WHERE item_id = 30;

SELECT * FROM products;