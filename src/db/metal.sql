CREATE TABLE Metals (
    Metal_Id SERIAL PRIMARY KEY,          -- Unique identifier for each metal type
    Metal_Name VARCHAR(50) NOT NULL,   -- e.g., 'Gold', 'Silver', 'Platinum'
    Metal_Purity VARCHAR(20),               -- e.g., '24K', '18K', '925 Sterling'
    Metal_Color VARCHAR(30),                -- e.g., 'Yellow', 'White', 'Rose', 'Black'
    Metal_PricePerGram DECIMAL(10, 4) NOT NULL,      -- Current or base price for calculation
    IsAlloy BOOLEAN DEFAULT FALSE,    -- Indicates if it's a mix (e.g., 18k is an alloy)
    Description TEXT                  -- Detailed notes about the metal
);
