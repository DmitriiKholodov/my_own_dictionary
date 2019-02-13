import React, {Component} from 'react';
import DictionaryItem from './DictionaryItem.jsx';
import "./styles/Dictionary.css";

export default class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarks: this.props.bookmarks,
        }
    }

    removeWord = (e) => {
      console.log(e.target.parentNode.remove());
    };

    render() {
        return (
            <ul className="Dictionary">
                {this.props.bookmarks.map((item, index) => {
                    return (
                        <DictionaryItem usersText={item[1]} removeWord={this.removeWord} bookmarks={this.state.bookmarks} key={index}>
                            {item[0]}
                        </DictionaryItem>
                    );
                })}
            </ul>
        )
    };
}

