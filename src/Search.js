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
		shelf: {id:'none', title:''},
		books: []
	}

	updateQuery = (query) => {
		this.setState({ query: query })

		let newBooks = []
		
		if (query !== '') {
			BooksAPI.search(query).then((results) => {      	      
	      if (!results.error) {
		      newBooks = results		      
		      results.forEach((book) => {
		      	let i = bookIndex(this.props.myBooks, book)
		      	if(i > -1) {
		      		book.shelf = this.props.myBooks[i].shelf
		      	} else {
		      		book.shelf = 'none'
		      	}
		      })		    
			  }
			  this.setState({books:newBooks})	
			})
		} else {
				this.setState({books:newBooks})	
		}
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

	      	{this.state.books.length > 0 && (
            <div className="search-books-results">            
              <Shelf
                key={shelf.id}
                shelf={shelf}
                books={this.state.books}
                onChange={this.onChange}
              />
            </div>     
	        )}

		    </div>
		)
	}
}


export default Search