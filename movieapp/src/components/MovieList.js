import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import AlphabetPagination from './AlphabetPagination';
import axios from 'axios';

const apiurl = "https://api.themoviedb.org/3/list/35027?api_key=" + process.env.REACT_APP_API_KEY;

const MovieList = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setData] = useState([]);
  const [letters, setLetters] = useState([]);

  const changeActiveLetter = (index) => {
    let newLetters = [...letters]

    newLetters.forEach(item => {
      item.active = false;
    })
    newLetters[index].active = true

    setLetters(newLetters);
  }


  const lettersToObject = (lettersArr) => {
    let newLetters = [];

    lettersArr.forEach((item, index) => {
      if (index === 0) {
        newLetters[index] = { letter: item, active: true }
      } else {
        newLetters[index] = { letter: item, active: false }
      }
    })
    return newLetters;
  }

  const getActiveLetter = (allLetters) => {
    var activeLetter;

    allLetters.forEach(item => {
      if (item.active) {
        activeLetter = item.letter
      }
    })
    return activeLetter;
  }
  useEffect(() => {

    const getFirstLetters = (response) => {
      let letters = [];

      response.data['items'].forEach((item) => {
        if (item['original_title'] && item['original_title'].charAt(0).match(/[aA-zZ]/i) && !letters.includes(item['original_title'].charAt(0))) {

          letters.push(item['original_title'].charAt(0));
        }
      })
      setLetters(lettersToObject(letters.sort()));
    }

    const callData = async () => {
      const res = await axios.get(apiurl);

      getFirstLetters(res)
      setData(res.data['items'])
      setLoading(false)

    }
    callData();
  }, [])

  return (
    <div className='movieListWrapper'>
      <section className='movieList'>
        <header className="movieListHeader">
          <h1>Film-Liste</h1>
        </header>
        <div className='pagination'>
          {letters.map((item, index) => {
            return (
              <AlphabetPagination
                key={index}
                active={item.active}
                letter={item.letter}
                index={index}
                onChangeActive={changeActiveLetter}
              ></AlphabetPagination>
            )
          })}
        </div>

        {loading ? (
          <h4>Wait for Api...</h4>) :
          (movies.map((item, index) => {
            if (item.original_title && (item.original_title.charAt(0) === getActiveLetter(letters))) {
              return (
                <Movie
                  releaseDate={item.release_date}
                  movieimg={item.poster_path}
                  movietitle={item.original_title}
                  key={index}
                  description={item.overview}
                ></Movie>
              )
            } else {
              return ('');
            }
          }))}

      </section>
    </div>
  )
}

export default MovieList