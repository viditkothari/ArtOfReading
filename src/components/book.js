import React from "react";

// React Component - book
class book extends React.Component {
  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 130,
                height: 175,
                backgroundImage: `url("${(this.props.book.imageLinks &&
                  this.props.book.imageLinks.thumbnail)||""}")`
              }}
            />

            <div className="book-shelf-changer">
              <select
                value={this.props.book.shelf || "none"}
                onChange={event => {
                  this.props.updateBook(this.props.book, event.target.value);
                }}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Reading</option>
                <option value="wantToRead">To Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            {(this.props.book.authors && this.props.book.authors[0]) ||
              "No Author"}
          </div>
        </div>
      </li>
    );
  }
}

export default book;