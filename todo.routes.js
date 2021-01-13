const express = require('express');
const todoRoutes = express.Router();
let Todo = require('./models/todo.model');

function returnJson(error, response, object) {
    if(error) {
        console.log(error);
    } else {
        response.json(object);
    }
}

todoRoutes.route('/').get((request, response) => {
    Todo.find((error, todos) => {
        returnJson(error, response, todos);
    });
});

todoRoutes.route('/:id').get((request, response) => {
    let id = request.params.id;
    Todo.findById(id, (error, todo) => {
        returnJson(error, response, todo);
    });
});

todoRoutes.route('/add').post((request, response) => {
    let todo = new Todo(request.body);
    todo.save()
        .then(() => {
            response.status(200).json({'todo': 'Todo added succesfully'});
        })
        .catch(error => {
            console.log(error);
            response.status(400).send('Adding a new todo failed.')
        });
});

todoRoutes.route('/update/:id').get((request, response) => {
    Todo.findById(request.params.id, (error, todo) => {
        if(!todo) {
            console.log(error);
            response.status(400).send('Data not found');
        } else {
            todo.description = request.body.description;
            todo.responsible = request.body.responsible;
            todo.priority = request.body.priority;
            todo.completed = request.body.completed;

            todo.save()
                .then(() => {
                    response.status(200).json({'todo': 'Todo updated.'});                   
                })
                .catch(error => {
                    console.log(error);
                    response.status(400).send('Update not possible');
                });
        }
    });
});

module.exports = todoRoutes;