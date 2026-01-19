CREATE TABLE Product_Metal (
  product_id INT REFERENCES Products(id),
  metal_id INT REFERENCES Metals(id),
  PRIMARY KEY (product_id, metal_id)
);
