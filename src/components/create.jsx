import React, { Component } from 'react';
import fetch from 'node-fetch';
import { Redirect } from 'react-router';
import firebase from 'firebase/app';
import 'firebase/auth';



export default class CreateTodo extends Component {

    constructor(props) {
        super(props);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            todo_description: '',
            todo_priority: '',
            todo_completed: false,
            user_id: "null"
        }
    }
    
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.setState({user_id: user.uid});
            } else {
              console.log("no id");
              <Redirect to="/" />
            }
          }).bind(this);
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

    async onSubmit(e) {
        e.preventDefault();
     
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed,
            user_id: this.state.user_id
        };

        await fetch('https://www.restaurant-list.com/todos/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://www.restaurant-list.com/'
              },
            body: JSON.stringify(newTodo),
            mode: 'cors' })
            .then(res => console.log(res.data));
        this.setState({
            todo_description: '',
            todo_priority: '',
            todo_completed: false,
            user_id: "null"
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
                        <label>Restaurant Name: </label>
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