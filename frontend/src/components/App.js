import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './HomePage';
import MembersPage from './MembersPage';
import ProfilePage from './ProfilePage';
import MemberProfile from './MemberProfile';

class App extends React.Component{
  render(){
    return(
      <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/members' component={MembersPage} />
            <Route  path='/members/:id' component={MemberProfile} />
            <Route exact path='/profile' component={ProfilePage} />
          </Switch>
      </Router>
    )
  }
}

export default App;
