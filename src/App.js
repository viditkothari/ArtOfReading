import React from "react";
import "./App.css";
import { Route } from "react-router-dom"; //
import frontPage from "./components/pages/frontPage"; //landing page component
import searchPage from "./components/pages/searchPage"; //search functionality component

class BooksApp extends React.Component {
  render() {
    return ( // Setting routes for pages: front page & the search page
      <div>
        <Route exact path="/" component={frontPage} />
        <Route exact path="/search" component={searchPage} />
      </div>
    );
  }
}

export default BooksApp;