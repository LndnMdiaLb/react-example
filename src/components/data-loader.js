import React, { useState, useEffect } from 'react'

/*
    the new Context API in combination with useReducer would cover the needs of this usecase
    Redux would be a better choice if for example an out of the box history middleware solution was desired
*/

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { rootReducer } from './reducers'

import { LOADING, READY, ERROR, dataLoading, getData } from './actions'

const store= createStore( rootReducer, compose(applyMiddleware(thunk))) ;

const DataLoader=({children})=>{

    /* force rerender */
    const reload= useState(LOADING)[1] ;

    useEffect(_=>{
        store.dispatch(dataLoading()) ;
        async function data() {
            const success= await store.dispatch(getData()) ;
            success
                ? reload(READY)
                : reload(ERROR) ; } ;
        data() ;
    }, []) ;

    useEffect(_=>{ console.log( store.getState()) ; }) ;

    return (
        <Provider store={store}>
            { children }
        </Provider>
    ) ;
}

export default DataLoader ;

/** fetch data */
/** hydrate store */