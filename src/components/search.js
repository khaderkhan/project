import React, {useState, useEffect} from 'react'
import movieService from '../services/movies-service'
import {Link, useParams, useHistory} from "react-router-dom";
import { Table, Tag, Space } from 'antd';



const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
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
    },
    {
        title: 'Poster',
        dataIndex: 'backdrop_path',
        key: 'backdrop_path',
        render: (text, record) => {
           const itemUrl = `https://image.tmdb.org/t/p/w92${record.poster_path}`
           console.log(itemUrl)
           return ( <img src={record.itemUrl}/>);
        }
    }
   
  ];
  
//   const data = [
//     {
//       key: '1',
//       name: 'John Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//       tags: ['nice', 'developer'],
//     },
//     {
//       key: '2',
//       name: 'Jim Green',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//       tags: ['loser'],
//     },
//     {
//       key: '3',
//       name: 'Joe Black',
//       age: 32,
//       address: 'Sidney No. 1 Lake Park',
//       tags: ['cool', 'teacher'],
//     },
//   ];



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
                    console.log("results===>>", results)
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
            {/* <ul className="list-group">
                {
                    results && 
                    results.map(movie =>
                        <li className="list-group-item" key={movie.id}>
                            <Link to={`/details/${movie.id}`}>
                            {movie.original_title}
                            </Link>
                        </li>
                    )
                }
            </ul> */}
        </div>
    )
}

export default Search