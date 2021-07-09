import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import firebase from "firebase";
import { Redirect } from 'react-router';

const Todo = props => (
    <tr style={{border: props.todo.todo_completed===true ? "5px double #00FA9A" : "black" }}>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id} className="btn btn-outline-info">Edit</Link>
        </td>
        <td>
            <Button onClick={() => deleteItem(props)} className="btn btn-outline-danger">Delete</Button>
        </td>
        <td style={{display: "none"}}>{props.todo.todo_completed}</td>
    </tr>
);
function deleteItem(props){
    console.log(`Test`);
    axios.delete('https://www.restaurant-list.com/todos/delete/' + props.todo._id)
        .then((res) => {
            console.log('Item successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
        window.location.reload();
};

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: [],
          user_id: "null"};
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.setState({user_id: user.uid});
              console.log(this.state.user_id)
            } else {
              console.log("no id");
              <Redirect to="/" />
            }
        });
        axios.get('https://www.restaurant-list.com/todos/list')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return Object.keys(this.state.todos).map((i) => {
            console.log(this.state.todos)
            return <Todo todo={this.state.todos[i]} key={i} />
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
                            <th>Delete</th>
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