import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import firebase from "firebase";

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this)
        this.state = {
            todo_description: '',
            todo_priority: '',
            todo_completed: false,
            useruid: "null"
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.setState({useruid: user.uid});
              console.log(this.state.useruid)
            } else {
              console.log("no id");
              <Redirect to="/" />
            }
          });
    }
    
    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
     
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('https://www.restaurant-list.com/todos/add/'+this.state.useruid, newTodo)
            .then(res => console.log(res.data));
        this.setState({
            todo_description: '',
            todo_priority: '',
            todo_completed: false
        })
        this.props.history.push('/list');
        window.location.reload();
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Entry</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todo_priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todo_priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group row justify-content-center">
                        <input type="submit" value="Create Entry" className="btn btn-outline-primary" />
                    </div>
                </form>
                <div className="row justify-content-center">
                    <a href="/list" className="btn btn-outline-danger" role="button" aria-pressed="true" style={{marginBottom:"40px"}}>Cancel</a>
                </div>
            </div>
        )
    }
}