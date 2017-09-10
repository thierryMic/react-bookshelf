import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'



class Shelf extends Component {
	static propTypes = {		
		books: PropTypes.array.isRequired,
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
	          	{this.props.books.map((book) => (
		            book.shelf === shelf.id  && (
			            <li key={book.id}>
			              	<Book 
			              		book={book}
			              		onChange={onChange}
			              	/>
			            </li>
			            )		          	
	          	))}
            </ol>
          </div>
        </div>	    
	  )
	}
}


export default Shelf
