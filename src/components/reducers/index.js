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

        case 'dataError' :
            return {
                ...state ,
                status:error
            } ;

        case 'loading' :
            return {
                ...state ,
                status:'loading'
            } ;

        case 'loaded' :
                return {
                    ...state ,
                    status:'ready' ,
                    entries
                } ;

        default :
            return state ;
    } ;

} ;