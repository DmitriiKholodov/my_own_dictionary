import React, {Component} from 'react';
import MiniText from './MiniText'

export default class DictionaryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            removeWord: this.props.removeWord,
            displayText: false
        }
    }
    displayText = () => {
        this.setState({
            displayText: !this.state.displayText
        })
    }
    render() {
        return (
            <li>
                {this.props.children}
                <button onClick={this.state.removeWord}>Remove</button>
                <button onClick={this.displayText}>Write text</button>
                {
                    this.state.displayText
                        ? <MiniText usersText={this.props.usersText}/>
                        : null
                }
            </li>
        )
    };
}
