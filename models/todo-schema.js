const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true },
    order: {type: Number, required: true},
    completed: {type: Boolean, default: false}
})





const TodoItem = mongoose.model('TodoItem', todoSchema);



module.exports = TodoItem





