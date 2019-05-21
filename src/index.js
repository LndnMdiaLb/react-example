import React from 'react'
import ReactDom from 'react-dom'

import DataLoader from './components/data-loader.js'
import Navigation from './components/routing.js'

const App=_=>
    <DataLoader>
        <Navigation/>
    </DataLoader> ;

ReactDom.render( <App/> , document.getElementById('app')) ;