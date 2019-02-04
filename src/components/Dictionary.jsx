import React, {Component} from 'react';
import DictionaryItem from './DictionaryItem.jsx';

export default class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarks: this.props.bookmarks
        }
    }
    render() {
        return (
            <ul>
                <DictionaryItem bookmarks={this.state.bookmarks}/>
            </ul>
        )
    };
}