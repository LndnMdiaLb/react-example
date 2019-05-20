/*
    communicate with api and retrieve data
    dispatch results to the redux store
*/

const path='localhost://5555/loadData' ;

const headers= {
    'Accept': 'application/json'
    //, 'Authorization': token
} ;


/*  thunk action        */

export const getData=()=> async (dispatch)=>{
    try {
        /* catches */
        // const   data= await fetch( path , { method: 'GET' , headers }) ,
        //         json= await data.json() ;
        // const   { entries }= json ;

        const entries= await new Promise((res, rej)=>{
            setTimeout(
                _=>res({a:'a',b:'b',c:'c'})
                , 1000 ) ;
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

export const dataLoading=error=>({ type:'loading' }) ;
export const dataError=error=>({ type:'dataError', error }) ;
export const dataLoaded=entries=>({ type:'loaded', entries }) ;
