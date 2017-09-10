import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Shelfer from './Shelfer'


class Book extends Component {
	
	static propTypes = {		
		book: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired
	}


  // Request all books to initialise state
  componentDidMount() {
  	this.setState((state) => ({
  		shelf:this.props.book.shelf
  	}))
  }

	changeShelf = (newShelf) => {
		this.props.book.shelf = newShelf
  	this.props.onChange(this.props.book)
	}


	render() {		
		const {book} = this.props
		return (
	      <div className="book">
	        <div className="book-top">
	          <div className="book-cover" 
	          			style={{ 
	          				width: 128, 
	          				height: 193, 
	          				backgroundImage: `url(${book.imageLinks.thumbnail})`}}/>
      				<Shelfer 
      					book={book}
      					onChangeShelf={this.changeShelf}
      				/>
	        	</div>
	        	
	        	<div className="book-title">{book.title}</div>
	        	{book.authors && (
	        		<div className="book-authors">{book.authors[0]}</div>
	        	)}
	      </div>	            
	  )
	}
}


export default Book
