import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Courses from './components/Courses'
import Header from './components/Header';
import Public from './components/Public';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Forbidden from './components/Forbidden';
import Authenticated from './components/Authenticated';
import CreateCourse from './components/CreateCourse';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import CourseDetail from './components/CourseDetail';

const HeaderWithContext = withContext(Header);
const CourseswithContext = withContext(Courses);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/courses/:id" component={CourseDetailWithContext}/>
        <Route exact path="/" component={CourseswithContext} /> 
        <Route exact path="/" component={Public} />
        <Route exact path="/courses" component={CreateCourse} />
        <Route exact path="/Forbidden" component={Forbidden} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
