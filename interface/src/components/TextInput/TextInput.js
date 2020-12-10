import React from 'react';
import styles from './TextInput.module.scss';
import Button from '@material-ui/core/Button';
import marked from 'marked';

/*
TextInputClass
Area where user would add the text to create the infographic
*/
class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mdText: '',
            info: [], // Information about visual groups from the input
        };
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmitText = this.handleSubmitText.bind(this);
    }

    handleSubmitText(e) {
        //if no input or only whitespace, ignore it
        e.preventDefault();
        if (this.state.mdText.trim().length === 0) {
            return;
        }
        this.props.submitText(this.state.mdText.trim());
        this.setState({
            mdText: '',
        });
    }

    handleChangeText(e) {
        var text = e.target.value;
        // Get a list of lines
        var lines = text.split('\n');
        var i;

        // Remove empty lines
        for (i = lines.length - 1; i >= 0; i--) {
            lines[i] = lines[i].trim();
            if (lines[i].length === 0) {
                lines.splice(i, 1);
            }
        }

        // Gets a the title, subtitle, images, image alt texts and body texts of each
        // visual group and saves them in an object
        var info = [];
        var element = {};
        for (i = 0; i < lines.length; i++) {
            // Title of the visual group
            if (lines[i].startsWith('#') && !lines[i].startsWith('##')) {
                // If element is not empty push it to the list and
                // creates new element again
                if (Object.entries(element).length !== 0) {
                    if (!('title' in element)) {
                        element.title = '';
                    }
                    if (!('label' in element)) {
                        element.label = '';
                    }
                    if (!('images' in element)) {
                        element.images = [];
                    }
                    if (!('imagesAlt' in element)) {
                        element.imagesAlt = [];
                    }
                    if (!('text' in element)) {
                        element.text = '';
                    }
                    info.push(element);
                    element = {};
                }
                element.title = lines[i].substring(1, lines[i].length);
                // Label of the visual group
            } else if (lines[i].startsWith('##')) {
                element.label = lines[i].substring(2, lines[i].length);
            } else if (lines[i].match(/!\[.*\]\(.*\)/i)) {
                var imgAltText = lines[i].substring(
                    lines[i].lastIndexOf('[') + 1,
                    lines[i].lastIndexOf(']')
                );
                // Image Alt text
                if (!('imagesAlt' in element)) {
                    element.imagesAlt = [];
                }
                element.imagesAlt.push(imgAltText);
                var imgLink = lines[i].substring(
                    lines[i].lastIndexOf('(') + 1,
                    lines[i].lastIndexOf(')')
                );
                // Image link
                if (!('images' in element)) {
                    element.images = [];
                }
                element.images.push(imgLink);
                // Body text
            } else {
                if (!('text' in element)) {
                    element.text = [];
                }
                element.text.push(lines[i]);
            }
        }
        // Storing the last object
        if (Object.entries(element).length !== 0) {
            if (!('title' in element)) {
                element.title = '';
            }
            if (!('label' in element)) {
                element.label = '';
            }
            if (!('images' in element)) {
                element.images = [];
            }
            if (!('imagesAlt' in element)) {
                element.imagesAlt = [];
            }
            if (!('text' in element)) {
                element.text = '';
            }
            info.push(element);
            element = {};
        }
        this.setState({ mdText: text, info: info });
    }

    render() {
        return (
            <div className={styles.textInputArea}>
                <p style={{ color: 'white' }}>Text Input Area</p>
                <form onSubmit={this.handleSubmitText} className={styles.inputForm}>
                    <textarea
                        id="input_text"
                        className={styles.inputArea}
                        onChange={this.handleChangeText}
                        value={this.state.mdText}
                        placeholder="Enter the information here"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{
                            margin: '10px',
                        }}
                    >
                        Input Text
                    </Button>
                    <div
                        id="preview_text"
                        className={styles.previewArea}
                        dangerouslySetInnerHTML={{
                            __html: marked(this.state.mdText, { sanitize: true }),
                        }}
                    />
                </form>
            </div>
        );
    }
}

export default TextInput;
