import React from 'react'
import { IMG_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  return (
    <div>
        <div className='w-48 pr-4'>
            <img
            alt='movie card'
            src={IMG_URL + posterPath}
            />
        </div>
    </div>
  )
}

export default MovieCard