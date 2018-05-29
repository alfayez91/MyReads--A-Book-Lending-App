import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import SearchResult from './SearchResult'
import { PropTypes } from 'prop-types'
import * as BooksAPI from '../BooksAPI'

class SearchBook extends Component {
    state = {
        Books: [],
        result: '',
        query: ''
    }

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        myBooks: PropTypes.array.isRequired
    }

    ChangeHandler = (e) => {
        console.log(e.target);    
        var value = e.target.value
        this.setState(() => {
            return {query: value}
        })
        this.searchingBooks(value)
    }

    changeBookShelf = (books) => {
        let shelfBooks = this.props.myBooks
        for (let book of books) {
            book.shelf = "none"
        }

        for (let book of books) {
            for (let aBook of shelfBooks) {
                if (aBook.id === book.id) {
                    book.shelf = aBook.shelf
                }
            }
        }
        
        return books
    }

    searchingBooks = (value) => {
        console.log("searching -> ", value);
        
        if (value.length !== 0) {
            BooksAPI.search(value, 10)
            .then((books) => {
                console.log(books);
                if (books.length > 0) {
                    books = books.filter((book) => (book.imageLinks))
                    books = this.changeBookShelf(books)
                    this.setState(() => {
                        return { Books: books, result: '' }
                    })
                }
                if(books.error === "empty query"){
                    this.setState({Books: [], result: value})
                }
            })
        } else {
            this.setState({Books: [], query: '', result: ''})
        }
    }

    addBook = (book, shelf) => {
        this.props.onChange(book, shelf)
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link to='/' className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.ChangeHandler}/>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.query.length > 0 && this.state.Books.map((book, index) => (
                        <Book 
                            book={book}
                            key={index}
                            onUpdate={(shelf) => {
                                this.addBook(book, shelf)
                            }}
                        />
                    ))}
                    {this.state.result &&
                    
                        <SearchResult
                            word='Result not found'
                            value={this.state.result}
                        />
                    }
                </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook;