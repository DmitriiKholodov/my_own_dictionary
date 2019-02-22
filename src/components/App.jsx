import React from "react";
import SearchLine from "./SearchLine.jsx";
import Dictionary from "./Dictionary.jsx";
import "./styles/App.css"



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // Get token from localStorage or if storage is empty set token value to ''
      token: localStorage.getItem('token') || '',
      bookmarks:
            [
          [
            ['add - прибавлять, присоединять; добавлять'],
            ['I am going to add my first bookmark'],
          ],
          [
            ['add - прибавлять, присоединять; добавлять'],
            ['I am going to add my first bookmark']
          ],
          [
            ['add - прибавлять, присоединять; добавлять'],
            ['']
          ]
      ]
    };
  }
    // Before rendering this component check current state token value, and if there is no call getToken();
    // Else we have token which got from localStorage;
  componentWillMount() {
    if (this.state.token === "") {
      console.log("Getting access token");
      this.getToken();
    } else {
      console.log("Access token already exist");
    }
    // console.log(JSON.parse(localStorage.getItem('bookmarks')))
      const gettedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      console.log(gettedBookmarks);
      this.setState({
          bookmarks: gettedBookmarks
      })
  };
    // Function post request to url with appKey
  getToken = () => {
    const auth = {
      url:
        "https://cors-anywhere.herokuapp.com/https://developers.lingvolive.com//api/v1.1/authenticate",
      appKey:
        "MmQzN2FlZmMtMDdlYy00ZjAzLWFiN2UtYWYxY2Q3Zjg0NmRlOmI5MmEwM2ZhNDUzZjQ4MDY5N2NjZDQzMzM2ZmQwNTg4",
    };
    //If response status is ok returning resolve with response
    //Else print error with request status
    const status = response => {
      if (response.status >= 200 && response.status < 300) {
          console.log('Token got succesfully');
          return Promise.resolve(response);
      } else {
          return Promise.reject(new Error(response.statusText));
      }
    };
    // Transform response to string
    const text = response => {
      return response.text();
    };
    fetch(auth.url, {
        method: "POST",
        headers: new Headers({
            Authorization: `Basic ${auth.appKey}`
        })
    }).then(status)
        .then(text)
        //Assign to state received token, and write it to localStorage
        .then(token => {
            this.setState({
                token: token,
            });
            localStorage.setItem('token', token);
        });
  };

  //add one of words to bookmarks with the empty userText

  addToHandle = (e) => {
    let text = [[e.target.nextSibling.textContent], ['']];
    this.setState({ bookmarks: [...this.state.bookmarks, text]}, () => {
        localStorage.setItem('bookmarks', JSON.stringify(this.state.bookmarks));
    });
  };

  render() {
    return (
      <div className="App">
        <h1>My Own Oxford Dictionary</h1>
        <SearchLine
            getToken={this.getToken}
            addToHandle={this.addToHandle}
            bookmarks={this.state.bookmarks}
            token={this.state.token}
        />
        <Dictionary
            usersText={this.state.usersText}
            bookmarks={this.state.bookmarks}
        />
      </div>
    );
  }
}
