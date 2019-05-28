import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter as Router, Route, Link, Switch, __RouterContext } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'

import {
    Container, BasicGrid ,
    FlexContainer , FlexList ,
    SmallImage, LargeImage,
    SectionTitle, ViewTitle,
    StyledInput, StyledLink, Nav} from './layout.js'



const randomHex= n=>Math.random().toString(16).substr(-n) ;






/*****************************************************************************

    presentational classes for Views used on both list and detail pages

****************************************************************************/





const ShowtimesView=({times})=>
    <div className="showtimes">
        <ViewTitle>Showtimes:</ViewTitle>
        { times.map((time, key)=>
            <div key={key} >{time}</div> ) }
    </div> ;


const SummaryView=({summary})=>
    <div className="synopsis">
        <ViewTitle>Plot Summary</ViewTitle>
        <p >{ summary }</p>
    </div> ;


const SimilarView=({similar, entries})=>
    <div className="similar">
        <ViewTitle>Similar:</ViewTitle>
        { similar.map((id, key, arr)=>{
            const {id:path, title} =entries[id]
            return ( <div key={key}>
                        <StyledLink to={{pathname:`/list/${path}`}}>{title}</StyledLink>
                        { (key != arr.length-1) && <><br/><br/></> }
                    </div>
            )}) }
    </div> ;


const RatingView=({rating})=>
    <div className="rating">
        <ViewTitle>Rating:</ViewTitle>
        <span>{rating}</span>
    </div> ;


const DetailView=(filtered)=>
    <BasicGrid>
        <SectionTitle className="title">{filtered.title}</SectionTitle>
        <LargeImage className="image" src={filtered.img}/>
        <SimilarView similar={filtered.similar} entries={filtered.entries} />
        <SummaryView summary={filtered.synopsis} />
        <ShowtimesView times={filtered.showtimes} />
        <RatingView rating={filtered.rating} />
    </BasicGrid>


/* List page Views */


const List= ({ list, search })=>{
    return (
        <FlexList>
            { Object.values(list).map((info,i)=> <ListDetailView key={i} info={info} search={search}/> ) }
        </FlexList> ) ;
} ;


const ListDetailView= ({info, search})=>{

    /* highlight searched text */

    const title=useRef();
    useEffect(_=>{
        const regx= new RegExp(`(${search})`, 'igm');
        const node = title.current;
        node.innerHTML=info.title.replace(regx,'<span>$1</span>') ;
    })

return (
        <FlexContainer>
            <SmallImage className="thumb" src={info.thumbnail}/>
            <div className="info">
                <SectionTitle ref={title}>{ info.title }</SectionTitle>
                <div>
                    <ShowtimesView times={info.showtimes} />
                    <RatingView rating={info.rating} />
                </div>
                <StyledLink to={{ pathname:`/list/${info.id}`}}>more</StyledLink>
            </div>
        </FlexContainer> ) ;
} ;







/*****************************************************************************

    connected to redux store

****************************************************************************/






/* filtering logic for details pages */

const Detail= connect(state=>state)(
    ({entries, match:{params:{name}}})=>{

        /* check url path against redux list to retrieve desired data entry */

        const filtered= useMemo(
            _=>Object.values(entries).find(({id})=>{
                return id===name
            }),[ entries, name ]) ;

        return (
            <>
                <Nav>
                    <StyledLink to={`/list`}>view all</StyledLink>
                </Nav>
                <DetailView {...filtered} entries={entries}/>
            </> ) ;
    }) ;



/* filtering logic for list pages */


const Filter= connect(state=>state)(
    ({entries})=>{

        const [ { text, list }, filterList ]=useState({
            text:'',
            list:entries
        }) ;

        /*
            provide default value from useState
            so can be used independently of input event
        */

        const filter=({target:{value}}={target:{value:text}})=>{

            const filtered= Object.values(entries).filter(
                ({title})=>{
                    const t=title.toLowerCase(), v= value.toLowerCase() ;
                    /* searches anywhere in string */
                    return t.includes(v)
                    /* searches begining of string */
                    // return t.startsWith(v)
                }) ;

            filterList({ text:value, list:filtered }) ;
        } ;

        /*
            if component has redux entries data updated re run filter method
        */

        // useMemo( filter, [ entries ]) ;

        return (
            <>
                <Nav>
                    <span>Search:</span><StyledInput onChange={filter} type='input' value={text}></StyledInput>
                </Nav>

                <List list={list} search={text}/>
            </> ) ;
    } ) ;






/*****************************************************************************

    Routes and basic animations between them

****************************************************************************/





const RouteTransition=_=>{

    /*__RouterContext could be avoided by nesting Routes to get access to the history and location properties*/

    const { location, history } = useContext(__RouterContext) ;

    const isPop=history.action==="POP" ;

    const transition= useTransition(
        location , location=> location.pathname ,
        {
            from: { opacity: 0 },
            enter: { opacity: 1 },
            leave: { opacity: 0 }
        }
    ) ;

    return (
        <>
            { transition.map(({item, props , key})=>{
                return (
                    <animated.div
                            style={{
                                ...props,
                                position: 'absolute',
                                top:'0px'
                            }}

                            key={key}>
                        <Switch location={item}>
                            <Route
                                exact path='/list'
                                render={ props=> <Filter {...props} /> }
                                />
                            <Route
                                path='/list/:name'
                                render={ props=> <Detail {...props} /> }
                                />
                        </Switch>
                    </animated.div>
                    ) } )
                }
        </> ) ;
    };



const Navivation=_=>
    <Router>
        <RouteTransition />
    </Router>

export default Navivation ;