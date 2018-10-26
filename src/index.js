import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

// UI Css
import 'semantic-ui-css/semantic.min.css';
// firebase login check
import firebase from './firebase';

// import Spinner component
import Spinner from './spinner';



// Redux
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// action export setusre
import {setUser, clearUser} from './actions';


import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools());



class Root extends Component {


    componentDidMount(){

        console.log(this.props.isLoading);
        firebase
            .auth()
            .onAuthStateChanged(user => {
                if(user){

                    this.props.setUser(user);

                    this.props.history.push("/");
                } else {
                    // Log out 
                    this.props.history.push('/login');
                    this.props.clearUser();



                }
            });
    }

    render(){


        return this.props.isLoading ? <Spinner /> : (
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/login" component={Login}></Route>
    
            </Switch>
  
        );
    }
}

const mapStateFromProps = state => ({
    isLoading: state.user.isLoading
});





const RootWithAuth = withRouter(connect(mapStateFromProps, {setUser, clearUser})(Root));

ReactDOM.render(
    <Provider store={store}>

        <Router>
            <RootWithAuth/>
        </Router>
    
    </Provider>,
    document.getElementById('root')
);



registerServiceWorker();
