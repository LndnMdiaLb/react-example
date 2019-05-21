import React, { useEffect } from 'react'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Test=_=>{
    useEffect(_=>{
        console.log('A mounted')
        return _=>{
            console.log('A unmounted')
        }
    },[]) ;
    return (
        <div>A</div>
    )
}

const Navivation=_=>{
    return (
        <Router>
            <>
                <Route path='/a' component={Test} />
                <Route path='/a' render={_=>Test} />
                <Link to='/a'>to a</Link>
            </>
        </Router>
    );
} ;

export default Navivation ;