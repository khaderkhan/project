import React, {useState, useEffect} from 'react'
import movieService from '../services/movies-service'
import {Link, useParams, useHistory} from "react-router-dom";
import { Table, Tag, Space } from 'antd';



const columns = [
    {
        title: 'Poster',
        dataIndex: 'backdrop_path',
        key: 'backdrop_path',
        render: (text, record) => {
           const itemUrl = `https://image.tmdb.org/t/p/w92${record.poster_path}`
           console.log(itemUrl)
           return ( <img src={itemUrl}/>);
        }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text ,record)=> {
        return <Link to={`/movies/${record.id}`}>{text}</Link>
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
  

const Search = () => {
    const {title} = useParams()
    const [searchTitle, setSearchTitle] = useState("")
    const [results, setResults] = useState([])
    const history = useHistory()
    useEffect(() => {
        setSearchTitle(title)
        if(title) {
            movieService.findMovieByTitle(title)
                .then(results => {
                    setResults(results.results)
                })  
        }
    }, [title])
    return(
        <div>
            <h1>Search</h1>
            <input
                onChange={(event) => {
                    setSearchTitle(event.target.value)
                }}
                className="form-control"
                value={searchTitle}/>
            <button
                onClick={() => {history.push(`/search/${searchTitle}`)}}
                className="btn btn-primary btn-block">
                Search
            </button>
            <Table columns={columns} dataSource={results} />
        </div>
    )
}

export default Search