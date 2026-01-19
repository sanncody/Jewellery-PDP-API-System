CREATE TABLE Purity_Levels (
  id SERIAL PRIMARY KEY,
  metal_id INT REFERENCES Metals(id),
  purity_label TEXT NOT NULL,
  purity_percentage INT NOT NULL
);
