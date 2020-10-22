import React from 'react';
import styles from './TextContent.module.scss';

class TextContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: this.props.hovering,
        };
    }

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
                    border: this.state.hovering ? '0.5px dashed black' : '0.5px dashed transparent'
                }}
            >
                <span
                    className={styles.textContent}
                    style={{
                        fontSize: this.props.size +'em',
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
