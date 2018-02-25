import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
// when we use this use export default withrouter and this is use
 //to route the url using props.history.push


class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleInputChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();

    let _this = this;
    axios.post('/api/login',{
        email: this.state.email,
        password: this.state.password
    })
    .then(function(response){
      //console.log(response);
      if(response.data.status === 'error'){
        _this.setState({errorMsg: response.data.message})
      }
      else{
        _this.props.history.push('/members'); //react router will send the user to members
      }
    })
    .catch(function(error){
      console.log(error);
    })

  }

  render(){
    return(
          <form onSubmit={this.handleSubmit}>
                <h1> Login </h1>
                {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input onChange={this.handleInputChange} type="email" value={this.state.email} className="form-control" id="InputEmail1" aria-describedby="emailHelp"
                    name="email" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange={this.handleInputChange} type="password" value={this.state.password} className="form-control" id="InputPassword1"
                    name="password" placeholder="Password" />
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
    )
  }
}

export default withRouter(Login);
