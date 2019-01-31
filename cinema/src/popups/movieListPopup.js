import React, { Component } from 'react'
import "../css/popupsCss.css"
import {connect} from 'react-redux';
import {addNewMovie} from '../actions/movie-actions'
import { bindActionCreators } from 'redux';
import {deleteMovie} from '../actions/movie-actions'
import BeforDelete from './beforeDelete'
import Edit from './editPopup'
class movieListPopup extends Component {
    constructor(props){
        super(props)
        this.state={askToDelete:false,edit:false}

    }
    edit = ()=>{
        this.setState({edit:true})
    }
   
    cancel = () =>
    {
     
      this.props.callback()
    }
    cancelFromChild= () =>{
        this.setState({askToDelete:false})
        this.setState({edit:false})

        this.props.callback()
    }
 
 
 askToDelete=()=>{
    this.setState({askToDelete:true})
 }
    
  render() {
    var  detailsOfMovie  
    if(this.state.askToDelete===true){
        detailsOfMovie=<BeforDelete movie={this.props.movie.Title} callback={data => this.cancelFromChild()}/>
    }
    else if(this.state.edit ===true){
        detailsOfMovie=<Edit movie={this.props.movie} callback={data => this.cancelFromChild()}/>
    }
    else{
       detailsOfMovie =<div className="container">
        <div className="row movieBarPopup">
        <div className="col-sm-12  col-md-8 ">
            <p>name of the movie: {this.props.movie.Title}</p>
            <p>What is the plot?: {this.props.movie.Plot}</p>
            <p>Year: {this.props.movie.Year}, How long?: {this.props.movie.Runtime}</p>
            <p>Genre: {this.props.movie.Genre}, The Director: {this.props.movie.Director}</p>   
        </div>
            <div className="col-sm-12  col-md-4">
               <img className="imgSearchPopup " src={this.props.movie.Poster} height="100%" width="100%" />
            </div>
            <div className="col-sm-12  col-md-4 buttonSearchPopup">
                  <input type="button" value="delete" className="btn btn-success" onClick={this.askToDelete}/>
            </div>
            <div className="col-sm-12  col-md-4 buttonSearchPopup">
                  <input type="button" value="Cancel" className="btn btn-danger" onClick={this.cancel}/>
            </div>
            <div className="col-sm-12  col-md-4 buttonSearchPopup">
                  <input type="button" value="Edit" className="btn btn-danger" onClick={this.edit}/>
            </div>
        
        
        </div>
      
       </div> 
     
    }
      
      
      
     
  
    return (
      <div>
        {detailsOfMovie}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  movies:state.movies
  })

function mapDispatchToProps (dispatch){
    return bindActionCreators({
    
      OnAddNewMovie: addNewMovie,
      OnDeleteMovie: deleteMovie
    },dispatch)
       
      }
      export default connect(mapStateToProps,mapDispatchToProps)(movieListPopup);