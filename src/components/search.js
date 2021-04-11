import React, {useState, useEffect} from 'react'
import movieService from '../services/movies-service'
import {Link, useParams, useHistory} from "react-router-dom";
import { Table, Tag, Space } from 'antd';
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
  

const Search = () => {
    const {title} = useParams()
    const [searchTitle, setSearchTitle] = useState("")
    const [results, setResults] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const history = useHistory()
    const getColumns = (loginStatus) => {
        const cookie_key = 'loginCookie';
        const cookieVal = read_cookie(cookie_key)
        let columns = [
            {
                title: 'Poster',
                dataIndex: 'backdrop_path',
                key: 'backdrop_path',
                render: (text, record) => {
                   const itemUrl = `https://image.tmdb.org/t/p/w92${record.poster_path}`
                   // console.log(itemUrl)
                   return ( <img src={itemUrl}/>);
                }
            },
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
              render: (text ,record)=> {
                const movieID = record.id;
                return <Link to={`/details/${movieID}`}>{text}</Link>
              } 
            },
            {
              title: 'Rating',
              dataIndex: 'vote_average',
              key: 'vote_average',
            },
            {
              title: 'Release Date',
              dataIndex: 'release_date',
              key: 'release_date',
            }   
          ];
          if(!loginStatus || loginStatus === undefined){
            columns.pop()
          }
          return columns
    }
    useEffect(() => {
        setSearchTitle(title)
        const cookie_key = 'loginCookie';
        const cookieVal = read_cookie(cookie_key)
        // If the user is logged in, fetch the type of user. 
        // If the user type is admin => show all columns. 
        // Otherwise, hide certain columns. 
        // We will hide release_date. 
        if(!cookieVal || cookieVal === undefined || cookieVal.length == 0){
            setIsLoggedIn(false)
        }else{
            setIsLoggedIn(true)
        }
        if(title) {
            movieService.findMovieByTitle(title)
                .then(results => {
                    setResults(results.results)
                })  
        }
    }, [title])
    return(
        <>
            <br />
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="mr-auto">

                    <Nav.Link href="#feature">Feature 1</Nav.Link>
                    <Nav.Link href="#pricing">Feature 2</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text"
                                 placeholder="Search a movie"
                                 className="mr-sm-2"
                                 onChange={(event) => {
                                     setSearchTitle(event.target.value)
                                 }}
                                 onKeyPress = {event => {if (event.key === "Enter")
                                      {history.push(`/search/${searchTitle}`)}}}/>
                    <Button variant="outline-primary"
                            onClick={() => {history.push(`/search/${searchTitle}`)}}>
                        Search
                    </Button>
                </Form>
            </Navbar>
            <div>

                {/*<input*/}
                {/*    onChange={(event) => {*/}
                {/*        setSearchTitle(event.target.value)*/}
                {/*    }}*/}
                {/*    className="form-control"*/}
                {/*    value={searchTitle}/>*/}
                {/*<button*/}
                {/*    onClick={() => {history.push(`/search/${searchTitle}`)}}*/}
                {/*    className="btn btn-primary btn-block">*/}
                {/*    Search*/}
                {/*</button>*/}
                <Table columns={getColumns(isLoggedIn)} dataSource={results} />
            </div>
        </>
    )
}

export default Search