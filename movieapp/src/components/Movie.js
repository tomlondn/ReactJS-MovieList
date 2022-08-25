import React from 'react'

const Movie = ({ movietitle, description, movieimg, releaseDate }) => {
    var img = "https://www.themoviedb.org/t/p/w500" + movieimg;
    releaseDate = new Date(releaseDate);
    
    return (
        <section className='movie'>
            <header className='movieHeader'>
                <h2>{movietitle} ({releaseDate.getFullYear()})</h2>
            </header>

            <div className='movieInfosWrapper'>
                {movieimg ? (
                    <figure className='movieImg'>
                        <img src={img} alt={movietitle} />
                    </figure>
                ) : ''}

                <div className= {movieimg ? "movieDescription wImg" : "movieDescription noImg"}>
                    <span className="movieDescriptionTitle">Overview:</span>
                    <p>{description}</p>
                </div>
            </div>

        </section >
    )
}

export default Movie;
