import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


/**
* @description Represents a bookshelf
* @constructor
*/
class Shelf extends Component {
	static propTypes = {
		shelf: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired
	}


	/**
	* @description iterates through the books array of the shelf prop and renders a book component
	* for each item
	*/
	render() {
		const {shelf, onChange} = this.props

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelf.title}</h2>
	        <div className="bookshelf-books">
	          <ol className="books-grid">
	          	{shelf.books.map((book) => (
		            <li key={book.id}>
		              	<Book
		              		book={book}
		              		onChange={onChange}
		              	/>
		            </li>
	          	))}
            </ol>
          </div>
        </div>
	  )
	}
}


export default Shelf
