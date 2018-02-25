import React from 'react';
import axios from 'axios';
import validator from 'email-validator';


class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      jobTitle: '',
      registrationCompleted: false,
      passwordValidationMsg: null,
      passwordConfirmMsg: null,
      nameValidationMsg: null,
      emailValidationMsg: null
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleInputChange(event){
    //console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();

    let passwordValidationMsg = null;
    if (this.state.password.length < 6){
      passwordValidationMsg =  'Password must contain minimum 6 characters';
    }
    else{
      passwordValidationMsg = null;
    }

    let passwordConfirmMsg = null;
    if (this.state.password !== this.state.passwordConfirm) {
      passwordConfirmMsg = 'Password Confirmation is not equal to password';
    }
    else{
      passwordConfirmMsg = null;
    }

    let nameValidationMsg = null;
    if(/\d/.test(this.state.name)) {
      nameValidationMsg = 'Name cannot contain numbers';
    }
    else{
      nameValidationMsg: null;
    }

    let emailValidationMsg = null;
    if(!validator.validate(this.state.email)){
      emailValidationMsg = 'Not a Valid Email id';
    }
    else{
      emailValidationMsg = null;
    }

    if(nameValidationMsg || passwordConfirmMsg || passwordValidationMsg ||
        emailValidationMsg){
        this.setState({
          nameValidationMsg: nameValidationMsg,
          passwordConfirmMsg: passwordConfirmMsg,
          passwordValidationMsg: passwordValidationMsg,
          emailValidationMsg: emailValidationMsg
        })
      }
      else{
          let _this = this;
          axios.post('/api/register', this.state)
          .then(function(response){
            if(response.data.status === 'Success'){
                _this.setState({registrationCompleted: true,
                              })

            }
          })
          .catch(function(error){
            console.log(error);
          })
  }
}

  render(){
    //console.log(this.state.name)
    // we can use if else only outside the return

    return(
      <div>
          {this.state.registrationCompleted ?
            <div>
                <p> Thank You for signing up. </p>
                <p> Please login .. </p>
            </div>
          :
          <form onSubmit={this.handleSubmit}>
                <h1> Register </h1>


              <div className="form-group">
                <label htmlFor="inputName"> Name </label>
                <input onChange={this.handleInputChange} type="text" value={this.state.name} className="form-control" id="InputName" aria-describedby="emailHelp"
                    name="name"   placeholder="Enter Name" />
                    {this.state.nameValidationMsg &&
                      <p className="error"> {this.state.nameValidationMsg} </p>
                    }
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input onChange={this.handleInputChange} type="email" value={this.state.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    name="email" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                {this.state.emailValidationMsg &&
                <p className="error"> {this.state.emailValidationMsg}
                </p>}
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange={this.handleInputChange} type="password"  value={this.state.password} className="form-control" id="exampleInputPassword1"
                    name="password" placeholder="Password" />
                    {this.state.passwordValidationMsg &&
                    <p className="error"> {this.state.passwordValidationMsg} </p>
                    }
              </div>

              <div className="form-group">
                <label htmlFor="InputPasswordConfirm">Password Confirmation</label>
                <input onChange={this.handleInputChange} type="password"  value={this.state.passwordConfirm} className="form-control" id="InputPasswordConfirm"
                    name="passwordConfirm" placeholder="Password" />
                    {this.state.passwordConfirmMsg &&
                      <p className="error"> {this.state.passwordConfirmMsg} </p>
                    }
              </div>

              <div className="form-group">
                <label htmlFor="InputJob"> Job Title </label>
                <input onChange={this.handleInputChange} type="text" value={this.state.jobTitle} className="form-control" id="InputJob" aria-describedby="emailHelp"
                    name="jobTitle" placeholder="Enter Job Title" />
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        }
        </div>
    )
  }
}

export default Register;
