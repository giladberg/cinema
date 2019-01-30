import React, { Component } from 'react';
import {connect} from 'react-redux';
import Movies from './components/movies-list'
import SearchBar from './components/search-bar'
import "./css/moviesCss.css"

class App extends Component {

  constructor(props){
    super(props)

  }
  render() {
    return (
      <div >
      <SearchBar/>
      <Movies/>
    
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
  titles:state.titles

  
  })


  export default connect(mapStateToProps)(App);
