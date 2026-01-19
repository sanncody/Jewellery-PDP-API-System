CREATE TABLE Pricing_Components (
  Price_Id SERIAL PRIMARY KEY
  Product_Id INT REFERENCES Products(id),
  tax_percentage DECIMAL(5,2),
  exchange_discount DECIMAL(10,2)
);