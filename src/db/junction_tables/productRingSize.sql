CREATE TABLE product_ring_sizes (
  product_id INT REFERENCES Products(id),
  ring_size_id INT REFERENCES Ring_Sizes(id),
  PRIMARY KEY (product_id, ring_size_id)
);
