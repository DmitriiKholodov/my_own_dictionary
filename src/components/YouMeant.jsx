import React from "react";
import "./styles/YouMeant.css"
export default class YouMeant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: this.props.bookmarks,
      addToHandle: this.props.addToHandle
    };
  }

  render() {
    return (
      <li className="item">
        <button onClick={this.state.addToHandle}>Add to</button>
        {this.props.children}
      </li>
    );
  }
}
