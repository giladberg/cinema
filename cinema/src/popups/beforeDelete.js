import React, { Component } from 'react'
import "../css/popupsCss.css"
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {deleteMovie} from '../actions/movie-actions'

class beforeDelete extends Component {
    constructor(props){
        super(props)
        this.state={delete:false,askToDelete:false}

    }
    cancelDelete = () =>{
      this.props.callback()
     }
     delete = ()=>{
        this.props.OnDeleteMovie(this.props.movie)
        // this.setState({delete:true})
        // this.setState({askToDelete:false})
        this.props.callback()
        
    
     }
   
  render() {
  
      
  
    return (
        <div className="container">
        <div className="row noFoundMovie">
        <div className="col-sm-12  col-md-12 ">
        <p> Are you sure to delete this movie?</p> 
        </div>
        <div className="col-sm-12  col-md-6 buttonSearchPopup">
                <input type="button" value="Cancel" className="btn btn-danger" onClick={this.cancelDelete}/>
          </div>
          <div className="col-sm-12  col-md-6 buttonSearchPopup">
                <input type="button" value="Delete" className="btn btn-warning" onClick={this.delete}/>
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
      export default connect(null,mapDispatchToProps)(beforeDelete);