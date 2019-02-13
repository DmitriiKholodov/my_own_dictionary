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
      addToHandle: this.props.addToHandle,
      validation: '',
    };
  }

  // Assign text from textarea to state

  handleChangeText = e => {
  // replace all cyr symbols on ''
    console.log(e.target.value);
    e.target.value = e.target.value.replace(/[а-яА-Я]/g, '');

    this.setState({
      toTranslateWord: e.target.value
    });
  };

  // Making request with the filled text to API

  getTranslate = () => {
  console.log(this.state.toTranslateWord);
    if(this.state.toTranslateWord === '') {
      this.setState({
          validation: 'alert'
      });
        console.log(this.state.validation)
    } else {
        this.toggleRotate();
        const mainUrl =
            "https://cors-anywhere.herokuapp.com/https://developers.lingvolive.com//api/v1/";
        // Check the request status
        const status = response => {
            if (response.status >= 200 && response.status < 300) {
                console.log('succesfully');
                this.toggleRotate();
                return Promise.resolve(response);
            } else if (response.status === 401) {
                console.log('Getting new Access token...');
                this.props.getToken();
                return Promise.reject(new Error(response.statusText));
            } else {
                this.toggleRotate();
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
    }
  };

  toggleRotate = () => {
      let rotateElem = document.querySelector('.translate');
      rotateElem.classList.contains('process')
          ? rotateElem.classList.remove('process')
          : rotateElem.classList.add('process')
  };

  handleOnFocus = (e) => {
    this.setState({
        validation: ''
    })
  };

  handleOnKeyUp = (e) => {
    if(e.keyCode === 13) {
            this.getTranslate()
        }
  };

  render() {
    return (
      <div>
          <div className="areas-container">
              <div className="textarea-container">
                  <textarea onKeyUp={this.handleOnKeyUp} onFocus={this.handleOnFocus} className={`to-translate-area ${this.state.validation}`}  rows="2" onChange={this.handleChangeText} />
              </div>
              <button className="translate" onClick={this.getTranslate}></button>
              <div className="textarea-container">
                  <textarea className="translated-area" rows="2" readOnly value={this.state.translateResult} />
              </div>
          </div>
        <YouMeantList addToHandle={this.state.addToHandle} bookmarks={this.state.bookmarks} anotherResults={this.state.allResults} />
      </div>
    );
  }
}
