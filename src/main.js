import React, { Component } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import ReactDOM from 'react-dom';

class App extends Component {
   constructor(props){
      super(props)
      this.getAllItems = () => {
         axios.get('/api/todos').then(serverResponse => {
            this.setState({todoItems: serverResponse.data})
         })
      }
      this.state = {
         todoItems: [],
         title: ""
      }

   }

   componentWillMount(){
      this.getAllItems();
   }

   _handleSubmit = (event) => {
      event.preventDefault();
      axios.post('/api/todos', {
         title: this.state.title,
         order: 0
        })
        .then( (response) => {
            this.getAllItems();
        })
        .catch(function (error) {
          console.log(error);
        });
   }
   _handleChange = (event) => {
      console.log(event.target.name);
      console.log(event.target.value);
      let newInputState = {
         [event.target.name]: event.target.value
      }
      this.setState(newInputState);
   }

   render(){
      console.log(this.state.todoItems);
      let renderTodos = this.state.todoItems.map((todo) => {
         console.log(todo);
         return <TodoItem key={todo._id} todo={todo} getAllItems={this.getAllItems}/>
      })
      return(
         <div>
            <form onSubmit={this._handleSubmit}>
               <input type="text" name='title' value={this.state.title} onChange={this._handleChange}/>
               <button className="btn btn-primary">add Todo!</button>
            </form>
            <div className="row">
               {renderTodos}
            </div>
         </div>
      )
   }
}


ReactDOM.render(<App/>, document.querySelector("#root"));
