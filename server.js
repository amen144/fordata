const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path=require("path")
const port = 3000;
const { createTable, checkDatabaseConnection } = require('./Database/Config')

const cors = require('cors');



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const contactRoutes = require('./Route/RouteContact');
app.use('/contacts', contactRoutes);


createTable();
checkDatabaseConnection();
app.use(express.static(path.join(__dirname, 'public')));


app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Listemessage.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
