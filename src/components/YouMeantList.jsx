import React from "react";
import YouMeant from "./YouMeant.jsx";

export default class YouMeantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: this.props.bookmarks,
        addToHandle: this.props.addToHandle
    }
  }
  render() {
    return (
      <ul className="you-meant-list">
        {this.props.anotherResults.map((item, index) => {
          return (
            <YouMeant addToHandle={this.state.addToHandle} bookmarks={this.state.bookmarks} key={index}>
              {item.Heading + ' - ' + item.Translation}
            </YouMeant>
          );
        })}
      </ul>
    );
  }
}
