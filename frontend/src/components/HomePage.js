import React from 'react';
import Register from './Register';
import Login from './Login';

class HomePage extends React.Component{
  render(){
    return(
      <div>
        <Register />
        <Login />
      </div>
    )
  }
}

export default HomePage;
