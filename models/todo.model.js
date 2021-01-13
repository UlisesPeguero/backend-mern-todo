const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Todo = new mongoose.Schema({
    description: {
        type: String
    },
    responsible: {
        type: String
    },
    priority: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Todo', Todo);