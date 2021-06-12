import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr style={{border: props.todo.todo_completed===true ? "5px double #00FA9A" : "black" }}>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
        <td style={{display: "none"}}>{props.todo.todo_completed}</td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Restaurant List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Restaurant</th>                           
                            <th>Priority Level</th>
                            <th>Action</th>
                            <th style={{display: "none"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
                <div className="row justify-content-center">
                    <a href="/create" className="btn btn-outline-primary" role="button" aria-pressed="true" style={{marginBottom:"40px"}}>Create New Entry</a>
                </div>
            </div>
        )
    }
}