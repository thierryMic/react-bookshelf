import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
// import { Link }  from 'react-router-dom'
import Book from './Book'



class Shelf extends Component {
	static propTypes = {		
		shelf: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired
	}


	render() {
		const {shelf, onChange} = this.props
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelf.title}</h2>
	        <div className="bookshelf-books">
	          <ol className="books-grid">
	          	{this.props.shelf.books.map((book) => (
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
