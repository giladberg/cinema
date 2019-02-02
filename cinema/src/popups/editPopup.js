import React, { Component } from 'react'
import "../css/popupsCss.css"
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {editMovie} from '../actions/movie-actions'

class edit extends Component {
    constructor(props){
        super(props)
        this.state={readyToEdit:false,title:this.props.movie.Title,plot:this.props.movie.Plot,year:this.props.movie.Year,time:this.props.movie.Runtime,genre:this.props.movie.Genre,director:this.props.movie.Director,emptyFiled:false,errorYear:false,errorRuntime:false,isExist:false}

    }
    componentDidUpdate(){
     
        if(this.state.errorRuntime ===false && this.state.errorYear===false && this.state.emptyFiled ===false &&this.state.readyToEdit===true && this.state.isExist===false){
            
           this.props.onEditMovie(this.props.movie.Title,this.state.title,this.state.plot,this.state.year,this.state.time,this.state.genre,this.state.director)
           this.setState({readyToEdit:false})
           this.props.callback()
           
        }
     


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
        this.setState({emptyFiled:false})
        this.setState({errorYear:false})
        this.setState({errorRuntime:false})
        this.setState({isExist:false})
        
    
         this.removeNonEnglishLetters(this.state.title)
        this.checkEmpty(this.state.title)
        this.checkExistTitle(this.state.title)
        this.checkEmpty(this.state.plot)
        this.checkEmpty(this.state.genre)
        this.checkEmpty(this.state.director)
        this.checkYear(this.state.year)
        this.checkRunTime(this.state.time)
        this.setState({readyToEdit:true})
        
       
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
    this.setState({title:newString})
    firstLetter=false
    }
    else if(letter=== ' '){
        firstLetter=true
        newString+=' '
        this.setState({title:newString})
    }
    else{
        newString+=letter.toLowerCase()
        this.setState({title:newString})
    }
})
}


checkEmpty =(string)=>{
    if(string===null || string === undefined || string === ''){
        this.setState({emptyFiled:true})
    }
}
checkYear =(year)=>{
    if(year >2019 || year<1910){
        this.setState({errorYear:true})
        
    }
   
}
checkRunTime = (time)=>{
    if(time >300 ||time< 3){
        this.setState({errorRuntime:true})
    }
}
checkExistTitle= (title)=>{
  

  if(this.props.movie.Title ===title){
      
    this.setState({isExist:false})
  }
  else{
      var lowercase;
    this.props.movies.forEach(movie => {
        lowercase=movie.Title.toLowerCase()
        if(movie.Title===title || title===lowercase ){
            
          this.setState({isExist:true})
        }
      });

  }
    
}
 
   
  render() {
  var error
      if(this.state.errorRuntime===true){
         error= <p className="text-danger">Please fill the run time filed, value between 3-300</p>
      }
      else if(this.state.errorYear===true){
        error= <p className="text-danger">Please fill the year field, value between 1910-2019 </p>
      }
      else if(this.state.emptyFiled===true){
        error= <p className="text-danger">Please fill all the value</p>
      }
      else if(this.state.isExist===true){
        error= <p className="text-danger">I am sorry this title allready exist</p>
      }
      


  
    return (
        <div className="container">
        <div className="row editBarPopup">
        <div className="col-sm-8  col-md-8 ">
            <p>name of the movie:<input type="text" value={this.state.title} onChange={this.setTitle}/></p>
            <p>What is the plot?:<input type="text"value={this.state.plot} onChange={this.setPlot}/> </p>
            <p>Year:<input type="text" value={this.state.year} onChange={this.setYear}/></p><p> How long?:<input type="text" value={this.state.time} onChange={this.setTime}/> </p>
            <p>Genre:<input type="text" value={this.state.genre} onChange={this.setGenre}/></p><p>  The Director:<input type="text" value={this.state.director} onChange={this.setDirector}/></p>   
            {error}
        </div>
            <div className="col-sm-4  col-md-4">
               <img className="imgSearchPopup " src={this.props.movie.Poster} height="100%" width="100%" alt="popupImage"/>
            </div>
            
            <div className="col-sm-6  col-md-6 buttonSearchPopup">
                  <input type="button" value="Cancel" className="btn btn-danger btn-sm" onClick={this.cancel}/>
            </div>
            <div className="col-sm-6  col-md-6 buttonSearchPopup">
                  <input type="button" value="Save" className="btn btn-success btn-sm" onClick={this.edit}/>
            </div>
        
        
        </div>
      
       </div> 
    )
  }
}
const mapStateToProps = state => ({
    movies:state.movies
    })

function mapDispatchToProps (dispatch){
    return bindActionCreators({
    
      onEditMovie: editMovie 
    },dispatch)
       
      }
      export default connect(mapStateToProps,mapDispatchToProps)(edit);