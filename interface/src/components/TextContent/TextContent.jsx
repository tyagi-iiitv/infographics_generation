import React from 'react';
import SizeButton from '../SizeButton/SizeButton';
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
            hovering: this.props.hovering,
            locked: this.props.locked,
            text: '', // Text placed inside the textbox
            textWeight: '', // Weight of the text (bold for title)
            textSize: 0, // Size of text
        };
        this.textLen = this.props.text.length;

        // Font sizes that can be set to the text
        this.fontSizes = [
            8,
            9,
            10,
            11,
            12,
            14,
            16,
            18,
            24,
            28,
            30,
            32,
            36,
            42,
            48,
            60,
            72,
            96,
        ];

        // For title text (HTML H1 heading level)
        if (this.props.text[0] === '#') {
            this.state.text = this.props.text.substring(1, this.textLen);
            this.state.textWeight = 'bold';
            this.state.textSize = 32;
            this.textLen--;
        }
        // For body text
        else {
            this.state.text = this.props.text;
            this.state.textWeight = 'normal';
            this.state.textSize = 16;
        }
    }

    increaseTextSize = () => {
        if (this.state.locked === false) {
            var curSize = this.state.textSize;
            for (var i = 0; i < this.fontSizes.length; i++) {
                if (this.fontSizes[i] > curSize) {
                    curSize = this.fontSizes[i];
                    break;
                }
            }
            this.setState({ textSize: curSize });
        }
    };

    decreaseTextSize = () => {
        if (this.state.locked === false) {
            var curSize = this.state.textSize;
            for (var i = this.fontSizes.length - 1; i >= 0; i--) {
                if (this.fontSizes[i] < curSize) {
                    curSize = this.fontSizes[i];
                    break;
                }
            }
            this.setState({ textSize: curSize });
        }
    };

    componentDidUpdate(prevProps) {
        // Handles change on hover property on change in Draggable class
        // Implemented from: https://stackoverflow.com/a/54568167/10307491
        if (prevProps.hovering !== this.props.hovering) {
            this.setState({ hovering: this.props.hovering });
        }
        if (prevProps.locked !== this.props.locked) {
            this.setState({ locked: this.props.locked });
        }
    }

    render() {
        return (
            <>
                <p
                    className={styles.textContainer}
                    style={{
                        // Black dashed border if hovering; transparent otherwise
                        border: this.state.hovering
                            ? '0.5px dashed black'
                            : '0.5px dashed transparent',
                    }}
                >
                    <span
                        className={styles.textContent}
                        style={{
                            fontSize: this.state.textSize + 'px',
                            fontWeight: this.state.textWeight,
                        }}
                    >
                        {this.state.text}
                    </span>
                </p>
                <div
                    className={styles.textSizeChangeContainer}
                    style={{ opacity: this.state.hovering ? 1 : 0 }}
                >
                    <SizeButton
                        text="-"
                        buttonPressed={() => this.decreaseTextSize.bind(this)}
                    />
                    <div className={styles.textSizeDisplay}>
                        {this.state.textSize}
                    </div>
                    <SizeButton
                        text="+"
                        buttonPressed={() => this.increaseTextSize.bind(this)}
                    />
                </div>
            </>
        );
    }
}

export default TextContent;
