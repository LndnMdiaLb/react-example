import React, { useEffect, useContext, useMemo } from 'react'
import styled, {createGlobalStyle, css } from 'styled-components'
import { Link } from 'react-router-dom'


/*
    global styles
*/


export const GlobalStyles = createGlobalStyle`
    html, body {
        margin:0;
        padding:0;
    }

    /* requires webpack integration */

    body{
        @import url('https://fonts.googleapis.com/css?family=Work+Sans:300,400,800&display=swap');
        font-family: 'Work Sans', sans-serif;
    }
`


const COLOURA='#F88484';
const COLOURB='#E8FFFC';
const COLOURC='#FFF';
const NAV_HEIGHT='4rem';

/*
    style objects: shared properties
*/

const crsr= css`
    cursor:pointer;
`

const flexLeftStack = css`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    align-content:flex-start;
`

const padding = css`
    padding:1rem;
    box-sizing:border-box;
`


const _flex = css`

    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    align-content:flex-start;

    &.centered {
        flex: 0 1 50vw;
        justify-content:center;
        align-content:center;
        align-items:center;
    }

`

const sizing = css`

    width:10vw;
    height:10vw;

    &.centered{
        height: 30rem !important;
    }
`



/***************************

    implementing CSS Grid

    depending on the build requirements (browsers after 2017) grid can
    be a viable solution for layout

    in a production environment this would require a Flexbox fallback
    implementation that would need more nested html elements to achieve
    as well as conditional reordering

***************************/


const grid=css`
    display:grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto repeat(2, auto) auto;
    grid-gap:1rem;
`



/* a less verbose implementation would be grid-template-area */

const largeLayout=css`
    .title{
        grid-column:1 / span 4;
    }

    .image{
        grid-column:1 / 4;
        grid-row:2 / 4;
    }

    .showtimes{
        grid-column:4 / 6;
        grid-row:3 / 4;
    }

    .rating{
        grid-column:4 / 6;
        grid-row:2 / 3;
    }

    .similar{
        grid-column:1 / 2;
        grid-row-start:4;
    }

    .synopsis{
        grid-column:2 / 5;
    }
`




const smallLayout=css`
    .title{
        grid-column:1 / span 5;
    }

    .image{
        grid-column:1 / span 5;
        grid-row:2 / 4;
    }

    .showtimes{
        grid-column:2 / 4;
        grid-row:4;
    }

    .rating{
        grid-column:1 / 1;
        grid-row:4;
    }

    .similar{
        grid-column:4 / 6;
        grid-row:4;
    }

    .synopsis{
        grid-column:2 / 6;
    }
`



/*****************************************************************************

    styled components

****************************************************************************/



export const Container=styled.section.attrs(({scl,hex})=>({
    style:{
        width:`${scl}vw` ,
        height:`${scl}vh` ,
        backgroundColor:hex?`#${hex}`:''
    }
}))`${_flex}
    ${crsr}
    ${sizing}`


export const StyledInput=styled.input`
    padding:.5rem;
    border:1px solid  rgba(0,0,0,.5);
    border-radius:.4rem;
    appearance: none;
    box-shadow:0px 1px 2px rgba(0,0,0,.5);
    width:170px;
`

export const Nav=styled.nav`
    background-color:${COLOURB};
    box-shadow:0px 1px 2px rgba(0,0,0,.5);
    position:fixed;
    height:${NAV_HEIGHT};
    width:100vw;

    display:flex;
    justify-content:flex-start;
    align-items:center;
    padding-left:2em;
`

export const SectionTitle=styled.h1`
    letter-spacing:.05rem;
    margin:0px;
    span{
        background-color:${COLOURA};
        color:white;
    }
`

export const ViewTitle=styled.h3`
    letter-spacing:.05rem;
    line-height:2rem;
    border-bottom: 3px solid rgba(0,0,0,0.5);
    /* margin:0px; */
`
const rad=3;
export const SmallImage=styled.img`
    ${padding}
    background-color:${COLOURA};
    border-radius:${rad}px;
    object-fit: cover;
    height:auto;
`

export const LargeImage=styled.img`
    ${padding}
    background-color:${COLOURA};
    border-radius:${rad}px;
    object-fit: cover;
    width: 100%;
    max-height: 100%;
`

export const StyledLink=styled(Link)`
    /* padding:.5rem .7rem; */
    background-color:${COLOURA};
    color:${COLOURC};
    border-radius:2px;
    text-decoration:none;
    display: inline-block;
    padding:.2rem .3rem;
    box-shadow:0px 1px 2px rgba(0,0,0,.5);
`


export const FlexList=styled.section`
    box-sizing:border-box;
    background-color:${COLOURB};
    padding:calc(${NAV_HEIGHT} * 2) 0rem 0rem;
    width: 100vw;

    ${flexLeftStack}
    * {
        flex: 1 1 500px;
        align-items:flex-start;
    }
`

export const FlexContainer=styled.article`

    ${flexLeftStack}
    padding:0rem 2rem 2rem;

    .thumb{
        flex: 1 0;
    }
    .info{
        flex:1 0 300px;
        padding:0 1rem 1rem;
        box-sizing:border-box;

        @media (max-width: 500px) {
            padding:1rem 1rem;
        }

        > div{
            padding:0 0 1rem;
            @media (max-width: 500px) {
                display:flex;
            }
        }
    }
`

export const BasicGrid=styled.article`
    padding:calc(${NAV_HEIGHT} * 2) 2rem 2rem;
    box-sizing:border-box;
    background-color:${COLOURB};

    ${grid}
    ${largeLayout}
    @media (max-width: 700px) {
        ${smallLayout}
    }
`