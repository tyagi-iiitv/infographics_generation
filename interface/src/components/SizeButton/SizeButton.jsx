import React from 'react';
import styles from './SizeButton.module.scss';

/*
Size Button
Button to set size of text element
*/
class SizeButton extends React.Component {
    render() {
        return (
            <button
                className={styles.sizeButton}
                onClick={this.props.buttonPressed()}
            >
                {this.props.text}
            </button>
        );
    }
}

export default SizeButton;
