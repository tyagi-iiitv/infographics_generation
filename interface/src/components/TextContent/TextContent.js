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
            hovering: this.props.hovering,
            grabbing: this.props.grabbing,
            text: '', // Text placed inside the textbox
            text_weight: '', // Weight of the text (bold for title)
            text_size: 0, // Size of text
        };
        this.text_len = this.props.text.length;
        this.font_sizes = [
            { value: 8 },
            { value: 9 },
            { value: 10 },
            { value: 11 },
            { value: 12 },
            { value: 14 },
            { value: 16 },
            { value: 18 },
            { value: 24 },
            { value: 28 },
            { value: 30 },
            { value: 32 },
            { value: 36 },
            { value: 42 },
            { value: 48 },
            { value: 60 },
            { value: 72 },
        ];
        // For title text (HTML H1 heading level)
        if (this.props.text[0] === '#') {
            this.state.text = this.props.text.substring(1, this.text_len);
            this.state.text_weight = 'bold';
            this.state.text_size = 32;
            this.text_len--;
        }
        // For body text
        else {
            this.state.text = this.props.text;
            this.state.text_weight = 'normal';
            this.state.text_size = 16;
        }
    }

    setTextSize(textSize) {
        this.setState({
            textSize: textSize,
        });
    }

    // Handles change on hover property on change in Draggable class
    // Implemented from: https://stackoverflow.com/a/54568167/10307491
    componentDidUpdate(prevProps) {
        if (prevProps.hovering !== this.props.hovering) {
            this.setState({ hovering: this.props.hovering });
        }
        if (prevProps.grabbing !== this.props.grabbing) {
            this.setState({ grabbing: this.props.grabbing });
        }
        if (prevProps.size !== this.props.size) {
            this.setState({ size: this.props.size });
        }
    }

    render() {
        return (
            <div>
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
                            fontSize: this.state.text_size + 'px',
                            fontWeight: this.state.text_weight,
                        }}
                    >
                        {this.state.text}
                    </span>
                </p>
                <div className={styles.dropdownContainer}>
                    <select
                        name="text-size-dropdown"
                        className={styles.dropdown}
                        value={this.state.text_size}
                        onChange={(e) => this.setTextSize(e.currentTarget.value)}
                        style={{
                            opacity:
                                this.state.hovering && !this.state.grabbing ? 1 : 0,
                        }}
                    >
                        {this.font_sizes.map(({ value }) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}

export default TextContent;
