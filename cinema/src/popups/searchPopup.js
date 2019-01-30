import React, { Component } from 'react'
import Dal from '../dal/dal'
import "../css/popupsCss.css"
import {connect} from 'react-redux';
import {addMovie} from '../actions/user-actions'
import { bindActionCreators } from 'redux';
class searchPopup extends Component {
    constructor(props){
        super(props)
        this.state={movieDetail:{},firsTime:true}

    }
    componentDidMount()
    {
  
  
      console.log('componentDidMountPopips - search');
        Dal.getAllData(`http://www.omdbapi.com/?t=${this.props.name}&apikey=b777c36d`).
        then(res=>{
            this.setState({movieDetail:res.data});
          
            
         
        })
    }
    cancel = () =>
{
 
  this.props.callback()
}
addMovie=()=>{
    this.props.onAddMovie(this.props.name)
    this.props.callback()
    
}
    
  render() {
      console.log("render")
    var detailsOfMovie
      if(this.state.movieDetail.Response==="False"){
       
        detailsOfMovie=<p>We are so sorry, we didn't found this movie</p>   
        console.log(this.state.movieDetail.Response)
        
      }
      else  {
      
        detailsOfMovie =<div className="container">
      <div className="row searchBarPopup">
      <div className="col-sm-12  col-md-8 ">
          <p>name of the movie: {this.state.movieDetail.Title}</p>
          <p>What is the plot?: {this.state.movieDetail.Plot}</p>
          <p>Year: {this.state.movieDetail.Year}, How long?: {this.state.movieDetail.Runtime}</p>
          <p>Genre: {this.state.movieDetail.Genre}, The Director: {this.state.movieDetail.Director}</p>   
      </div>
          <div className="col-sm-12  col-md-4">
             <img className="imgSearchPopup " src={this.state.movieDetail.Poster} height="100%" width="100%" />
          </div>
          <div className="col-sm-12  col-md-6 buttonSearchPopup">
                <input type="button" value="Add" className="btn btn-success" onClick={this.addMovie}/>
          </div>
          <div className="col-sm-12  col-md-6 buttonSearchPopup">
                <input type="button" value="cancel" className="btn btn-danger" onClick={this.cancel}/>
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
function mapDispatchToProps (dispatch){
    return bindActionCreators({
      onAddMovie: addMovie
    },dispatch)
       
      }
      export default connect(null,mapDispatchToProps)(searchPopup);