// npm install axios --save // 서버에 http request를 보내기 위함
// npm install antd --save // CSS Framework | 무려 51MB...
// npm install redux react-redux redux-promise redux-thunk --save // 리덕스 미들웨어들
// npm install http-proxy-middleware --save // 서버와 클라이언트가 포트가 다르더라도 온전히 통신되도록 하기 위함

import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={ Auth(LandingPage, null) } />
          <Route exact path="/login" component={ Auth(LoginPage, false) }/>
          <Route exact path="/register" component={ Auth(RegisterPage, false) }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
