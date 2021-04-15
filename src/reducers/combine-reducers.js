import reviewReducer from './review-reducer'
import userReducer from "./user-reducer";
import {combineReducers} from 'redux'

const reducers = combineReducers({
                                     reviewReducer: reviewReducer,
                                     userReducer: userReducer
                                 })

export default reducers;