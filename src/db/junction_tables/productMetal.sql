CREATE TABLE Product_Metal (
  product_id INT REFERENCES Products(Prod_Id),
  metal_id INT REFERENCES Metals(Metal_Id),
  PRIMARY KEY (product_id, metal_id)
);
