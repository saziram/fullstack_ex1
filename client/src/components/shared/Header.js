import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'

import Modal from './Modal';

export default class Header extends Component {
  constructor(){
    super();
    this.state = {
        showModal: false,
        modalName: '',
        userData: JSON.parse(localStorage.getItem('authentication')) || {},
        isAuth: (localStorage.getItem("authentication") !== null) || false,
        focusHandler: false
    }
    this.handleModalMount = this.handleModalMount.bind(this);
    this.handleModalUnmount = this.handleModalUnmount.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleModalMount(e){
    this.setState({
      showModal: true,
      modalName: e.target.value
    });
  }

  handleModalUnmount(userData){
    this.setState({
      ...this.state,
      showModal: false,
      isAuth: (userData && userData.success) || false,
      userData: userData || {}
    });
  }

  logout(){
    localStorage.clear();
    this.setState({
      ...this.state,
      isAuth: false,
      userData: {}
    });
  }

  render() {
    return (
      <div>       
        { this.state.showModal ? <Modal unmountModal={this.handleModalUnmount} modalName={this.state.modalName} /> : null }
        <div className="top-bar js-top-bar top-bar__network _fixed">
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <h2>React Blog</h2>
                </div>
                <div className="col-sm">
                  <div className="row justify-content-end">
                    { this.state.isAuth ?  
                      <div>                                      
                        <button type="button" 
                          onClick={this.logout} 
                          className={this.state.focusHandler ? "btn btn-info" : "btn"} 
                          onMouseEnter={() => this.setState({...this.state, focusHandler:true})} 
                          onMouseLeave={() => this.setState({...this.state, focusHandler:false})}> 
                            {this.state.focusHandler ? 'Logout' : this.state.userData.username} 
                        </button>
                      </div>                    
                    : 
                      <div className="authentication">                                      
                        <button disabled={this.state.showModal} onClick={this.handleModalMount} type="button" value="Login" className="btn btn-success" data-toggle="modal" data-target="#myModal">Login</button>                                            
                        <button disabled={this.state.showModal} onClick={this.handleModalMount} type="button" value="Register" className="btn btn-primary">Sign Up</button>
                      </div>                    
                    }
                  </div>
                </div>
              </div>
            </div>
        </div>        
      </div>
    );
  }
}
