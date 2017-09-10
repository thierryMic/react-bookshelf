import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Shelfer extends Component {
	
	static propTypes = {		
		book: PropTypes.object.isRequired,
		onChangeShelf: PropTypes.func.isRequired
	}

	handleChange = (e) => {
    this.props.onChangeShelf(e.target.value)
    e.preventDefault();
    this.setState({value:e.target.value})
  }

  state = {
    value:''
  }  

  componentDidMount() {
      this.setState((state) => ({
        value : this.props.book.shelf
      }))       	
  }  

	render() {				
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="book-shelf-changer">
	        <select value={this.state.value} onChange={this.handleChange} >
	          <option value="none" disabled>Move to...</option>
	          <option value="currentlyReading">Currently Reading</option>
	          <option value="wantToRead">Want to Read</option>
	          <option value="read">Read</option>
	          <option value="none">None</option>
	        </select>
      	</div>
      </form>	            
	  )
	}
}


export default Shelfer
