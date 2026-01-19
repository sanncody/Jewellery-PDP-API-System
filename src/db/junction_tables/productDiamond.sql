CREATE TABLE product_diamond (
  product_id INT REFERENCES Products(id),
  diamond_id INT REFERENCES Diamonds(id),
  PRIMARY KEY (product_id, diamond_id)
);
