import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link }  from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import bookIndex from './helpers'

class Search extends Component {
	static propTypes = {		
		onAddBook: PropTypes.func.isRequired,
		myBooks: PropTypes.array.isRequired
	}

	state = {
		query: '',
		shelf: {id:'none', title:'', books:[]},
	}

	updateQuery = (query) => {
		this.setState({ query: query })

		let newShelf = Object.assign({}, this.state.shelf)
		newShelf.books = []
				
		BooksAPI.search(query).then((results) => {      	      
      if (results && !results.error) {
	      newShelf.books = results		      
	      results.forEach((book) => {
	      	let i = bookIndex(this.props.myBooks, book)
	      	if(i > -1) {
	      		book.shelf = this.props.myBooks[i].shelf
	      	} else {
	      		book.shelf = 'none'
	      	}
	      })		    
		  }
		  this.setState({shelf:newShelf})	
		})
	}
  
  onChange = (book) => {  	
  	this.props.onAddBook(book)
  }


	render() {
		const {shelf} = this.state
		return (
				<div className="search-books">
		      <div className="search-books-bar">

		      	<Link className="close-search" to='/'></Link>

		        <div className="search-books-input-wrapper">
		          <input
		          	type="text" 
		          	placeholder="Search by title or author"
								value={this.state.query}
								onChange={(event) => this.updateQuery(event.target.value)}		          	
		          />
		        </div>

		      </div>

	      	{shelf.books.length > 0 && (
            <div className="search-books-results">            
              <Shelf
                key={shelf.id}
                shelf={shelf}
                onChange={this.onChange}
              />
            </div>     
	        )}

		    </div>
		)
	}
}


export default Search