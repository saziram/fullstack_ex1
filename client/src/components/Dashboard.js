import React, { Component } from 'react';
import axios from 'axios';

import Header from './shared/Header';
import Questions from './shared/Questions';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
        userData: JSON.parse(localStorage.getItem('authentication')) || {},
        AuthStr: (localStorage.getItem("authentication") !== null) || false,
        questions: []
    }
    //{ headers: {Authorization: 'Bearer '.concat(this.state.userData.token)} }
    axios.get('http://localhost:4000/questions')  
    .then(res => {
      if(res.data){
        this.setState({
          ...this.state,
          questions: res.data
        });     
        console.log('questions', this.state.questions)   
      }
    })
    .catch(err => {
      if(err){
        console.log('res.data', err);              
      }
    });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-2 sidebar">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active-nav" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Tags</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Users</a>
                </li>
              </ul>              
            </div>
            <div className="col-10 content-border">
              <div className="main">
                <h3>Top Questions</h3>
                  {
                    this.state.questions && this.state.questions.length ? 
                    this.state.questions.map((key, i) => {     
                      return (<Questions key={i} questions={key.question} date={key.date} topic={key.topic} user={key.createdBy} answers={key.answers} />) 
                    })
                    :
                    null
                  }                
              </div>            
            </div>              
          </div>
        </div>
      </div>
    );
  }
}
