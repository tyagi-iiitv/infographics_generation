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
            labels: ['a', 'b', 'c', 'd'], // To store the labels of the titles
            mdText: `labels: a, b, c, d\n\n// Enter the information below\n`,
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

        // Remove comments and empty lines
        for (i = lines.length - 1; i >= 0; i--) {
            lines[i] = lines[i].trim();
            if (lines[i].startsWith('//') || lines[i].length === 0) {
                lines.splice(i, 1);
            }
        }

        // Get labels for the infographics and then remove that line
        var labels = [];
        if (lines.length !== 0 && lines[0].startsWith('labels:')) {
            var labelString = lines[0].substring(7, lines[0].length);
            labels = labelString.split(',');
            labels = labels.map((label) => label.trim());
            lines.splice(0, 1);
        }

        // Gets a the title, subtitle, images, image alt texts and body texts of each
        // visual group and saves them in an object
        var info = [];
        var element = {};
        for (i = 0; i < lines.length; i++) {
            // Title of the object
            if (lines[i].startsWith('#') && !lines[i].startsWith('##')) {
                // If element is not empty push it to the list and
                // creates new element again
                if (Object.entries(element).length !== 0) {
                    if (!('title' in element)) {
                        element.title = '';
                    }
                    if (!('subtitle' in element)) {
                        element.subtitle = '';
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
                // Subtitle of the object
            } else if (lines[i].startsWith('##')) {
                element.subtitle = lines[i].substring(2, lines[i].length);
                // Image elements
            } else if (lines[i].match(/!\[.*\]\(.*\)/i)) {
                var imgAltText = lines[i].substring(
                    lines[i].lastIndexOf('[') + 1,
                    lines[i].lastIndexOf(']')
                );
                if (!('imagesAlt' in element)) {
                    element.imagesAlt = [];
                }
                element.imagesAlt.push(imgAltText);
                var imgLink = lines[i].substring(
                    lines[i].lastIndexOf('(') + 1,
                    lines[i].lastIndexOf(')')
                );
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
            if (!('subtitle' in element)) {
                element.subtitle = '';
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
        console.log(labels);
        console.log(info);
        this.setState({ mdText: text, labels: labels, info: info });
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
