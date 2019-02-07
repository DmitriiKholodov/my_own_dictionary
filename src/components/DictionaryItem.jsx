import React, {Component} from 'react';
import MiniText from './MiniText'

export default class DictionaryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            removeWord: this.props.removeWord,
            displayText: false,
            usersText: this.props.usersText
        }
    }
    displayText = () => {
        this.setState({
            displayText: !this.state.displayText
        })
    };
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            usersText: e.target.value
        })
    };
    saveText = () => {
        this.setState({
            usersText: this.state.usersText
        });

    };
    render() {
        return (
            <li>
                {this.props.children}
                <button onClick={this.state.removeWord}>Remove</button>
                <button onClick={this.displayText}>Write text</button>
                {
                    this.state.displayText
                        ? <MiniText saveText={this.saveText} handleChange={this.handleChange} usersText={this.state.usersText}/>
                        : null
                }
            </li>
        )
    };
}
