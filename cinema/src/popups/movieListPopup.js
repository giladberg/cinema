import React, { Component } from 'react'
import "../css/popupsCss.css"
import {connect} from 'react-redux';
import {addNewMovie} from '../actions/movie-actions'
import { bindActionCreators } from 'redux';
import {deleteMovie} from '../actions/movie-actions'
import {editMovie} from '../actions/movie-actions'
import BeforDelete from './beforeDelete'
import Edit from './editPopup'
class movieListPopup extends Component {
    constructor(props){
        super(props)
        this.state={askToDelete:false,edit:false}

    }
    componentDidMount(){
       
        this.props.onEditMovie(this.props.movie.Title,this.props.newTitle,this.props.movie.Plot,this.props.movie.Year,this.props.movie.Runtime,this.props.movie.Genre,this.props.movie.Director)
    }
    componentDidUpdate(){
       
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
        if(this.state.askToDelete===true){
            this.props.callback()
        }

       
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
        <div className="row searchBarPopup">
        <div className="col-sm-12  col-md-7 ">
        <p className="text"><span className="spanText">Id: </span>{this.props.index}</p>
            <p className="text"><span className="spanText">Name of the movie: </span>{this.props.movie.Title}</p>
            <p className="text"><span className="spanText">What is the plot?:</span> {this.props.movie.Plot}</p>
            <p className="text"><span className="spanText">Year:</span> {this.props.movie.Year}<span className="spanText">, How long?: </span>{this.props.movie.Runtime}</p>
            <p className="text"><span className="spanText">Genre:</span> {this.props.movie.Genre}<span className="spanText">, The Director:</span> {this.props.movie.Director}</p>   
        </div>
            <div className="col-12 col-sm-12  col-md-5">
               <img className="imgSearchPopup " src={this.props.movie.Poster} height="100%" width="100%" alt="popupImage" />
            </div>
            <div className="col-12 col-sm-4  col-md-4 buttonSearchPopup">
                  <input type="button" value="Cancel" className="btn btn-danger" onClick={this.cancel}/>
            </div>
            
            <div className="col-12 col-sm-4  col-md-4 buttonSearchPopup">
                  <input type="button" value="delete" className="btn btn-warning  " onClick={this.askToDelete}/>
            </div>
            
            <div className="col-12 col-sm-4  col-md-4 buttonSearchPopup">
                  <input type="button" value="Edit" className="btn btn-success" onClick={this.edit}/>
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
      OnDeleteMovie: deleteMovie,
      onEditMovie: editMovie 
    },dispatch)
       
      }
      export default connect(mapStateToProps,mapDispatchToProps)(movieListPopup);