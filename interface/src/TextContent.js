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
    }

    // Handles change oh hover property on change in Draggable class
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
                        fontSize: this.props.size + 'em',
                        fontWeight: this.props.weight
                    }}
                >
                    {this.props.text}
                </span>
            </p>
        )
    }
}

export default TextContent;
