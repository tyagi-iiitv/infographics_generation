import React from 'react';
import styles from './TextContent.module.scss';

/*
Text Content Class
Will be a child component inside the Draggable class for both heading
and body text.
*/
class TextContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // For changing border on hovering over Draggable class
            hovering: this.props.hovering,
        };
        this.text_len = this.props.text.length;
        // For title text
        if (this.props.text[0] === '#') {
            this.text = this.props.text.substring(1,this.text_len);
            this.text_weight = 'bold';
            this.text_size = 32;
        }
        // For body text
        else {
            this.text = this.props.text;
            this.text_weight = 'normal';
            this.text_size = 16;
        }
    }

    // Handles change on hover property on change in Draggable class
    // Implemented from: https://stackoverflow.com/a/54568167/10307491
    componentDidUpdate(prevProps) {
        if (prevProps.hovering !== this.props.hovering) {
            this.setState({hovering: this.props.hovering});
        }
    }

    render() {
        return (
            <p
                className={styles.textContainer}
                style={{
                    // Black dashed border if hovering; transparent otherwise
                    border: this.state.hovering ? '0.5px dashed black' : '0.5px dashed transparent'
                }}
            >
                <span
                    className={styles.textContent}
                    style={{
                        fontSize: this.text_size + 'px',
                        fontWeight: this.text_weight
                    }}
                >
                    {this.text}
                </span>
            </p>
        )
    }
}

export default TextContent;
