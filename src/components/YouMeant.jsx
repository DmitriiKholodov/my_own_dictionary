import React from "react";
export default class YouMeant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addToHandle = () => {
    let word = this.props.children.join("");
    window.bookmarks.push(word);
  };
  render() {
    return (
      <li>
        <button onClick={this.addToHandle}>Add to</button>
        {this.props.children}
      </li>
    );
  }
}
