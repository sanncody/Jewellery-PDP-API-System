CREATE TABLE Product_RingSizes (
  product_id INT REFERENCES Products(Prod_Id),
  ring_size_id INT REFERENCES Ring_Sizes(Ring_Id),
  PRIMARY KEY (product_id, ring_size_id)
);
