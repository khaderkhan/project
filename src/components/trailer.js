import React, {useEffect, useState} from "react";
import movieService from "../services/movies-service";
import { useParams } from 'react-router-dom'
import YoutubeVideo from "./youtube";

const Trailer = () => {

    const [videos, setVideos] = useState([]);
    const {movieID} = useParams();

    useEffect(() => {
        movieService.findVideosForMovie(movieID)
            .then(video => setVideos(video));

    }, [movieID])

    let trailerUrl = ''
    if (videos && videos.results && videos.results.length > 0) {
        trailerUrl = videos.results[1].key;
    }

    return (

                <div className="ml-3">
                    <h3>Trailer</h3>
                    <YoutubeVideo src={trailerUrl}/>
                </div>

    )
}

export default Trailer;