const dotenv = require('dotenv');
dotenv.config();

const pg = require('./src/config/db.js');
const app = require('./src/app');

/* Testing Connection */
app.get('/', async (req, res) => {
    const result = await pg.query("SELECT current_database()");
    res.send(result);
    // res.send(`The database name is ${result.rows[0].current_database}`)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});