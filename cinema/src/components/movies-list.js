import React, { Component } from 'react';
import "../css/moviesCss.css"
import {connect} from 'react-redux';
import Dal from '../dal/dal'



class Movies extends Component {

  constructor(props){
  
    super(props)
      this.state = { titles:[] ,movies:[],lastMovie:''}
  }
  static getDerivedStateFromProps(props,state)
  {
    console.log('getDerivedStateFromProps - ');
    
    return {titles:props.titles};
    
  }
 
  componentDidMount()
  {

    var arr=[];
    console.log('componentDidMount - ');
    this.state.titles.forEach(title=>{
      Dal.getAllData(`http://www.omdbapi.com/?t=${title}&apikey=b777c36d`).
      then(res=>{arr.push(res.data)
        this.setState({movies:arr});
      }
      )
    })
    this.setState({lastMovie:this.state.titles[0]});
  }
  componentDidUpdate(){
    if(this.state.titles[0] != this.state.lastMovie){
      console.log("yes")
     this.setState({lastMovie:this.state.titles[0]});
     console.log(this.state.titles[0])
     console.log(this.state.lastMovie)
    var updateMovies=this.state.movies
    
    Dal.getAllData(`http://www.omdbapi.com/?t=${this.state.titles[0]}&apikey=b777c36d`).
    then(res=>{
      updateMovies.unshift(res.data)
      this.setState({movies:updateMovies});
      
    })

    }


  }

  
  render() {
    var listOfMovies =this.state.movies.map((movie,index)=>{
  
      var poster;
      if(movie.Poster==="N/A"){
        poster="http://www.townoftazewell.org/wp-content/gallery/misc/no-image-found.jpg"
        return <div className="container col-sm-12  col-md-4" key={index}>
       
        <img className="img" src={poster}height="90%" width="90%" alt="N/A"/>
       
     </div>

      }
      else{
        return<div className="container col-sm-12 col-md-4" key={index}>
       
        <img className="img" src={movie.Poster} height="85%" width="90%" alt="movie poster"/>
       
     </div>
      }
    
     
  
  
     })
    return (
      <div className="container">
      <h3>Welcome to our libary movies</h3>
      
    
     
  <div className="row">
  {listOfMovies}
  </div>

    
     
    
      </div>
    );
  }
}
const mapStateToProps = state => ({

  titles:state.titles

  
  })


  export default connect(mapStateToProps)(Movies);


