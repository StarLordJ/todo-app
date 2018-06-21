import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import TaskList from './components/TaskList';

class App extends Component {
  

  state = {
    todos: []
  };

  handleSubmit = event => {
    event.preventDefault();
    let input = event.target.firstChild.firstChild;
    let task = input.value;
    if (task.length > 0) {
      let todos = this.state.todos.slice();
      let date = new Date();
      let strDate = date.toGMTString().split(' ').slice(0, 5).join(' ');
      let todo = {id: Date.now(), value: input.value, completed: false, date: strDate, edit: false};
      todos.push(todo);
      this.setState({todos: todos}, function(){
        fetch('http://localhost:5000/api/todos', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: todo.id,
            value: todo.value,
            completed: todo.completed,
            date: todo.date
          })
        })
      });
      input.value = '';
    }
  }
  onEdit = (event) => {
    event.preventDefault();
    let input = event.target.firstChild.firstChild;
    let id = event.target.parentNode.id;
    let task = input.value;
    console.log(event.target.parentNode)
    if (task.length > 0) {
      let todos = this.state.todos.slice();
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id ==  id) {
          todos[i].value = task;
          todos[i].edit = false;
        }
      }
      
      this.setState({todos: todos}, function(){
        fetch('http://localhost:5000/api/todos:id', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          value: task
      })
    })
  })
}}

  handleEdit = (event) => {
    event.preventDefault();
    let task = event.target.parentNode;
    let todos = this.state.todos.slice();
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == task.id) {
        todos[i].edit = true;
      }
    }
    this.setState({todos: todos})
  }

  handleDone = (event) => {
    event.preventDefault();
    console.log('aaaa')
    let task = event.target.parentNode;
    let todos = this.state.todos.slice();
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == task.id) {
        todos[i].completed = !todos[i].completed;
        this.setState({todos: todos}, function(){
          fetch('http://localhost:5000/api/todos', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: task.id,
            completed: todos[i].completed
        })
      })
  })}}
}
  handleDelete = (event) => {
    event.preventDefault();
    let task = event.target.parentNode.id;
    let todos = this.state.todos.slice();
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == task) {
        todos.splice(i, 1);
      }
    }
    this.setState({todos: todos}, function(){
      fetch('http://localhost:5000/api/todos', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: task
        })
      })
    });
  }

  componentDidMount = () => {
    fetch('http://localhost:5000/api/todos')
      .then(response => {
        return response.json();
      })
      .then((proposals) => {
        console.log(proposals)
        this.setState({todos: proposals }); 
      });
  }
  render() {
    return (
      <div className="app">
          <Form onSubmit={this.handleSubmit} />
          <TaskList tasks = {this.state.todos} handleDelete = {this.handleDelete} handleDone = {this.handleDone} handleEdit = {this.handleEdit} onEdit={this.onEdit}/>
      </div>
    );
  }
}

export default App;
