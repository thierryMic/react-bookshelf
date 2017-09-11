import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Shelfer from './Shelfer'


/**
* @description Represents a book
* @constructor
*/
class Book extends Component {

	static propTypes = {
		book: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired
	}

	/**
	* @description changes the shelf property of a book object
	* @description calls the parent component's change handler
	* @description calls the update function of the BooksApi
	* @param {string} newShelf - the id of the shelf to which the book should be moved
	*/
	changeShelf = (newShelf) => {
		this.props.book.shelf = newShelf
		BooksAPI.update(this.props.book, newShelf)
  	this.props.onChange(this.props.book)
	}


	/**
	* @description renders a book object
	*/
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
	        	{book.authors && (<div className="book-authors">{book.authors[0]}</div>)}
	      </div>
	  )
	}
}


export default Book
