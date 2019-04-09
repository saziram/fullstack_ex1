import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'

import Modal from './Modal';

export default class Header extends Component {
  constructor(){
    super();
    this.state = {
        showModal: false,
        modalName: ''
    }
    this.handleModalMount = this.handleModalMount.bind(this);
    this.handleModalUnmount = this.handleModalUnmount.bind(this);
  }

  handleModalMount(e){
    this.setState({
      showModal: true,
      modalName: e.target.value
    });
  }

  handleModalUnmount(){
    this.setState({
      showModal: false
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
                    <div className="col-8 authentication">                      
                      <button disabled={this.state.showModal} onClick={this.handleModalMount} type="button" value="Login" className="btn btn-success" data-toggle="modal" data-target="#myModal">Login</button>                                            
                      <button disabled={this.state.showModal} onClick={this.handleModalMount} type="button" value="Register" className="btn btn-primary">Sign Up</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>        
      </div>
    );
  }
}
