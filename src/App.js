import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import { Link }  from 'react-router-dom'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'
import bookIndex from './helpers'
import Rater from './Rater'


/**
* @description Represents a number of virtual shelves to keep track of the user's library
* @constructor
*/
class BooksApp extends React.Component {

  state = {
    /**
    * @description books - the list of all books in the user's library
    */
    books:[],

    /**
    * @description shelves - an array of shelf object to categorise the user's books
    * @description each shelf keeps track of the books that are on it through its own books array
    */
    shelves: [
      {id:'currentlyReading', title:'Currently reading', books:[]},
      {id:'wantToRead', title:'Want to read', books:[]},
      {id:'read', title:'Read', books:[]},
    ]

  }


  /**
  * @description - iterates through all the books in the library and places them on a shelf
  */
  stockShelves = () => {
      let newShelves = Object.assign([], this.state.shelves)

      newShelves.map((shelf) => (
          shelf.books = this.state.books.filter((book) => book.shelf===shelf.id)
      ))

      this.setState({shelves:newShelves})
  }


  /**
  * @description - adds a book to the library
  * @description - calls the stockShelves function to refresh the shelves
  * @param {Book} - the book to add to the shelves
  */
  addBook = (book) => {
    let update = false
    let newBooks = this.state.books
    let i = bookIndex(newBooks, book)

    // Add a book to the library if it is not already there
    // if the book is already on the shelves, ensure that it is on the correct shelf
    if (i===-1){
      newBooks.push(book)
      update = true
    } else {
      if (newBooks[i].shelf !== book.shelf) {
        newBooks[i].shelf = book.shelf
        update = true
      }
    }

    // refresh the state if we added or move a books
    if (update) {
      this.setState({books:newBooks})
      this.stockShelves()
    }
  }


  /**
  * @description - places a call to the BooksApi getAll function
  * @description - populates the shelves with the results
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    }).then(this.stockShelves)

  }


  /**
  * @description - renders the user's books on the appropriate shelves
  */
  render() {
    return (
      // Render shelves
      <div className="app">
        <Route exact path="/" render={() => (
            <div>
              {this.state.shelves.map((shelf) => (
                <Shelf
                  key={shelf.id}
                  shelf={shelf}
                  onChange={this.stockShelves}
                />
              ))}
              <Link className='open-search open-search-link' to='/search'>Add a book</Link>
            </div>
          )}
        />

        <Route exact path="/search" render={() => (
          <Search
            onAddBook={this.addBook}
            myBooks={this.state.books}
          />
          )}
        />

        <Route exact path="/rate" component={Rater} />
      </div>




    )
  }
}

export default BooksApp
