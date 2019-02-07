import React, {Component} from 'react';

export default class MiniText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersText: this.props.usersText,
            isEditing: false,
        }
    }
    editText = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });
    };
    render() {
            if (this.state.isEditing === false) {
            return(
                <div>
                    <div>
                        {this.props.usersText == '' ? 'Add you text here' : this.props.usersText}
                    </div>
                    <button onClick={this.editText}>Edit</button>
                </div>
            );
        } else {
            return(
                <div>
                    <textarea onChange={this.props.handleChange}>{this.props.usersText}</textarea>
                    <button onClick={(e)=>{this.props.saveText(); this.editText()}}>Save</button>
                </div>
            );
        }
    };
}
