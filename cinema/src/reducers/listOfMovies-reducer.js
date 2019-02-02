
 import {ADD_MOVIETOLIST} from '../actions/movie-actions'
 import {DELETE_MOVIE} from '../actions/movie-actions'
 import {EDIT_MOVIE} from '../actions/movie-actions'
 export default function moviesReducer (state=[], {type, payload}){
    
     switch(type){
     case  ADD_MOVIETOLIST:
     return  [payload.moviesList, ...state]

     case DELETE_MOVIE:
    var newState= state.filter(movie => movie.Title !== payload.deleteMovie)
     return newState

        case EDIT_MOVIE:
        
       newState =[]
    state.forEach((movie)=>{
        if(movie.Title===payload.originalTitle){
           
            movie.Title=payload.title
            movie.Plot=payload.plot
            movie.Year=payload.year
            movie.Runtime=payload.runtime
            movie.Genre = payload.genre
            movie.Director=payload.director
            newState.push(movie) 
           
        
        }
        else{
            newState.push(movie) 
        }
                                   
       
    })
        
        
        return newState

     default:
         return state;
     }
 }
 