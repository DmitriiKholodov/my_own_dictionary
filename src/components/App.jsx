import React from "react";
import SearchLine from "./SearchLine.jsx";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }
  componentWillMount = () => {
    if (this.state.token === "") {
      this.getToken();
    }
  };
  getToken = () => {
    const auth = {
      url:
        "https://cors-anywhere.herokuapp.com/https://developers.lingvolive.com//api/v1.1/authenticate",
      appKey:
        "MmQzN2FlZmMtMDdlYy00ZjAzLWFiN2UtYWYxY2Q3Zjg0NmRlOmI5MmEwM2ZhNDUzZjQ4MDY5N2NjZDQzMzM2ZmQwNTg4",
      token: ""
    };
    fetch(auth.url, {
      method: "POST",
      headers: new Headers({
        Authorization: `Basic ${auth.appKey}`
      })
    }).then(response => {
      response.text().then(token => {
        auth.token = token;
        this.setState({
          token: token
        });
        console.log(token);
      });
    });
  };
  render() {
    return (
      <div className="App">
        <h1>My Own Oxford Dictionary</h1>
        <SearchLine token={this.state.token} />
      </div>
    );
  }
}
