import { createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

//Middleware needed for asynchronous functions

import rootReducer from './reducers'


const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)


)


export default store;

