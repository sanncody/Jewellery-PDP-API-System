CREATE TABLE Diamonds (
  Diamond_Id SERIAL PRIMARY KEY,
  Diamond_carat DECIMAL(5,2),
  Diamond_quality TEXT,
  Diamond_price_per_carat DECIMAL(10,2)
);