import React, { useState, useEffect } from 'react'

/*
    the new Context API in combination with useReducer would cover the needs of this usecase
    Redux would be a better choice if for example an out of the box history middleware solution was desired
*/

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { rootReducer } from './reducers'

import { dataLoading, getData } from './actions'

const store= createStore( rootReducer, compose(applyMiddleware(thunk))) ;

const DataLoader=_=>{

    const LOADING='loading', READY='ready', ERROR='error' ;

    const [ status, setStatus ]= useState(LOADING) ;

    useEffect(_=>{
        store.dispatch(dataLoading()) ;
        async function data() {
            const success= await store.dispatch(getData()) ;
            success
                ? setStatus(READY)
                : setStatus(ERROR) ;
        } ;
        data() ;
    }, []) ;

    useEffect(_=>{
        console.log(store.getState()) ;
    }) ;

    return (
        <Provider store={store}>
            <div></div>
        </Provider>
    )
}

export default DataLoader ;

/** fetch data */
/** hydrate store */