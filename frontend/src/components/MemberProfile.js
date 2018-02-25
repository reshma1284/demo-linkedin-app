import React from 'react';
import axios from 'axios';

class MemberProfile extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      member: null
    }
  }

  componentDidMount(){
    let _this = this;

    axios.get('/api/members/' + this.props.match.params.id)
    .then(function(response){
      //console.log(response);
      _this.setState({member: response.data})
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render(){
  //  console.log(this.props);  // best place to console.log
    return(
        <div>
          {this.state.member ?
            <div>
              <h1> Members Profile </h1>
              <p> Name: {this.state.member.name}</p>
              <p> Job Title: {this.state.member.jobTitle} </p>
              <p> Email: {this.state.member.email}</p>
          </div>
          :
          <p> Looking for member.. Please wait! </p>
        }
        </div>
    )
  }
}

export default MemberProfile;
