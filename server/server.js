const PORT = process.env.PORT ?? 8000;
const express = require('express');
const app = express();
const pool = require('./db');

//get all smeets
app.get('/smeets', async (req, res) => {
    
    try{
        const smeets = await pool.query('SELECT * FROM smeets');
        res.json(smeets.rows);
    } catch (err) {
        console.error(err);
    }

})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})