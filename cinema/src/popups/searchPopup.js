import React, { Component } from 'react'
import Dal from '../dal/dal'
import "../css/popupsCss.css"
import {connect} from 'react-redux';
import {addNewMovie} from '../actions/movie-actions'
import { bindActionCreators } from 'redux';
class searchPopup extends Component {
    constructor(props){
        super(props)
        this.state={movieDetail:{},firsTime:true,isExist:false}

    }
    componentDidMount()
    {
  
  
      
        Dal.getAllData(`http://www.omdbapi.com/?t=${this.props.name}&apikey=b777c36d`).then(res=>
        {
            this.setState({movieDetail:res.data});
            this.props.movies.forEach(movie => {
              if(movie.Title===res.data.Title){
                this.setState({isExist:true})
              }
            });
           
        })
    }
    cancel = () =>
{
 
  this.props.callback()
}
addMovie=()=>{
    this.props.OnAddNewMovie(this.state.movieDetail)
    this.props.callback()
    
    
}
    
  render() {
     
    var detailsOfMovie
      if(this.state.movieDetail.Response==="False"){
       
        detailsOfMovie=<div className="container">
        <div className="row noFoundMovie">
        <div className="col-sm-12  col-md-12 ">
        <p>We are so sorry, we didn't found this movie</p> 
        <div className="col-sm-12  col-md-6 buttonSearchPopup">
                <input type="button" value="OK" className="btn btn-danger" onClick={this.cancel}/>
          </div>
        </div>
        </div>
        </div>
        
        
      }
     else if(this.state.isExist === true){
       
        detailsOfMovie=<div className="container">
        <div className="row noFoundMovie">
        <div className="col-sm-12  col-md-12 ">
        <p>This movie allready exist!!!</p> 
        <div className=" buttonSearchPopup ">
                <input type="button" value="OK" className="btn btn-danger  " onClick={this.cancel}/>
          </div>
        </div>
        </div>
        </div>
     
        
      }
      else  {
      
        detailsOfMovie =<div className="container">
      <div className="row searchBarPopup">
      <div className="col-sm-12  col-md-8 ">
          <p className="text"><span className="spanText">name of the movie: </span>{this.state.movieDetail.Title}</p>
          <p className="text"><span className="spanText">What is the plot?:</span> {this.state.movieDetail.Plot}</p>
          <p className="text"><span className="spanText">Year:</span> {this.state.movieDetail.Year}<span className="spanText">, How long?: </span>{this.state.movieDetail.Runtime}</p>
          <p className="text"><span className="spanText">Genre:</span> {this.state.movieDetail.Genre}<span className="spanText">, The Director:</span> {this.state.movieDetail.Director}</p>   
      </div>
          <div className="col-12 col-sm-12  col-md-4">
             <img className="imgSearchPopup " src={this.state.movieDetail.Poster} height="100%" width="100%" alt="impagePopup" />
          </div>
          <div className="col-12 col-sm-6  col-md-6 buttonSearchPopup ">
                <input type="button" value="cancel" className="btn btn-danger btn-md" onClick={this.cancel}/>
          </div>
          <div className="col-12 col-sm-6  col-md-6 buttonSearchPopup ">
                <input type="button" value="Add" className="btn btn-success btn-md" onClick={this.addMovie}/>
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
    
      OnAddNewMovie: addNewMovie
    },dispatch)
       
      }
      export default connect(mapStateToProps,mapDispatchToProps)(searchPopup);