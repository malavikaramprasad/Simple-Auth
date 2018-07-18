import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import Feature from './components/Feature';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';

const store = createStore(
    reducers,
    {
        auth: {authenticated: localStorage.getItem('token')}
    },
    applyMiddleware(reduxThunk)
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route path="/" exact component={Welcome}/>
                <Route path="/signup" exact component={Signup} />
                <Route path="/feature" exact component={Feature} />                
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signout" exact component={Signout} />                
            </App>    
        </BrowserRouter> 
    </Provider>    ,
    document.querySelector('#root')
)
