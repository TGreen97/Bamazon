USE Bamazon;

CREATE TABLE Products(
	ItemID INTEGER(11) AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    DeptName VARCHAR(100) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INTEGER(11) DEFAULT 0,
    PRIMARY KEY (ItemID)
);

INSERT INTO Products(ProductName, DeptName, Price, StockQuantity)
VALUES ("Bass-o-Matic", "Home Goods", 49.95, 100);

INSERT INTO Products(ProductName, DeptName, Price, StockQuantity)
VALUES ("Colon Blow", "Grocery", 4.59, 500);

INSERT INTO Products(ProductName, DeptName, Price, StockQuantity)
VALUES ("Schmitts", "Grocery", 8.99, 300);

INSERT INTO Products(ProductName, DeptName, Price, StockQuantity)
VALUES ("Bag O'Glass", "Handmade", 19.79, 150);

INSERT INTO Products(ProductName, DeptName, Price, StockQuantity)
VALUES ("Compulsion", "Personal Care", 29.98, 100);

INSERT INTO Products(ProductName, DeptName, Price, StockQuantity)
VALUES ("Mom Jeans", "Clothing", 18.49, 300);

INSERT INTO Products(ProductName, DeptName, Price, StockQuantity)
VALUES ("Bad Idea Jeans", "Clothing", 24.69, 250);

INSERT INTO Products(ProductName, DeptName, Price, StockQuantity)
VALUES ("Shimmer", "Kitchen", 5.45, 600);

INSERT INTO Products(ProductName, DeptName, Price, StockQuantity)
VALUES ("Tylenol BM", "Health", 13.25, 700);

INSERT INTO Products(ProductName, DeptName, Price, StockQuantity)
VALUES ("Big Brawn", "Health", 14.95, 400);

INSERT INTO Products(ProductName, DeptName, Price, StockQuantity)
VALUES ("John Ham", "Gourmet Grocery", 49.95, 100);

UPDATE Products
SET Price=3.95, StockQuantity=450
WHERE ItemID=10;

UPDATE Products
SET DeptName="Gourmet Food"
WHERE ItemID=10;

SELECT * FROM Products;