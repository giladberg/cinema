import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';

import titlesReducer from './reducers/titleOfMovie-reducer';


const allReducers = combineReducers({
   
    titles:titlesReducer
    
})

const store = createStore(allReducers, {
    
    titles:["lords of the ring","dog day afternoon","the body","wall","blue jasmine","star wars","game of thrones","harry potter","good will hunting","breaking bad","no","Rush","dr house"]

},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
