import React from 'react'

const YoutubeVideo = (url) => {
    return (
        <div>
            <iframe width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${url.src}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen/>
        </div>
    );
}
export default YoutubeVideo