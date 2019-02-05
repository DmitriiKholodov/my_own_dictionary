import React, {Component} from 'react';

export default class MiniText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersText: this.props.usersText,
        }
    }
    render() {
        return(
            <div>
                <div>{(this.props.usersText == '') ? 'Add your text here' : this.props.usersText}</div>
                <textarea>asd</textarea>
                <button>Add</button>
            </div>
        );
    };
}
