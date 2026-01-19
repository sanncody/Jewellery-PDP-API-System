CREATE TABLE Products (
    Prod_Id SERIAL PRIMARY KEY,
    Prod_Name TEXT NOT NULL,
    Prod_Description TEXT,
    Prod_base_weight DECIMAL(10, 2),
    Prod_making_charges DECIMAL(10, 2),
    is_available BOOLEAN DEFAULT true
);