export const ADD_MOVIE = 'movies:addMovie'

export function addMovie(newMovie){
   
    
    return {

        type: ADD_MOVIE,
        payload: {
            mmovies:newMovie
        }
    }

}