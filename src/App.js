import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import Shelf from './Shelf'

class BooksApp extends React.Component {

  state = {

    shelves: [
      {id:'currentlyReading', title:'Currently reading', books:[]},
      {id:'wantToRead', title:'Want to read', books:[]},
      {id:'read', title:'Read', books:[]},
    ]

  }

  stockShelves = (books) => {
      this.state.shelves.map((shelf) => (        
          shelf.books = books.filter((book) => book.shelf===shelf.id)
      ))

      // setting state in this manner is slower than using forceUodate
      // this.setState((state) => ({
      //   shelves : this.state.shelves
      // }))      
  }


  // Request all books to initialise state
  componentDidMount() {
    // request books from server
    BooksAPI.getAll().then((books) => {
      this.stockShelves(books)
      this.forceUpdate()  
    })

 }

  
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
                />
              ))}
            </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
