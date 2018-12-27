
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import removeSubOrderReducer from './removeSubOrder'


const rootReducer = (history) => combineReducers({
    removeSub: removeSubOrderReducer,
    router: connectRouter(history)
})


export default rootReducer

