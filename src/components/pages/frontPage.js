import React from "react";
import { Link } from "react-router-dom";
import Shelf from "../shelf";
import * as BooksAPI from "../../BooksAPI";

// React component - The Front Page where the shelfs & the corresponding books get rendered
class frontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(response => {
      this.setState({ books: response });
    });
  }
  
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books
          .filter(b => b.id !== book.id)
          .concat([
            book
          ])
      }));
    });
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Art of Reading</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              updateBook={this.updateBook}
              name="Reading"
              books={this.state.books.filter(
                b => b.shelf === "currentlyReading"
              )}
            />
            <Shelf
              updateBook={this.updateBook}
              name="To Read"
              books={this.state.books.filter(b => b.shelf === "wantToRead")}
            />
            <Shelf
              updateBook={this.updateBook}
              name="Read"
              books={this.state.books.filter(b => b.shelf === "read")}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default frontPage;