import React from "react";
import YouMeant from "./YouMeant.jsx";

export default class YouMeantList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="you-meant-list">
        {this.props.anotherResults.map((item, index) => {
          return (
            <YouMeant key={index}>
              {item.Heading} - {item.Translation}
            </YouMeant>
          );
        })}
      </ul>
    );
  }
}
