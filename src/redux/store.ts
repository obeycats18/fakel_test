import {combineReducers, createStore, applyMiddleware} from 'redux'
import reduxThunks from 'redux-thunk'

import {dataReducer}  from './reducers/dataTableReducers';

const rootReducer = combineReducers({
    data: dataReducer
})

type _RootReducerT = typeof rootReducer
export type GlobaleStore = ReturnType<_RootReducerT>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer,  composeEnhancers(
    applyMiddleware(reduxThunks)
)) 

