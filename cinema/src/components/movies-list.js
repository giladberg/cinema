import React, { Component } from 'react';
import "../css/moviesCss.css"
import {connect} from 'react-redux';
import Dal from '../dal/dal'
import {addNewMovie} from '../actions/movie-actions'
import { bindActionCreators } from 'redux';
import MovieDetail from '../popups/movieListPopup'




class Movies extends Component {

  constructor(props){
  
    super(props)
      this.state = { titles:["dog day afternoon","the body","wall","blue jasmine","star wars","game of thrones","harry potter","good will hunting","breaking bad","Rush","dr house"] ,movies:[],openPopup:false,movie:''}
  }
 
  componentDidMount()
  {
    

    var arr=[];
     this.state.titles.forEach(title =>{
      Dal.getAllData(`http://www.omdbapi.com/?t=${title}&apikey=b777c36d`).
      then(res => this.setState(()=>
      {
       
        arr.push(res.data)
       
        return{movies:arr}
      },()=>{
     
        if(arr.length === this.state.titles.length){
          arr.forEach((movie)=>{this.props.OnAddNewMovie(movie)})
          
        }
        }
        
      ))
     })
    
  }
  movieDetails = (data) =>{
    this.setState({movie:data})
   this.setState({openPopup:true})
  }
  cancelFromChild =()=>{
  
    this.setState({openPopup:false})
  }
  
  render() {
   
    var popupDetail 
    if(this.state.openPopup===true){
      
      popupDetail=<MovieDetail movie={this.state.movie} callback={data => this.cancelFromChild()}/>
     
    }
   
    var listOfMovies =this.props.movies.map((movie,index)=>{
  
      var poster;
      if(movie.Poster==="N/A"){
        poster="http://www.townoftazewell.org/wp-content/gallery/misc/no-image-found.jpg"
        return <div className="container col-sm-12  col-md-4" key={index}>
       
        <img className="img" src={poster}height="90%" width="90%" alt="N/A" onClick={() => this.movieDetails(movie)}/>
     
       
     </div>

      }
      else{
        return<div className="container col-sm-12 col-md-4" key={index}>
      
        <img className="img" src={movie.Poster} height="85%" width="90%" alt="movie poster " onClick={() => this.movieDetails(movie)}/>
        
     </div>
     
      }
     })


    return (
      <div className="container">
      <h3>Welcome to our libary movies</h3>

  <div className="row">
  {popupDetail}
  {listOfMovies}
  </div>

      </div>
    );
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
  


  export default connect(mapStateToProps,mapDispatchToProps)(Movies);


