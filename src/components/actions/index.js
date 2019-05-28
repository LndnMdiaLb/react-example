import {data} from '../../data/data.js'

/*
    communicate with api and retrieve data
    dispatch results to the redux store
*/

/* action constants */

export const LOADING ='loading';
export const READY='ready';
export const ERROR='error' ;


/*  thunk action        */

export const getData=()=> async (dispatch)=>{
    try {

        const path='localhost://5555/loadData' ;

        const headers= {
            'Accept': 'application/json'
            //, 'Authorization': token
        } ;

        /* catches */

        // const   data= await fetch( path , { method: 'GET' , headers }) ,
        //         json= await data.json() ;
        // const   { entries }= json ;

        const entries= await new Promise((res, rej)=>{
            setTimeout(
                _=>res(data)
                , 1000 ) ;
        }) ;

        /*
            create a new property in object entries ; used to create urls
            and resolve similar refs
        */

        Object.values(entries).forEach(entry=>{
            entry.id=entry.title.toLowerCase().replace(/\s+/ig,'-')
        }) ;

        dispatch(dataLoaded(entries)) ;

        return true ;

    } catch(error) {

        /* catches errors both in fetch and data.json() */
        dispatch(dataError(error)) ;
        return false ;
    }
} ;


/*  action creator      */

export const dataLoading=error=>({ type:LOADING }) ;
export const dataError=error=>({ type:ERROR, error }) ;
export const dataLoaded=entries=>({ type:READY, entries }) ;
