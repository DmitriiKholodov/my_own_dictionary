import React from "react";
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
      <li>
        <button onClick={this.state.addToHandle}>Add to</button>
        {this.props.children}
      </li>
    );
  }
}
