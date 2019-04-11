import React, { Component } from 'react';
import axios from 'axios';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'

export default class Modal extends Component {

constructor(props){
    super(props);
    this.state = {
        classCondition: true,
        displayName: '',
        username: '',
        password: ''
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);    
}

handleClose(e) {
    e.preventDefault();
    this.props.unmountModal();
} 

handleSubmit(e){
    e.preventDefault();
    let auth = {
        username: this.state.username,
        password: this.state.password        
    };

    axios.post('http://localhost:4000/' + this.props.modalName.toLowerCase(), auth)  
    .then(res => {
        if(res.data.errCode) throw res.data.errMsg;
        localStorage.setItem('authentication', JSON.stringify({...res.data, username:this.state.username }));
        this.props.unmountModal({...res.data, username:this.state.username });
    })
    .catch(error => {
        alert(error);
        console.log(error);
    });
}

handleChange(e){
    e.preventDefault();
    this.setState({
        ...this.state,
        [e.target.name]: e.target.value        
    });
}   

handleReset(e){
    this.setState({
        ...this.state,
        displayName: '',
        username: '',
        password: ''              
    });
}

render() {
    return (
      <div>
        <style>{'body { background-color: #ddd; }'}</style>
        <div className = "react-modal" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="react-modal-header">
                        <div className="row justify-content-between">
                            <div className="col-4">
                                <h4>{this.props.modalName}</h4>
                            </div>
                            <div className="col-4">
                                <button onClick={this.handleClose} type="button" className="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>                                        
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>

                            { this.props.modalName === 'Register' ? 
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">Name: </span>
                                    </div>
                                    <input type="text" onChange={this.handleChange} name="displayName" value={this.state.displayName} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                                </div>                            
                            : null }

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">Username: </span>
                                </div>
                                <input type="text" onChange={this.handleChange} name="username" value={this.state.username} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">Password: </span>
                                </div>
                                <input type="password" onChange={this.handleChange} name="password" value={this.state.password} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                            </div>
                            <div className="row justify-content-end">
                                <div className="col-3">
                                    <button type="submit" disabled={!this.state.username || !this.state.password} className="btn btn-success">{this.props.modalName}</button>
                                </div>
                                <div className="col-3">
                                    <button onClick={this.handleReset} type="button" className="btn btn-dark">Reset</button>
                                </div>                                
                            </div>    

                        </form>                        
                    </div>
                </div>
            </div>
        </div>        
      </div>
    );
  }
}
