import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class MembersPage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      members: null
    }
  }

//null - not checked in the db


  componentDidMount(){
    let _this = this;

    axios.get('/api/members')
    .then(function(response){
      //console.log(response);
      _this.setState({members: response.data})
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render(){
    return(
          <div>
            <h1> Members Page </h1>
            {this.state.members ?
              <table>
                <tbody>
              {this.state.members.map(function(member){
                return(
                  <tr key={member._id}>
                    <td> {member.name} </td>
                    <td> <Link to={"/members/" + member._id}> View Profile </Link> </td>
                  </tr>
                )
              })}
                </tbody>
              </table>

              :

              <p> Looking for Members </p>
            }
          </div>
    )
  }
}

export default MembersPage;
