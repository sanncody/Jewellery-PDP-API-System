CREATE TABLE Inventory (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES Products(id),
  metal_id INT REFERENCES Metals(id),
  purity_id INT REFERENCES Purity_Levels(id),
  ring_size_id INT REFERENCES Ring_Sizes(id),
  quantity INT NOT NULL CHECK (quantity >= 0)
);
