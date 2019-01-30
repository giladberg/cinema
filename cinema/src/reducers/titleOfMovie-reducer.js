
 import {ADD_MOVIE} from '../actions/user-actions'
export default function titleReducer (state=[], {type, payload}){
  
    switch(type){
    case  ADD_MOVIE:
    
    
    return  [payload.mmovies, ...state]
    default:
   
        return state;
    }
}
