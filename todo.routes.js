const express = require('express');
const todoRoutes = express.Router();
let Todo = require('./models/todo.model');

function returnJson(error, response, object) {
    if(error) {
        response.status(400).json({
            message: 'Data was not found.',
            error: error.message
        });
    } else {
        response.json(object);
    }
}

// <server_url>/
todoRoutes.route('/')
    .get((request, response) => {
        Todo.find((error, todos) => {
            returnJson(error, response, todos);
        });
})
    .post((request, response) => {
        let todo = new Todo(request.body);
        todo.save()
            .then(() => {
                response.status(200).json({
                    message: 'Succesfully added.'
                });
            })
            .catch(error => {
                console.log(error);
                response.status(400).json({
                    message: 'Couldn\'t add a new todo.'                    
                })
            });
});

// <server_url>/:id
todoRoutes.route('/:id')
    .get((request, response) => {
        let id = request.params.id;
        Todo.findById(id, (error, todo) => {
            returnJson(error, response, todo);
        });
})
    .put((request, response) => {
        Todo.findById(request.params.id, (error, todo) => {
            if(!todo) {
                console.log(error);
                response.status(400).json({
                    message: 'Data was not found.',
                    error: error.message                   
                });
            } else {
                todo.description = request.body.description;
                todo.responsible = request.body.responsible;
                todo.priority = request.body.priority;
                todo.completed = request.body.completed;

                todo.save()
                    .then(() => {
                        response.status(200).json({
                            message: 'Todo updated.'                            
                        });                   
                    })
                    .catch(error => {
                        console.log(error);
                        response.status(400).json({
                            message: 'Record could not be updated.',
                            error: error.message                            
                        });
                    });
            }
        });
});

module.exports = todoRoutes;