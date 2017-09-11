import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link }  from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import bookIndex from './helpers'




/**
* @description Represents a search component
* @description Accepts input from the user in a text box controlled component
* @description queries the BooksApi and displays the results in a Shelf component
* @constructor
*/
class Search extends Component {
	static propTypes = {
		onAddBook: PropTypes.func.isRequired,
		myBooks: PropTypes.array.isRequired
	}


	/**
	* @description keeps track of the elapsed time since the user last pressed a key
	* copied from https://schier.co/blog/2014/12/08/wait-for-user-to-stop-typing-using-javascript.html
	*/
	timeout = null


	/**
	* @description - query keeps the query string entered by the user in the search box
	* @description - shelf is a shelf component used to display the results of the search query
	*/
	state = {
		query: '',
		shelf: {id:'none', title:'', books:[]},
	}


	/**
	* @description - sends a request using the BooksApi and populates the page with the results
	* @param {string} query - the search string to query the BooksApi backend
	*/
	requestResults = (query) => {
		// initialise variables
		// newShelf holds a copy of the shelf state
		const {myBooks} = this.props
		let newShelf = Object.assign({}, this.state.shelf)
		newShelf.books = []

		// Calls the search function of BooksApi
		// Populates the newShelf object with the search results
		// Update the state using newShelf
		BooksAPI.search(query).then((results) => {
      if (results && !results.error) {
	      newShelf.books = results
	      results.forEach((book) => {
	      	let i = bookIndex(myBooks, book)
	      	if(i > -1) {
	      		book.shelf = myBooks[i].shelf
	      	} else {
	      		book.shelf = 'none'
	      	}
	      })
		  }
		  this.setState({shelf:newShelf})
		})
	}


	/**
	* @description - handles changes to the seach box
	* @description - updates the state
	* @description - waits 800ms for additional user input and then call the requestResults function
	* @description - this ensures that the component waits for the user to finish entering their
	* @description - full query before firing requests to the backend
	* @param {string} query - the contents of the seach input box
	*/
	updateQuery = (query) => {
		this.setState({ query: query })
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.requestResults(query)
		}, 800)
	}


	/**
	* @description - calls the parent component's change hanlder to handle the addition of a new book
	* @param {string} query - the book to add to a shelf
	*/
  onChange = (book) => {
  	this.props.onAddBook(book)
  }


	/**
	* @description renders a seach box to accept use input
	* @description displays the results of the user's query
	*/
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