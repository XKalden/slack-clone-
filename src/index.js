import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

// UI Css
import 'semantic-ui-css/semantic.min.css';

const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>

        </Switch>

    </Router>
);

ReactDOM.render(
    <Root/>, document.getElementById('root'));
registerServiceWorker();
