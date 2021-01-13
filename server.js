const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./todo.routes');
const PORT = 4000;

//app.use(cors);
app.use(bodyParser.json());
app.use('/todos', todoRoutes);

const localMongoDB = 'mongodb://127.0.0.1:27017/todos';

mongoose.connect(localMongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.once('open', () => console.log('MongoDB database connection stablished successfully'));

app.get('/', (request, response)  => {
    response.send('Server on.');
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));