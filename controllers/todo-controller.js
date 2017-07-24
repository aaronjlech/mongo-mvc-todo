const TodoItem = require("../models/todo-schema");
const router = require('express').Router();

const controller = {

    getAllItems:  (request, response) => {
        TodoItem.find((err, todos) =>{
            if(err){
                response.status(500).send(err);
            }else {
               console.log(todos);
                response.send(todos);
            }
        })
    },

    getById: (request, response) => {
        TodoItem.findById({ _id: request.params.id}, (err, todos) => {
            if(err) {
                response.status(500).send(err);
            } else {
                response.send(todos);
            }
        })
    },

    createItem: (request, response) => {
        console.log(request.body);
      let todo = new TodoItem(request.body);
      todo.save((err, newTodo) => {

          if(err){

              response.status(500).send(err);
          } else {
            response.send(newTodo);
          }

      })
    },
    updateItem: (request, response) => {
        const { id } = request.params;
        TodoItem.findById(id, (err, todo) => {
            if(err){
                response.status(500).send(err);
            } else {
                todo = request.body;
                todo.save((err, updated) => {
                    if (err) response.status(500).send(err);
                    response.send(updated);
                })
            }
        })


        TodoItem.findByIdAndUpdate(id, function(error, data) {
            let relatedBook = data.relatedBooks.find((bk => bk_id === relatedId ));
            relatedBook
        })
    },

    deleteItem: (request, response) => {
        const { id } = request.params;
        TodoItem.findByIdAndRemove(id, (err, todo) => {
            response.send(todo);
        });
    }
}

router.post('/', controller.createItem);
router.get('/', controller.getAllItems);
router.get('/:id', controller.getById);
router.delete('/:id', controller.deleteItem);
router.put('/:id', controller.updateItem);

module.exports = router;
