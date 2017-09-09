import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import { Link }  from 'react-router-dom'
import Shelf from './Shelf'
import Search from './Search'

class BooksApp extends React.Component {

  state = {
    books:[],

    shelves: [
      {id:'currentlyReading', title:'Currently reading', books:[]},
      {id:'wantToRead', title:'Want to read', books:[]},
      {id:'read', title:'Read', books:[]},
    ]

  }

  stockShelves = () => {
      this.state.shelves.map((shelf) => (        
          shelf.books = this.state.books.filter((book) => book.shelf===shelf.id)
      ))

      this.setState((state) => ({
        shelves : this.state.shelves
      }))     

  }

  componentDidMount() {
    // request books from server
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    }).then(this.stockShelves)

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
                  onChange={this.stockShelves}
                />
              ))}
            </div>
          )}
        />

      
        <Link className='open-search open-search-link' to='/search'>Add a book</Link>
        <Route path="/search" component={Search}/>
      </div>
    )
  }
}

export default BooksApp
