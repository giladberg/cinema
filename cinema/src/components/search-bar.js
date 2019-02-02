import React, { Component } from 'react';
import "../css/moviesCss.css"
import SearchPopup from '../popups/searchPopup'



class SearchBar extends Component {

  constructor(props){
  
    super(props)
      this.state = { movie:'',modal:false}

     
  }
 
  onInputChange = (e)=>{
    this.setState({movie :e.target.value})
  }
  searchMovie = (event)=>{
    if(this.state.movie !== '' && this.state.modal === false){
    

    event.preventDefault()
    this.setState({modal:true})
    }
    
  }
  cancelFromChild = () =>
  {
    
    this.setState({ modal : false})
    this.setState({movie :''})
  }
  
  
  
  render() {
    var popup;
    if(this.state.modal===true){
      popup=<SearchPopup name={this.state.movie}  callback={data => this.cancelFromChild()}/>
    }
  
    return (
     
      <div className="container">
       <form   className="input-group">
        <input placeholder="Choose a name of your favorite movie" className="form-control-md search-bar  col-sm-7 ml-9 border border-warning" value={this.state.movie} onChange={this.onInputChange}/>
        <span className="input-group-btn  mr-4">
        <input type="button" value="Search"  className="btn-md btn-warning text-white col-sm-12 " onClick={this.searchMovie}/>
        </span>
        </form>
        {popup}
        
      </div>
    );
  }
}

  export default SearchBar


