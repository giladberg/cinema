
 import {ADD_MOVIETOLIST} from '../actions/movie-actions'
 import {DELETE_MOVIE} from '../actions/movie-actions'
 export default function moviesReducer (state=[], {type, payload}){
    
     switch(type){
     case  ADD_MOVIETOLIST:
    
     
     return  [payload.moviesList, ...state]
     case DELETE_MOVIE:
    var newState= state.filter(movie => movie.Title !== payload.deleteMovie)
    
     return newState

     default:
    
         return state;
     }
 }
 