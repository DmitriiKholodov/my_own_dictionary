import React, {Component} from 'react';

export default class DictionaryItem extends Component {
    render() {
        return (
            <li>{this.props.bookmarks}</li>
        )
    };
}