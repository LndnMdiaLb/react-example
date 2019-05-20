import {LOADING, READY, ERROR} from '../actions'


const initialState={
    entries:{
        // 'askwhe':{

        //     thumb: '' ,
        //     name: '' ,
        //     showtimes: '' ,

        //     title:'Harry Potter and the Developers Case of Carpel Tunnel',
        //     synopsis:''
        // }
    }
}


export const rootReducer=(state=initialState, action={type:null})=>{

    const { type ,
            entries, error }= action ;

    switch (type) {

        case ERROR :
            return {
                ...state ,
                status:error
            } ;

        case LOADING :
            return {
                ...state ,
                status:LOADING
            } ;

        case READY :
                return {
                    ...state ,
                    status:READY ,
                    entries
                } ;

        default :
            return state ;
    } ;

} ;