import React, { Component } from 'react';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'

export default (props) => (
<div className="container questions-summary">
  <div className="row">
    <div className="col col-md-3">
      <div className="row mini-counts">     
        <div className="col col-md-6 cards">          
          <div className="">
            <span title="views">0</span>
          </div>
          <div>views</div>
        </div>
        <div className="col col-md-6 cards">
          <div className="">
            <span title="answers">{props.answers.length}</span>
          </div>
          <div>answers</div>
        </div>        
      </div>
    </div>        
    <div className="col col-md-9 questions">
      <div className="row">
        {props.questions}
      </div>
      <div className="row tags">
        <nav className="nav nav-pills nav-fill">
          {props.topic && props.topic.length ?
            props.topic.map((key, i) => {
              return <a key={i} className="nav-item nav-link active" href="#">{key.topic}</a>
            })
          : null}
        </nav>
      </div>
    </div>
  </div>
</div>  
)