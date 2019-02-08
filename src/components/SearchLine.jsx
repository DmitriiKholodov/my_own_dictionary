import React, { Component } from "react";
import YouMeantList from "./YouMeantList.jsx";
import "./styles/SearchLine.css";

export default class SearchLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toTranslateWord: "",
      translateResult: "",
      allResults: [],
      bookmarks: this.props.bookmarks,
      addToHandle: this.props.addToHandle
    };
  }

  // Assign text from textarea to state

  handleChangeText = e => {
    this.setState({
      toTranslateWord: e.target.value
    });
  };

  // Making request with the filled text to API

  getTranslate = () => {
    const mainUrl =
      "https://cors-anywhere.herokuapp.com/https://developers.lingvolive.com//api/v1/";
    // Check the request status
    const status = response => {
        if (response.status >= 200 && response.status < 300) {
            console.log('succesfully');
            return Promise.resolve(response);
        } else if (response.status === 401) {
            console.log('Getting new Access token...');
            this.props.getToken();
            return Promise.reject(new Error(response.statusText));
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    };
    // Translate response to json
    const json = response => {
          return response.json();
    };
    fetch(
      mainUrl +
        `WordList?prefix=${
          this.state.toTranslateWord
        }&srcLang=1033&dstLang=1049&pageSize=10`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${this.props.token}`
        })
      }
    ).then(status)
        .then(json)
        .then(translate => {
            // For the equals values making another request with offered equal value
        if (translate.Headings[0].Translation.charAt(0) === "=") {
          this.setState({
            toTranslateWord: translate.Headings[0].Translation.substring(2)
          });
          this.getTranslate();
          this.setState({
            translateResult: translate.Headings[0].Translation,
            allResults: translate.Headings
          });
        } else {
          this.setState({
            translateResult: translate.Headings[0].Translation,
            allResults: translate.Headings
          });
        }
      }).catch((error) => {
        console.log('Request failed', error);
    });
  };
  render() {
    return (
      <div>
          <div className="areas-container">
            <textarea rows="2" onChange={this.handleChangeText} />
            <button className="translate" onClick={this.getTranslate}></button>
            <textarea rows="2" readOnly value={this.state.translateResult} />
          </div>
        <YouMeantList addToHandle={this.state.addToHandle} bookmarks={this.state.bookmarks} anotherResults={this.state.allResults} />
      </div>
    );
  }
}
