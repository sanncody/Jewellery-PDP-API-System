CREATE TABLE Pricing_Components (
  Price_Id SERIAL PRIMARY KEY
  Product_Id INT REFERENCES Products(Prod_Id),
  tax_percentage DECIMAL(5,2),
  exchange_discount DECIMAL(10,2)
);