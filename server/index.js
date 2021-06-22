const connection = require('./db');
const cors = require('cors');
const express = require('express');
const api =  require('./routes/tasks')

const app = express();

connection();
app.use(express.json())
app.use(cors())
app.use('/api/tasks', api);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}...`))