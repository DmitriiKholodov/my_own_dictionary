import React from "react";
import SearchLine from "./SearchLine.jsx";
import Dictionary from "./Dictionary.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token') || '',
      bookmarks: [
          [
            ['add - прибавлять, присоединять; добавлять'],
            ['I am going to add my first bookmark']
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

  componentWillMount() {
    if (this.state.token === "") {
      console.log("Getting access token");
      this.getToken();
    } else {
      console.log("Access token already exist");
    }
  };

  getToken = () => {
    const auth = {
      url:
        "https://cors-anywhere.herokuapp.com/https://developers.lingvolive.com//api/v1.1/authenticate",
      appKey:
        "MmQzN2FlZmMtMDdlYy00ZjAzLWFiN2UtYWYxY2Q3Zjg0NmRlOmI5MmEwM2ZhNDUzZjQ4MDY5N2NjZDQzMzM2ZmQwNTg4",
    };

    fetch(auth.url, {
        method: "POST",
        headers: new Headers({
            Authorization: `Basic ${auth.appKey}`
        })
    }).then(response => {
        response.text()
            .then(token => {
                console.log("Token got successfully");
                this.setState({
                    token: token,
                });
                localStorage.setItem('token', token);
            });
    });
  };

  //add one of words to bookmarks with the empty userText

  addToHandle = (e) => {
    let text = [[e.target.nextSibling.textContent], ['']];
    this.setState({ bookmarks: [...this.state.bookmarks, text]});
  };

  render() {
    return (
      <div className="App">
        <h1>My Own Oxford Dictionary</h1>
        <SearchLine
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
