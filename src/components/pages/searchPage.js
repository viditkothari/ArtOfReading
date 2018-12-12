import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";
import Book from "../book";

/* React component - The Search Page is what opens on clicking the add button.
 * Here one can search for books by entering the keywords and then add them to the respective shelf
*/
class searchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ""
    };
  }
  componentDidMount() {
    BooksAPI.getAll().then(resp => {
      this.setState({ books: resp });
    });
  }
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books
          .filter(b => b.id !== book.id)
          .concat([
            book
          ]) /*Concatenating to the API with the respective book by it's id*/
      }));
    });
  };
  updateQuery = query => {
    this.setState({ query: query }, this.submitSearch);
  };
  submitSearch() {
    if (this.state.query === "" || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(resp => {
      if (resp.error) {
        return this.setState({ results: [] });
      } else {
        resp.forEach(b => {
          let find = this.state.books.filter(
            boo => boo.id === b.id
          ); /*Check book is same as the response book*/
          b.shelf = find[0] ? find[0].shelf : null;
        });
        return this.setState({ results: resp });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              autoFocus
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((book, key) => (
              <Book updateBook={this.updateBook} book={book} key={key} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default searchPage;
