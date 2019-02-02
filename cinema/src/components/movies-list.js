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
      this.state = { titles:["dog day afternoon","the body","wall","blue jasmine","star wars","game of thrones","harry potter","good will hunting","breaking bad","Rush","dr house"] ,movies:[],openPopup:false,movie:'',currentIndex:0,newTitle:''}
  }
 
  componentDidMount()
  {
    

    var arr=[];
     this.state.titles.forEach(title =>{
      Dal.getAllData(`http://www.omdbapi.com/?t=${title}&apikey=b777c36d`).then(res => this.setState(()=>
      
      {
       
        arr.push(res.data)
       
        return{movies:arr}
      },()=>{
     
        if(arr.length === this.state.titles.length){
          arr.forEach((movie)=>{
            
            
            this.props.OnAddNewMovie(movie)})
          
        }}
      ))
     })
    
  }
  
  movieDetails = (data,index) =>{
    this.setState({movie:data})
    this.setState({currentIndex:index})
   this.setState({openPopup:true})
   this.removeNonEnglishLetters(data.Title)
  }
  cancelFromChild =()=>{
  
    this.setState({openPopup:false})
  }
  removeNonEnglishLetters = (string) =>{
    var str=[]
    string.split('').forEach(letter=>{
        if(letter.match("^[a-zA-Z ]*$")!= null){
            str+=letter
          
           this.upperCaseForEachWord(str)
        }
    })
    
    }
    upperCaseForEachWord=(string)=>{
      var newString=[]
      var firstLetter=true
  string.split('').forEach(letter=>{
  if(firstLetter===true){
      newString+=letter.toUpperCase()
       this.setState({newTitle:newString})
      firstLetter=false
      
      }
      else if(letter=== ' '){
          firstLetter=true
          newString+=' '
           this.setState({newTitle:newString})
        
      }
      else{
          newString+=letter.toLowerCase()
           this.setState({newTitle:newString})
         
      }
    
  })
  }

  
  render() {
   
    var popupDetail 
    if(this.state.openPopup===true){
      
      popupDetail=<MovieDetail movie={this.state.movie} index={this.state.currentIndex} newTitle={this.state.newTitle} callback={data => this.cancelFromChild()}/>
     
    }
   
    var listOfMovies =this.props.movies.map((movie,index)=>{
  
      var poster =movie.Poster
      if(movie.Poster==="N/A"){
        poster="http://www.townoftazewell.org/wp-content/gallery/misc/no-image-found.jpg"
        
      }
     
        return<div className="container col-sm-12 col-md-4 mt-4" key={index} data-aos="zoom-in">
      
        <img className="img" src={poster} alt="movie poster " onClick={() => this.movieDetails(movie,index)} />
        
     </div>
     
      
     })


    return (
      <div className="container">
   
   {popupDetail}
  <div className="row">
 
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


