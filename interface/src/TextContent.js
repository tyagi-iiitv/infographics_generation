import React from 'react';
import styles from './TextContent.module.scss';

class TextContent extends React.Component {
    render() {
        return (
            <p className={styles.textContainer}>
                <text
                    className={styles.textContent}
                    style={{
                        fontSize: this.props.size +'em',
                        fontWeight: this.props.weight
                    }}
                >
                    {this.props.text}
                </text>
            </p>
        )
    }
}

export default TextContent;
