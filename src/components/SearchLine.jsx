import React, { Component } from "react";
import YouMeantList from "./YouMeantList.jsx";
export default class SearchLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toTranslateWord: "",
      translateResult: "",
      allResults: []
    };
  }
  handleChangeText = e => {
    this.setState({
      toTranslateWord: e.target.value
    });
  };
  getTranslate = () => {
    console.log(this.state.toTranslateWord);
    const mainUrl =
      "https://cors-anywhere.herokuapp.com/https://developers.lingvolive.com//api/v1/";
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
    ).then(response => {
      response.json().then(translate => {
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
      });
    });
  };
  render() {
    return (
      <div>
        <h2>{this.state.toTranslateWord}</h2>
        <textarea rows="2" onChange={this.handleChangeText} />
        <textarea rows="2" readOnly value={this.state.translateResult} />
        <button onClick={this.getTranslate}>Как оно там...</button>
        <YouMeantList anotherResults={this.state.allResults} />
      </div>
    );
  }
}
