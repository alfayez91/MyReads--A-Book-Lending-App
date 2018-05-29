import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './Components/BooksList'
import SearchBooks from './Components/SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.get_books_details()
  }

  get_books_details = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  update_book_details = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.get_books_details()
    })
  }
  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            onChange={this.update_book_details}
            myBooks={this.state.books}
          />
        )} />

        <Route exact path='/' render={() => (
          <BooksList
            books={this.state.books}
            onChange={this.update_book_details}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
