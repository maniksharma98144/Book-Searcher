import React, { Component } from 'react';
import {
  ReactiveBase,
  DataSearch,
  SingleRange,
  ResultCard
} from '@appbaseio/reactivesearch';
import './App.css';

class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="bookSearcher"
        credentials="DrTx9YSe9:34baef39-c75a-4259-954f-a8be0511c884"
      >
        <div className="navbar">
          <div className="logo">
            The Booksearch App
          </div>
          <DataSearch
            componentId="mainSearch"
            dataField={["original_title", "original_title.search", "authors", "authors.search"]}
            queryFormat="and"
            placeholder="Search for a book title or an author"
            autosuggest={false}
            className="datasearch"
            innerClass={{
              "input": "searchbox",
              "list": "suggestionlist"
            }}
          />
        </div>
        <div className={"display"}>
          <div className={"leftSidebar"}>
            <SingleRange
              componentId="ratingsFilter"
              dataField="average_rating_rounded"
              title="Book Ratings"
              data={[
                { start: 4, end: 5, label: "★★★★ & up" },
                { start: 3, end: 5, label: "★★★ & up" },
                { start: 2, end: 5, label: "★★ & up" },
                { start: 1, end: 5, label: "★ & up" },
              ]}
            />
          </div>
          <div className={"mainBar"}>
            <ResultCard
              componentId="results"
              dataField="original_title"
              react={{
                "and": ["mainSearch", "ratingsFilter"]
              }}
              pagination={true}
              size={8}
              onData={(res) => (
                {
                  "image": res.image,
                  "title": res.original_title,
                  "description": res.average_rating + " ★ "
                }
              )}
              className="result-data"
              innerClass={{
                "image": "result-image",
                "resultStats": "result-stats"
              }}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default App;