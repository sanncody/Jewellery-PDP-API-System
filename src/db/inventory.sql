CREATE TABLE Inventory (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES Products(Prod_Id),
  metal_id INT REFERENCES Metals(Metal_Id),
  purity_id INT REFERENCES Purity_Levels(id),
  ring_size_id INT REFERENCES Ring_Sizes(Ring_Id),
  quantity INT NOT NULL CHECK (quantity >= 0)
);
