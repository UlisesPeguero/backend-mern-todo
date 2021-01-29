const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./todo.routes');
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/todos', todoRoutes);

const localMongoDB = 'mongodb://localhost:27017/todos';

mongoose.connect(localMongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.on('error', error => console.log(`Mongo connection error: ${error}`));
connection.once('open', () => console.log('MongoDB database connection established successfully'));

app.get('/', (request, response)  => {
    response.send('Express server [on].');
});

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));