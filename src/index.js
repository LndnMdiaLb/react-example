import React from 'react'
import ReactDom from 'react-dom'

import DataLoader from './components/data-loader.js'
import Navigation from './components/routing.js'

import { GlobalStyles } from './components/layout.js'

/* Basic shell */

const App=_=>
    <DataLoader>
        <GlobalStyles />
        <Navigation/>
    </DataLoader> ;

ReactDom.render( <App/> , document.getElementById('app')) ;