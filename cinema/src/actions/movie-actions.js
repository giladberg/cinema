export const ADD_MOVIETOLIST = 'movies:addMovie'
export const DELETE_MOVIE = 'movies:deleteMovie'

export function addNewMovie(addNewMovie){
   
    
    return {

        type: ADD_MOVIETOLIST,
        payload: {
            moviesList:addNewMovie
        }
    }

}

export function deleteMovie(nameOfMovieToDelete){
   
   
    return {

        type: DELETE_MOVIE,
        payload: {
            deleteMovie:nameOfMovieToDelete
        }
    }

}