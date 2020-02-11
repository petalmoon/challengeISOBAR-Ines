
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    comments: require('./comments').default,
    posts: require('./posts').default,
})

export default rootReducer;