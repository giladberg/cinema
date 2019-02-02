export const ADD_MOVIETOLIST = 'movies:addMovie'
export const DELETE_MOVIE = 'movies:deleteMovie'
export const EDIT_MOVIE = 'movies:editMovie'

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

export function editMovie(originalTitle,title,plot,year,runtime,genre,director){
   
   
    return {

        type: EDIT_MOVIE,
        payload: {
            originalTitle:originalTitle,
            title:title,
            plot:plot,
            year:year,
            runtime:runtime,
            genre:genre,
            director:director
        }
    }

}