import React, { Component } from 'react'
import "../css/popupsCss.css"
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {deleteMovie} from '../actions/movie-actions'

class edit extends Component {
    constructor(props){
        super(props)
        this.state={title:this.props.movie.Title,plot:this.props.movie.Plot,year:this.props.movie.Year,time:this.props.movie.Runtime,genre:this.props.movie.Genre,director:this.props.movie.Director}

    }
    setTitle = (e) =>{
     this.setState({title:e.target.value})
    }
    setPlot = (e) =>{
        this.setState({plot:e.target.value})
       }
       setYear = (e) =>{
        this.setState({year:e.target.value})
       }
       setTime = (e) =>{
        this.setState({time:e.target.value})
       }
       setGenre = (e) =>{
        this.setState({genre:e.target.value})
       }
       setDirector = (e) =>{
        this.setState({director:e.target.value})
       }
    cancel = () =>{
      this.props.callback()
     }
    
     edit = ()=>{
         console.log(this.state.title)
         console.log(this.state.title.charAt(0))
         console.log(this.state.title.toUpperCase())
         //this.state.title.charAt(0).indexOf("c")
         this.upperCase()
     }
upperCase = () =>{
    var x="xg"
    var y =x.split('')
   for( var i=0;i<x.length;i++){
       if(i===0){
        
       x[i]= x.charAt(i).toUpperCase()
       }
   }

    //console.log(x.toUpperCase())
  console.log(x)
}
   
  render() {
  
      
  
    return (
        <div className="container">
        <div className="row movieBarPopup">
        <div className="col-sm-12  col-md-8 ">
            <p>name of the movie:<input type="text" value={this.state.title} onChange={this.setTitle}/></p>
            <p>What is the plot?:<input type="text"value={this.state.plot} onChange={this.setPlot}/> </p>
            <p>Year:<input type="text" value={this.state.year} onChange={this.setYear}/> , How long?:<input type="text" value={this.state.time} onChange={this.setTime}/> </p>
            <p>Genre:<input type="text" value={this.state.genre} onChange={this.setGenre}/> , The Director:<input type="text" value={this.state.director} onChange={this.setDirector}/></p>   
        </div>
            <div className="col-sm-12  col-md-4">
               <img className="imgSearchPopup " src={this.props.movie.Poster} height="100%" width="100%" />
            </div>
            
            <div className="col-sm-12  col-md-6 buttonSearchPopup">
                  <input type="button" value="Cancel" className="btn btn-danger" onClick={this.cancel}/>
            </div>
            <div className="col-sm-12  col-md-6 buttonSearchPopup">
                  <input type="button" value="Save" className="btn btn-danger" onClick={this.edit}/>
            </div>
        
        
        </div>
      
       </div> 
    )
  }
}


function mapDispatchToProps (dispatch){
    return bindActionCreators({
    
     
      OnDeleteMovie: deleteMovie
    },dispatch)
       
      }
      export default connect(null,mapDispatchToProps)(edit);