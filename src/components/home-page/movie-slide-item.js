import React from 'react';
import {Link} from 'react-router-dom';

const MovieSlideItem = ({movies, images}) => {
    return (
        <div className="div-background">
            <div className="row">
                <div className="col-4">
                    <Link to={`/details/${movies[0].id}`}>
                        <img style={{maxWidth: "350px"}} src={images[0]}/>
                    </Link>
                </div>
                <div className="col-4">
                    <Link to={`/details/${movies[1].id}`}>
                        <img style={{maxWidth: "350px"}} src={images[1]} alt={".."}/>
                    </Link>
                </div>
                <div className="col-4">
                    <Link to={`/details/${movies[2].id}`}>
                        <img style={{maxWidth: "350px"}} src={images[2]}/>
                    </Link>
                </div>

            </div>
        </div>
    )
}
export default MovieSlideItem;