CREATE TABLE Product_Diamond (
  product_id INT REFERENCES Products(Prod_Id),
  diamond_id INT REFERENCES Diamonds(Diamond_Id),
  PRIMARY KEY (product_id, diamond_id)
);
